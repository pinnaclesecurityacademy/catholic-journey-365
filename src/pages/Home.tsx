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

function RhythmIcon({ type }: { type: 'morning' | 'formation' | 'evening' }) {
  const paths = {
    morning: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3.5v2M12 18.5v2M4.5 12h2M17.5 12h2M6.7 6.7l1.4 1.4M15.9 15.9l1.4 1.4M17.3 6.7l-1.4 1.4M8.1 15.9l-1.4 1.4" />
      </>
    ),
    formation: (
      <>
        <path d="M6.5 5.5h7a4 4 0 0 1 4 4v9h-7a4 4 0 0 1-4-4z" />
        <path d="M10 9h4M10 12h4" />
      </>
    ),
    evening: (
      <>
        <path d="M17.5 15.5A6.5 6.5 0 0 1 8.5 6.5 7 7 0 1 0 17.5 15.5z" />
        <path d="M18 5.5h2M19 4.5v2" />
      </>
    ),
  };

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-parchment-50 text-leather-600">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 fill-none stroke-current stroke-[1.8]"
      >
        {paths[type]}
      </svg>
    </span>
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
            Scripture Journey
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight">
            Day {day.day_number} of {TOTAL_DAYS}
          </h1>
          <div className="mt-3 rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur-sm">
            <p className="font-display text-xl font-semibold leading-tight text-parchment-50">
              {day.period}
            </p>
            <ul className="mt-2 space-y-1 text-sm font-medium text-parchment-100/90">
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
          </div>
          <button
            type="button"
            onClick={() => navigate(`/day/${day.day_number}`)}
            className="mt-6 w-full rounded-xl bg-gold py-3 font-semibold text-leather-900 shadow-[0_12px_24px_rgba(212,169,106,0.24)] transition active:scale-[0.99]"
          >
            Continue Scripture Journey
          </button>
        </div>
      </section>

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-sm leading-relaxed text-stone-500">
          Add prayer and reflection when you are ready.
        </p>
        <div className="mt-4 grid gap-3">
          <div className="flex items-center gap-3">
            <RhythmIcon type="morning" />
            <span className="text-sm font-semibold text-leather-900">
              Morning Prayer
            </span>
          </div>
          <div className="flex items-center gap-3">
            <RhythmIcon type="formation" />
            <span className="text-sm font-semibold text-leather-900">
              Faith Formation
            </span>
          </div>
          <div className="flex items-center gap-3">
            <RhythmIcon type="evening" />
            <span className="text-sm font-semibold text-leather-900">
              Evening Reflection
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/journey/faith')}
          className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
        >
          Continue Today&rsquo;s Rhythm
        </button>
      </SacredCard>

      {doneToday && (
        <div className="mb-4 rounded-2xl border border-gold/30 bg-parchment-50 px-4 py-3 text-sm font-semibold text-leather-700">
          Scripture Journey completed for today
        </div>
      )}

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
