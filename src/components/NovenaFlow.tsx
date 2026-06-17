import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Prayer } from '../data/prayers';
import { SacredPrayer, SacredPrayerLabel } from './SacredPrayer';
import { scrollToContentStart } from '../lib/scroll';

// A reusable novena experience: an intro page, then nine days presented one at
// a time (About → Begin Novena → Day 1 … Day 9 → Finish Novena). Built to work
// for any prayer flagged `isNovena`, so future novenas reuse the same pattern.
//
// Each day's body is stored as "<reflection>\n\nPrayer\n<prayer text>"; the
// reflection is shown as prose and the prayer in the shared Sacred Prayer style.

function splitDay(body: string): { reflection: string; prayer: string | null } {
  const match = body.match(/^([\s\S]*?)\n+Prayer\n([\s\S]*)$/);
  if (!match) return { reflection: body.trim(), prayer: null };
  return { reflection: match[1].trim(), prayer: match[2].trim() };
}

export default function NovenaFlow({ prayer }: { prayer: Prayer }) {
  const navigate = useNavigate();
  const sections = prayer.sections ?? [];
  const about = sections.find((s) => !/^Day\s/i.test(s.heading));
  const days = sections.filter((s) => /^Day\s/i.test(s.heading));

  // -1 = About page; 0..days.length-1 = a specific day.
  const [index, setIndex] = useState(-1);
  const contentStartRef = useRef<HTMLElement>(null);

  useEffect(() => {
    scrollToContentStart(contentStartRef.current);
  }, [index]);

  const primaryBtn =
    'w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition';
  const secondaryBtn =
    'w-full rounded-xl bg-white border border-parchment-200 py-3 font-semibold text-leather-900 active:scale-[0.99] transition';

  // ---- About this Novena ----
  if (index === -1) {
    return (
      <div className="max-w-md mx-auto px-5 pt-6 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="text-leather-600 font-medium mb-6"
        >
          ← Back
        </button>

        <header ref={contentStartRef} className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold text-leather-900 leading-tight">
            {prayer.title}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-gold/50" />
            <span className="text-gold text-[0.5rem] leading-none">&#9670;</span>
            <span className="h-px w-10 bg-gold/50" />
          </div>
        </header>

        {about && (
          <section className="rounded-2xl bg-parchment-100 border border-gold/40 px-5 py-5 mb-6">
            <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
              {about.heading}
            </h2>
            <p className="text-leather-900 leading-relaxed whitespace-pre-line">
              {about.body}
            </p>
          </section>
        )}

        <button className={primaryBtn} onClick={() => setIndex(0)}>
          Begin Novena
        </button>
      </div>
    );
  }

  // ---- A single day ----
  const day = days[index];
  const { reflection, prayer: prayerText } = splitDay(day.body);
  const isLast = index === days.length - 1;

  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-12">
      <button
        onClick={() => setIndex(index - 1 < 0 ? -1 : index - 1)}
        className="text-leather-600 font-medium mb-6"
      >
        ← Back
      </button>

      <header ref={contentStartRef} className="mb-7 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-leather-400">
          Day {index + 1} of {days.length}
        </p>
        <h1 className="font-display text-3xl font-bold text-leather-900 leading-tight mt-1">
          {day.heading.replace(/^Day\s*\d+\s*[·:.-]?\s*/i, '')}
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-10 bg-gold/50" />
          <span className="text-gold text-[0.5rem] leading-none">&#9670;</span>
          <span className="h-px w-10 bg-gold/50" />
        </div>
      </header>

      {reflection && (
        <section className="rounded-2xl bg-white border border-parchment-200 px-5 py-5 mb-5">
          <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
            Reflection
          </h2>
          <p className="text-leather-900 leading-relaxed whitespace-pre-line">
            {reflection}
          </p>
        </section>
      )}

      {prayerText && (
        <section className="rounded-2xl bg-parchment-50 border border-parchment-200 px-6 py-8 mb-7 shadow-sm">
          <SacredPrayerLabel>Prayer</SacredPrayerLabel>
          <SacredPrayer text={prayerText} />
        </section>
      )}

      <div className="flex gap-3">
        <button
          className={secondaryBtn}
          onClick={() => setIndex(index - 1 < 0 ? -1 : index - 1)}
        >
          ← {index === 0 ? 'About' : 'Previous'}
        </button>
        {isLast ? (
          <button className={primaryBtn} onClick={() => navigate('/prayer')}>
            Finish Novena
          </button>
        ) : (
          <button className={primaryBtn} onClick={() => setIndex(index + 1)}>
            Next Day →
          </button>
        )}
      </div>
    </div>
  );
}
