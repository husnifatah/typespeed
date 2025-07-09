'use client';

import { motion } from 'framer-motion';
import { useTypingStore } from '@/store/typing-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Zap, AlertCircle } from 'lucide-react';
import { formatTime } from '@/lib/typing-utils';

export function TestResults() {
  const { lastResult, resetTest, isTestComplete } = useTypingStore();

  if (!isTestComplete || !lastResult) return null;

  const getPerformanceLevel = (wpm: number) => {
    if (wpm >= 70) return { level: 'Excellent', color: 'text-green-500' };
    if (wpm >= 50) return { level: 'Good', color: 'text-blue-500' };
    if (wpm >= 30) return { level: 'Average', color: 'text-yellow-500' };
    return { level: 'Needs Practice', color: 'text-red-500' };
  };

  const performance = getPerformanceLevel(lastResult.wpm);

  const resultItems = [
    { 
      icon: TrendingUp, 
      label: 'Words Per Minute', 
      value: lastResult.wpm,
      color: 'text-blue-500'
    },
    { 
      icon: Zap, 
      label: 'Characters Per Minute', 
      value: lastResult.cpm,
      color: 'text-green-500'
    },
    { 
      icon: Target, 
      label: 'Accuracy', 
      value: `${lastResult.accuracy}%`,
      color: 'text-yellow-500'
    },
    { 
      icon: AlertCircle, 
      label: 'Errors', 
      value: lastResult.errors,
      color: 'text-red-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Test Complete!</CardTitle>
          <div className={`text-xl font-semibold ${performance.color}`}>
            {performance.level}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {resultItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <div>
                  <div className={`text-xl font-bold ${item.color}`}>
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">
                {formatTime(Math.floor(lastResult.timeElapsed))}
              </div>
              <div className="text-sm text-muted-foreground">
                Time Elapsed
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">
                {lastResult.correctChars} / {lastResult.totalChars}
              </div>
              <div className="text-sm text-muted-foreground">
                Correct Characters
              </div>
            </div>
          </div>

          {/* Test Info */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Test Mode: {lastResult.testMode} 
              {lastResult.testMode === 'time' && ` (${lastResult.testValue}s)`}
              {lastResult.testMode === 'words' && ` (${lastResult.testValue} words)`}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-4">
            <Button onClick={resetTest} size="lg">
              Try Again (New Text)
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}