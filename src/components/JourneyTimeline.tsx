import { useEffect, useRef } from 'react';
import { SacredCard } from './SacredCard';

type JourneyTimelineProps = {
  currentDay: number;
  totalDays: number;
  period: string;
  progressPercent: number;
};

type JourneyStage = {
  label: string;
  startDay: number;
  imageSrc: string;
};

const JOURNEY_STAGES: JourneyStage[] = [
  { label: 'Creation', startDay: 1, imageSrc: '/images/journey/creation.webp' },
  {
    label: 'Early World',
    startDay: 3,
    imageSrc: '/images/journey/early-world.webp',
  },
  {
    label: 'Fathers of Faith',
    startDay: 6,
    imageSrc: '/images/journey/fathers-of-faith.webp',
  },
  {
    label: 'Egypt & Exodus',
    startDay: 27,
    imageSrc: '/images/journey/egypt-exodus.webp',
  },
  {
    label: 'Desert Wanderings',
    startDay: 52,
    imageSrc: '/images/journey/desert-wanderings.webp',
  },
  {
    label: 'Promised Land',
    startDay: 81,
    imageSrc: '/images/journey/promised-land.webp',
  },
  { label: 'Judges', startDay: 99, imageSrc: '/images/journey/judges.webp' },
  {
    label: 'Royal Kingdom',
    startDay: 106,
    imageSrc: '/images/journey/royal-kingdom.webp',
  },
  {
    label: 'Divided Kingdom',
    startDay: 162,
    imageSrc: '/images/journey/divided-kingdom.webp',
  },
  { label: 'Exile', startDay: 184, imageSrc: '/images/journey/exile.webp' },
  { label: 'Return', startDay: 267, imageSrc: '/images/journey/return.webp' },
  {
    label: 'Maccabean Revolt',
    startDay: 282,
    imageSrc: '/images/journey/maccabean-revolt.webp',
  },
  {
    label: 'Christ Connections',
    startDay: 313,
    imageSrc: '/images/journey/christ-connections.webp',
  },
  {
    label: 'Messianic Fulfilment',
    startDay: 313,
    imageSrc: '/images/journey/messianic-fulfilment.webp',
  },
  { label: 'The Church', startDay: 322, imageSrc: '/images/journey/church.webp' },
];

function getStageState(index: number, currentDay: number) {
  const stage = JOURNEY_STAGES[index];
  const nextStage = JOURNEY_STAGES[index + 1];
  const isCurrent =
    currentDay >= stage.startDay &&
    (!nextStage || currentDay < nextStage.startDay);

  if (isCurrent) return 'current';
  if (currentDay >= stage.startDay) return 'completed';
  return 'upcoming';
}

export default function JourneyTimeline({
  currentDay,
  totalDays,
  period,
  progressPercent,
}: JourneyTimelineProps) {
  const currentStageRef = useRef<HTMLLIElement | null>(null);
  const hasCenteredStageRef = useRef(false);

  useEffect(() => {
    const currentStage = currentStageRef.current;
    if (!currentStage) return;

    window.requestAnimationFrame(() => {
      currentStage.scrollIntoView({
        behavior: hasCenteredStageRef.current ? 'smooth' : 'auto',
        inline: 'center',
        block: 'nearest',
      });

      hasCenteredStageRef.current = true;
    });
  }, [currentDay]);

  return (
    <SacredCard className="mb-4 overflow-hidden p-0">
      <div className="px-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-400">
              Journey Timeline
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-leather-900">
              Day {currentDay} of {totalDays}
            </h2>
            <p className="mt-1 text-sm text-leather-600">{period}</p>
          </div>
          <span className="rounded-full bg-parchment-100 px-3 py-1 text-xs font-semibold text-leather-600">
            {progressPercent}%
          </span>
        </div>
      </div>

      <div className="mx-4 mt-4 mb-5 rounded-2xl border border-parchment-200/80 bg-gradient-to-r from-parchment-50 via-white/80 to-parchment-100/70 shadow-[inset_0_1px_10px_rgba(212,169,106,0.12)]">
        <div
          aria-label="Scripture journey stages"
          className="overflow-x-auto py-4"
          style={{ paddingInline: 'max(1rem, calc(50% - 3.5rem))' }}
        >
          <ol className="relative flex min-w-max gap-3 pb-1">
            <span
              aria-hidden="true"
              className="absolute left-7 right-7 top-7 h-px bg-gradient-to-r from-gold/75 via-parchment-200 to-parchment-200"
            />
            {JOURNEY_STAGES.map((stage, index) => {
              const state = getStageState(index, currentDay);
              const isCompleted = state === 'completed';
              const isCurrent = state === 'current';

              return (
                <li
                  key={stage.label}
                  ref={isCurrent ? currentStageRef : null}
                  className="relative w-28 shrink-0"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="z-10 flex h-14 items-center justify-center">
                      <span
                        className={`flex items-center justify-center overflow-hidden rounded-full border-2 bg-parchment-50 transition ${
                          isCompleted
                            ? 'h-[3.25rem] w-[3.25rem] border-gold shadow-[0_10px_22px_rgba(212,169,106,0.18)]'
                            : isCurrent
                              ? 'h-14 w-14 border-gold shadow-[0_0_0_4px_rgba(212,169,106,0.18),0_14px_28px_rgba(124,92,62,0.22)] ring-1 ring-gold/40'
                              : 'h-[3.25rem] w-[3.25rem] border-parchment-200 opacity-60 shadow-[0_8px_18px_rgba(74,55,40,0.06)]'
                        }`}
                      >
                        <img
                          src={stage.imageSrc}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </span>
                    </div>
                    <span
                      className={`mt-2 flex min-h-8 items-start justify-center text-[11px] font-semibold leading-snug ${
                        isCompleted || isCurrent
                          ? 'text-leather-900'
                          : 'text-stone-500'
                      }`}
                    >
                      {stage.label}
                    </span>
                    {isCurrent && (
                      <span className="mt-1 text-[10px] uppercase tracking-wider text-leather-600">
                        Current
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </SacredCard>
  );
}
