'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypingStore } from '@/store/typing-store';
import { formatTime } from '@/lib/typing-utils';

export function StatsDisplay() {
  const { 
    currentStats, 
    timeElapsed, 
    testConfig, 
    isTestActive, 
    isTestComplete,
    updateStats 
  } = useTypingStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTestActive && !isTestComplete) {
      interval = setInterval(() => {
        updateStats();
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isTestActive, isTestComplete, updateStats]);

  const timeRemaining = testConfig.mode === 'time' 
    ? Math.max(0, testConfig.value - Math.floor(timeElapsed))
    : null;

  const statsItems = [
    { label: 'WPM', value: currentStats.wpm, color: 'text-blue-500' },
    { label: 'CPM', value: currentStats.cpm, color: 'text-green-500' },
    { label: 'Accuracy', value: `${currentStats.accuracy}%`, color: 'text-yellow-500' },
    { label: 'Errors', value: currentStats.errors, color: 'text-red-500' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {statsItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="bg-card rounded-lg p-4 text-center border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`text-2xl font-bold ${item.color}`}>
              {item.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Timer display */}
      {testConfig.mode === 'time' && (
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {timeRemaining !== null ? formatTime(timeRemaining) : '0:00'}
          </div>
          <div className="text-sm text-muted-foreground">
            Time Remaining
          </div>
        </div>
      )}
      
      {/* Progress for word count tests */}
      {testConfig.mode === 'words' && (
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">
            {Math.floor(currentStats.totalChars / 5)} / {testConfig.value} words
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, (currentStats.totalChars / 5) / testConfig.value * 100)}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}