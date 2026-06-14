import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReadingDay } from '../data/readingPlan';
import { diveDeeperParagraphs } from '../data/diveDeeper';

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

  // Land at the top when opening the reflection.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dayNum]);

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

  const paragraphs = diveDeeperParagraphs(day.day_number);

  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="text-leather-600 font-medium mb-6"
      >
        ← Back
      </button>

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

      {/* Future-ready: audio reflection, biblical artwork, and maps will live
          here below the reflection. Intentionally not implemented yet. */}
    </div>
  );
}
