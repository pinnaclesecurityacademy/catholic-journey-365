import { useEffect, useState, useCallback, useLayoutEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getReadingDay } from '../data/readingPlan';
import { getCompletions, markComplete, markIncomplete } from '../lib/completions';
import { useAccount } from '../lib/account';
import { CompletionRecord } from '../lib/supabase';
import { SacredCard } from '../components/SacredCard';

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
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement | null>(null);
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

  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      let parent = pageRef.current?.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        if (/(auto|scroll|overlay)/.test(style.overflowY)) {
          parent.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
        parent = parent.parentElement;
      }
    };

    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    const timer = window.setTimeout(resetScroll, 0);
    const settledTimer = window.setTimeout(resetScroll, 50);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.clearTimeout(settledTimer);
    };
  }, [location.pathname, dayNumber]);

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
    <div ref={pageRef} className="max-w-md mx-auto px-5 pt-6">
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

      {/* Read Scripture */}
      <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
        <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
          Read Scripture
        </h2>
        <p className="text-leather-900 leading-relaxed mb-4">
          Read today's passages in the in-app Bible reader.
        </p>
        <button
          onClick={() => navigate(`/bible/reading/${day.day_number}`)}
          className="inline-block rounded-xl bg-leather-600 text-white font-semibold px-5 py-3 active:scale-[0.99] transition"
        >
          Begin Reading
        </button>
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
          if (done) {
            return (
              <SacredCard className="relative overflow-hidden p-0">
                <img
                  src="/images/hero/church-home.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-32 w-full object-cover"
                />
                <div className="relative bg-gradient-to-br from-white via-parchment-50 to-white p-5 text-center">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 bg-gold/15 text-lg font-semibold text-leather-600 shadow-[0_10px_24px_rgba(212,169,106,0.18)]">
                    &#10013;
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                    Today's journey is complete
                  </p>
                  <p className="mt-4 font-display text-2xl font-semibold leading-snug text-leather-900">
                    &ldquo;Go and announce the Gospel of the Lord.&rdquo;
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-leather-600">
                    Thanks be to God.
                  </p>

                  <div className="mt-5 space-y-3">
                    <button
                      onClick={() => navigate('/')}
                      className="w-full rounded-xl bg-gold py-3 font-semibold text-leather-900 shadow-[0_12px_24px_rgba(212,169,106,0.18)] transition active:scale-[0.99]"
                    >
                      Back to Today
                    </button>
                    <button
                      disabled={saving}
                      onClick={() => handleToggle(true)}
                      className="w-full rounded-xl border border-parchment-200 bg-white/70 py-3 text-sm font-semibold text-leather-600 transition active:scale-[0.99] disabled:opacity-60"
                    >
                      {saving ? 'Saving...' : 'Mark Incomplete'}
                    </button>
                  </div>
                </div>
              </SacredCard>
            );
          }

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
