import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BibleReader } from '../components/BibleReader';
import { getBook, loadChapter, BibleChapter } from '../data/bible';

// "Begin Scripture Reading" flow (route: /bible/reading/:day).
//
// UX prototype for the Bible Journey reading experience. It steps through a
// day's readings one chapter at a time (Reading -> Next -> ... -> Finish),
// reusing the existing chapter loader and BibleReader display.
//
// Only Day 1 and Day 2 are wired here, using the real Catholic Journey 365
// readings for those days. This is intentionally a prototype before all 365
// days are connected; it does not define or replace the journey plan.

interface ReadingStep {
  bookId: string;
  chapter: number;
}

// Real Day 1 / Day 2 readings, expanded to one chapter per step.
const PROTOTYPE_DAYS: Record<string, { label: string; steps: ReadingStep[] }> = {
  '1': {
    label: 'Day 1',
    steps: [
      { bookId: 'genesis', chapter: 1 }, // Genesis 1-2
      { bookId: 'genesis', chapter: 2 },
      { bookId: 'psalms', chapter: 19 }, // Psalm 19
    ],
  },
  '2': {
    label: 'Day 2',
    steps: [
      { bookId: 'genesis', chapter: 3 }, // Genesis 3-4
      { bookId: 'genesis', chapter: 4 },
      { bookId: 'psalms', chapter: 104 }, // Psalm 104
    ],
  },
};

export default function ScriptureReading() {
  const navigate = useNavigate();
  const { day } = useParams();
  const plan = PROTOTYPE_DAYS[day ?? ''];

  const [stepIndex, setStepIndex] = useState(0);
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(true);

  const step = plan?.steps[stepIndex];
  const book = step ? getBook(step.bookId) : undefined;
  const isLast = plan ? stepIndex === plan.steps.length - 1 : true;

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

  if (!plan) {
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
            This reading is not available in the prototype yet.
          </p>
        </section>
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
          {plan.label} · Reading {stepIndex + 1} of {plan.steps.length}
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
        {isLast ? (
          <button
            onClick={() => navigate('/bible')}
            className="w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={() => setStepIndex((i) => i + 1)}
            className="w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
          >
            Next Reading
          </button>
        )}
      </div>
    </div>
  );
}
