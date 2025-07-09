'use client';

import { useEffect } from 'react';
import { useTypingStore } from '@/store/typing-store';

export function KeyboardHandler() {
  const { processKeyPress, isTestComplete } = useTypingStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for typing keys
      if (event.key.length === 1 || event.key === 'Backspace') {
        event.preventDefault();
      }
      
      // Ignore if test is complete
      if (isTestComplete) return;
      
      // Ignore modifier keys
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      
      processKeyPress(event.key);
    };

    // Focus management
    const handleFocus = () => {
      document.body.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('focus', handleFocus);
    
    // Set initial focus
    document.body.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('focus', handleFocus);
    };
  }, [processKeyPress, isTestComplete]);

  return null;
}