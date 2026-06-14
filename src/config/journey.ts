// Configurable start date for Chris & Saua's journey.
// JOURNEY_START_DATE is Day 1 of the 365-day plan.
export const JOURNEY_START_DATE = '2026-01-19';

export const TOTAL_DAYS = 365;

/** Number of whole days between two dates (date-only, ignoring time of day). */
function daysBetween(start: Date, end: Date): number {
  const startDay = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endDay = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.floor((endDay - startDay) / (1000 * 60 * 60 * 24));
}

/**
 * Current day of the plan, derived from JOURNEY_START_DATE.
 * Start date = Day 1, clamped to the range [1, 365].
 */
export function getCurrentDay(today: Date = new Date()): number {
  const start = new Date(JOURNEY_START_DATE + 'T00:00:00');
  const day = daysBetween(start, today) + 1;
  return Math.min(Math.max(day, 1), TOTAL_DAYS);
}
