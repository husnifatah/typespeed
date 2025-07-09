'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypingStore } from '@/store/typing-store';
import { TypingDisplay } from '@/components/typing-display';
import { StatsDisplay } from '@/components/stats-display';
import { TestControls } from '@/components/test-controls';
import { TestResults } from '@/components/test-results';
import { SettingsPanel } from '@/components/settings-panel';
import { ThemeProvider } from '@/components/theme-provider';
import { KeyboardHandler } from '@/components/keyboard-handler';
import { Keyboard } from 'lucide-react';

function TypingApp() {
  const { generateTestContent, isTestComplete } = useTypingStore();

  useEffect(() => {
    generateTestContent();
  }, [generateTestContent]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <KeyboardHandler />
      <SettingsPanel />
      <TestResults />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Keyboard className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-primary">
              TypeSpeed
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Test your typing speed and accuracy
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          <StatsDisplay />
          <TestControls />
          <TypingDisplay />
        </div>

        {/* Instructions */}
        {!isTestComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-48 text-sm text-muted-foreground"
          >
            <p>Click on the text area or simply start typing to begin the test</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <TypingApp />
    </ThemeProvider>
  );
}