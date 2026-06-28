import { useEffect, useRef } from 'react';

const RESUME_ROUTE_KEY = 'cj365_resume_route_v1';
const RESUME_STATE_PREFIX = 'cj365_resume_state_v1:';
const RESUME_SCROLL_PREFIX = 'cj365_resume_scroll_v1:';

type ResumeRoute = {
  path: string;
  updatedAt: number;
};

type ResumeScroll = {
  top: number;
  updatedAt: number;
};

function storage() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readJson<T>(key: string): T | null {
  const store = storage();
  if (!store) return null;

  try {
    const value = store.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  const store = storage();
  if (!store) return;

  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    // Resume state is a convenience. Storage failures should never block use.
  }
}

function stateKey(key: string) {
  return `${RESUME_STATE_PREFIX}${key}`;
}

function scrollKey(key: string) {
  return `${RESUME_SCROLL_PREFIX}${key}`;
}

export function isSafeResumePath(path: unknown): path is string {
  return (
    typeof path === 'string' &&
    path.length > 0 &&
    path.length < 240 &&
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !path.includes('\\') &&
    !path.startsWith('/login') &&
    !path.startsWith('/intro') &&
    !path.startsWith('/auth/callback') &&
    !path.startsWith('/reset-password')
  );
}

export function readResumePath() {
  const resume = readJson<ResumeRoute>(RESUME_ROUTE_KEY);
  if (!resume || !isSafeResumePath(resume.path)) return null;
  return resume.path;
}

export function writeResumePath(path: string) {
  if (!isSafeResumePath(path)) return;
  writeJson(RESUME_ROUTE_KEY, { path, updatedAt: Date.now() });
}

export function readResumeState<T>(
  key: string,
  fallback: T,
  validate?: (value: unknown) => T | null
) {
  const value = readJson<unknown>(stateKey(key));
  if (value === null) return fallback;
  return validate ? validate(value) ?? fallback : (value as T);
}

export function writeResumeState(key: string, value: unknown) {
  writeJson(stateKey(key), { value, updatedAt: Date.now() });
}

export function readStoredResumeValue<T>(
  key: string,
  fallback: T,
  validate?: (value: unknown) => T | null
) {
  const entry = readResumeState<{ value: unknown } | null>(key, null);
  if (!entry || typeof entry !== 'object' || !('value' in entry)) {
    return fallback;
  }
  return validate ? validate(entry.value) ?? fallback : (entry.value as T);
}

function currentScrollTop() {
  if (typeof window === 'undefined') return 0;
  return Math.max(
    window.scrollY || 0,
    document.scrollingElement?.scrollTop || 0,
    document.documentElement.scrollTop || 0,
    document.body.scrollTop || 0
  );
}

function scrollToTopPosition(top: number) {
  window.scrollTo({ top, left: 0, behavior: 'auto' });
  document.scrollingElement?.scrollTo({ top, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = top;
  document.body.scrollTop = top;
}

export function saveResumeScroll(key: string) {
  if (typeof window === 'undefined' || !key) return;
  writeJson(scrollKey(key), {
    top: Math.max(0, Math.round(currentScrollTop())),
    updatedAt: Date.now(),
  });
}

export function useResumeScroll(key: string, enabled = true) {
  const restoredKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !key || typeof window === 'undefined') return;
    if (restoredKeyRef.current === key) return;
    restoredKeyRef.current = key;

    const saved = readJson<ResumeScroll>(scrollKey(key));
    if (!saved || saved.top <= 0) return;

    const top = Math.max(0, Math.round(saved.top));
    const restore = () => scrollToTopPosition(top);

    restore();
    const frame = window.requestAnimationFrame(restore);
    const timer = window.setTimeout(restore, 80);
    const settledTimer = window.setTimeout(restore, 220);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.clearTimeout(settledTimer);
    };
  }, [enabled, key]);

  useEffect(() => {
    if (!enabled || !key || typeof window === 'undefined') return;

    let frame: number | null = null;
    const save = () => saveResumeScroll(key);
    const scheduleSave = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        save();
      });
    };
    const saveWhenHidden = () => {
      if (document.visibilityState === 'hidden') save();
    };

    window.addEventListener('scroll', scheduleSave, { passive: true });
    window.addEventListener('pagehide', save);
    window.addEventListener('beforeunload', save);
    document.addEventListener('visibilitychange', saveWhenHidden);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      save();
      window.removeEventListener('scroll', scheduleSave);
      window.removeEventListener('pagehide', save);
      window.removeEventListener('beforeunload', save);
      document.removeEventListener('visibilitychange', saveWhenHidden);
    };
  }, [enabled, key]);
}
