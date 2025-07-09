'use client';

import { useEffect, useState } from 'react';
import { useTypingStore } from '@/store/typing-store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useTypingStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(settings.theme);
    }
  }, [settings.theme, mounted]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}