import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { readingPlan } from '../data/readingPlan';
import { TOTAL_DAYS } from '../config/journey';
import { getAllCompletions } from '../lib/completions';
import { useAccount, Member } from '../lib/account';
import { CompletionRecord, ReadingDay } from '../lib/supabase';
import {
  SacredCard,
  sacredButtonCardClassName,
} from '../components/SacredCard';

function isComplete(
  records: CompletionRecord[],
  dayNumber: number,
  userId: string
): boolean {
  return records.some(
    (r) => r.day_number === dayNumber && r.user_id === userId && r.completed
  );
}

// A day is group-complete when every journey member has completed it.
function groupComplete(
  records: CompletionRecord[],
  dayNumber: number,
  members: Member[]
): boolean {
  if (members.length === 0) return false;
  return members.every((m) =>
    isComplete(records, dayNumber, m.completion_id)
  );
}

function Dot({ done }: { done: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
        done
          ? 'bg-sage-500 text-white'
          : 'border border-stone-300 text-stone-400'
      }`}
    >
      {done ? '\u2713' : ''}
    </span>
  );
}

// Strip the chapter/verse from a reading reference to leave the book name.
function bookName(ref: string): string {
  if (!ref) return '';
  return ref.replace(/\s+\d.*$/, '').trim();
}

interface Period {
  name: string;
  start: number;
  end: number;
  days: ReadingDay[];
  books: string;
}

// Group the reading plan into contiguous Bible Timeline periods.
function buildPeriods(): Period[] {
  const periods: Period[] = [];
  for (const day of readingPlan) {
    const last = periods[periods.length - 1];
    if (!last || last.name !== day.period) {
      periods.push({
        name: day.period,
        start: day.day_number,
        end: day.day_number,
        days: [day],
        books: '',
      });
    } else {
      last.end = day.day_number;
      last.days.push(day);
    }
  }
  for (const p of periods) {
    const seen: string[] = [];
    for (const d of p.days) {
      for (const ref of [d.reading_one, d.reading_two]) {
        const b = bookName(ref);
        if (b && !seen.includes(b)) seen.push(b);
      }
    }
    p.books =
      seen.slice(0, 3).join(' / ') + (seen.length > 3 ? ' ...' : '');
  }
  return periods;
}

export default function Journey() {
  const navigate = useNavigate();
  const { members } = useAccount();
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);
  const [selected, setSelected] = useState<Period | null>(null);

  useEffect(() => {
    getAllCompletions()
      .then(setCompletions)
      .catch(() => setCompletions([]));
  }, []);

  const periods = useMemo(buildPeriods, []);

  // Current day = first day the group has not all completed (actual progress).
  const currentDay =
    readingPlan.find(
      (d) => !groupComplete(completions, d.day_number, members)
    )?.day_number ?? TOTAL_DAYS;

  // ---- Period detail view (days within one period) ----
  if (selected) {
    return (
      <div className="mx-auto max-w-md px-4 pt-5 pb-6">
        <button
          onClick={() => setSelected(null)}
          className="mb-4 rounded-xl border border-parchment-200 bg-white/80 px-4 py-2 text-sm font-semibold text-leather-600 shadow-[0_10px_28px_rgba(74,55,40,0.07)] transition active:scale-[0.99]"
        >
          &larr; All Periods
        </button>
        <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
          <h1 className="font-display text-3xl font-bold text-leather-900">
            {selected.name}
          </h1>
          <p className="text-stone-500">
            Day {selected.start}-{selected.end} &middot; {selected.books}
          </p>
        </SacredCard>

        <div className="space-y-3">
          {selected.days.map((day) => (
            <button
              key={day.day_number}
              onClick={() => navigate(`/day/${day.day_number}`)}
              className={`${sacredButtonCardClassName} w-full text-left`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-leather-600">
                      {day.day_number}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-stone-400">
                      {day.period}
                    </span>
                  </div>
                  <ul className="mt-2 text-sm text-leather-900 space-y-0.5">
                    <li>{day.reading_one}</li>
                    {day.reading_two && <li>{day.reading_two}</li>}
                    {day.psalm_proverb && <li>{day.psalm_proverb}</li>}
                  </ul>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Dot done={groupComplete(completions, day.day_number, members)} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---- Periods overview (Bible Timeline) ----
  return (
    <div className="mx-auto max-w-md px-4 pt-5 pb-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Journey
        </h1>
        <p className="text-stone-500">The Bible Timeline</p>
      </header>

      <div className="space-y-3">
        {periods.map((p) => {
          const total = p.days.length;
          const done = p.days.filter((d) =>
            groupComplete(completions, d.day_number, members)
          ).length;
          const pct = Math.round((done / total) * 100);
          const isActive =
            currentDay >= p.start && currentDay <= p.end;

          return (
            <button
              key={`${p.name}-${p.start}`}
              onClick={() => setSelected(p)}
              className={`w-full text-left rounded-2xl p-5 shadow-[0_12px_32px_rgba(74,55,40,0.08)] active:scale-[0.99] transition border ${
                isActive
                  ? 'bg-parchment-50/95 border-leather-400 ring-1 ring-leather-400'
                  : 'bg-white/90 border-parchment-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-xl font-bold text-leather-900">
                      {p.name}
                    </h2>
                    {isActive && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-white bg-leather-600 rounded-full px-2 py-0.5">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500">
                    Day {p.start}-{p.end}
                  </p>
                  <p className="text-sm text-leather-600 mt-0.5">{p.books}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Dot done={done === total} />
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-stone-500 mb-1">
                  <span>
                    {done}/{total} complete
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-parchment-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-leather-600 to-gold"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
