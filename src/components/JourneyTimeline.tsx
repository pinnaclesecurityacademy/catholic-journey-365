import { SacredCard } from './SacredCard';

type JourneyTimelineProps = {
  currentDay: number;
  totalDays: number;
  period: string;
  progressPercent: number;
};

export default function JourneyTimeline({
  currentDay,
  totalDays,
  period,
  progressPercent,
}: JourneyTimelineProps) {
  return (
    <SacredCard className="mb-4">
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

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-parchment-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-leather-600 to-gold transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </SacredCard>
  );
}
