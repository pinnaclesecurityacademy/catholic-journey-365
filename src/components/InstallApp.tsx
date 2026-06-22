import { useEffect, useState } from 'react';

// Self-contained "Install app" prompt for the Profile page.
// - Android/Chrome: uses the beforeinstallprompt event for native install.
// - iPhone/Safari: shows Share -> Add to Home Screen instructions.
// - Hidden when already installed / running as a standalone PWA.

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

function isStandalone() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    // iOS Safari
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallApp() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(isStandalone());
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  // Already installed or running standalone: hide entirely.
  if (installed) return null;

  const ios = isIos();
  // On non-iOS we only show the card once the native prompt is available.
  if (!ios && !deferredPrompt) return null;

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else if (ios) {
      setShowIosHint((open) => !open);
    }
  };

  return (
    <>
      <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
        Install App
      </p>
      <section className="rounded-2xl bg-gradient-to-br from-white to-parchment-50 border border-parchment-200 p-5 mb-6 shadow-[0_12px_32px_rgba(74,55,40,0.08)]">
        <h2 className="font-display text-xl font-semibold text-leather-900">
          Install Catholic Journey 365
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-stone-500">
          Add this app to your home screen for the best experience.
        </p>
        <button
          onClick={handleInstall}
          className="mt-4 w-full rounded-xl bg-leather-600 py-2.5 font-semibold text-white active:scale-[0.99] transition"
        >
          {ios && !deferredPrompt ? 'How to install' : 'Install app'}
        </button>

        {ios && showIosHint && (
          <p className="mt-4 whitespace-pre-line border-t border-parchment-200 pt-4 text-sm leading-relaxed text-stone-600">
            {`On iPhone or iPad:
1. Tap the Share button.
2. Choose "Add to Home Screen".`}
          </p>
        )}
      </section>
    </>
  );
}
