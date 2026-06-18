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

type UpdateStatus = 'idle' | 'checking' | 'latest' | 'ready';

type PWAUpdateValue = {
  status: UpdateStatus;
  updateReady: boolean;
  checkForUpdates: () => Promise<void>;
  updateNow: () => void;
};

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

  useEffect(() => {
    serviceWorkerRegistration.register({
      onSuccess: setRegistration,
      onUpdate: markReady,
    });

    if (!('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker.getRegistration().then((currentRegistration) => {
      if (!currentRegistration) {
        return;
      }

      setRegistration(currentRegistration);
      if (currentRegistration.waiting) {
        markReady(currentRegistration);
      }
    });
  }, [markReady]);

  const checkForUpdates = useCallback(async () => {
    if (!('serviceWorker' in navigator)) {
      setStatus('latest');
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
      setWaitingWorker(nextWorker);
      markReady(currentRegistration);
      return;
    }

    setStatus('latest');
  }, [markReady, registration]);

  const updateNow = useCallback(() => {
    if (!waitingWorker || !('serviceWorker' in navigator)) {
      return;
    }

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) {
        return;
      }
      refreshing = true;
      window.location.reload();
    });

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
