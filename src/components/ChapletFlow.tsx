import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Prayer } from '../data/prayers';
import { rosaryOpeningVerse, decadePrayerVerse } from '../data/rosaryContent';
import { SacredPrayer, SacredPrayerLabel } from './SacredPrayer';

// Guided Divine Mercy Chaplet, mirroring the Rosary / Novena experience:
// About -> Begin -> Opening prayers -> five decades (large bead + ten small
// beads) -> Closing. The prayer texts come from the chaplet's own sections and
// the shared opening-prayer verses, so no wording is invented here.

const prayerCard =
  'rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-7 mb-4 shadow-sm';
const primaryBtn =
  'w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition';
const secondaryBtn =
  'w-full rounded-xl bg-white border border-parchment-200 py-3 font-semibold text-leather-900 active:scale-[0.99] transition';

const sectionBody = (prayer: Prayer, pattern: RegExp): string =>
  (prayer.sections ?? []).find((s) => pattern.test(s.heading))?.body ?? '';

export default function ChapletFlow({ prayer }: { prayer: Prayer }) {
  const navigate = useNavigate();

  const eternalFather = sectionBody(prayer, /large bead/i);
  const sorrowfulPassion = sectionBody(prayer, /small beads/i);
  const holyGod = sectionBody(prayer, /conclude/i);

  // 0 = About, 1 = Opening prayers, 2..6 = Decades 1..5, 7 = Closing.
  const [step, setStep] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const Header = ({ label, title }: { label?: string; title: string }) => (
    <header className="mb-7 text-center">
      {label && (
        <p className="text-xs uppercase tracking-[0.2em] text-leather-400">
          {label}
        </p>
      )}
      <h1 className="font-display text-3xl font-bold text-leather-900 leading-tight mt-1">
        {title}
      </h1>
      <div
        className="mt-4 flex items-center justify-center gap-3"
        aria-hidden="true"
      >
        <span className="h-px w-10 bg-gold/50" />
        <span className="text-gold text-[0.5rem] leading-none">&#9670;</span>
        <span className="h-px w-10 bg-gold/50" />
      </div>
    </header>
  );

  const backTo = (target: number | 'exit') => (
    <button
      onClick={() => (target === 'exit' ? navigate(-1) : setStep(target))}
      className="text-leather-600 font-medium mb-6"
    >
      ← Back
    </button>
  );

  // ---- About ----
  if (step === 0) {
    return (
      <div className="max-w-md mx-auto px-5 pt-6 pb-12">
        {backTo('exit')}
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold text-leather-900 leading-tight">
            {prayer.title}
          </h1>
          <div
            className="mt-4 flex items-center justify-center gap-3"
            aria-hidden="true"
          >
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

        <button className={primaryBtn} onClick={() => setStep(1)}>
          Begin this Chaplet
        </button>
      </div>
    );
  }

  // ---- Opening prayers ----
  if (step === 1) {
    return (
      <div className="max-w-md mx-auto px-5 pt-6 pb-12">
        {backTo(0)}
        <Header title="Begin the Chaplet" />

        <section className={prayerCard}>
          <SacredPrayerLabel>Sign of the Cross</SacredPrayerLabel>
          <SacredPrayer text={rosaryOpeningVerse.signOfCross} />
        </section>
        <section className={prayerCard}>
          <SacredPrayerLabel>Our Father</SacredPrayerLabel>
          <SacredPrayer text={decadePrayerVerse.ourFather} />
        </section>
        <section className={prayerCard}>
          <SacredPrayerLabel>Hail Mary</SacredPrayerLabel>
          <SacredPrayer text={decadePrayerVerse.hailMary} />
        </section>
        <section className={prayerCard + ' mb-6'}>
          <SacredPrayerLabel>Apostles&rsquo; Creed</SacredPrayerLabel>
          <SacredPrayer text={rosaryOpeningVerse.apostlesCreed} />
        </section>

        <div className="flex gap-3">
          <button className={secondaryBtn} onClick={() => setStep(0)}>
            ← About
          </button>
          <button className={primaryBtn} onClick={() => setStep(2)}>
            Begin the decades →
          </button>
        </div>
      </div>
    );
  }

  // ---- Decades 1..5 ----
  if (step >= 2 && step <= 6) {
    const decade = step - 1;
    return (
      <div className="max-w-md mx-auto px-5 pt-6 pb-12">
        {backTo(step - 1)}
        <Header label={`Decade ${decade} of 5`} title="Divine Mercy" />

        <section className={prayerCard}>
          <SacredPrayerLabel>On the large bead</SacredPrayerLabel>
          <SacredPrayer text={eternalFather} />
        </section>
        <section className={prayerCard + ' mb-6'}>
          <SacredPrayerLabel>On the ten small beads</SacredPrayerLabel>
          <SacredPrayer text={sorrowfulPassion} />
          <p className="mt-7 text-center text-sm text-leather-600">
            Pray this prayer ten times, once on each of the small beads.
          </p>
        </section>

        <div className="flex gap-3">
          <button className={secondaryBtn} onClick={() => setStep(step - 1)}>
            ← {decade === 1 ? 'Opening' : 'Previous'}
          </button>
          <button className={primaryBtn} onClick={() => setStep(step + 1)}>
            {decade < 5 ? 'Next decade →' : 'Closing →'}
          </button>
        </div>
      </div>
    );
  }

  // ---- Closing ----
  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-12">
      {backTo(6)}
      <Header title="Closing" />

      <section className={prayerCard + ' mb-6'}>
        <SacredPrayerLabel>Conclude</SacredPrayerLabel>
        <SacredPrayer text={holyGod} />
        <p className="mt-7 text-center text-sm text-leather-600">
          Pray this prayer three times.
        </p>
      </section>

      <div className="flex gap-3">
        <button className={secondaryBtn} onClick={() => setStep(6)}>
          ← Back
        </button>
        <button className={primaryBtn} onClick={() => navigate('/prayer')}>
          Finish
        </button>
      </div>
    </div>
  );
}
