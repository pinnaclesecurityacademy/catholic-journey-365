import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { readingPlan, getReadingDay } from '../data/readingPlan';
import { TOTAL_DAYS } from '../config/journey';
import { getAllCompletions } from '../lib/completions';
import { useAccount } from '../lib/account';
import { CompletionRecord } from '../lib/supabase';
import { SacredCard, SacredProgress } from '../components/SacredCard';
import JourneyTimeline from '../components/JourneyTimeline';

function isComplete(
  records: CompletionRecord[],
  dayNumber: number,
  userId: string
): boolean {
  return records.some(
    (r) => r.day_number === dayNumber && r.user_id === userId && r.completed
  );
}

// Traditional Rosary mysteries by weekday (0 = Sunday through 6 = Saturday).
const ROSARY_BY_DAY = [
  { id: 'glorious', label: 'Glorious Mysteries' }, // Sunday
  { id: 'joyful', label: 'Joyful Mysteries' }, // Monday
  { id: 'sorrowful', label: 'Sorrowful Mysteries' }, // Tuesday
  { id: 'glorious', label: 'Glorious Mysteries' }, // Wednesday
  { id: 'luminous', label: 'Luminous Mysteries' }, // Thursday
  { id: 'sorrowful', label: 'Sorrowful Mysteries' }, // Friday
  { id: 'joyful', label: 'Joyful Mysteries' }, // Saturday
];

function getHeroImageSrc(hour = new Date().getHours()) {
  if (hour >= 5 && hour < 12) return '/images/hero/morning-prayer.webp';
  if (hour >= 12 && hour < 18) return '/images/hero/journey-with-christ.webp';
  return '/images/hero/church-home.webp';
}

export default function Home() {
  const navigate = useNavigate();
  const { profile, completionId, members } = useAccount();
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);
  const [heroImageSrc, setHeroImageSrc] = useState(getHeroImageSrc);

  useEffect(() => {
    getAllCompletions()
      .then(setCompletions)
      .catch(() => setCompletions([]));
  }, []);

  useEffect(() => {
    const updateHero = () => setHeroImageSrc(getHeroImageSrc());
    updateHero();
    const timer = window.setInterval(updateHero, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const uid = completionId ?? '';

  // Next reading = first day this user has not yet completed (actual progress).
  const nextDay =
    readingPlan.find((d) => !isComplete(completions, d.day_number, uid))
      ?.day_number ?? TOTAL_DAYS;
  const day = getReadingDay(nextDay) ?? readingPlan[0];

  const doneToday = isComplete(completions, nextDay, uid);

  const completedCount = readingPlan.filter((d) =>
    isComplete(completions, d.day_number, uid)
  ).length;
  const progressPct = Math.round((completedCount / TOTAL_DAYS) * 100);

  const todayRosary = ROSARY_BY_DAY[new Date().getDay()];

  return (
    <div className="mx-auto max-w-md px-4 pt-5 pb-6">
      <section className="relative mb-4 overflow-hidden rounded-[1.75rem] bg-leather-900 text-white shadow-[0_24px_56px_rgba(28,25,23,0.24)]">
        <img
          src={heroImageSrc}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-leather-900/35 via-leather-900/60 to-leather-900/95" />
        <div className="relative px-5 pb-5 pt-24">
          <p className="text-sm font-medium tracking-wide text-parchment-100/90">
            Peace be with you, {profile?.display_name}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight">
            Catholic Journey 365
          </h1>

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">
                  Bible Journey
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-widest text-parchment-100/75">
                    Day
                  </span>
                  <span className="font-display text-4xl font-bold leading-none">
                    {day.day_number}
                  </span>
                </div>
              </div>
              <span className="max-w-[45%] text-right font-display text-sm leading-tight text-parchment-100/80">
                {day.period}
              </span>
            </div>

            <p className="mt-2 text-xs italic text-parchment-100/75">
              Your pilgrimage through Scripture
            </p>

            <ul className="mt-4 space-y-1 text-sm font-medium text-parchment-50">
              <li>{day.reading_one}</li>
              {day.reading_two && <li>{day.reading_two}</li>}
              {day.psalm_proverb && <li>{day.psalm_proverb}</li>}
            </ul>

            <div className="mt-4 flex items-center gap-2">
              {doneToday ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage-500 text-xs text-white">
                  &#10003;
                </span>
              ) : (
                <span className="h-5 w-5 rounded-full border-2 border-parchment-100/70" />
              )}
              <span className="text-xs font-semibold text-parchment-100">
                {doneToday ? 'Completed' : "Today's reading awaits"}
              </span>
            </div>

            <button
              onClick={() => navigate(`/day/${day.day_number}`)}
              className="mt-4 w-full rounded-xl bg-gold py-3 font-semibold text-leather-900 shadow-[0_12px_24px_rgba(212,169,106,0.24)] transition active:scale-[0.99]"
            >
              Continue Your Journey
            </button>
          </div>
        </div>
      </section>

      <div className="mb-4">
        <SacredProgress
          label="My Progress"
          value={`${completedCount}/${TOTAL_DAYS}`}
          percent={progressPct}
        />
      </div>

      <JourneyTimeline
        currentDay={day.day_number}
        totalDays={TOTAL_DAYS}
        period={day.period}
        progressPercent={progressPct}
      />

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-sm text-stone-500">Today's Rosary</p>
        <h3 className="mt-1 font-display text-xl font-semibold text-leather-900">
          {todayRosary.label}
        </h3>
        <button
          onClick={() => navigate(`/rosary/${todayRosary.id}`)}
          className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
        >
          Pray Rosary
        </button>
      </SacredCard>

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <h3 className="font-display text-lg font-semibold text-leather-900">
          Saint of the Day
        </h3>
        <p className="mt-2 text-sm text-stone-500">
          Learn from those who followed Christ before us.
        </p>
        <button
          onClick={() => navigate('/saint')}
          className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
        >
          Meet Today's Saint
        </button>
      </SacredCard>

      {/* Card 5, Daily Mass Readings (external: Universalis) */}
      <SacredCard className="mb-4">
        <h3 className="font-display text-lg font-semibold text-leather-900">
          Daily Mass Readings
        </h3>
        <p className="mt-2 text-sm text-stone-500">
          Pray with Catholics around the world through today's Mass readings.
        </p>
        <a
          href="https://universalis.com/mass.htm"
          target="_blank"
          rel="noreferrer"
          className="mt-4 block w-full rounded-xl bg-leather-600 py-3 text-center font-semibold text-white transition active:scale-[0.99]"
        >
          Open Today's Readings
        </a>
      </SacredCard>

      {/* Journey Members */}
      {members.length > 0 && (
        <SacredCard className="mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
            Journey Members
          </h3>
          <div className="space-y-2">
            {members.map((m) => {
              const done = isComplete(completions, nextDay, m.completion_id);
              return (
                <div key={m.completion_id} className="flex items-center gap-2">
                  {done ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-500 text-white text-sm">
                      &#10003;
                    </span>
                  ) : (
                    <span className="h-6 w-6 rounded-full border-2 border-stone-300" />
                  )}
                  <span className="text-sm font-medium text-leather-900">
                    {m.display_name}
                  </span>
                </div>
              );
            })}
          </div>
        </SacredCard>
      )}

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          Daily Prayer
        </p>
        <p className="mt-3 text-center italic text-leather-900 leading-loose whitespace-pre-line">
          {day.daily_prayer}
        </p>
        <p className="mt-5 border-t border-parchment-200 pt-4 text-center font-display text-lg font-semibold leading-relaxed text-leather-900">
          &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;
        </p>
      </SacredCard>
    </div>
  );
}
