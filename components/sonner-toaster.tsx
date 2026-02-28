'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

export function SonnerToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme as 'light' | 'dark' | 'system'}
      richColors
      closeButton
    />
  );
}
