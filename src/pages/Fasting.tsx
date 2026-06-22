import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SacredCard, SacredProgress } from '../components/SacredCard';
import { useAccount } from '../lib/account';
import { useReaderFont, readerFontClass } from '../lib/readerFont';
import { ReaderFontControl } from '../components/ReaderFontControl';

type FastingStep = {
  title: string;
  body: string;
};

const FASTING_STEPS: FastingStep[] = [
  {
    title: 'What Fasting Is',
    body: 'Fasting is the deliberate giving up of food, or other good things, for a time, in order to turn our hearts more fully toward God. It is one of the three great practices Jesus assumes His followers will live: prayer, fasting, and almsgiving. Fasting is not a diet and not a way to earn God\'s love. It is a way of saying with our whole body that God matters more than our appetites. By going without, we make room. The small hunger we feel becomes a reminder to pray, to depend on God, and to remember that "man does not live by bread alone, but by every word that comes from the mouth of God" (Matthew 4:4).',
  },
  {
    title: 'Biblical Roots',
    body: 'Fasting runs through the whole of Scripture. Moses fasted forty days and forty nights on the mountain as he received the Law and drew near to God (Exodus 34:28). The prophet Elijah, strengthened by food from an angel, journeyed forty days to the mountain of God (1 Kings 19:8). Above all, Jesus Himself fasted forty days and forty nights in the desert before beginning His public ministry, and there He overcame temptation by clinging to the Father (Matthew 4:1-11). Jesus taught His disciples how to fast rightly, in secret and without showing off (Matthew 6:16-18), and said they would fast once the Bridegroom was taken from them (Mark 2:20). The early Church carried this on, fasting and praying before sending out missionaries and choosing leaders (Acts 13:2-3).',
  },
  {
    title: 'Why Catholics Fast',
    body: 'Catholics fast to grow closer to Christ. Fasting humbles us, loosens the grip our desires can have on us, and trains us to choose God freely. It joins us, in a small way, to the sufferings of Jesus, who gave up everything for love of us. Fasting also opens our hearts to others: what we give up can become what we give away, so that fasting and charity grow together. And fasting strengthens prayer, helping us seek God\'s mercy and grace with greater earnestness. It is never about punishing the body, which is good, but about ordering our whole self toward God.',
  },
  {
    title: 'Days of Fasting and Penance',
    body: 'The Church gives a shared rhythm of penance so we do not walk alone. Ash Wednesday and Good Friday are days of fasting and abstinence for Catholics: those who are able eat only one full meal, with two smaller ones that together do not equal a full meal, and abstain from meat. Good Friday in particular unites us to the Cross of Jesus. Every Friday of the year remains a day of penance in memory of the Lord\'s Passion, traditionally kept by abstaining from meat or by another act of self-denial or charity. The forty days of Lent are the great season of fasting, prayer, and almsgiving as we prepare for Easter. (The young, the elderly, the sick, and others for whom fasting would be harmful are not bound by these rules.)',
  },
  {
    title: 'Practical Ways to Fast',
    body: 'Fasting can be simple and hidden. Skip a snack, a dessert, or a second helping. Drink water instead of coffee or soft drinks for a day. Fast from food for part of a day and offer the hunger to God. You can also fast beyond food: take a break from social media, television, or needless shopping. Give up complaining for a day, or a comfort you would not normally question. Start small and be steady rather than heroic and discouraged. What matters is the love behind it. Whatever you give up, let it turn your heart toward God and toward those in need.',
  },
  {
    title: 'Fasting With Prayer',
    body: 'Fasting on its own can become mere willpower. Joined to prayer, it becomes a conversation with God. When you feel the pang of hunger or the pull of the thing you set aside, let it become a prompt to pray: a short word to Jesus, an Our Father, a moment of thanks. Offer your small sacrifice for someone who needs grace, or in sorrow for sin, or simply in love. Pair your fasting with almsgiving, giving to the poor what you save. In this way fasting, prayer, and charity lift one another, and the little hunger of the body becomes a deeper hunger for God Himself.',
  },
];

function loadCompletedSteps(storageKey: string) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((value): value is number => Number.isInteger(value))
      : [];
  } catch {
    return [];
  }
}

export default function Fasting() {
  const navigate = useNavigate();
  const { size, setSize } = useReaderFont();
  const { completionId } = useAccount();
  const storageKey = useMemo(
    () => `fasting-progress:${completionId ?? 'local'}`,
    [completionId]
  );
  const [selectedStep, setSelectedStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    setCompletedSteps(loadCompletedSteps(storageKey));
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(completedSteps));
  }, [completedSteps, storageKey]);

  const current = FASTING_STEPS[selectedStep];
  const completedCount = completedSteps.length;
  const progressPercent = Math.round(
    (completedCount / FASTING_STEPS.length) * 100
  );
  const isCurrentComplete = completedSteps.includes(selectedStep);

  function completeCurrentStep() {
    if (!isCurrentComplete) {
      setCompletedSteps((steps) => [...steps, selectedStep].sort((a, b) => a - b));
    }
    if (selectedStep < FASTING_STEPS.length - 1) {
      setSelectedStep(selectedStep + 1);
    }
  }

  function markCurrentIncomplete() {
    setCompletedSteps((steps) => steps.filter((step) => step !== selectedStep));
  }

  return (
    <div className={`mx-auto max-w-md px-4 pt-5 pb-6 ${readerFontClass(size)}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/faith')}
          className="text-sm font-semibold text-leather-600"
        >
          &larr; Back to Faith
        </button>
        <ReaderFontControl size={size} setSize={setSize} />
      </div>

      <section className="relative mb-4 overflow-hidden rounded-[1.75rem] bg-leather-950 text-white shadow-[0_22px_50px_rgba(74,55,40,0.2)]">
        <img
          src="/images/hero/church-home.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-leather-950/95 via-leather-950/85 to-leather-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-leather-950/95 to-transparent" />
        <div className="relative p-5 pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Fasting
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            Make room for God through fasting
          </h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-parchment-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Prayer, fasting, and almsgiving have shaped Christian life since the
            beginning. Learn what fasting is and how to live it with love.
          </p>
        </div>
      </section>

      <div className="mb-4">
        <SacredProgress
          label="Fasting Progress"
          value={`${completedCount}/${FASTING_STEPS.length}`}
          percent={progressPercent}
        />
      </div>

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Step {selectedStep + 1} of {FASTING_STEPS.length}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-leather-900">
          {current.title}
        </h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-stone-600">
          {current.body}
        </p>

        <button
          type="button"
          onClick={completeCurrentStep}
          className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white shadow-[0_12px_24px_rgba(74,55,40,0.14)] transition active:scale-[0.99]"
        >
          {isCurrentComplete ? 'Continue' : 'Complete Step'}
        </button>

        {isCurrentComplete && (
          <button
            type="button"
            onClick={markCurrentIncomplete}
            className="mt-3 w-full rounded-xl border border-parchment-200 py-2.5 text-sm font-semibold text-leather-600 transition active:scale-[0.99]"
          >
            Mark Incomplete
          </button>
        )}
      </SacredCard>

      <div className="mb-4 grid grid-cols-6 gap-2">
        {FASTING_STEPS.map((step, index) => {
          const done = completedSteps.includes(index);
          const active = selectedStep === index;
          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setSelectedStep(index)}
              className={`flex h-11 items-center justify-center rounded-xl border text-sm font-semibold transition active:scale-[0.98] ${
                active
                  ? 'border-leather-600 bg-leather-600 text-white'
                  : done
                    ? 'border-gold/50 bg-gold/15 text-leather-700'
                    : 'border-parchment-200 bg-white/80 text-stone-400'
              }`}
              aria-label={`Open step ${index + 1}: ${step.title}`}
            >
              {done ? <span aria-hidden="true">&#10003;</span> : index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
