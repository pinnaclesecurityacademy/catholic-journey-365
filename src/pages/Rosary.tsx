import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  rosaryEducation,
  mysteryGroups,
  getMysteryGroup,
  rosaryOpeningVerse,
  decadePrayer,
  decadePrayerVerse,
  rosaryClosingVerse,
  mysteryExcerpt,
} from '../data/rosaryContent';
import { SacredPrayer } from '../components/SacredPrayer';
import { scrollToContentStart } from '../lib/scroll';

// Guided Rosary, Christ-centred meditation. Education + opening prayers + per-mystery content.
type Step = 'start' | 'opening' | 'mysteries' | 'decades' | 'finish';

type ExpandablePrayerCardProps = {
  title: string;
  text: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const mysteryArtwork: Record<string, string> = {
  'The Annunciation': '/images/rosary/joyful-annunciation.webp',
  'The Visitation': '/images/rosary/joyful-visitation.webp',
  'The Nativity': '/images/rosary/joyful-nativity.webp',
  'The Presentation': '/images/rosary/joyful-presentation.webp',
  'The Finding in the Temple': '/images/rosary/joyful-finding-jesus-temple.webp',
  'The Baptism of Jesus': '/images/rosary/luminous-baptism.webp',
  'The Wedding at Cana': '/images/rosary/luminous-wedding-cana.webp',
  'The Proclamation of the Kingdom': '/images/rosary/luminous-proclamation-kingdom.webp',
  'The Transfiguration': '/images/rosary/luminous-transfiguration.webp',
  'The Institution of the Eucharist': '/images/rosary/luminous-institution-eucharist.webp',
  'The Agony in the Garden': '/images/rosary/sorrowful-agony-garden.webp',
  'The Scourging at the Pillar': '/images/rosary/sorrowful-scourging.webp',
  'The Crowning with Thorns': '/images/rosary/sorrowful-crowning-thorns.webp',
  'The Carrying of the Cross': '/images/rosary/sorrowful-carrying-cross.webp',
  'The Crucifixion': '/images/rosary/sorrowful-crucifixion.webp',
  'The Resurrection': '/images/rosary/glorious-resurrection.webp',
  'The Ascension': '/images/rosary/glorious-ascension.webp',
  'The Descent of the Holy Spirit': '/images/rosary/glorious-holy-spirit.webp',
  'The Assumption of Mary': '/images/rosary/glorious-assumption.webp',
  'The Coronation of Mary': '/images/rosary/glorious-coronation.webp',
};

function ExpandablePrayerCard({
  title,
  text,
  defaultOpen = false,
  children,
  className = '',
}: ExpandablePrayerCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section
      className={`rounded-2xl bg-parchment-50 border border-parchment-200 shadow-sm overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left active:scale-[0.99] transition"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-leather-500">
          {title}
        </span>
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-white/70 text-lg leading-none text-leather-600 transition ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          v
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-parchment-200 px-5 pb-7 pt-6">
          <SacredPrayer text={text} />
          {children}
        </div>
      )}
    </section>
  );
}

export default function Rosary() {
  const { mystery } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('start');
  const [selectedMystery, setSelectedMystery] = useState<string>(mystery ?? '');
  const [decade, setDecade] = useState(1);
  const contentStartRef = useRef<HTMLDivElement>(null);

  // Land at the top whenever the step or decade changes.
  useEffect(() => {
    scrollToContentStart(contentStartRef.current);
  }, [step, decade, selectedMystery]);

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-md mx-auto px-5 pt-6 min-h-screen flex flex-col">
      <button
        onClick={() => navigate('/prayer')}
        className="text-leather-600 font-medium mb-4 self-start"
      >
        ← Prayer
      </button>
      <div ref={contentStartRef} className="flex-1">
        {children}
      </div>
    </div>
  );

  const primaryBtn =
    'w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition';
  const secondaryBtn =
    'w-full rounded-xl bg-white border border-parchment-200 py-3 font-semibold text-leather-900 active:scale-[0.99] transition';

  // ---- Start: what / why / how ----
  if (step === 'start') {
    return (
      <Shell>
        <header className="mb-6">
          <h1 className="font-display text-4xl font-bold text-leather-900">
            Pray the Rosary
          </h1>
        </header>
        <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
          <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
            What is the Rosary?
          </h2>
          <p className="text-leather-900 leading-relaxed">
            {rosaryEducation.whatIsIt}
          </p>
        </section>
        <section className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mb-4">
          <h2 className="font-display text-xl font-semibold text-leather-600 mb-2">
            Why Catholics pray the Rosary
          </h2>
          <p className="text-leather-900 leading-relaxed">
            {rosaryEducation.whyPray}
          </p>
        </section>
        <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
          <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
            How to pray the Rosary
          </h2>
          <p className="text-leather-900 leading-relaxed">
            {rosaryEducation.howToPray}
          </p>
          <p className="mt-3 text-sm text-leather-600">
            We begin with the opening prayers, then pray each of the five decades.
          </p>
        </section>
        <button className={primaryBtn} onClick={() => setStep('opening')}>
          Begin
        </button>
      </Shell>
    );
  }

  // ---- Begin the Rosary: opening prayers ----
  if (step === 'opening') {
    return (
      <Shell>
        <header className="mb-6">
          <h1 className="font-display text-4xl font-bold text-leather-900">
            Begin the Rosary
          </h1>
          <p className="text-stone-500 mt-1">
            We begin by turning to God, professing our faith, and asking for
            grace, so that our prayer rests on Christ.
          </p>
        </header>

        <ExpandablePrayerCard
          title="Sign of the Cross"
          text={rosaryOpeningVerse.signOfCross}
          defaultOpen
          className="mb-4"
        />

        <ExpandablePrayerCard
          title="Apostles' Creed"
          text={rosaryOpeningVerse.apostlesCreed}
          className="mb-4"
        />

        <ExpandablePrayerCard
          title="Our Father"
          text={decadePrayerVerse.ourFather}
          className="mb-4"
        />

        <ExpandablePrayerCard
          title="Three Hail Marys"
          text={decadePrayerVerse.hailMary}
          className="mb-4"
        >
          <p className="mt-7 text-center text-sm text-leather-600">
            Pray this prayer three times, asking for an increase of faith,
            hope, and charity.
          </p>
        </ExpandablePrayerCard>

        <ExpandablePrayerCard
          title="Glory Be"
          text={decadePrayerVerse.gloryBe}
          className="mb-6"
        />

        <div className="flex gap-3 mb-6">
          <button className={secondaryBtn} onClick={() => setStep('start')}>
            ← Back
          </button>
          <button
            className={primaryBtn}
            onClick={() => setStep(selectedMystery ? 'decades' : 'mysteries')}
          >
            {selectedMystery ? 'Today’s Mysteries →' : 'Choose Mysteries →'}
          </button>
        </div>
      </Shell>
    );
  }

  // ---- Mystery selection: the four groups ----
  if (step === 'mysteries') {
    return (
      <Shell>
        <header className="mb-6">
          <h1 className="font-display text-3xl font-bold text-leather-900">
            Choose the Mysteries
          </h1>
        </header>
        <div className="space-y-3">
          {mysteryGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedMystery(g.id);
                setDecade(1);
                setStep('decades');
              }}
              className="w-full text-left rounded-xl bg-white border border-parchment-200 p-4 active:scale-[0.99] transition"
            >
              <h2 className="font-display text-lg font-semibold text-leather-900">
                {g.title}
              </h2>
              <p className="text-xs italic text-stone-400 mt-0.5">{g.days}</p>
              <p className="text-sm text-stone-500 mt-1">{g.represents}</p>
              <p className="text-sm text-leather-600 mt-1">{g.connection}</p>
            </button>
          ))}
        </div>
        <button className={secondaryBtn + ' mt-6'} onClick={() => setStep('start')}>
          ← Back
        </button>
      </Shell>
    );
  }

  // ---- Decades: one mystery per decade ----
  if (step === 'decades') {
    const group = getMysteryGroup(selectedMystery);
    const m = group?.mysteries[decade - 1];
    const artwork = m ? mysteryArtwork[m.title] : undefined;
    return (
      <Shell>
        <header className="mb-5">
          <p className="text-xs uppercase tracking-widest text-stone-400">
            {group?.title} · Decade {decade} of 5
          </p>
          <h1 className="font-display text-3xl font-bold text-leather-900 mt-1">
            {m?.title}
          </h1>
        </header>

        {m && (
          <>
            {artwork && (
              <section className="rounded-2xl bg-parchment-100 border border-gold/40 p-2 mb-4 shadow-sm overflow-hidden">
                <img
                  src={artwork}
                  alt={`${m.title} artwork`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[380px] w-full rounded-xl object-contain shadow-sm md:max-h-[420px]"
                />
              </section>
            )}

            <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
              <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
                Story
              </h2>
              <p className="text-leather-900 leading-relaxed">
                {m.whatHappened}
              </p>
              <p className="mt-3 italic text-stone-600 leading-relaxed">
                {mysteryExcerpt(m.title)}
              </p>
              <p className="mt-1 text-sm font-semibold text-leather-600">
                {m.scripture}
              </p>
            </section>
            <section className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mb-4">
              <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
                Connection to Christ
              </h2>
              <p className="text-leather-900 leading-relaxed">
                {m.connection} {m.meditate}
              </p>
            </section>

            <section className="mb-5 space-y-3">
              <ExpandablePrayerCard
                title="Our Father"
                text={decadePrayerVerse.ourFather}
                defaultOpen
              />

              <ExpandablePrayerCard
                title="Hail Mary x10"
                text={decadePrayerVerse.hailMary}
              />

              <ExpandablePrayerCard
                title="Glory Be"
                text={decadePrayerVerse.gloryBe}
              />

              <ExpandablePrayerCard
                title="Fatima Prayer"
                text={decadePrayerVerse.fatima}
              />
              <p className="mt-7 text-sm text-leather-600 text-center">
                {decadePrayer.rhythm}
              </p>
            </section>
          </>
        )}

        <div className="flex gap-3">
          <button
            className={secondaryBtn}
            onClick={() =>
              decade > 1 ? setDecade(decade - 1) : setStep('mysteries')
            }
          >
            ← {decade > 1 ? 'Previous' : 'Mysteries'}
          </button>
          <button
            className={primaryBtn}
            onClick={() =>
              decade < 5 ? setDecade(decade + 1) : setStep('finish')
            }
          >
            {decade < 5 ? 'Next decade →' : 'Closing →'}
          </button>
        </div>
      </Shell>
    );
  }

  // ---- Finish ----
  return (
    <Shell>
      <header className="mb-6">
        <h1 className="font-display text-4xl font-bold text-leather-900">
          Closing Prayers
        </h1>
        <p className="text-stone-500 mt-1">
          We entrust our prayers to God through Mary, who leads us to her Son.
        </p>
      </header>
      <ExpandablePrayerCard
        title="Hail, Holy Queen"
        text={rosaryClosingVerse.hailHolyQueen}
        defaultOpen
        className="mb-4"
      />
      <ExpandablePrayerCard
        title="Final Prayer"
        text={rosaryClosingVerse.finalPrayer}
        className="mb-5"
      />
      <button className={primaryBtn} onClick={() => navigate('/prayer')}>
        Finish
      </button>
    </Shell>
  );
}
