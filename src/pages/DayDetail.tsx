import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReadingDay } from '../data/readingPlan';
import { getCompletions, markComplete, markIncomplete } from '../lib/completions';
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

export default function DayDetail() {
  const { dayNumber } = useParams();
  const navigate = useNavigate();
  const dayNum = Number(dayNumber);
  const day = getReadingDay(dayNum);

  const { completionId, members } = useAccount();
  const uid = completionId ?? '';
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(() => {
    getCompletions(dayNum)
      .then(setCompletions)
      .catch(() => setCompletions([]));
  }, [dayNum]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!day) {
    return (
      <div className="max-w-md mx-auto px-5 pt-10 text-center">
        <p className="text-stone-500">That day could not be found.</p>
        <button
          onClick={() => navigate('/journey')}
          className="mt-4 text-leather-600 font-medium"
        >
          Back to Journey
        </button>
      </div>
    );
  }

  const handleToggle = async (done: boolean) => {
    if (done) {
      const ok = window.confirm('Mark this day as incomplete?');
      if (!ok) return;
    }
    setSaving(true);
    try {
      if (done) {
        await markIncomplete(uid, day.day_number);
      } else {
        await markComplete(uid, day.day_number);
      }
      refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 pt-6">
      <button
        onClick={() => navigate(-1)}
        className="text-leather-600 font-medium mb-4"
      >
        ← Back
      </button>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          {day.period}
        </p>
        <h1 className="font-display text-5xl font-bold text-leather-600 leading-none mt-1">
          Day {day.day_number}
        </h1>
      </header>

      {/* Readings */}
      <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
          Readings
        </h2>
        <ul className="space-y-1 text-leather-900">
          <li>{day.reading_one}</li>
          {day.reading_two && <li>{day.reading_two}</li>}
          {day.psalm_proverb && <li>{day.psalm_proverb}</li>}
        </ul>
        <button
          onClick={() => navigate(`/bible/reading/${day.day_number}`)}
          className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
        >
          Read Scripture
        </button>
      </section>

      {/* What Happens Today */}
      <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
        <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
          What Happens Today?
        </h2>
        <p className="text-leather-900 leading-relaxed">{day.summary}</p>
      </section>

      {/* Think About */}
      <section className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mb-5">
        <h2 className="font-display text-xl font-semibold text-leather-600 mb-2">
          Think About
        </h2>
        <p className="text-leather-900 leading-relaxed italic">
          {day.think_about_question}
        </p>
      </section>

      {/* Listen, use a verified episode_link if present, otherwise a
          YouTube search for the matching official Bible in a Year episode. */}
      <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
        <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
          Listen
        </h2>
        <a
          href={
            day.episode_link ||
            `https://www.youtube.com/results?search_query=${encodeURIComponent(
              `Bible in a Year Fr Mike Schmitz Day ${day.day_number}`
            )}`
          }
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-xl bg-leather-600 text-white font-semibold px-4 py-3"
        >
          ▶ Listen with Fr. Mike
        </a>
      </section>

      {/* Dive Deeper, invitation card linking to its own page */}
      <section className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mb-5">
        <h2 className="font-display text-xl font-semibold text-leather-600 mb-2">
          Dive Deeper
        </h2>
        <p className="text-leather-900 leading-relaxed mb-4">
          Understand the history, connections, and meaning behind today's
          Scripture.
        </p>
        <button
          onClick={() => navigate(`/day/${day.day_number}/deeper`)}
          className="inline-block rounded-xl bg-leather-600 text-white font-semibold px-5 py-3 active:scale-[0.99] transition"
        >
          Go Deeper →
        </button>
      </section>

      {/* My Progress */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
          My Progress
        </h2>
        {(() => {
          const done = isComplete(completions, day.day_number, uid);
          return (
            <button
              disabled={saving}
              onClick={() => handleToggle(done)}
              className={`w-full rounded-xl py-3 font-semibold border transition active:scale-[0.99] ${
                done
                  ? 'bg-sage-500 text-white border-sage-500'
                  : 'bg-leather-600 text-white border-leather-600'
              }`}
            >
              {saving ? 'Saving…' : done ? '✓ Completed' : 'Mark Complete'}
            </button>
          );
        })()}
      </section>

      {/* Journey Members */}
      {members.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
            Journey Members
          </h2>
          <div className="rounded-2xl bg-white border border-parchment-200 p-5 space-y-2">
            {members.map((m) => {
              const mdone = isComplete(
                completions,
                day.day_number,
                m.completion_id
              );
              return (
                <div key={m.completion_id} className="flex items-center gap-2">
                  {mdone ? (
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
        </section>
      )}
    </div>
  );
}
