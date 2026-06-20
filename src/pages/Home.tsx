import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { readingPlan, getReadingDay } from '../data/readingPlan';
import { TOTAL_DAYS } from '../config/journey';
import { getAllCompletions } from '../lib/completions';
import { useAccount } from '../lib/account';
import { CompletionRecord } from '../lib/supabase';
import { SacredCard } from '../components/SacredCard';

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
  { id: 'glorious', label: 'Glorious Mysteries' },
  { id: 'joyful', label: 'Joyful Mysteries' },
  { id: 'sorrowful', label: 'Sorrowful Mysteries' },
  { id: 'glorious', label: 'Glorious Mysteries' },
  { id: 'luminous', label: 'Luminous Mysteries' },
  { id: 'sorrowful', label: 'Sorrowful Mysteries' },
  { id: 'joyful', label: 'Joyful Mysteries' },
];

function TodayCardArtwork({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="mb-4 aspect-video w-full rounded-xl border border-gold/25 object-cover shadow-[0_10px_24px_rgba(74,55,40,0.12)]"
    />
  );
}

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
        <div className="absolute inset-0 bg-gradient-to-b from-leather-900/30 via-leather-900/58 to-leather-900/95" />
        <div className="relative px-5 pb-5 pt-28">
          <p className="text-sm font-medium tracking-wide text-parchment-100/90">
            Peace be with you, {profile?.display_name}
          </p>
          <p className="text-xs uppercase tracking-widest text-gold">
            Faith Journey
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight">
            Today&rsquo;s Faith Journey
          </h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-parchment-100/85">
            Begin with prayer, walk with Scripture, and end the day with God.
          </p>
          <button
            type="button"
            onClick={() => navigate('/journey/faith')}
            className="mt-6 w-full rounded-xl bg-gold py-3 font-semibold text-leather-900 shadow-[0_12px_24px_rgba(212,169,106,0.24)] transition active:scale-[0.99]"
          >
            Continue Faith Journey
          </button>
        </div>
      </section>

      <button
        onClick={() => navigate(`/day/${day.day_number}`)}
        className="relative mb-4 block w-full overflow-hidden rounded-[1.75rem] bg-leather-900 text-left text-white shadow-[0_16px_40px_rgba(74,55,40,0.16)] transition active:scale-[0.99]"
      >
        <img
          src="/images/journey/christ-connections.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-leather-900/35 via-leather-900/72 to-leather-900/95" />
        <div className="relative p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold">
                Scripture Journey
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-parchment-50">
                Day {day.day_number} of {TOTAL_DAYS}
              </h2>
              <p className="mt-1 text-sm text-parchment-100/80">
                {day.period}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-parchment-50">
              {doneToday ? 'Completed' : 'Awaiting'}
            </span>
          </div>
          <ul className="mt-4 space-y-1 text-sm font-medium text-parchment-50">
            <li>{day.reading_one}</li>
            {day.reading_two && <li>{day.reading_two}</li>}
            {day.psalm_proverb && <li>{day.psalm_proverb}</li>}
          </ul>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-parchment-100/75">
              <span>{completedCount}/{TOTAL_DAYS}</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-parchment-100/25">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-parchment-100"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-gold py-3 text-center font-semibold text-leather-900">
            Continue Reading
          </div>
        </div>
      </button>

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <TodayCardArtwork
          src="/images/today/rosary-today.webp"
          alt="Mary praying with a rosary"
        />
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
        <TodayCardArtwork
          src="/images/today/saint-today.webp"
          alt="Saints gathered in prayer"
        />
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

      <SacredCard className="mb-4">
        <TodayCardArtwork
          src="/images/today/mass-readings.webp"
          alt="Open Mass readings on a church altar"
        />
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
        <TodayCardArtwork
          src="/images/today/daily-prayer.webp"
          alt="A woman praying in a chapel"
        />
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
