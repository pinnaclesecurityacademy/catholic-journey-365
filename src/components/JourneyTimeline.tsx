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
};

const JOURNEY_STAGES: JourneyStage[] = [
  { label: 'Creation', startDay: 1 },
  { label: 'Early World', startDay: 3 },
  { label: 'Fathers of Faith', startDay: 6 },
  { label: 'Egypt & Exodus', startDay: 27 },
  { label: 'Desert Wanderings', startDay: 52 },
  { label: 'Promised Land', startDay: 81 },
  { label: 'Judges', startDay: 99 },
  { label: 'Royal Kingdom', startDay: 106 },
  { label: 'Divided Kingdom', startDay: 162 },
  { label: 'Exile', startDay: 184 },
  { label: 'Return', startDay: 267 },
  { label: 'Maccabean Revolt', startDay: 282 },
  { label: 'Messianic Fulfilment', startDay: 313 },
  { label: 'The Church', startDay: 322 },
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

      <div
        aria-label="Scripture journey stages"
        className="mt-4 overflow-x-auto px-5 pb-5"
      >
        <ol className="relative flex min-w-max gap-3 pb-1">
          <span
            aria-hidden="true"
            className="absolute left-6 right-6 top-5 h-px bg-gradient-to-r from-gold/70 via-parchment-200 to-parchment-200"
          />
          {JOURNEY_STAGES.map((stage, index) => {
            const state = getStageState(index, currentDay);
            const isCompleted = state === 'completed';
            const isCurrent = state === 'current';

            return (
              <li key={stage.label} className="relative w-24 shrink-0">
                <div className="flex flex-col items-center text-center">
                  <span
                    className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold shadow-[0_8px_18px_rgba(74,55,40,0.08)] ${
                      isCompleted
                        ? 'border-gold bg-gold text-leather-900'
                        : isCurrent
                          ? 'border-gold bg-white text-leather-900 ring-4 ring-gold/20'
                          : 'border-parchment-200 bg-parchment-50 text-stone-400'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`mt-2 text-[11px] font-semibold leading-snug ${
                      isCompleted || isCurrent
                        ? 'text-leather-900'
                        : 'text-stone-400'
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
    </SacredCard>
  );
}
