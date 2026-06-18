import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SacredCard, SacredProgress } from '../components/SacredCard';
import { useAccount } from '../lib/account';

type BeginHereStep = {
  title: string;
  reflection: string;
  thinkAbout: string;
  takeStep: string;
};

const BEGIN_HERE_STEPS: BeginHereStep[] = [
  {
    title: "I'm Catholic, where do I start?",
    reflection:
      'Many people are baptized Catholic but never deeply learn their faith. Some return after years away. Some start because they become parents. Some simply feel a quiet pull toward God. Baptism begins our life in Christ, but like any relationship, faith needs to grow. This journey is not about pretending we have everything figured out. Catholics believe God continually invites us closer to Him. Is it too late to start? No. Throughout history many saints had moments of returning, conversion, and beginning again. The first step is simply turning toward God.',
    thinkAbout:
      'What part of the Catholic faith feels closest to you right now, and what part feels confusing or far away? Where do you sense God quietly inviting you to begin again?',
    takeStep:
      'Make the Sign of the Cross slowly today and ask God to help you take the next step.',
  },
  {
    title: 'Who is Jesus?',
    reflection:
      'Christianity begins with Jesus Christ, not just rules, culture, or traditions. Catholics believe Jesus is the Son of God, fully God and fully human, and the One who reveals God\'s love. In the Incarnation, God comes near to us. On the Cross, Jesus gives Himself for us. In the Resurrection, He opens the way to new life. Building a relationship with Jesus can feel difficult because we cannot physically see Him. Catholics encounter Christ through prayer, Scripture, the Eucharist, and the Sacraments. What if I pray and feel nothing? Faith is deeper than feelings. Like any relationship, it grows through showing up, even when it feels difficult.',
    thinkAbout:
      'When you hear the name Jesus, what comes to mind first: comfort, distance, questions, hope, or something else? What would it look like to show up for Him today, even in a small way?',
    takeStep:
      'Read a short passage from one Gospel, such as Luke 15:1-7, and notice how Jesus looks for the one who is lost. Then speak to Him simply, in your own words.',
  },
  {
    title: 'Why the Catholic Church?',
    reflection:
      'Catholics believe the Church is connected to Jesus, the Apostles, and the earliest Christians. We do not walk alone. We receive a faith handed down through Scripture, Tradition, worship, and the life of the Church.',
    thinkAbout:
      'What questions do you have about the Church, its history, or why Catholics believe what they believe?',
    takeStep:
      'Look up the nearest Catholic parish and learn its Mass times, even if you are not ready to go yet.',
  },
  {
    title: 'What happens at Mass?',
    reflection:
      'At Mass, Catholics gather to listen to the Word of God, pray together, offer worship to God, and receive Christ in the Eucharist. Standing, kneeling, responding, and silence all help us enter the prayer of the Church.',
    thinkAbout:
      'Which part of Mass feels most familiar, and which part do you most want to understand better?',
    takeStep:
      'Attend Mass or watch closely next time you go. Notice when people stand, sit, kneel, listen, and pray.',
  },
  {
    title: 'The Eucharist',
    reflection:
      'The Eucharist is at the center of Catholic life because Catholics believe Jesus gives us His true Body and Blood. This is a mystery of love, not a reward for having no struggles.',
    thinkAbout:
      'What does it mean to you that Jesus wants to be close to His people in this way?',
    takeStep:
      'Spend one quiet minute in church, or at home, thanking Jesus for staying close to His Church.',
  },
  {
    title: 'Learning to Pray',
    reflection:
      'Prayer can feel difficult. Sometimes it feels powerful and sometimes it feels like words. The important thing is continuing to turn toward God with honesty, even when you do not know what to say.',
    thinkAbout:
      'What makes prayer hard for you: distraction, doubt, time, shame, or not knowing where to begin?',
    takeStep:
      'Pray one Our Father slowly. If your mind wanders, gently begin again.',
  },
  {
    title: 'Mary and the Saints',
    reflection:
      'Catholics honor Mary and the saints because they followed Christ before us and are alive with Him. We ask them to pray with us and for us. Worship belongs to God alone.',
    thinkAbout:
      'Does asking the saints to pray for you feel comforting, confusing, or unfamiliar?',
    takeStep:
      'Ask Mary or a saint you know about to pray for you, then turn your heart to Jesus.',
  },
  {
    title: 'Confession and Mercy',
    reflection:
      'Confession is not about being shamed. It is about returning to God, receiving forgiveness, and beginning again. The mercy of God is greater than the sins and habits we bring to Him.',
    thinkAbout:
      'Is there something in your life where you long for forgiveness, healing, or a new beginning?',
    takeStep:
      'Find your parish confession times or ask a priest how to prepare if it has been a long time.',
  },
  {
    title: 'Living the Faith',
    reflection:
      'Faith continues into everyday life: family, work, choices, struggles, habits, forgiveness, and trying again. Catholic life grows through small faithful steps, not through pretending we never fall.',
    thinkAbout:
      'Where is God inviting you to live your faith more honestly this week?',
    takeStep:
      'Choose one small act of love today: forgive, serve, pray, listen, or make time for someone.',
  },
  {
    title: 'Your Next Step',
    reflection:
      'Catholic Journey 365 helps you learn and grow, but your faith is lived in the Church. The app can walk beside you, but it does not replace your parish, priest, RCIA, the Sacraments, or personal spiritual guidance.',
    thinkAbout:
      'What next step feels possible now: attending Mass, learning to pray, asking a question, or speaking with someone at a parish?',
    takeStep:
      'Speak with your local priest or parish about RCIA, Sacraments, and personal guidance.',
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

export default function BeginHere() {
  const navigate = useNavigate();
  const { completionId } = useAccount();
  const storageKey = useMemo(
    () => `begin-here-progress:${completionId ?? 'local'}`,
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

  const current = BEGIN_HERE_STEPS[selectedStep];
  const completedCount = completedSteps.length;
  const allComplete = completedCount === BEGIN_HERE_STEPS.length;
  const progressPercent = Math.round(
    (completedCount / BEGIN_HERE_STEPS.length) * 100
  );
  const isCurrentComplete = completedSteps.includes(selectedStep);

  function completeCurrentStep() {
    if (!isCurrentComplete) {
      setCompletedSteps((steps) => [...steps, selectedStep].sort((a, b) => a - b));
    }
    if (selectedStep < BEGIN_HERE_STEPS.length - 1) {
      setSelectedStep(selectedStep + 1);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 pt-5 pb-6">
      <button
        type="button"
        onClick={() => navigate('/faith')}
        className="mb-4 text-sm font-semibold text-leather-600"
      >
        &larr; Back to Faith
      </button>

      <section className="relative mb-4 overflow-hidden rounded-[1.75rem] bg-leather-950 text-white shadow-[0_22px_50px_rgba(74,55,40,0.2)]">
        <img
          src="/images/landing/pilgrimage-path.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[66%_center] opacity-[0.74]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-leather-950/98 via-leather-950/78 to-leather-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-leather-950/96 to-transparent" />
        <div className="relative p-5 pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Begin Here
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            Take the first steps into the Catholic faith
          </h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-parchment-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            For Catholics, returning Catholics, new Catholics, and anyone
            trying to understand where to begin.
          </p>
        </div>
      </section>

      <div className="mb-4">
        <SacredProgress
          label="Begin Here Progress"
          value={`${completedCount}/${BEGIN_HERE_STEPS.length}`}
          percent={progressPercent}
        />
      </div>

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Step {selectedStep + 1} of {BEGIN_HERE_STEPS.length}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-leather-900">
          {current.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          {current.reflection}
        </p>

        <div className="mt-5 rounded-2xl border border-parchment-200 bg-parchment-50 p-4">
          <h3 className="text-sm font-semibold text-leather-900">
            Think About
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            {current.thinkAbout}
          </p>
        </div>

        <div className="mt-3 rounded-2xl border border-gold/25 bg-gold/10 p-4">
          <h3 className="text-sm font-semibold text-leather-900">
            Take a Step Today
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            {current.takeStep}
          </p>
        </div>

        <button
          type="button"
          onClick={completeCurrentStep}
          className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white shadow-[0_12px_24px_rgba(74,55,40,0.14)] transition active:scale-[0.99]"
        >
          {isCurrentComplete ? 'Continue' : 'Complete Step'}
        </button>
      </SacredCard>

      <div className="mb-4 grid grid-cols-5 gap-2">
        {BEGIN_HERE_STEPS.map((step, index) => {
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

      {allComplete && (
        <SacredCard className="mb-4 bg-gradient-to-br from-leather-900 to-leather-700 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            The journey continues.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-parchment-100">
            Keep walking with the Church. Catholic Journey 365 can help you
            learn and grow, and your local parish is where this life becomes
            lived with others.
          </p>
          <div className="mt-5 grid gap-2">
            <button
              type="button"
              onClick={() => navigate('/journey')}
              className="rounded-xl bg-gold py-3 font-semibold text-leather-950"
            >
              Bible Journey
            </button>
            <button
              type="button"
              onClick={() => navigate('/mass')}
              className="rounded-xl border border-parchment-100/25 py-3 font-semibold text-white"
            >
              The Mass
            </button>
            <button
              type="button"
              onClick={() => navigate('/prayer')}
              className="rounded-xl border border-parchment-100/25 py-3 font-semibold text-white"
            >
              Prayer
            </button>
          </div>
        </SacredCard>
      )}
    </div>
  );
}
