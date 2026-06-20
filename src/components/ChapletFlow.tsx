import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Prayer } from '../data/prayers';
import { rosaryOpeningVerse, decadePrayerVerse } from '../data/rosaryContent';
import { SacredPrayer, SacredPrayerLabel } from './SacredPrayer';
import { scrollToContentStart } from '../lib/scroll';

type ChapletStep = 'about' | 'guided' | 'complete';

type ChapletItem = {
  key: string;
  title: string;
  text: string;
  phase: 'Opening' | 'Decade' | 'Closing';
  positionLabel: string;
  segmentKey: string;
  rowIndex: number;
  rowTotal: number;
};

const prayerCard =
  'rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-7 mb-4 shadow-sm';
const primaryBtn =
  'w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition';
const secondaryBtn =
  'w-full rounded-xl bg-white border border-parchment-200 py-3 font-semibold text-leather-900 active:scale-[0.99] transition';

const sectionBody = (prayer: Prayer, pattern: RegExp): string =>
  (prayer.sections ?? []).find((s) => pattern.test(s.heading))?.body ?? '';

function buildChapletItems(prayer: Prayer): ChapletItem[] {
  const eternalFather = sectionBody(prayer, /large bead/i);
  const sorrowfulPassion = sectionBody(prayer, /small beads/i);
  const holyGod = sectionBody(prayer, /conclude/i);
  const items: ChapletItem[] = [
    {
      key: 'opening-sign',
      title: 'Sign of the Cross',
      text: rosaryOpeningVerse.signOfCross,
      phase: 'Opening',
      positionLabel: 'Opening prayer 1 of 4',
      segmentKey: 'opening',
      rowIndex: 1,
      rowTotal: 4,
    },
    {
      key: 'opening-our-father',
      title: 'Our Father',
      text: decadePrayerVerse.ourFather,
      phase: 'Opening',
      positionLabel: 'Opening prayer 2 of 4',
      segmentKey: 'opening',
      rowIndex: 2,
      rowTotal: 4,
    },
    {
      key: 'opening-hail-mary',
      title: 'Hail Mary',
      text: decadePrayerVerse.hailMary,
      phase: 'Opening',
      positionLabel: 'Opening prayer 3 of 4',
      segmentKey: 'opening',
      rowIndex: 3,
      rowTotal: 4,
    },
    {
      key: 'opening-creed',
      title: "Apostles' Creed",
      text: rosaryOpeningVerse.apostlesCreed,
      phase: 'Opening',
      positionLabel: 'Opening prayer 4 of 4',
      segmentKey: 'opening',
      rowIndex: 4,
      rowTotal: 4,
    },
  ];

  for (let decade = 1; decade <= 5; decade += 1) {
    const segmentKey = `decade-${decade}`;
    items.push({
      key: `${segmentKey}-large`,
      title: 'Eternal Father',
      text: eternalFather,
      phase: 'Decade',
      positionLabel: `Decade ${decade}, large bead`,
      segmentKey,
      rowIndex: 1,
      rowTotal: 11,
    });

    for (let bead = 1; bead <= 10; bead += 1) {
      items.push({
        key: `${segmentKey}-small-${bead}`,
        title: 'For the sake of His sorrowful Passion',
        text: sorrowfulPassion,
        phase: 'Decade',
        positionLabel: `Decade ${decade}, small bead ${bead} of 10`,
        segmentKey,
        rowIndex: bead + 1,
        rowTotal: 11,
      });
    }
  }

  for (let repeat = 1; repeat <= 3; repeat += 1) {
    items.push({
      key: `closing-holy-god-${repeat}`,
      title: 'Holy God',
      text: holyGod,
      phase: 'Closing',
      positionLabel: `Closing prayer ${repeat} of 3`,
      segmentKey: 'closing',
      rowIndex: repeat,
      rowTotal: 3,
    });
  }

  return items;
}

export default function ChapletFlow({ prayer }: { prayer: Prayer }) {
  const navigate = useNavigate();
  const [step, setStep] = useState<ChapletStep>('about');
  const [guidedIndex, setGuidedIndex] = useState(0);
  const contentStartRef = useRef<HTMLDivElement>(null);
  const beadsRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => buildChapletItems(prayer), [prayer]);
  const currentItem = items[guidedIndex] ?? items[0];
  const progress = Math.round(((guidedIndex + 1) / items.length) * 100);

  useEffect(() => {
    if (step === 'guided') {
      beadsRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest',
      });
      return;
    }

    scrollToContentStart(contentStartRef.current);
  }, [step, guidedIndex]);

  const goPrevious = () => {
    if (guidedIndex === 0) {
      setStep('about');
      return;
    }
    setGuidedIndex((index) => index - 1);
  };

  const goNext = () => {
    if (guidedIndex >= items.length - 1) {
      setStep('complete');
      return;
    }
    setGuidedIndex((index) => index + 1);
  };

  const Shell = ({ children }: { children: ReactNode }) => (
    <div className="max-w-md mx-auto px-5 pt-6 pb-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-leather-600 font-medium mb-6"
      >
        Back
      </button>
      <div ref={contentStartRef}>{children}</div>
    </div>
  );

  if (step === 'about') {
    return (
      <Shell>
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold text-leather-900 leading-tight">
            {prayer.title}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-gold/50" />
            <span className="text-gold text-[0.5rem] leading-none">&#9670;</span>
            <span className="h-px w-10 bg-gold/50" />
          </div>
        </header>

        <section className="rounded-2xl bg-parchment-100 border border-gold/40 px-5 py-5 mb-6">
          <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
            About the Divine Mercy Chaplet
          </h2>
          {prayer.explanation && (
            <p className="text-leather-900 leading-relaxed whitespace-pre-line">
              {prayer.explanation}
            </p>
          )}
          <p className="mt-3 text-sm text-stone-500 leading-relaxed">
            The Divine Mercy devotion comes from a private revelation to Saint
            Faustina. It is treasured by the Church as a help to prayer, not
            required as an article of faith. We trust in Jesus, who alone gives
            mercy, and ask his mercy for ourselves and for the whole world.
          </p>
        </section>

        <button
          className={primaryBtn}
          onClick={() => {
            setGuidedIndex(0);
            setStep('guided');
          }}
        >
          Begin this Chaplet
        </button>
      </Shell>
    );
  }

  if (step === 'complete') {
    return (
      <Shell>
        <section className="rounded-2xl bg-parchment-50 border border-gold/40 px-5 py-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Divine Mercy Chaplet
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-leather-900">
            Prayer complete
          </h1>
          <p className="mt-4 text-leather-900 leading-relaxed">
            Jesus, I trust in you. Have mercy on us and on the whole world.
          </p>
        </section>
        <button className={primaryBtn + ' mt-5'} onClick={() => navigate('/prayer')}>
          Finish
        </button>
      </Shell>
    );
  }

  return (
    <Shell>
      <header className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-leather-400">
          {currentItem.phase}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold leading-tight text-leather-900">
          {currentItem.title}
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          {currentItem.positionLabel}
        </p>
      </header>

      <div ref={beadsRef} className="mb-5 rounded-2xl bg-white border border-parchment-200 p-4">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-stone-500">
          <span>{guidedIndex + 1} of {items.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-parchment-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-leather-600 to-gold"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 grid grid-cols-11 gap-1">
          {Array.from({ length: currentItem.rowTotal }).map((_, index) => {
            const active = index + 1 === currentItem.rowIndex;
            const complete = index + 1 < currentItem.rowIndex;
            return (
              <span
                key={index}
                className={`h-2 rounded-full ${
                  active
                    ? 'bg-gold'
                    : complete
                      ? 'bg-leather-500'
                      : 'bg-parchment-200'
                }`}
              />
            );
          })}
        </div>
      </div>

      <section className={prayerCard}>
        <SacredPrayerLabel>{currentItem.title}</SacredPrayerLabel>
        <SacredPrayer text={currentItem.text} />
      </section>

      <div className="flex gap-3">
        <button className={secondaryBtn} onClick={goPrevious}>
          Previous
        </button>
        <button className={primaryBtn} onClick={goNext}>
          {guidedIndex >= items.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </Shell>
  );
}
