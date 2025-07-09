'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypingStore } from '@/store/typing-store';
import { cn } from '@/lib/utils';

export function TypingDisplay() {
  const { characters, currentIndex, settings, isTestComplete } = useTypingStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when characters change (new test)
  useEffect(() => {
    if (containerRef.current && currentIndex === 0) {
      containerRef.current.scrollTop = 0;
    }
  }, [characters]);

  useEffect(() => {
    // Auto-scroll to keep current character visible
    if (containerRef.current && currentIndex < characters.length) {
      const container = containerRef.current;
      const charElements = container.querySelectorAll('.typing-char');
      const currentChar = charElements[currentIndex] as HTMLElement;
      
      if (currentChar) {
        const containerRect = container.getBoundingClientRect();
        const charRect = currentChar.getBoundingClientRect();
        
        // Scroll when approaching the bottom of the visible area
        if (charRect.bottom > containerRect.bottom - 60) {
          const scrollAmount = charRect.bottom - containerRect.bottom + 80;
          container.scrollTop += scrollAmount;
        }
      }
    }
  }, [currentIndex, characters.length]);

  const getCharacterColor = (status: string) => {
    switch (status) {
      case 'correct':
        return 'text-foreground';
      case 'incorrect':
        return 'text-red-500 bg-red-500/20 rounded-sm';
      case 'current':
        return 'text-foreground';
      default:
        return 'text-muted-foreground/60';
    }
  };

  // Split text into lines for better display control
  const renderText = () => {
    const words = [];
    let currentWord = [];
    let wordStartIndex = 0;

    // Group characters into words
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      if (char.char === ' ') {
        if (currentWord.length > 0) {
          words.push({
            chars: currentWord,
            startIndex: wordStartIndex,
            endIndex: i - 1
          });
          currentWord = [];
        }
        // Add space as separate word
        words.push({
          chars: [{ ...char, index: i }],
          startIndex: i,
          endIndex: i
        });
        wordStartIndex = i + 1;
      } else {
        currentWord.push({ ...char, index: i });
      }
    }
    
    // Add last word if exists
    if (currentWord.length > 0) {
      words.push({
        chars: currentWord,
        startIndex: wordStartIndex,
        endIndex: characters.length - 1
      });
    }

    return (
      <div className="leading-relaxed">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.chars.map((char, charIndex) => {
              const globalIndex = word.startIndex + charIndex;
              const isActive = globalIndex === currentIndex;
              
              return (
                <span
                  key={globalIndex}
                  className={cn(
                    'typing-char relative transition-colors duration-75',
                    getCharacterColor(char.status),
                    char.char === ' ' ? 'w-[0.5em]' : ''
                  )}
                >
                  {char.char === ' ' ? '\u00A0' : char.char}
                  {isActive && !isTestComplete && (
                    <span
                      className="absolute -top-0.5 left-0 w-1 h-[1.2em] bg-yellow-500"
                    />
                  )}
                </span>
              );
            })}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div
        ref={containerRef}
        className="typing-container relative h-[200px] p-8 bg-card rounded-lg border overflow-hidden"
        style={{ fontSize: `${settings.fontSize}px` }}
      >
        <div 
          className="relative font-mono select-none"
          style={{ 
            lineHeight: '1.8',
            wordSpacing: '0.2em',
            letterSpacing: '0.02em'
          }}
        >
          {renderText()}
        </div>
      </div>
      
    </div>
  );
}