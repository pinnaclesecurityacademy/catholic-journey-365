import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { readingPlan, getReadingDay } from '../data/readingPlan';
import { TOTAL_DAYS } from '../config/journey';
import { getAllCompletions } from '../lib/completions';
import { useAccount } from '../lib/account';
import { CompletionRecord } from '../lib/supabase';

function isComplete(
  records: CompletionRecord[],
  dayNumber: number,
  userId: string
): boolean {
  return records.some(
    (r) => r.day_number === dayNumber && r.user_id === userId && r.completed
  );
}

// Traditional Rosary mysteries by weekday (0 = Sunday … 6 = Saturday).
const ROSARY_BY_DAY = [
  { id: 'glorious', label: 'Glorious Mysteries' }, // Sunday
  { id: 'joyful', label: 'Joyful Mysteries' }, // Monday
  { id: 'sorrowful', label: 'Sorrowful Mysteries' }, // Tuesday
  { id: 'glorious', label: 'Glorious Mysteries' }, // Wednesday
  { id: 'luminous', label: 'Luminous Mysteries' }, // Thursday
  { id: 'sorrowful', label: 'Sorrowful Mysteries' }, // Friday
  { id: 'joyful', label: 'Joyful Mysteries' }, // Saturday
];

export default function Home() {
  const navigate = useNavigate();
  const { profile, completionId, members } = useAccount();
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);

  useEffect(() => {
    getAllCompletions()
      .then(setCompletions)
      .catch(() => setCompletions([]));
  }, []);

  const uid = completionId ?? '';

  // Next reading = first day this user has not yet completed (actual progress).
  const nextDay =
    readingPlan.find((d) => !isComplete(completions, d.day_number, uid))
      ?.day_number ?? TOTAL_DAYS;
  const day = getReadingDay(nextDay) ?? readingPlan[0];

  const doneToday = isComplete(completions, nextDay, uid);

  const completedCount = readingPlan.filter((d) =>
    isComplete(completions, d.day_number, uid)
  ).length;
  const progressPct = Math.round((completedCount / TOTAL_DAYS) * 100);

  const todayRosary = ROSARY_BY_DAY[new Date().getDay()];

  return (
    <div className="max-w-md mx-auto px-5 pt-8">
      <header className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Catholic Journey 365
        </h1>
        <p className="mt-1 text-leather-600 font-medium tracking-wide">
          Peace be with you, {profile?.display_name}
        </p>
      </header>

      {/* Continue Journey card (condensed dashboard tile) */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
        <span className="pointer-events-none absolute right-4 top-3 font-display text-base text-parchment-200 select-none max-w-[50%] text-right leading-tight">
          {day.period}
        </span>
        <h3 className="font-display text-lg font-semibold text-leather-900 mb-2">
          Bible Journey
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-xs uppercase tracking-widest text-stone-400">
            Day
          </span>
          <span className="font-display text-3xl font-bold leading-none text-leather-600">
            {day.day_number}
          </span>
        </div>
        <p className="mt-0.5 text-xs italic text-stone-400">
          Your pilgrimage through Scripture
        </p>

        <ul className="mt-3 space-y-0.5 text-sm text-leather-900">
          <li>{day.reading_one}</li>
          {day.reading_two && <li>{day.reading_two}</li>}
          {day.psalm_proverb && <li>{day.psalm_proverb}</li>}
        </ul>

        {/* My Progress */}
        <div className="mt-3 flex items-center gap-2">
          {doneToday ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage-500 text-white text-xs">
              ✓
            </span>
          ) : (
            <span className="h-5 w-5 rounded-full border-2 border-stone-300" />
          )}
          <span
            className={`text-xs font-semibold ${
              doneToday ? 'text-sage-500' : 'text-leather-600'
            }`}
          >
            {doneToday ? 'Completed ✓' : "Today's reading awaits"}
          </span>
        </div>

        <button
          onClick={() => navigate(`/day/${day.day_number}`)}
          className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
        >
          Continue Your Journey
        </button>
      </div>

      {/* Daily Prayer (merged: prayer text + today's Rosary) */}
      <div className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
        <h3 className="font-display text-lg font-semibold text-leather-900">
          Daily Prayer
        </h3>
        <p className="mt-3 text-center italic text-leather-900 leading-loose whitespace-pre-line">
          {day.daily_prayer}
        </p>

        <div className="mt-5 border-t border-parchment-200 pt-4">
          <p className="text-sm text-stone-500">Today’s Rosary</p>
          <p className="mt-1 text-leather-900 font-medium">
            {todayRosary.label}
          </p>
          <button
            onClick={() => navigate(`/rosary/${todayRosary.id}`)}
            className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
          >
            Pray Rosary
          </button>
        </div>
      </div>

      {/* Card 4, Saint of the Day */}
      <div className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
        <h3 className="font-display text-lg font-semibold text-leather-900">
          Saint of the Day
        </h3>
        <p className="mt-2 text-sm text-stone-500">
          Learn from those who followed Christ before us.
        </p>
        <button
          onClick={() => navigate('/saint')}
          className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
        >
          Meet Today’s Saint
        </button>
        <button
          onClick={() => navigate('/saints')}
          className="mt-2 w-full rounded-xl border border-leather-600 py-3 font-semibold text-leather-600 active:scale-[0.99] transition"
        >
          Browse Saint Library
        </button>
      </div>

      {/* Card 5, Daily Mass Readings (external: Universalis) */}
      <div className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
        <h3 className="font-display text-lg font-semibold text-leather-900">
          Daily Mass Readings
        </h3>
        <p className="mt-2 text-sm text-stone-500">
          Pray with Catholics around the world through today’s Mass readings.
        </p>
        <a
          href="https://universalis.com/mass.htm"
          target="_blank"
          rel="noreferrer"
          className="mt-4 block w-full text-center rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
        >
          Open Today’s Readings
        </a>
      </div>

      {/* Journey Members */}
      {members.length > 0 && (
        <div className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
            Journey Members
          </h3>
          <div className="space-y-2">
            {members.map((m) => {
              const done = isComplete(completions, nextDay, m.completion_id);
              return (
                <div key={m.completion_id} className="flex items-center gap-2">
                  {done ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-500 text-white text-sm">
                      ✓
                    </span>
                  ) : (
                    <span className="h-6 w-6 rounded-full border-2 border-stone-300" />
                  )}
                  <span className="text-sm font-medium text-leather-900">
                    {m.display_name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* My progress overall */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-stone-500 mb-1">
          <span>My Progress</span>
          <span>
            {completedCount}/{TOTAL_DAYS}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-parchment-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-leather-600 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
