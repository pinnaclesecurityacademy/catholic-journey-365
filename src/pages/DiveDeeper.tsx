import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReadingDay } from '../data/readingPlan';
import { diveDeeperParagraphs } from '../data/diveDeeper';
import {
  DIVE_DEEPER_ITEM,
  readFaithJourneyChecks,
  writeFaithJourneyChecks,
} from '../lib/faithJourney';
import { useReaderFont, readerFontClass } from '../lib/readerFont';
import { ReaderFontControl } from '../components/ReaderFontControl';

// Dedicated Dive Deeper page (route: /day/:dayNumber/deeper).
// Displays the existing flowing Catholic reflection for the day. Content comes
// straight from diveDeeper.ts, nothing here rewrites or generates reflections.
//
// Future-ready (intentionally NOT implemented yet): this page leaves room below
// the reflection for an audio reflection, biblical artwork, and maps.

export default function DiveDeeper() {
  const { dayNumber } = useParams();
  const navigate = useNavigate();
  const dayNum = Number(dayNumber);
  const day = getReadingDay(dayNum);
  const { size, setSize } = useReaderFont();
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(() => {
    setCompleted(readFaithJourneyChecks().includes(DIVE_DEEPER_ITEM));
  }, []);

  // Land at the top when opening the reflection.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dayNum]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!day) {
    return (
      <div className="max-w-md mx-auto px-5 pt-10 text-center">
        <p className="text-stone-500">That day could not be found.</p>
        <button
          onClick={() => navigate('/journey/scripture')}
          className="mt-4 text-leather-600 font-medium"
        >
          Back to Journey
        </button>
      </div>
    );
  }

  const paragraphs = diveDeeperParagraphs(day.day_number);

  const completeDiveDeeper = () => {
    setSaving(true);
    try {
      const checks = readFaithJourneyChecks();
      if (!checks.includes(DIVE_DEEPER_ITEM)) {
        writeFaithJourneyChecks([...checks, DIVE_DEEPER_ITEM]);
      }
      refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto px-5 pt-6 pb-12 ${readerFontClass(size)}`}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-leather-600 font-medium"
        >
          ← Back
        </button>
        <ReaderFontControl size={size} setSize={setSize} />
      </div>

      {/* Day number + reading references */}
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          Day {day.day_number}
        </p>
        <h1 className="font-display text-4xl font-bold text-leather-600 leading-tight mt-1">
          Dive Deeper
        </h1>
        <p className="text-sm text-leather-900 mt-3">
          {[day.reading_one, day.reading_two, day.psalm_proverb]
            .filter(Boolean)
            .join('  ·  ')}
        </p>
      </header>

      {/* The reflection, flowing paragraphs, reverent and readable */}
      <article className="rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-6 space-y-4 shadow-sm">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-leather-900 leading-relaxed">
            {p}
          </p>
        ))}
      </article>

      <div className="mt-5">
        {completed ? (
          <div className="w-full rounded-xl border border-gold/30 bg-parchment-50 py-3 text-center font-semibold text-leather-700">
            &#10003; Dive Deeper Completed
          </div>
        ) : (
          <button
            type="button"
            disabled={saving}
            onClick={completeDiveDeeper}
            className="w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99] disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Complete Dive Deeper'}
          </button>
        )}
      </div>

      {/* Future-ready: audio reflection, biblical artwork, and maps will live
          here below the reflection. Intentionally not implemented yet. */}
    </div>
  );
}
