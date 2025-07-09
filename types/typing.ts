export interface TypingStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number;
}

export interface TestResult extends TypingStats {
  testMode: TestMode;
  testValue: number;
  completedAt: Date;
  textContent: string;
}

export type TestMode = 'time' | 'words' | 'quote';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface TestConfig {
  mode: TestMode;
  value: number; // seconds for time mode, word count for words mode
  content: string;
  quoteAuthor?: string;
}

export interface TypingSettings {
  fontSize: number;
  keyboardLayout: 'qwerty' | 'dvorak' | 'colemak';
  soundEnabled: boolean;
  soundVolume: number;
  theme: ThemeMode;
  showKeyboard: boolean;
  smoothCaret: boolean;
}

export interface CharacterState {
  char: string;
  status: 'untyped' | 'correct' | 'incorrect' | 'current';
  isSpace: boolean;
}