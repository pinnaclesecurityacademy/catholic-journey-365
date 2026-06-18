import { Component, type ReactNode } from 'react';

// After a deploy, an already-open client can ask for a hashed JS/CSS chunk that
// the new service worker has purged from cache and that no longer exists on the
// server. The lazy import() then rejects. Without a boundary that rejection
// unmounts the whole app (a blank screen) and also hides the update banner.
//
// This boundary catches those failures. For a stale-chunk / dynamic-import
// error it reloads the page once to pull a fresh index.html and matching
// chunks. A one-time sessionStorage guard prevents an infinite reload loop if
// the reload does not resolve the error. Any other error shows a quiet,
// reverent fallback with a manual reload.

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

const RELOAD_GUARD_KEY = 'cj365-chunk-reload';

function isChunkLoadError(error: unknown): boolean {
  if (!error) {
    return false;
  }
  const name = (error as { name?: string }).name ?? '';
  const message = (error as { message?: string }).message ?? '';
  return (
    name === 'ChunkLoadError' ||
    /loading chunk [\d]+ failed/i.test(message) ||
    /loading css chunk/i.test(message) ||
    /failed to fetch dynamically imported module/i.test(message) ||
    /importing a module script failed/i.test(message)
  );
}

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (!isChunkLoadError(error)) {
      return;
    }

    // Reload at most once per browser session to recover from stale assets
    // without risking a reload loop.
    let alreadyReloaded = false;
    try {
      alreadyReloaded = window.sessionStorage.getItem(RELOAD_GUARD_KEY) === '1';
      if (!alreadyReloaded) {
        window.sessionStorage.setItem(RELOAD_GUARD_KEY, '1');
      }
    } catch {
      // sessionStorage may be unavailable; fall through to manual reload.
    }

    if (!alreadyReloaded) {
      window.location.reload();
    }
  }

  handleReload = () => {
    try {
      window.sessionStorage.removeItem(RELOAD_GUARD_KEY);
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-[1.75rem] border border-parchment-200 bg-white/85 p-7 text-center shadow-[0_24px_56px_rgba(74,55,40,0.12)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-parchment-50 text-2xl font-semibold text-gold">
            +
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-leather-900">
            A new version is ready
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-leather-600">
            Please reload to continue your journey.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white shadow-[0_12px_24px_rgba(74,55,40,0.14)] transition active:scale-[0.99]"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
