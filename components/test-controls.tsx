'use client';

import { Button } from '@/components/ui/button';
import { useTypingStore } from '@/store/typing-store';
import { RotateCcw, Play, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const TEST_MODES = {
  time: [15, 30, 60, 120],
  words: [10, 25, 50, 100],
  quote: [1]
};

export function TestControls() {
  const { testConfig, setTestMode, resetTest, isTestActive, isTestComplete } = useTypingStore();

  const handleModeChange = (mode: keyof typeof TEST_MODES, value: number) => {
    setTestMode(mode, value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        {/* Mode Selection */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(TEST_MODES).map(([mode, values]) => (
            <div key={mode} className="flex items-center gap-1">
              <span className="text-sm font-medium text-muted-foreground capitalize mr-2">
                {mode}:
              </span>
              {values.map((value) => (
                <Button
                  key={value}
                  variant={testConfig.mode === mode && testConfig.value === value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleModeChange(mode as keyof typeof TEST_MODES, value)}
                  disabled={isTestActive}
                  className="min-w-[50px]"
                >
                  {mode === 'time' ? `${value}s` : 
                   mode === 'words' ? value : 
                   'quote'}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={resetTest}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {isTestComplete ? 'Try Again (New Text)' : 'Restart (New Text)'}
        </Button>
        
        {testConfig.mode === 'quote' && (
          <Button
            onClick={() => setTestMode('quote', 1)}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            New Quote
          </Button>
        )}
      </div>

      {/* Quote author display */}
      {testConfig.mode === 'quote' && testConfig.quoteAuthor && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4"
        >
          <p className="text-sm text-muted-foreground">
            — {testConfig.quoteAuthor}
          </p>
        </motion.div>
      )}
    </div>
  );
}