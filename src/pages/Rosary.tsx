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
type Step =
  | 'start'
  | 'opening'
  | 'mysteries'
  | 'decades'
  | 'guided'
  | 'finish'
  | 'complete';

type ExpandablePrayerCardProps = {
  title: string;
  text: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
};

type GuidedRosaryItem = {
  key: string;
  title: string;
  text: string;
  phase: 'Opening' | 'Mystery' | 'Closing';
  positionLabel: string;
  segmentKey: string;
  rowIndex: number;
  rowTotal: number;
  mysteryTitle?: string;
  mysteryNumber?: number;
  artwork?: string;
  reflection?: string;
  scripture?: string;
};

// Standard daily rhythm of the Rosary mysteries (0 = Sunday … 6 = Saturday).
const TODAYS_MYSTERY_BY_DAY = [
  'glorious', // Sunday
  'joyful', // Monday
  'sorrowful', // Tuesday
  'glorious', // Wednesday
  'luminous', // Thursday
  'sorrowful', // Friday
  'joyful', // Saturday
];

function getTodaysMysteryId(date = new Date()): string {
  return TODAYS_MYSTERY_BY_DAY[date.getDay()];
}

// Gentle haptic feedback to mirror the feel of moving through real beads.
// Silently does nothing where the Vibration API is unavailable (e.g. iOS).
function vibrate(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* ignore unsupported */
    }
  }
}

type RosaryHapticStep = 'normal' | 'ourFather' | 'decade';

// Subtle haptic cue keyed to the kind of bead the user is moving to.
// Fails silently when the Vibration API is unavailable.
function triggerRosaryHaptic(stepType: RosaryHapticStep) {
  if (stepType === 'ourFather') {
    vibrate(90); // larger bead, stronger pulse
  } else if (stepType === 'decade') {
    vibrate([120, 80, 120]); // decade change / completion
  } else {
    vibrate(50); // normal bead movement
  }
}

function hapticStepForItem(item: GuidedRosaryItem): RosaryHapticStep {
  if (item.title === 'Our Father') return 'ourFather';
  return 'normal';
}

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

function buildGuidedRosaryItems(group: NonNullable<ReturnType<typeof getMysteryGroup>>) {
  const items: GuidedRosaryItem[] = [
    {
      key: 'opening-sign',
      title: 'Sign of the Cross',
      text: rosaryOpeningVerse.signOfCross,
      phase: 'Opening',
      positionLabel: 'Opening prayer 1 of 5',
      segmentKey: 'opening',
      rowIndex: 1,
      rowTotal: 5,
    },
    {
      key: 'opening-creed',
      title: "Apostles' Creed",
      text: rosaryOpeningVerse.apostlesCreed,
      phase: 'Opening',
      positionLabel: 'Opening prayer 2 of 5',
      segmentKey: 'opening',
      rowIndex: 2,
      rowTotal: 5,
    },
    {
      key: 'opening-our-father',
      title: 'Our Father',
      text: decadePrayerVerse.ourFather,
      phase: 'Opening',
      positionLabel: 'Opening prayer 3 of 7',
      segmentKey: 'opening',
      rowIndex: 3,
      rowTotal: 7,
    },
    {
      key: 'opening-hail-mary-1',
      title: 'Hail Mary',
      text: decadePrayerVerse.hailMary,
      phase: 'Opening',
      positionLabel: 'Hail Mary 1 of 3',
      segmentKey: 'opening',
      rowIndex: 4,
      rowTotal: 7,
    },
    {
      key: 'opening-hail-mary-2',
      title: 'Hail Mary',
      text: decadePrayerVerse.hailMary,
      phase: 'Opening',
      positionLabel: 'Hail Mary 2 of 3',
      segmentKey: 'opening',
      rowIndex: 5,
      rowTotal: 7,
    },
    {
      key: 'opening-hail-mary-3',
      title: 'Hail Mary',
      text: decadePrayerVerse.hailMary,
      phase: 'Opening',
      positionLabel: 'Hail Mary 3 of 3',
      segmentKey: 'opening',
      rowIndex: 6,
      rowTotal: 7,
    },
    {
      key: 'opening-glory-be',
      title: 'Glory Be',
      text: decadePrayerVerse.gloryBe,
      phase: 'Opening',
      positionLabel: 'Opening prayer 7 of 7',
      segmentKey: 'opening',
      rowIndex: 7,
      rowTotal: 7,
    },
  ];

  group.mysteries.forEach((mysteryItem, mysteryIndex) => {
    const mysteryNumber = mysteryIndex + 1;
    const segmentKey = `mystery-${mysteryNumber}`;
    const sharedMystery = {
      mysteryTitle: mysteryItem.title,
      mysteryNumber,
      artwork: mysteryArtwork[mysteryItem.title],
      reflection: `${mysteryItem.whatHappened} ${mysteryItem.meditate}`,
      scripture: mysteryItem.scripture,
    };

    items.push({
      key: `${segmentKey}-our-father`,
      title: 'Our Father',
      text: decadePrayerVerse.ourFather,
      phase: 'Mystery',
      positionLabel: `Mystery ${mysteryNumber}, opening bead`,
      segmentKey,
      rowIndex: 1,
      rowTotal: 13,
      ...sharedMystery,
    });

    for (let bead = 1; bead <= 10; bead += 1) {
      items.push({
        key: `${segmentKey}-hail-mary-${bead}`,
        title: 'Hail Mary',
        text: decadePrayerVerse.hailMary,
        phase: 'Mystery',
        positionLabel: `Bead ${bead} of 10`,
        segmentKey,
        rowIndex: bead + 1,
        rowTotal: 13,
        ...sharedMystery,
      });
    }

    items.push(
      {
        key: `${segmentKey}-glory-be`,
        title: 'Glory Be',
        text: decadePrayerVerse.gloryBe,
        phase: 'Mystery',
        positionLabel: `Mystery ${mysteryNumber}, Glory Be`,
        segmentKey,
        rowIndex: 12,
        rowTotal: 13,
        ...sharedMystery,
      },
      {
        key: `${segmentKey}-fatima`,
        title: 'Fatima Prayer',
        text: decadePrayerVerse.fatima,
        phase: 'Mystery',
        positionLabel: `Mystery ${mysteryNumber}, Fatima Prayer`,
        segmentKey,
        rowIndex: 13,
        rowTotal: 13,
        ...sharedMystery,
      }
    );
  });

  items.push(
    {
      key: 'closing-hail-holy-queen',
      title: 'Hail, Holy Queen',
      text: rosaryClosingVerse.hailHolyQueen,
      phase: 'Closing',
      positionLabel: 'Closing prayer 1 of 2',
      segmentKey: 'closing',
      rowIndex: 1,
      rowTotal: 2,
    },
    {
      key: 'closing-final',
      title: 'Final Prayer',
      text: rosaryClosingVerse.finalPrayer,
      phase: 'Closing',
      positionLabel: 'Closing prayer 2 of 2',
      segmentKey: 'closing',
      rowIndex: 2,
      rowTotal: 2,
    }
  );

  return items;
}

export default function Rosary() {
  const { mystery } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('start');
  const [selectedMystery, setSelectedMystery] = useState<string>(mystery ?? '');
  const [decade, setDecade] = useState(1);
  const [guidedIndex, setGuidedIndex] = useState(0);
  const contentStartRef = useRef<HTMLDivElement>(null);
  const mysteryTopRef = useRef<HTMLDivElement>(null);
  const beadsRef = useRef<HTMLDivElement>(null);
  const previousGuidedItemRef = useRef<GuidedRosaryItem | null>(null);

  // Land at the top for guide sections, but keep guided bead movement anchored
  // around the mystery or bead tracker so prayer does not feel interrupted.
  useEffect(() => {
    if (step !== 'guided') {
      previousGuidedItemRef.current = null;
      scrollToContentStart(contentStartRef.current);
      return;
    }

    const group = getMysteryGroup(selectedMystery);
    if (!group) return;

    const guidedItems = buildGuidedRosaryItems(group);
    const currentItem = guidedItems[guidedIndex] ?? guidedItems[0];
    const previousItem = previousGuidedItemRef.current;
    const startsNewMystery =
      currentItem.phase === 'Mystery' &&
      currentItem.rowIndex === 1 &&
      currentItem.segmentKey !== previousItem?.segmentKey;
    const target = startsNewMystery
      ? mysteryTopRef.current
      : beadsRef.current ?? contentStartRef.current;

    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });

    previousGuidedItemRef.current = currentItem;
  }, [step, decade, selectedMystery, guidedIndex]);

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

  const beginGuidedPrayer = () => {
    if (!selectedMystery) {
      setStep('mysteries');
      return;
    }

    setGuidedIndex(0);
    setStep('guided');
  };

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
        <button className={primaryBtn} onClick={beginGuidedPrayer}>
          Begin Prayer
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
        {(() => {
          const todayId = getTodaysMysteryId();
          const todayGroup = getMysteryGroup(todayId);
          if (!todayGroup) return null;
          return (
            <button
              onClick={() => {
                setSelectedMystery(todayId);
                setDecade(1);
                setGuidedIndex(0);
                setStep('guided');
              }}
              className="mb-4 w-full rounded-xl border border-gold/50 bg-gradient-to-br from-parchment-50 to-parchment-100 p-4 text-left shadow-[0_12px_28px_rgba(74,55,40,0.1)] active:scale-[0.99] transition"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Today's Mysteries
              </p>
              <h2 className="mt-1 font-display text-lg font-semibold text-leather-900">
                {todayGroup.title}
              </h2>
            </button>
          );
        })()}
        <div className="space-y-3">
          {mysteryGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedMystery(g.id);
                setDecade(1);
                setGuidedIndex(0);
                setStep('guided');
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

  // ---- Guided Rosary: interactive bead tracker ----
  if (step === 'guided') {
    const group = getMysteryGroup(selectedMystery);

    if (!group) {
      return (
        <Shell>
          <header className="mb-6">
            <h1 className="font-display text-3xl font-bold text-leather-900">
              Choose the Mysteries
            </h1>
            <p className="mt-2 text-stone-500">
              Select a set of mysteries to begin the guided Rosary.
            </p>
          </header>
          <button className={primaryBtn} onClick={() => setStep('mysteries')}>
            Choose Mysteries
          </button>
        </Shell>
      );
    }

    const guidedItems = buildGuidedRosaryItems(group);
    const currentItem = guidedItems[guidedIndex] ?? guidedItems[0];
    const completedCount = Math.min(guidedIndex + 1, guidedItems.length);

    const jumpToBead = (rowIndex: number) => {
      const nextIndex = guidedItems.findIndex(
        (item) =>
          item.segmentKey === currentItem.segmentKey && item.rowIndex === rowIndex
      );

      if (nextIndex >= 0) {
        setGuidedIndex(nextIndex);
      }
    };

    const goToPreviousBead = () => {
      if (guidedIndex === 0) return;
      triggerRosaryHaptic(hapticStepForItem(guidedItems[guidedIndex - 1]));
      setGuidedIndex((index) => Math.max(0, index - 1));
    };

    const goToNextBead = () => {
      // A decade is completed when leaving the Fatima Prayer of a mystery.
      const decadeCompleted =
        currentItem.phase === 'Mystery' && currentItem.title === 'Fatima Prayer';

      if (guidedIndex >= guidedItems.length - 1) {
        triggerRosaryHaptic('decade');
        setStep('complete');
        return;
      }

      const nextItem = guidedItems[guidedIndex + 1];
      triggerRosaryHaptic(
        decadeCompleted ? 'decade' : hapticStepForItem(nextItem)
      );

      setGuidedIndex((index) => index + 1);
    };

    // Tap anywhere on the prayer screen to advance, so the Rosary can be prayed
    // with eyes closed. Taps on interactive controls are ignored so buttons,
    // links, beads, and the prayer toggle keep their own behaviour.
    const handleScreenTap = (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      if (
        target.closest(
          'button, a, input, select, textarea, label, [role="button"]'
        )
      ) {
        return;
      }
      goToNextBead();
    };

    return (
      <Shell>
        <div onClick={handleScreenTap}>
        <header className="mb-5">
          <p className="text-xs uppercase tracking-widest text-stone-400">
            Guided Rosary
          </p>
          <h1 className="font-display text-3xl font-bold text-leather-900 mt-1">
            {group.title}
          </h1>
          <p className="mt-1 text-sm text-leather-600">
            Prayer {completedCount} of {guidedItems.length}
          </p>
        </header>

        <div ref={mysteryTopRef}>
          <section className="rounded-2xl border border-gold/40 bg-parchment-100 p-3 mb-4 shadow-sm">
            {currentItem.artwork && currentItem.mysteryTitle ? (
              <img
                src={currentItem.artwork}
                alt={`${currentItem.mysteryTitle} artwork`}
                loading="lazy"
                decoding="async"
                className="max-h-[320px] w-full rounded-xl object-contain shadow-sm"
              />
            ) : (
              <div className="rounded-xl border border-gold/30 bg-white/70 px-4 py-8 text-center shadow-sm">
                <p className="text-xs uppercase tracking-widest text-stone-400">
                  {currentItem.phase}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-leather-900">
                  {currentItem.phase === 'Opening'
                    ? 'Opening Prayers'
                    : 'Closing Prayers'}
                </p>
              </div>
            )}
          </section>

          {currentItem.mysteryTitle && (
            <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Mystery {currentItem.mysteryNumber} of 5
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold text-leather-900">
                {currentItem.mysteryTitle}
              </h2>
              {currentItem.reflection && (
                <p className="mt-3 text-sm leading-relaxed text-leather-900">
                  {currentItem.reflection}
                </p>
              )}
              {currentItem.scripture && (
                <p className="mt-2 text-sm font-semibold text-leather-600">
                  {currentItem.scripture}
                </p>
              )}
            </section>
          )}
        </div>

        <section
          ref={beadsRef}
          className="scroll-mt-4 rounded-2xl bg-white border border-parchment-200 p-5 mb-4 shadow-[0_12px_32px_rgba(74,55,40,0.08)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Current Prayer
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-leather-900">
                {currentItem.title}
              </h2>
              <p className="mt-1 text-sm font-semibold text-leather-600">
                {currentItem.positionLabel}
              </p>
            </div>
            <span className="rounded-full bg-parchment-100 px-3 py-1 text-xs font-semibold text-leather-600">
              {currentItem.phase}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {Array.from({ length: currentItem.rowTotal }, (_, index) => {
              const beadNumber = index + 1;
              const isCurrent = beadNumber === currentItem.rowIndex;
              const isCompleted = beadNumber < currentItem.rowIndex;
              const isSignOfCross =
                currentItem.segmentKey === 'opening' && beadNumber === 1;
              const beadLabel =
                currentItem.segmentKey === 'opening'
                  ? `Opening prayer ${beadNumber}`
                  : currentItem.segmentKey === 'closing'
                    ? `Closing prayer ${beadNumber}`
                    : `Mystery ${currentItem.mysteryNumber} bead ${beadNumber}`;

              return (
                <button
                  key={beadNumber}
                  type="button"
                  onClick={() => jumpToBead(beadNumber)}
                  aria-label={beadLabel}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`flex items-center justify-center border transition-all duration-300 ease-out ${
                    isCurrent
                      ? 'scale-125 border-leather-700 bg-leather-600 text-white shadow-[0_0_0_4px_rgba(212,169,106,0.2)]'
                      : isCompleted
                        ? 'border-gold bg-gold text-leather-900'
                        : 'border-parchment-300 bg-parchment-100 text-leather-500'
                  } ${
                    isSignOfCross
                      ? 'h-6 w-6 rounded-full text-base font-semibold leading-none'
                      : 'h-4 w-4 rounded-full'
                  }`}
                >
                  {isSignOfCross ? '+' : null}
                </button>
              );
            })}
          </div>
        </section>

        <ExpandablePrayerCard
          key={currentItem.key}
          title={currentItem.title}
          text={currentItem.text}
          defaultOpen
          className="mb-5"
        />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            className={secondaryBtn}
            onClick={goToPreviousBead}
            disabled={guidedIndex === 0}
          >
            Previous
          </button>
          <button className={primaryBtn} onClick={goToNextBead}>
            {guidedIndex >= guidedItems.length - 1 ? 'Finish Rosary' : 'Next Bead'}
          </button>
        </div>
        {/* TEMPORARY: vibration test buttons. Remove after testing. */}
        <div className="mb-3 space-y-2">
          <button
            type="button"
            className={secondaryBtn}
            onClick={() => vibrate(100)}
          >
            Test light vibration
          </button>
          <button
            type="button"
            className={secondaryBtn}
            onClick={() => vibrate([80, 60, 80])}
          >
            Test double vibration
          </button>
          <button
            type="button"
            className={secondaryBtn}
            onClick={() => vibrate([120, 80, 120])}
          >
            Test strong vibration
          </button>
        </div>

        <button className={secondaryBtn + ' mb-6'} onClick={() => setStep('complete')}>
          Finish Rosary
        </button>
        </div>
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

  // ---- Completion ----
  if (step === 'complete') {
    return (
      <Shell>
        <section className="rounded-[1.75rem] border border-gold/40 bg-gradient-to-br from-parchment-50 via-white to-parchment-100 px-5 py-8 text-center shadow-[0_18px_42px_rgba(74,55,40,0.12)]">
          <p className="text-xs uppercase tracking-widest text-stone-400">
            Prayer Complete
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-leather-900">
            Rosary Completed
          </h1>
          <p className="mt-4 font-display text-2xl leading-relaxed text-leather-900">
            Mary, lead me closer to your Son.
          </p>
        </section>

        <div className="mt-6 space-y-3">
          <button
            className={primaryBtn}
            onClick={() => {
              setGuidedIndex(0);
              setStep(selectedMystery ? 'guided' : 'mysteries');
            }}
          >
            Pray Again
          </button>
          <button className={secondaryBtn} onClick={() => navigate('/prayer')}>
            Return to Prayer
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
