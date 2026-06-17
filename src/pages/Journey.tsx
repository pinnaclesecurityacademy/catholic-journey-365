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
          ? 'border border-gold bg-gold text-leather-900'
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

function periodIconSrc(period: Period): string {
  if (period.name === 'Creation & Covenant') {
    return period.start === 1
      ? '/images/journey/creation.webp'
      : '/images/journey/early-world.webp';
  }
  if (period.name === 'Fathers of Faith') {
    return '/images/journey/fathers-of-faith.webp';
  }
  if (period.name === 'Deliverance & Freedom') {
    return '/images/journey/egypt-exodus.webp';
  }
  if (period.name === 'The Wilderness Journey') {
    return '/images/journey/desert-wanderings.webp';
  }
  if (period.name === 'The Promised Land') {
    return '/images/journey/promised-land.webp';
  }
  if (period.name === 'Christ Connection') {
    return '/images/journey/christ-connections.webp';
  }
  if (period.name === 'Kings & the Kingdom') {
    return '/images/journey/royal-kingdom.webp';
  }
  if (period.name === 'Division & the Prophets') {
    return '/images/journey/divided-kingdom.webp';
  }
  if (period.name === 'Exile & Hope') {
    return '/images/journey/exile.webp';
  }
  if (period.name === 'Coming Home') {
    return '/images/journey/return.webp';
  }
  if (period.name === 'Faith & Courage') {
    return '/images/journey/maccabean-revolt.webp';
  }
  if (period.name === 'Christ the Messiah') {
    return '/images/journey/messianic-fulfilment.webp';
  }
  if (period.name === 'The Early Church') {
    return '/images/journey/church.webp';
  }
  return '/images/journey/judges.webp';
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
  const currentPeriod =
    periods.find((p) => currentDay >= p.start && currentDay <= p.end) ??
    periods[0];
  const currentPeriodDone = currentPeriod.days.filter((d) =>
    groupComplete(completions, d.day_number, members)
  ).length;
  const currentPeriodPct = Math.round(
    (currentPeriodDone / currentPeriod.days.length) * 100
  );

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
          <div className="flex items-center gap-4">
            <img
              src={periodIconSrc(selected)}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-16 w-16 shrink-0 rounded-full border-2 border-gold object-cover shadow-[0_12px_24px_rgba(212,169,106,0.16)]"
            />
            <div>
              <h1 className="font-display text-3xl font-bold text-leather-900">
                {selected.name}
              </h1>
              <p className="text-stone-500">
                Day {selected.start}-{selected.end} &middot; {selected.books}
              </p>
            </div>
          </div>
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
      <section className="relative mb-5 overflow-hidden rounded-[1.75rem] bg-leather-900 text-white shadow-[0_24px_56px_rgba(28,25,23,0.22)]">
        <img
          src={periodIconSrc(currentPeriod)}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-leather-900/35 via-leather-900/70 to-leather-900/95" />
        <div className="relative px-5 pb-5 pt-24">
          <p className="text-xs uppercase tracking-widest text-gold">
            Scripture Pilgrimage
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight">
            Day {currentDay} of {TOTAL_DAYS}
          </h1>
          <div className="mt-4 rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-semibold leading-tight text-parchment-50">
                  {currentPeriod.name}
                </p>
                <p className="mt-1 text-sm text-parchment-100/80">
                  {currentPeriod.books}
                </p>
              </div>
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-leather-900">
                {currentPeriodPct}%
              </span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-parchment-100/25">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-parchment-100"
                style={{ width: `${currentPeriodPct}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <header className="mb-4 px-1">
        <h2 className="font-display text-2xl font-bold text-leather-900">
          Journey
        </h2>
        <p className="text-sm text-stone-500">The Bible Timeline</p>
      </header>

      <div className="relative space-y-4 pb-2">
        <span
          aria-hidden="true"
          className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-gold/60 via-parchment-200 to-parchment-200"
        />
        {periods.map((p) => {
          const total = p.days.length;
          const done = p.days.filter((d) =>
            groupComplete(completions, d.day_number, members)
          ).length;
          const pct = Math.round((done / total) * 100);
          const isComplete = done === total;
          const isActive =
            currentDay >= p.start && currentDay <= p.end;

          return (
            <div key={`${p.name}-${p.start}`} className="relative pl-10">
              <button
                onClick={() => setSelected(p)}
                className={`w-full rounded-2xl border p-4 text-left shadow-[0_12px_32px_rgba(74,55,40,0.08)] transition active:scale-[0.99] ${
                  isActive
                    ? 'border-gold bg-parchment-50/95 ring-2 ring-gold/20 shadow-[0_18px_42px_rgba(124,92,62,0.14)]'
                    : isComplete
                      ? 'border-gold/70 bg-gradient-to-br from-white to-parchment-50'
                      : 'border-parchment-200 bg-white/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={periodIconSrc(p)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`-ml-12 mt-1 shrink-0 rounded-full border-2 object-cover shadow-[0_10px_20px_rgba(74,55,40,0.08)] ${
                      isActive
                        ? 'h-20 w-20 border-gold ring-4 ring-gold/15'
                        : isComplete
                          ? 'h-16 w-16 border-gold'
                          : 'h-16 w-16 border-parchment-200 opacity-60'
                    }`}
                  />
                  <div
                    className={`min-w-0 flex-1 ${
                      isActive || isComplete ? '' : 'opacity-75'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-bold text-leather-900">
                        {p.name}
                      </h3>
                      {isActive && (
                        <span className="rounded-full bg-leather-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                          Current Journey
                        </span>
                      )}
                      {isComplete && !isActive && (
                        <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-leather-900">
                          Complete
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-stone-500">
                      Day {p.start}-{p.end}
                    </p>
                    <p className="mt-0.5 text-sm text-leather-600">{p.books}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-stone-500">
                    <span>
                      {done}/{total} complete
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-parchment-200">
                    <div
                      className={`h-full rounded-full ${
                        isComplete
                          ? 'bg-gold'
                          : 'bg-gradient-to-r from-leather-600 to-gold'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
