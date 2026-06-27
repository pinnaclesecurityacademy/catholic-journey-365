import { createClient } from '@supabase/supabase-js';

// Credentials are injected at build time. When they are absent (a local
// checkout without an .env file, or a preview of the public site) fall back to
// harmless placeholders so the client does not throw at import and crash the
// whole app, including the public landing page. Real credentials are always
// present in production, so auth behaviour there is unchanged.
const supabaseUrl =
  (process.env.REACT_APP_SUPABASE_URL as string) ||
  'https://placeholder.supabase.co';
const supabaseAnonKey =
  (process.env.REACT_APP_SUPABASE_ANON_KEY as string) ||
  'public-anon-placeholder';

const memoryStorage = new Map<string, string>();

function getBrowserAuthStorage() {
  return {
    getItem(key: string) {
      try {
        return window.localStorage.getItem(key) ?? memoryStorage.get(key) ?? null;
      } catch {
        return memoryStorage.get(key) ?? null;
      }
    },
    setItem(key: string, value: string) {
      memoryStorage.set(key, value);
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // Keep the in-memory copy for the current PWA launch if storage is blocked.
      }
    },
    removeItem(key: string) {
      memoryStorage.delete(key);
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Storage may be unavailable in constrained browser modes.
      }
    },
  };
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: getBrowserAuthStorage(),
  },
});

/** A single day of the Bible in a Year reading plan. */
export interface ReadingDay {
  day_number: number;
  period: string;
  reading_one: string;
  reading_two: string;
  psalm_proverb: string;
  summary: string;
  think_about_question: string;
  daily_prayer: string;
  quote: string;
  episode_link?: string;
}

/**
 * Identifier for the reader a completion belongs to. Each account's progress is
 * stored under its own namespace, so existing records are preserved.
 */
export type UserId = string;

/** A row in the Supabase `completions` table. */
export interface CompletionRecord {
  id: string;
  user_id: UserId;
  day_number: number;
  completed: boolean;
  completed_at: string;
}

/** A shared journey that members walk together. */
export interface Journey {
  id: string;
  name: string;
  invite_code: string;
  created_at: string;
}

/** A member of a journey. */
export interface JourneyMember {
  user_id: string;
  display_name: string;
}
