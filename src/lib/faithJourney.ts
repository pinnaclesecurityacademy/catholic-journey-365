export const FAITH_JOURNEY_ITEMS = [
  'Morning Prayer',
  'Scripture Reading',
  'Dive Deeper',
  'Faith Formation',
  'Daily Devotion',
  'Five Finger Prayer',
  'Seeing God Today',
  'Evening Prayer',
];

export const SCRIPTURE_READING_ITEM = 'Scripture Reading';
export const DIVE_DEEPER_ITEM = 'Dive Deeper';

export function mergeFaithJourneyChecks(
  localItems: string[],
  autoItems: string[]
) {
  return Array.from(new Set([...localItems, ...autoItems]));
}

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function faithJourneyStorageKey(date = new Date()) {
  return `cj365-faith-journey-${todayKey(date)}`;
}

export function readFaithJourneyChecks(date = new Date()) {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(faithJourneyStorageKey(date));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

export function writeFaithJourneyChecks(items: string[], date = new Date()) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    faithJourneyStorageKey(date),
    JSON.stringify(items)
  );
}
