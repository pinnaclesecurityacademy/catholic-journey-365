import { useCallback, useEffect, useState } from 'react';

// Reusable reading text-size preference for long-form content. Saved locally so
// the choice persists across visits. Only affects body reading text, never
// headings, buttons, navigation, or prayer styling.

export type ReaderFontSize = 'normal' | 'large' | 'xlarge';

const STORAGE_KEY = 'cj365-reader-font';

export function readReaderFontSize(): ReaderFontSize {
  if (typeof window === 'undefined') return 'normal';
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === 'large' || raw === 'xlarge') return raw;
  return 'normal';
}

export function readerFontClass(size: ReaderFontSize): string {
  if (size === 'large') return 'reader-lg';
  if (size === 'xlarge') return 'reader-xl';
  return '';
}

export function useReaderFont() {
  const [size, setSizeState] = useState<ReaderFontSize>(readReaderFontSize);

  const setSize = useCallback((next: ReaderFontSize) => {
    setSizeState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  // Keep in sync if changed on another reading page in the same session.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setSizeState(readReaderFontSize());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return { size, setSize };
}
