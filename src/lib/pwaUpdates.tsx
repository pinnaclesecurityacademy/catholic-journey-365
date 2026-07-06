import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import { APP_SHELL_VERSION } from '../generated/appShellVersion';
import { isStandalonePWA } from './pwaDisplayMode';

type UpdateStatus = 'idle' | 'checking' | 'latest' | 'ready' | 'unsupported';

type PWAUpdateValue = {
  status: UpdateStatus;
  updateReady: boolean;
  checkForUpdates: () => Promise<void>;
  updateNow: () => void;
};

// A single, guarded controllerchange handler shared across the app. The new
// service worker taking control reloads the page exactly once so the fresh
// assets are used. The guard prevents stacked listeners and reload loops.
let controllerChangeBound = false;
let reloading = false;
const APP_SHELL_VERSION_URL = `${process.env.PUBLIC_URL || ''}/app-shell-version.json`;

function bindControllerChangeReload() {
  if (controllerChangeBound || !('serviceWorker' in navigator)) {
    return;
  }
  controllerChangeBound = true;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) {
      return;
    }
    reloading = true;
    window.location.reload();
  });
}

const PWAUpdateContext = createContext<PWAUpdateValue>({
  status: 'idle',
  updateReady: false,
  checkForUpdates: async () => undefined,
  updateNow: () => undefined,
});

export function PWAUpdateProvider({ children }: { children: ReactNode }) {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [waitingWorker, setWaitingWorker] =
    useState<ServiceWorker | null>(null);
  const [status, setStatus] = useState<UpdateStatus>('idle');

  const markReady = useCallback((nextRegistration: ServiceWorkerRegistration) => {
    setRegistration(nextRegistration);
    setWaitingWorker(nextRegistration.waiting);
    setStatus('ready');
  }, []);

  const activateSilently = useCallback((worker: ServiceWorker | null) => {
    worker?.postMessage({ type: 'SKIP_WAITING' });
  }, []);

  const handleWaitingUpdate = useCallback(
    async (nextRegistration: ServiceWorkerRegistration) => {
      setRegistration(nextRegistration);

      const worker =
        nextRegistration.waiting ?? (await waitForWaitingWorker(nextRegistration));
      if (!worker) {
        return;
      }

      if (!isStandalonePWA()) {
        setStatus('unsupported');
        activateSilently(worker);
        return;
      }

      const appShellChanged = await hasAppShellChanged();
      if (appShellChanged) {
        setWaitingWorker(worker);
        setStatus('ready');
        return;
      }

      setStatus('latest');
      activateSilently(worker);
    },
    [activateSilently]
  );

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      setStatus('unsupported');
      return;
    }

    let cancelled = false;

    // Watch a worker that is currently installing; when it finishes installing
    // while an existing controller is present, an update is waiting.
    const trackInstalling = (
      worker: ServiceWorker | null,
      reg: ServiceWorkerRegistration
    ) => {
      if (!worker) {
        return;
      }
      worker.addEventListener('statechange', () => {
        if (
          !cancelled &&
          worker.state === 'installed' &&
          navigator.serviceWorker.controller
        ) {
          handleWaitingUpdate(reg).catch(() => markReady(reg));
        }
      });
    };

    serviceWorkerRegistration.register({
      onSuccess: (reg) => {
        if (!cancelled) {
          setRegistration(reg);
        }
      },
      onUpdate: (reg) => {
        if (!cancelled) {
          handleWaitingUpdate(reg).catch(() => markReady(reg));
        }
      },
    });

    navigator.serviceWorker.getRegistration().then((currentRegistration) => {
      if (cancelled || !currentRegistration) {
        return;
      }

      setRegistration(currentRegistration);

      // An update may already be waiting from a previous visit.
      if (currentRegistration.waiting && navigator.serviceWorker.controller) {
        handleWaitingUpdate(currentRegistration).catch(() =>
          markReady(currentRegistration)
        );
        return;
      }

      // Or one may be installing right now, or appear after we ask for a check.
      trackInstalling(currentRegistration.installing, currentRegistration);
      currentRegistration.addEventListener('updatefound', () => {
        trackInstalling(currentRegistration.installing, currentRegistration);
      });

      currentRegistration.update().catch(() => undefined);
    });

    const checkCurrentRegistration = () => {
      if (document.visibilityState !== 'visible') {
        return;
      }

      navigator.serviceWorker
        .getRegistration()
        .then((currentRegistration) => {
          if (cancelled || !currentRegistration) {
            return;
          }

          if (currentRegistration.waiting && navigator.serviceWorker.controller) {
            handleWaitingUpdate(currentRegistration).catch(() =>
              markReady(currentRegistration)
            );
            return;
          }

          currentRegistration.update().catch(() => undefined);
        })
        .catch(() => undefined);
    };

    document.addEventListener('visibilitychange', checkCurrentRegistration);
    window.addEventListener('focus', checkCurrentRegistration);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', checkCurrentRegistration);
      window.removeEventListener('focus', checkCurrentRegistration);
    };
  }, [handleWaitingUpdate, markReady]);

  const checkForUpdates = useCallback(async () => {
    if (!('serviceWorker' in navigator)) {
      setStatus('latest');
      return;
    }

    if (!isStandalonePWA()) {
      setStatus('unsupported');
      return;
    }

    setStatus('checking');

    const currentRegistration =
      registration ?? (await navigator.serviceWorker.getRegistration());

    if (!currentRegistration) {
      setStatus('latest');
      return;
    }

    setRegistration(currentRegistration);

    try {
      await currentRegistration.update();
    } catch {
      setStatus('latest');
      return;
    }

    const nextWorker = await waitForWaitingWorker(currentRegistration);
    if (nextWorker) {
      await handleWaitingUpdate(currentRegistration);
      return;
    }

    setStatus('latest');
  }, [handleWaitingUpdate, registration]);

  const updateNow = useCallback(() => {
    if (!waitingWorker || !('serviceWorker' in navigator)) {
      return;
    }

    bindControllerChangeReload();
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  }, [waitingWorker]);

  const value = useMemo(
    () => ({
      status,
      updateReady: status === 'ready',
      checkForUpdates,
      updateNow,
    }),
    [checkForUpdates, status, updateNow]
  );

  return (
    <PWAUpdateContext.Provider value={value}>
      {children}
    </PWAUpdateContext.Provider>
  );
}

async function hasAppShellChanged() {
  try {
    const response = await fetch(APP_SHELL_VERSION_URL, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      return true;
    }

    const latest = (await response.json()) as { version?: string };
    return latest.version ? latest.version !== APP_SHELL_VERSION : true;
  } catch {
    return true;
  }
}

export function usePWAUpdate() {
  return useContext(PWAUpdateContext);
}

function waitForWaitingWorker(registration: ServiceWorkerRegistration) {
  if (registration.waiting) {
    return Promise.resolve(registration.waiting);
  }

  return new Promise<ServiceWorker | null>((resolve) => {
    let settled = false;

    const finish = (worker: ServiceWorker | null) => {
      if (settled) {
        return;
      }
      settled = true;
      resolve(worker);
    };

    const watchWorker = (worker: ServiceWorker | null) => {
      if (!worker) {
        return;
      }

      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed') {
          finish(registration.waiting);
        }
      });
    };

    registration.addEventListener('updatefound', () => {
      watchWorker(registration.installing);
    });
    watchWorker(registration.installing);

    window.setTimeout(() => finish(registration.waiting), 1500);
  });
}
