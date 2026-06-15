import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BibleReader } from '../components/BibleReader';
import { getReadingDay } from '../data/readingPlan';
import { getBook, getReadingSteps, loadChapter, BibleChapter } from '../data/bible';
import { markComplete } from '../lib/completions';
import { useAccount } from '../lib/account';

// Scripture reading flow (route: /bible/reading/:day).
//
// Steps through a Journey day's actual readings one chapter at a time
// (Reading -> Next Reading -> ... -> Complete), reusing the existing chapter
// loader and BibleReader display. Readings come straight from the existing
// 365-day Bible Journey plan; this file does not define or replace that plan.

function BibleFooter() {
  return (
    <p className="mt-8 text-center text-xs text-stone-400 leading-relaxed">
      Scripture from the World English Bible, Catholic Edition (WEBC). Public
      Domain.
    </p>
  );
}

export default function ScriptureReading() {
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNum = Number(day);
  const journeyDay = getReadingDay(dayNum);
  const steps = journeyDay ? getReadingSteps(journeyDay) : [];

  const { completionId } = useAccount();

  const [stepIndex, setStepIndex] = useState(0);
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const finished = stepIndex >= steps.length;
  const step = steps[stepIndex];
  const book = step ? getBook(step.bookId) : undefined;
  const isLast = stepIndex === steps.length - 1;

  // Lazily load only the current step's chapter.
  useEffect(() => {
    let active = true;
    if (!step) return;
    setLoading(true);
    window.scrollTo(0, 0);
    loadChapter(step.bookId, step.chapter).then((result) => {
      if (!active) return;
      setChapter(result);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [step]);

  useEffect(() => {
    if (finished) window.scrollTo(0, 0);
  }, [finished]);

  // Advance to the next reading. On the final reading, mark this Journey day
  // complete using the same completion logic as the Day page, then show the
  // completion screen.
  const handleAdvance = async () => {
    if (saving) return;
    if (isLast && completionId && journeyDay) {
      setSaving(true);
      try {
        await markComplete(completionId, journeyDay.day_number);
      } finally {
        setSaving(false);
      }
    }
    setStepIndex((i) => i + 1);
  };

  if (!journeyDay || steps.length === 0) {
    return (
      <div className="max-w-md mx-auto px-5 pt-6 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="text-leather-600 font-medium mb-6"
        >
          ← Back
        </button>
        <section className="rounded-2xl bg-white border border-parchment-200 p-5">
          <p className="text-leather-900 leading-relaxed">
            This reading could not be found.
          </p>
        </section>
      </div>
    );
  }

  // Finish screen.
  if (finished) {
    return (
      <div className="max-w-md mx-auto px-5 pt-6 pb-12">
        <header className="mb-6 text-center pt-6">
          <p className="text-xs uppercase tracking-widest text-stone-400">
            Day {journeyDay.day_number}
          </p>
          <h1 className="font-display text-4xl font-bold text-leather-600 leading-tight mt-2">
            Scripture Reading Complete
          </h1>
        </header>

        <div className="space-y-3 mt-8">
          <button
            onClick={() => navigate(`/day/${journeyDay.day_number}/deeper`)}
            className="w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
          >
            Dive Deeper →
          </button>
          <button
            onClick={() => navigate('/journey')}
            className="w-full rounded-xl bg-white border border-parchment-200 py-3 font-semibold text-leather-600 active:scale-[0.99] transition"
          >
            Return to Journey
          </button>
        </div>

        <BibleFooter />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="text-leather-600 font-medium mb-6"
      >
        ← Back
      </button>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          Day {journeyDay.day_number} · Reading {stepIndex + 1} of{' '}
          {steps.length}
        </p>
        <h1 className="font-display text-4xl font-bold text-leather-600 leading-tight mt-1">
          Scripture Reading
        </h1>
      </header>

      {loading ? (
        <section className="rounded-2xl bg-white border border-parchment-200 p-6">
          <p className="text-leather-900 leading-relaxed italic">Loading…</p>
        </section>
      ) : book ? (
        <BibleReader book={book} chapter={chapter} />
      ) : null}

      <div className="mt-6">
        <button
          onClick={handleAdvance}
          disabled={saving}
          className="w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition disabled:opacity-70"
        >
          {isLast
            ? saving
              ? 'Saving…'
              : 'Finish Reading & Mark Complete'
            : 'Next Reading'}
        </button>
      </div>

      <BibleFooter />
    </div>
  );
}
