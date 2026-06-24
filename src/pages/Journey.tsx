import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { readingPlan } from '../data/readingPlan';
import { getDailyFormation } from '../data/dailyFormation';
import { TOTAL_DAYS } from '../config/journey';
import { getAllCompletions } from '../lib/completions';
import { useAccount, Member } from '../lib/account';
import { CompletionRecord, ReadingDay } from '../lib/supabase';
import {
  DIVE_DEEPER_ITEM,
  SAINT_OF_DAY_ITEM,
  FAITH_JOURNEY_ITEMS,
  PERSONAL_PRAYER_ITEM,
  SCRIPTURE_READING_ITEM,
  SeeingGodReflection,
  getRotatingEveningPrayer,
  getRotatingMorningPrayer,
  mergeFaithJourneyChecks,
  readSeeingGodReflection,
  readFaithJourneyChecks,
  writeSeeingGodReflection,
  writeFaithJourneyChecks,
} from '../lib/faithJourney';
import {
  SacredCard,
  sacredButtonCardClassName,
} from '../components/SacredCard';
import JourneyTimeline from '../components/JourneyTimeline';
import { SacredPrayer } from '../components/SacredPrayer';
import { useReaderFont, readerFontClass } from '../lib/readerFont';
import { ReaderFontControl } from '../components/ReaderFontControl';

function isComplete(
  records: CompletionRecord[],
  dayNumber: number,
  userId: string
): boolean {
  return records.some(
    (r) => r.day_number === dayNumber && r.user_id === userId && r.completed
  );
}

function wasCompletedToday(record: CompletionRecord, userId: string): boolean {
  if (!record.completed || record.user_id !== userId || !record.completed_at) {
    return false;
  }

  const completedAt = new Date(record.completed_at);
  const today = new Date();
  return (
    completedAt.getFullYear() === today.getFullYear() &&
    completedAt.getMonth() === today.getMonth() &&
    completedAt.getDate() === today.getDate()
  );
}

// A day is group-complete when every journey member has completed it.
function groupComplete(
  records: CompletionRecord[],
  dayNumber: number,
  members: Member[]
): boolean {
  if (members.length === 0) return false;
  return members.every((m) =>
    isComplete(records, dayNumber, m.completion_id)
  );
}

function Dot({ done }: { done: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
        done
          ? 'border border-gold bg-gold text-leather-900'
          : 'border border-stone-300 text-stone-400'
      }`}
    >
      {done ? '\u2713' : ''}
    </span>
  );
}

function CheckDot({ done }: { done: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
        done
          ? 'bg-sage-500 text-white'
          : 'border-2 border-parchment-200 bg-white text-stone-400'
      }`}
    >
      {done ? '\u2713' : ''}
    </span>
  );
}

// Strip the chapter/verse from a reading reference to leave the book name.
function bookName(ref: string): string {
  if (!ref) return '';
  return ref.replace(/\s+\d.*$/, '').trim();
}

interface Period {
  name: string;
  start: number;
  end: number;
  days: ReadingDay[];
  books: string;
}

function periodIconSrc(period: Period): string {
  if (period.name === 'Creation & Covenant') {
    return period.start === 1
      ? '/images/journey/creation.webp'
      : '/images/journey/early-world.webp';
  }
  if (period.name === 'Fathers of Faith') {
    return '/images/journey/fathers-of-faith.webp';
  }
  if (period.name === 'Deliverance & Freedom') {
    return '/images/journey/egypt-exodus.webp';
  }
  if (period.name === 'The Wilderness Journey') {
    return '/images/journey/desert-wanderings.webp';
  }
  if (period.name === 'The Promised Land') {
    return '/images/journey/promised-land.webp';
  }
  if (period.name === 'Christ Connection') {
    return '/images/journey/christ-connections.webp';
  }
  if (period.name === 'Kings & the Kingdom') {
    return '/images/journey/royal-kingdom.webp';
  }
  if (period.name === 'Division & the Prophets') {
    return '/images/journey/divided-kingdom.webp';
  }
  if (period.name === 'Exile & Hope') {
    return '/images/journey/exile.webp';
  }
  if (period.name === 'Coming Home') {
    return '/images/journey/return.webp';
  }
  if (period.name === 'Faith & Courage') {
    return '/images/journey/maccabean-revolt.webp';
  }
  if (period.name === 'Christ the Messiah') {
    return '/images/journey/messianic-fulfilment.webp';
  }
  if (period.name === 'The Early Church') {
    return '/images/journey/church.webp';
  }
  return '/images/journey/judges.webp';
}

// Group the reading plan into contiguous Bible Timeline periods.
function buildPeriods(): Period[] {
  const periods: Period[] = [];
  for (const day of readingPlan) {
    const last = periods[periods.length - 1];
    if (!last || last.name !== day.period) {
      periods.push({
        name: day.period,
        start: day.day_number,
        end: day.day_number,
        days: [day],
        books: '',
      });
    } else {
      last.end = day.day_number;
      last.days.push(day);
    }
  }
  for (const p of periods) {
    const seen: string[] = [];
    for (const d of p.days) {
      for (const ref of [d.reading_one, d.reading_two]) {
        const b = bookName(ref);
        if (b && !seen.includes(b)) seen.push(b);
      }
    }
    p.books =
      seen.slice(0, 3).join(' / ') + (seen.length > 3 ? ' ...' : '');
  }
  return periods;
}

function JourneyHubIcon({ type }: { type: 'scripture' | 'rhythm' | 'marian' }) {
  const paths = {
    scripture: (
      <>
        <path d="M6.5 5.5h7a4 4 0 0 1 4 4v9h-7a4 4 0 0 1-4-4z" />
        <path d="M10 9h4M10 12h4" />
      </>
    ),
    rhythm: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3.5v2M12 18.5v2M4.5 12h2M17.5 12h2M6.7 6.7l1.4 1.4M15.9 15.9l1.4 1.4M17.3 6.7l-1.4 1.4M8.1 15.9l-1.4 1.4" />
      </>
    ),
    marian: (
      <>
        <path d="M12 4.5c2.8 2.4 4.2 5 4.2 7.8 0 3.1-1.8 5.7-4.2 7.2-2.4-1.5-4.2-4.1-4.2-7.2 0-2.8 1.4-5.4 4.2-7.8z" />
        <path d="M9.2 12.5h5.6M12 9.7v5.6" />
      </>
    ),
  };

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-parchment-50 text-leather-600">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 fill-none stroke-current stroke-[1.8]"
      >
        {paths[type]}
      </svg>
    </span>
  );
}

function JourneyHub({
  scriptureDay,
  scriptureProgress,
  faithDone,
  faithTotal,
  onOpenScripture,
  onOpenFaith,
}: {
  scriptureDay: number;
  scriptureProgress: number;
  faithDone: number;
  faithTotal: number;
  onOpenScripture: () => void;
  onOpenFaith: () => void;
}) {
  return (
    <div className="mx-auto max-w-md px-4 pt-5 pb-6">
      <header className="mb-5 rounded-[1.75rem] border border-parchment-200 bg-gradient-to-br from-white to-parchment-50 px-5 py-6 shadow-[0_18px_42px_rgba(74,55,40,0.09)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          Catholic Journey 365
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-leather-900">
          Your Journey
        </h1>
        <p className="mt-3 font-display text-xl font-semibold leading-snug text-leather-700">
          Walk with Christ one day at a time.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone-500">
          Track your progress through Scripture, prayer, and Catholic formation.
        </p>
      </header>

      <div className="space-y-4">
        <button
          onClick={onOpenScripture}
          className="block w-full rounded-[1.5rem] border border-parchment-200 bg-white p-5 text-left shadow-[0_14px_34px_rgba(74,55,40,0.08)] transition active:scale-[0.99]"
        >
          <div className="flex items-start gap-4">
            <JourneyHubIcon type="scripture" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Active Journey
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-leather-900">
                Scripture Journey
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Continue the 365 day walk through Scripture with readings, Dive
                Deeper, progress, and your shared journey.
              </p>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs font-semibold text-stone-500">
                  <span>Day {scriptureDay} of {TOTAL_DAYS}</span>
                  <span>{scriptureProgress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-parchment-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-leather-600 to-gold"
                    style={{ width: `${scriptureProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </button>

        <SacredCard className="bg-gradient-to-br from-white to-parchment-50 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 gap-4">
              <JourneyHubIcon type="rhythm" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Today&apos;s Rhythm
                </p>
                <h2 className="mt-1 font-display text-xl font-bold text-leather-900">
                  Prayer and Reflection
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  Add morning prayer, formation, and evening reflection when you
                  are ready.
                </p>
              </div>
            </div>
            <span className="rounded-full border border-parchment-200 bg-white px-3 py-1 text-xs font-semibold text-leather-600">
              {faithDone}/{faithTotal}
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenFaith}
            className="mt-4 w-full rounded-xl bg-leather-600 py-3 text-sm font-semibold text-white transition active:scale-[0.99]"
          >
            Continue Today&apos;s Rhythm
          </button>
        </SacredCard>

        <SacredCard className="bg-white/75 p-5 opacity-85">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 gap-4">
              <JourneyHubIcon type="marian" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Marian Journey
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-leather-900">
                  90 Days with Mary
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  Coming Soon
                </p>
              </div>
            </div>
            <span className="rounded-full border border-parchment-200 bg-parchment-50 px-3 py-1 text-xs font-semibold text-stone-500">
              Coming Soon
            </span>
          </div>
        </SacredCard>
      </div>
    </div>
  );
}

type RhythmModalKind =
  | 'morning'
  | 'formation'
  | 'silent'
  | 'personal'
  | 'seeing'
  | 'saint'
  | 'evening'
  | 'unfinished'
  | 'complete'
  | null;

function RhythmModal({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-leather-900/45 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-10 backdrop-blur-sm">
      <section className="max-h-[calc(100dvh-3.5rem-env(safe-area-inset-bottom))] w-full max-w-md overflow-y-auto overscroll-contain rounded-[1.75rem] border border-gold/25 bg-white shadow-[0_24px_70px_rgba(28,25,23,0.32)]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-parchment-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Today&apos;s Rhythm
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-leather-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm leading-relaxed text-stone-500">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-parchment-200 bg-parchment-50 text-sm font-semibold text-leather-600"
          >
            x
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </section>
    </div>
  );
}

function PrayerPreparation() {
  return (
    <div className="mb-4 rounded-2xl border border-gold/30 bg-parchment-50 px-4 py-4 text-sm text-leather-900">
      <p className="font-semibold text-leather-700">Prepare to pray</p>
      <ul className="mt-3 space-y-2 leading-relaxed text-stone-600">
        <li>Pause and become still.</li>
        <li>Breathe slowly.</li>
        <li>Remember you are in God&apos;s presence.</li>
        <li>Make the Sign of the Cross.</li>
        <li>Pray slowly, not rushed.</li>
      </ul>
    </div>
  );
}
function FaithJourneyDetail({
  checkedItems,
  autoItems,
  currentDay,
  seeingGod,
  onToggleItem,
  onSeeingGodChange,
  onBack,
}: {
  checkedItems: string[];
  autoItems: string[];
  currentDay: number;
  seeingGod: SeeingGodReflection;
  onToggleItem: (item: string) => void;
  onSeeingGodChange: (field: keyof SeeingGodReflection, value: string) => void;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const { size: readerSize, setSize: setReaderSize } = useReaderFont();
  const [activeModal, setActiveModal] = useState<RhythmModalKind>(null);
  const effectiveItems = mergeFaithJourneyChecks(checkedItems, autoItems);
  const completed = effectiveItems.length;
  const progress = Math.round((completed / FAITH_JOURNEY_ITEMS.length) * 100);
  const morningPrayer = getRotatingMorningPrayer(currentDay);
  const eveningPrayer = getRotatingEveningPrayer(currentDay);
  const formationLesson = getDailyFormation(currentDay);
  const allComplete = completed >= FAITH_JOURNEY_ITEMS.length;
  const inputClass =
    'mt-2 min-h-24 w-full rounded-xl border border-parchment-200 bg-white px-4 py-3 text-sm leading-relaxed text-leather-900 outline-none focus:border-leather-400';

  const completeItem = (item: string) => {
    if (!effectiveItems.includes(item) && !autoItems.includes(item)) {
      onToggleItem(item);
    }
    setActiveModal(null);
  };

  const openItem = (item: string) => {
    if (item === SCRIPTURE_READING_ITEM) {
      navigate(`/day/${currentDay}`);
      return;
    }

    if (item === DIVE_DEEPER_ITEM) {
      navigate(`/day/${currentDay}/deeper`);
      return;
    }

    if (item === 'Morning Prayer') setActiveModal('morning');
    if (item === 'Faith Formation') setActiveModal('formation');
    if (item === 'Silent Prayer') setActiveModal('silent');
    if (item === PERSONAL_PRAYER_ITEM) setActiveModal('personal');
    if (item === SAINT_OF_DAY_ITEM) setActiveModal('saint');
    if (item === 'Seeing God Today') setActiveModal('seeing');
    if (item === 'Evening Prayer') setActiveModal('evening');
  };

  const completeRhythm = () => {
    if (!allComplete) {
      // Do not auto-complete unfinished steps. Let the user choose to keep
      // going or close the day while leaving missed steps incomplete.
      setActiveModal('unfinished');
      return;
    }
    setActiveModal('complete');
  };

  // End the day without marking any unfinished steps complete.
  const endTodayAnyway = () => {
    setActiveModal('complete');
  };

  const modal = (() => {
    if (activeModal === 'morning') {
      return (
        <RhythmModal
          title="Morning Prayer"
          subtitle="Begin the day in the name of the Holy Trinity."
          onClose={() => setActiveModal(null)}
        >
          <PrayerPreparation />
          <div className="rounded-2xl bg-parchment-50 px-5 py-7">
            <SacredPrayer text={morningPrayer} />
          </div>
          <button
            type="button"
            onClick={() => completeItem('Morning Prayer')}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Complete Prayer
          </button>
        </RhythmModal>
      );
    }

    if (activeModal === 'formation') {
      return (
        <RhythmModal
          title="Faith Formation"
          subtitle="A short daily Catholic teaching"
          onClose={() => setActiveModal(null)}
        >
          <div className={`space-y-4 text-leather-900 ${readerFontClass(readerSize)}`}>
            <div className="flex justify-end">
              <ReaderFontControl size={readerSize} setSize={setReaderSize} />
            </div>
            <section className="rounded-2xl bg-parchment-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Day {formationLesson.day} | {formationLesson.category}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
                {formationLesson.title}
              </h3>
              <p className="mt-3 leading-relaxed text-stone-700">
                {formationLesson.summary}
              </p>
            </section>

            <section className="rounded-2xl bg-white border border-parchment-200 p-5">
              {formationLesson.formationText.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className={`leading-relaxed text-stone-700 ${index > 0 ? 'mt-4' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
            </section>

            <section className="rounded-2xl border border-gold/40 bg-parchment-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Reflection Question
              </p>
              <p className="mt-2 font-display text-xl leading-snug text-leather-900">
                {formationLesson.reflection}
              </p>
            </section>
          </div>
          <button
            type="button"
            onClick={() => completeItem('Faith Formation')}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Complete Formation
          </button>
        </RhythmModal>
      );
    }

    if (activeModal === 'silent') {
      return (
        <RhythmModal
          title="Silent Prayer"
          subtitle="A few quiet minutes with God."
          onClose={() => setActiveModal(null)}
        >
          <div className="rounded-2xl bg-parchment-50 p-5">
            <p className="text-base font-semibold leading-relaxed text-leather-900">
              Not sure what to say to God? Start here.
            </p>
            <p className="mt-3 text-base leading-relaxed text-leather-900">
              Prayer is not only about finding the perfect words. Sometimes
              prayer begins by simply being with God.
            </p>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone-600">
              {'Find a quiet place.\nTake a few slow breaths.\nPlace yourself in God’s presence.'}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              You can simply say:
            </p>
            <p className="mt-1 text-base italic leading-relaxed text-leather-900">
              &lsquo;Jesus, I am here.&rsquo;
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              Spend a few moments in silence.
            </p>
          </div>
          <button
            type="button"
            onClick={() => completeItem('Silent Prayer')}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Complete Silent Prayer
          </button>
        </RhythmModal>
      );
    }

    if (activeModal === 'personal') {
      return (
        <RhythmModal
          title="Personal Prayer"
          subtitle="Bring the people and needs of your day before God."
          onClose={() => setActiveModal(null)}
        >
          <div className="grid gap-3 text-sm text-leather-900">
            {[
              ['Those closest to me', 'Family, friends, and loved ones.'],
              ['Those who guide me', 'Teachers, pastors, mentors, and helpers.'],
              [
                'Those who lead and carry responsibility',
                'Leaders in the Church, home, work, and public life.',
              ],
              [
                'Those who are weak, sick, lonely, or suffering',
                'Anyone who needs the mercy and comfort of Christ.',
              ],
              ['My own needs', 'Ask with humility, trust, and openness to God.'],
            ].map(([label, body]) => (
              <div key={label} className="rounded-2xl bg-parchment-50 px-4 py-3">
                <p className="font-semibold text-leather-700">{label}</p>
                <p className="mt-1 leading-relaxed text-stone-600">{body}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => completeItem(PERSONAL_PRAYER_ITEM)}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Complete Prayer
          </button>
        </RhythmModal>
      );
    }

    if (activeModal === 'saint') {
      return (
        <RhythmModal
          title="Saint of the Day"
          subtitle="What is a Saint?"
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-3 rounded-2xl bg-parchment-50 p-5 text-sm leading-relaxed text-stone-700">
            <p>
              A saint is a person who lived a holy life and is now fully alive
              with God in heaven. God is the one who makes saints; holiness is
              his gift, not our achievement.
            </p>
            <p>
              The Church does not create saints. She recognises those in whom
              God&apos;s grace has clearly shone, holding them up as examples
              and friends for us.
            </p>
            <p>
              Worship belongs to God alone. We do not worship the saints. We
              honour them and ask them, as our brothers and sisters in Christ,
              to pray with us and for us, just as we ask friends on earth to
              pray for us.
            </p>
            <p>
              And this calling is for everyone. God calls each of us to
              sainthood, to become holy right where we are.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              navigate('/saint', { state: { source: 'today' } });
            }}
            className="mt-4 w-full rounded-xl border border-parchment-200 bg-white py-3 font-semibold text-leather-600 transition active:scale-[0.99]"
          >
            Meet Today&apos;s Saint
          </button>
          <button
            type="button"
            onClick={() => completeItem(SAINT_OF_DAY_ITEM)}
            className="mt-3 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Mark Complete
          </button>
        </RhythmModal>
      );
    }

    if (activeModal === 'seeing') {
      return (
        <RhythmModal
          title="Seeing God Today"
          subtitle="A gentle review of grace in ordinary life."
          onClose={() => setActiveModal(null)}
        >
          <div className="rounded-2xl bg-parchment-50 p-4">
            <span className="text-sm font-semibold text-leather-900">
              Did you notice God today?
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Yes', 'I struggled today'].map((option) => {
                const selected = seeingGod.noticedGod === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onSeeingGodChange('noticedGod', option)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-[0.98] ${
                      selected
                        ? 'border-leather-600 bg-leather-600 text-white'
                        : 'border-parchment-200 bg-white text-leather-700'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {seeingGod.noticedGod === 'Yes' && (
              <div className="mt-4 border-t border-parchment-200 pt-4">
                <span className="text-sm font-semibold text-leather-900">
                  Where did you notice Him?
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    'Another person',
                    'Creation',
                    'Prayer',
                    'Scripture',
                    'A moment of peace',
                    'An act of love',
                  ].map((option) => {
                    const selected = seeingGod.noticedWhere === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          onSeeingGodChange(
                            'noticedWhere',
                            selected ? '' : option
                          )
                        }
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-[0.98] ${
                          selected
                            ? 'border-leather-600 bg-leather-600 text-white'
                            : 'border-parchment-200 bg-white text-leather-700'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <label className="mt-4 block text-sm text-leather-900">
                  <span className="font-semibold">
                    Write a few words if you would like.
                  </span>
                  <textarea
                    value={seeingGod.graceToRemember}
                    onChange={(event) =>
                      onSeeingGodChange('graceToRemember', event.target.value)
                    }
                    className={inputClass}
                  />
                </label>
              </div>
            )}

            {seeingGod.noticedGod === 'I struggled today' && (
              <div className="mt-4 border-t border-parchment-200 pt-4 text-sm leading-relaxed text-leather-900">
                <p>
                  That's okay. God was still with you today. Sometimes we notice
                  Him in creation, in people around us, in a quiet moment, or in
                  the chance to love someone.
                </p>
                <p className="mt-3 italic text-leather-600">
                  "Whatever you did for one of the least of these brothers and
                  sisters of mine, you did for me." (Matthew 25:40)
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => completeItem('Seeing God Today')}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Complete Reflection
          </button>
        </RhythmModal>
      );
    }

    if (activeModal === 'evening') {
      return (
        <RhythmModal
          title="Evening Prayer"
          subtitle="Give thanks, review the day, repent, trust, and rest."
          onClose={() => setActiveModal(null)}
        >
          <PrayerPreparation />
          <div className="rounded-2xl bg-parchment-50 px-5 py-7">
            <SacredPrayer text={eveningPrayer} />
          </div>
          <button
            type="button"
            onClick={() => completeItem('Evening Prayer')}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Complete Prayer
          </button>
        </RhythmModal>
      );
    }

    if (activeModal === 'unfinished') {
      return (
        <RhythmModal
          title="You still have unfinished steps."
          onClose={() => setActiveModal(null)}
        >
          <div className="rounded-2xl bg-parchment-50 px-5 py-7 text-center">
            <p className="leading-relaxed text-stone-700">
              You can keep going, or end today and return to these steps whenever
              you are ready. Nothing is locked.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Continue Journey
          </button>
          <button
            type="button"
            onClick={endTodayAnyway}
            className="mt-3 w-full rounded-xl border border-parchment-200 bg-white py-3 font-semibold text-leather-600 transition active:scale-[0.99]"
          >
            End Today Anyway
          </button>
        </RhythmModal>
      );
    }

    if (activeModal === 'complete') {
      return (
        <RhythmModal
          title="Today's rhythm is complete."
          onClose={() => setActiveModal(null)}
        >
          <div className="rounded-2xl bg-parchment-50 px-5 py-7 text-center">
            <p className="font-display text-3xl font-semibold leading-tight text-leather-900">
              You walked with God today.
            </p>
            <p className="mt-4 font-display text-2xl font-semibold text-leather-600">
              Thanks be to God.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Amen
          </button>
        </RhythmModal>
      );
    }

    return null;
  })();

  return (
    <div className="mx-auto max-w-md px-4 pt-5 pb-6">
      {modal}
      <button
        onClick={onBack}
        className="mb-4 rounded-xl border border-parchment-200 bg-white/80 px-4 py-2 text-sm font-semibold text-leather-600 shadow-[0_10px_28px_rgba(74,55,40,0.07)] transition active:scale-[0.99]"
      >
        &larr; Journey Hub
      </button>

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          Faith Journey
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-leather-900">
          Today's Formation
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          A simple daily rhythm for prayer, Scripture, formation, and reflection.
        </p>
        <div className="mt-5">
          <div className="mb-1 flex justify-between text-xs text-stone-500">
            <span>{completed}/{FAITH_JOURNEY_ITEMS.length} complete</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-parchment-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-leather-600 to-gold"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </SacredCard>

      <div className="space-y-3">
        {FAITH_JOURNEY_ITEMS.map((item) => {
          const done = effectiveItems.includes(item);
          const autoDone = autoItems.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => openItem(item)}
              className={`${sacredButtonCardClassName} flex w-full items-center gap-3 text-left`}
            >
              <CheckDot done={done} />
              <span className="min-w-0 flex-1">
                <span
                  className={`block font-semibold ${
                    done ? 'text-stone-400 line-through' : 'text-leather-900'
                  }`}
                >
                  {item}
                </span>
                {item === SCRIPTURE_READING_ITEM && (
                  <span className="mt-1 block text-xs text-stone-500">
                    Open today&apos;s Scripture Journey reading
                  </span>
                )}
                {item === DIVE_DEEPER_ITEM && (
                  <span className="mt-1 block text-xs text-stone-500">
                    Open today&apos;s Dive Deeper reflection
                  </span>
                )}
                {autoDone && (
                  <span className="mt-1 block text-xs font-medium text-sage-500">
                    Completed from Scripture Journey
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={completeRhythm}
        className={`mt-5 w-full rounded-xl py-3 font-semibold transition active:scale-[0.99] ${
          allComplete
            ? 'bg-gold text-leather-900 shadow-[0_12px_24px_rgba(212,169,106,0.18)]'
            : 'border border-parchment-200 bg-white text-leather-600'
        }`}
      >
        Complete Today&apos;s Rhythm
      </button>
    </div>
  );
}

export default function Journey() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completionId, members } = useAccount();
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);
  const [selected, setSelected] = useState<Period | null>(null);
  const [faithCheckedItems, setFaithCheckedItems] = useState<string[]>(
    readFaithJourneyChecks
  );
  const [seeingGod, setSeeingGod] = useState<SeeingGodReflection>(
    readSeeingGodReflection
  );
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getAllCompletions()
      .then(setCompletions)
      .catch(() => setCompletions([]));
  }, []);

  useLayoutEffect(() => {
    if (selected) return;

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      let parent = pageRef.current?.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        if (/(auto|scroll|overlay)/.test(style.overflowY)) {
          parent.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
        parent = parent.parentElement;
      }
    };

    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    const timer = window.setTimeout(resetScroll, 0);
    const settledTimer = window.setTimeout(resetScroll, 50);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.clearTimeout(settledTimer);
    };
  }, [location.pathname, selected]);

  const periods = useMemo(buildPeriods, []);

  // Current day = first day the group has not all completed (actual progress).
  const currentDay =
    readingPlan.find(
      (d) => !groupComplete(completions, d.day_number, members)
    )?.day_number ?? TOTAL_DAYS;
  const currentPeriod =
    periods.find((p) => currentDay >= p.start && currentDay <= p.end) ??
    periods[0];
  const currentPeriodDone = currentPeriod.days.filter((d) =>
    groupComplete(completions, d.day_number, members)
  ).length;
  const currentPeriodPct = Math.round(
    (currentPeriodDone / currentPeriod.days.length) * 100
  );

  const completedCount = readingPlan.filter((d) =>
    groupComplete(completions, d.day_number, members)
  ).length;
  const progressPct = Math.round((completedCount / TOTAL_DAYS) * 100);
  const scriptureDoneToday = completionId
    ? completions.some((record) => wasCompletedToday(record, completionId))
    : false;
  const autoFaithItems = scriptureDoneToday ? [SCRIPTURE_READING_ITEM] : [];
  const effectiveFaithItems = mergeFaithJourneyChecks(
    faithCheckedItems,
    autoFaithItems
  );

  const toggleFaithItem = (item: string) => {
    if (autoFaithItems.includes(item)) return;
    setFaithCheckedItems((current) => {
      const next = current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item];
      writeFaithJourneyChecks(next);
      return next;
    });
  };

  const updateSeeingGod = (
    field: keyof SeeingGodReflection,
    value: string
  ) => {
    setSeeingGod((current) => {
      const next = { ...current, [field]: value };
      writeSeeingGodReflection(next);
      return next;
    });
  };

  if (location.pathname === '/journey/faith') {
    return (
      <FaithJourneyDetail
        checkedItems={faithCheckedItems}
        autoItems={autoFaithItems}
        currentDay={currentDay}
        seeingGod={seeingGod}
        onToggleItem={toggleFaithItem}
        onSeeingGodChange={updateSeeingGod}
        onBack={() => navigate('/journey')}
      />
    );
  }

  if (location.pathname !== '/journey/scripture') {
    return (
      <JourneyHub
        scriptureDay={currentDay}
        scriptureProgress={progressPct}
        faithDone={effectiveFaithItems.length}
        faithTotal={FAITH_JOURNEY_ITEMS.length}
        onOpenScripture={() => navigate('/journey/scripture')}
        onOpenFaith={() => navigate('/journey/faith')}
      />
    );
  }

  // ---- Period detail view (days within one period) ----
  if (selected) {
    return (
      <div className="mx-auto max-w-md px-4 pt-5 pb-6">
        <button
          onClick={() => setSelected(null)}
          className="mb-4 rounded-xl border border-parchment-200 bg-white/80 px-4 py-2 text-sm font-semibold text-leather-600 shadow-[0_10px_28px_rgba(74,55,40,0.07)] transition active:scale-[0.99]"
        >
          &larr; All Periods
        </button>
        <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
          <div className="flex items-center gap-4">
            <img
              src={periodIconSrc(selected)}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-16 w-16 shrink-0 rounded-full border-2 border-gold object-cover shadow-[0_12px_24px_rgba(212,169,106,0.16)]"
            />
            <div>
              <h1 className="font-display text-3xl font-bold text-leather-900">
                {selected.name}
              </h1>
              <p className="text-stone-500">
                Day {selected.start}-{selected.end} &middot; {selected.books}
              </p>
            </div>
          </div>
        </SacredCard>

        <div className="space-y-3">
          {selected.days.map((day) => (
            <button
              key={day.day_number}
              onClick={() => navigate(`/day/${day.day_number}`)}
              className={`${sacredButtonCardClassName} w-full text-left`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-leather-600">
                      {day.day_number}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-stone-400">
                      {day.period}
                    </span>
                  </div>
                  <ul className="mt-2 text-sm text-leather-900 space-y-0.5">
                    <li>{day.reading_one}</li>
                    {day.reading_two && <li>{day.reading_two}</li>}
                    {day.psalm_proverb && <li>{day.psalm_proverb}</li>}
                  </ul>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Dot done={groupComplete(completions, day.day_number, members)} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---- Periods overview (Bible Timeline) ----
  return (
    <div ref={pageRef} className="mx-auto max-w-md px-4 pt-5 pb-6">
      <button
        onClick={() => navigate(`/day/${currentDay}`)}
        className="relative mb-5 block w-full overflow-hidden rounded-[1.75rem] bg-leather-900 text-left text-white shadow-[0_24px_56px_rgba(28,25,23,0.22)] transition active:scale-[0.99]"
      >
        <img
          src={periodIconSrc(currentPeriod)}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-leather-900/35 via-leather-900/70 to-leather-900/95" />
        <div className="relative px-5 pb-5 pt-24">
          <p className="text-xs uppercase tracking-widest text-gold">
            Scripture Journey
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight">
            Day {currentDay} of {TOTAL_DAYS}
          </h1>
          <div className="mt-4 rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-semibold leading-tight text-parchment-50">
                  {currentPeriod.name}
                </p>
                <p className="mt-1 text-sm text-parchment-100/80">
                  {currentPeriod.books}
                </p>
              </div>
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-leather-900">
                {currentPeriodPct}%
              </span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-parchment-100/25">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-parchment-100"
                style={{ width: `${currentPeriodPct}%` }}
              />
            </div>
          </div>
        </div>
      </button>

      <JourneyTimeline
        currentDay={currentDay}
        totalDays={TOTAL_DAYS}
        period={currentPeriod.name}
        progressPercent={progressPct}
      />

      <header className="mb-4 px-1">
        <h2 className="font-display text-2xl font-bold text-leather-900">
          Journey
        </h2>
        <p className="text-sm text-stone-500">The Bible Timeline</p>
      </header>

      <div className="relative space-y-4 pb-2">
        <span
          aria-hidden="true"
          className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-gold/60 via-parchment-200 to-parchment-200"
        />
        {periods.map((p) => {
          const total = p.days.length;
          const done = p.days.filter((d) =>
            groupComplete(completions, d.day_number, members)
          ).length;
          const pct = Math.round((done / total) * 100);
          const isComplete = done === total;
          const isActive =
            currentDay >= p.start && currentDay <= p.end;

          return (
            <div key={`${p.name}-${p.start}`} className="relative pl-10">
              <button
                onClick={() => setSelected(p)}
                className={`w-full rounded-2xl border p-4 text-left shadow-[0_12px_32px_rgba(74,55,40,0.08)] transition active:scale-[0.99] ${
                  isActive
                    ? 'border-gold bg-parchment-50/95 ring-2 ring-gold/20 shadow-[0_18px_42px_rgba(124,92,62,0.14)]'
                    : isComplete
                      ? 'border-gold/70 bg-gradient-to-br from-white to-parchment-50'
                      : 'border-parchment-200 bg-white/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={periodIconSrc(p)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`-ml-12 mt-1 shrink-0 rounded-full border-2 object-cover shadow-[0_10px_20px_rgba(74,55,40,0.08)] ${
                      isActive
                        ? 'h-20 w-20 border-gold ring-4 ring-gold/15'
                        : isComplete
                          ? 'h-16 w-16 border-gold'
                          : 'h-16 w-16 border-parchment-200 opacity-60'
                    }`}
                  />
                  <div
                    className={`min-w-0 flex-1 ${
                      isActive || isComplete ? '' : 'opacity-75'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-bold text-leather-900">
                        {p.name}
                      </h3>
                      {isActive && (
                        <span className="rounded-full bg-leather-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                          Current Journey
                        </span>
                      )}
                      {isComplete && !isActive && (
                        <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-leather-900">
                          Complete
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-stone-500">
                      Day {p.start}-{p.end}
                    </p>
                    <p className="mt-0.5 text-sm text-leather-600">{p.books}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-stone-500">
                    <span>
                      {done}/{total} complete
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-parchment-200">
                    <div
                      className={`h-full rounded-full ${
                        isComplete
                          ? 'bg-gold'
                          : 'bg-gradient-to-r from-leather-600 to-gold'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
