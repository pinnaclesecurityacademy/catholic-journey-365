import { useEffect, useState } from 'react';

export function isStandalonePWA() {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function useStandalonePWA() {
  const [standalone, setStandalone] = useState(isStandalonePWA);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const media = window.matchMedia?.('(display-mode: standalone)');
    const updateStandalone = () => setStandalone(isStandalonePWA());

    updateStandalone();

    if (media?.addEventListener) {
      media.addEventListener('change', updateStandalone);
    } else {
      media?.addListener?.(updateStandalone);
    }

    return () => {
      if (media?.removeEventListener) {
        media.removeEventListener('change', updateStandalone);
      } else {
        media?.removeListener?.(updateStandalone);
      }
    };
  }, []);

  return standalone;
}
