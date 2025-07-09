import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TestConfig, TypingStats, TestResult, TypingSettings, CharacterState } from '@/types/typing';
import { generateWordList, getRandomQuote, calculateStats, playKeySound } from '@/lib/typing-utils';

interface TypingState {
  // Test configuration
  testConfig: TestConfig;
  
  // Current test state
  characters: CharacterState[];
  currentIndex: number;
  isTestActive: boolean;
  isTestComplete: boolean;
  startTime: number | null;
  timeElapsed: number;
  
  // Stats
  currentStats: TypingStats;
  lastResult: TestResult | null;
  
  // Settings
  settings: TypingSettings;
  
  // Actions
  setTestMode: (mode: TestConfig['mode'], value: number) => void;
  startTest: () => void;
  resetTest: () => void;
  processKeyPress: (key: string) => void;
  updateSettings: (settings: Partial<TypingSettings>) => void;
  
  // Internal helpers
  generateTestContent: () => void;
  updateStats: () => void;
  completeTest: () => void;
}

export const useTypingStore = create<TypingState>()(
  persist(
    (set, get) => ({
      testConfig: {
        mode: 'time',
        value: 30,
        content: '',
        quoteAuthor: undefined
      },
      
      characters: [],
      currentIndex: 0,
      isTestActive: false,
      isTestComplete: false,
      startTime: null,
      timeElapsed: 0,
      
      currentStats: {
        wpm: 0,
        cpm: 0,
        accuracy: 100,
        errors: 0,
        correctChars: 0,
        incorrectChars: 0,
        totalChars: 0,
        timeElapsed: 0
      },
      
      lastResult: null,
      
      settings: {
        fontSize: 24,
        keyboardLayout: 'qwerty',
        soundEnabled: false,
        soundVolume: 0.5,
        theme: 'system',
        showKeyboard: false,
        smoothCaret: true
      },
      
      setTestMode: (mode, value) => {
        set(state => ({
          testConfig: {
            ...state.testConfig,
            mode,
            value
          }
        }));
        get().generateTestContent();
        get().resetTest();
      },
      
      generateTestContent: () => {
        const { testConfig } = get();
        let content = '';
        let quoteAuthor = undefined;
        
        switch (testConfig.mode) {
          case 'time':
            content = generateWordList(150); // Generate enough words for any time limit
            break;
          case 'words':
            content = generateWordList(testConfig.value);
            break;
          case 'quote':
            const quote = getRandomQuote();
            content = quote.text;
            quoteAuthor = quote.author;
            break;
        }
        
        const characters: CharacterState[] = content.split('').map((char, index) => ({
          char,
          status: index === 0 ? 'current' : 'untyped',
          isSpace: char === ' '
        }));
        
        set({
          testConfig: {
            ...testConfig,
            content,
            quoteAuthor
          },
          characters,
          currentIndex: 0
        });
      },
      
      startTest: () => {
        const now = Date.now();
        set({
          isTestActive: true,
          isTestComplete: false,
          startTime: now,
          timeElapsed: 0
        });
      },
      
      resetTest: () => {
        // Generate new content when resetting
        get().generateTestContent();
        
        set(state => ({
          isTestActive: false,
          isTestComplete: false,
          startTime: null,
          timeElapsed: 0,
          currentIndex: 0,
          characters: state.characters.map((char, index) => ({
            ...char,
            status: index === 0 ? 'current' : 'untyped'
          })),
          currentStats: {
            wpm: 0,
            cpm: 0,
            accuracy: 100,
            errors: 0,
            correctChars: 0,
            incorrectChars: 0,
            totalChars: 0,
            timeElapsed: 0
          }
        }));
        
        // Reset scroll position after state update
        setTimeout(() => {
          const container = document.querySelector('.typing-container');
          if (container) {
            container.scrollTop = 0;
          }
        }, 50);
      },
      
      processKeyPress: (key: string) => {
        const state = get();
        
        if (state.isTestComplete) return;
        
        // Start test on first keypress
        if (!state.isTestActive) {
          get().startTest();
        }
        
        const { characters, currentIndex, settings } = state;
        
        if (currentIndex >= characters.length) return;
        
        const currentChar = characters[currentIndex];
        let newIndex = currentIndex;
        
        // Handle backspace
        if (key === 'Backspace') {
          if (currentIndex > 0) {
            newIndex = currentIndex - 1;
            const updatedCharacters = [...characters];
            updatedCharacters[newIndex].status = 'current';
            updatedCharacters[currentIndex].status = 'untyped';
            
            set({
              characters: updatedCharacters,
              currentIndex: newIndex
            });
          }
          return;
        }
        
        // Handle regular character input
        if (key.length === 1) {
          const updatedCharacters = [...characters];
          const isCorrect = key === currentChar.char;
          
          updatedCharacters[currentIndex].status = isCorrect ? 'correct' : 'incorrect';
          
          newIndex = currentIndex + 1;
          
          if (newIndex < characters.length) {
            updatedCharacters[newIndex].status = 'current';
          }
          
          set({
            characters: updatedCharacters,
            currentIndex: newIndex
          });
          
          // Play sound if enabled
          if (settings.soundEnabled) {
            playKeySound(settings.soundVolume);
          }
          
          // Update stats
          get().updateStats();
          
          // Check if test is complete
          if (state.testConfig.mode === 'words' && newIndex >= characters.length) {
            get().completeTest();
          }
        }
      },
      
      updateStats: () => {
        const state = get();
        const now = Date.now();
        const timeElapsed = state.startTime ? (now - state.startTime) / 1000 : 0;
        
        set({
          timeElapsed,
          currentStats: calculateStats(state.characters, timeElapsed)
        });
        
        // Check time limit for timed tests
        if (state.testConfig.mode === 'time' && timeElapsed >= state.testConfig.value) {
          get().completeTest();
        }
      },
      
      completeTest: () => {
        const state = get();
        const finalStats = calculateStats(state.characters, state.timeElapsed);
        
        const result: TestResult = {
          ...finalStats,
          testMode: state.testConfig.mode,
          testValue: state.testConfig.value,
          completedAt: new Date(),
          textContent: state.testConfig.content
        };
        
        set({
          isTestComplete: true,
          isTestActive: false,
          lastResult: result,
          currentStats: finalStats
        });
      },
      
      updateSettings: (newSettings) => {
        set(state => ({
          settings: {
            ...state.settings,
            ...newSettings
          }
        }));
      }
    }),
    {
      name: 'typing-practice-store',
      partialize: (state) => ({
        settings: state.settings,
        lastResult: state.lastResult
      })
    }
  )
);