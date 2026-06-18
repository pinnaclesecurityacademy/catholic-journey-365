import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SacredCard, SacredProgress } from '../components/SacredCard';
import { useAccount } from '../lib/account';

type BeginHereStep = {
  title: string;
  reflection: string;
  thinkAbout: string;
  takeStep: string;
  prayer: string;
};

const BEGIN_HERE_STEPS: BeginHereStep[] = [
  {
    title: "I'm Catholic, where do I start?",
    reflection:
      'This step is for many different people. Some were baptized Catholic but never really learned the faith. Some are returning after years away. Some are not Catholic at all but feel quietly drawn to the Catholic Church. Some are spouses or family members trying to understand the faith of someone they love. Wherever you are, faith begins with responding to God\'s invitation. Baptism begins our life in Christ, but like any living relationship, faith continues to grow over time. This journey is not about pretending we have everything figured out. It begins one step at a time. Is it too late to begin? No. God continually calls His children home, and there is always room to start again with Him.',
    thinkAbout:
      'What part of the Catholic faith feels closest to you right now, and what part feels confusing or far away? Where do you sense God quietly inviting you to begin again?',
    takeStep:
      'Make the Sign of the Cross slowly today and ask God to help you take the next step. Then pray this prayer, speaking to God from your heart.',
    prayer:
      'Heavenly Father,\n\nThank You for calling me closer to You.\n\nI do not have all the answers, and sometimes I do not even know where to begin.\n\nLord Jesus, walk with me on this journey. Help me understand Your love and the sacrifice You made for me.\n\nHoly Spirit, come into my heart. Fill me with Your love, guide my thoughts, strengthen my faith, and lead me closer to Christ.\n\nTeach me to pray.\nTeach me to trust.\nTeach me to follow You one step at a time.\n\nAmen.',
  },
  {
    title: 'Who is Jesus?',
    reflection:
      'Christianity begins with Jesus Christ, not just rules, culture, or traditions. Catholics believe Jesus is the Son of God, fully God and fully man. In the Incarnation, God takes on our human nature and comes near to us. On the Cross, Jesus gives Himself completely for us out of love. In the Resurrection, He conquers death and opens the way to new life. Building a relationship with Jesus can feel difficult because we cannot physically see Him. Catholics encounter Christ through Scripture, prayer, the Eucharist, and the Sacraments. These are the living ways He meets us. And faith is deeper than emotions. Sometimes prayer feels powerful, and sometimes it feels quiet. What matters is continuing to turn toward Him, trusting that He is present even when we feel nothing.',
    thinkAbout:
      'When you hear the name Jesus, what comes to mind first: comfort, distance, questions, hope, or something else? What would it look like to show up for Him today, even in a small way?',
    takeStep:
      'Read a short passage from one Gospel, such as Luke 15:1-7, and notice how Jesus looks for the one who is lost. Then speak to Him simply, in your own words, and pray this prayer.',
    prayer:
      'Lord Jesus,\n\nYou are the Son of God, who became man and gave Your life for me. I want to know You, not only as an idea, but as a living Person who loves me.\n\nReveal Yourself to me. Open my eyes to see You in the Scriptures, in prayer, in the Eucharist, and in the people around me.\n\nHoly Spirit, open my heart. Take away my fear and my doubt. Help me to recognise the voice of Jesus and to follow Him.\n\nHeavenly Father, draw me ever closer to Your Son, that I may trust Him in the bright moments and the quiet ones alike.\n\nAmen.',
  },
  {
    title: 'Why the Catholic Church?',
    reflection:
      'Catholics believe the Church is connected to Jesus, the Apostles, and the earliest Christians. We do not walk alone. We receive a faith handed down through Scripture, Tradition, worship, and the life of the Church.',
    thinkAbout:
      'What questions do you have about the Church, its history, or why Catholics believe what they believe?',
    takeStep:
      'Look up the nearest Catholic parish and learn its Mass times, even if you are not ready to go yet.',
    prayer:
      'Heavenly Father, You gave us the Church to hold and hand on the gift of faith. Help me to trust the family You have built through the Apostles and the saints. Lord Jesus, You promised to remain with Your Church always; help me to find my place within it. Holy Spirit, guide me, settle my doubts, and lead me into the truth, that I may grow ever closer to Christ. Amen.',
  },
  {
    title: 'What happens at Mass?',
    reflection:
      'At Mass, Catholics gather to listen to the Word of God, pray together, offer worship to God, and receive Christ in the Eucharist. Standing, kneeling, responding, and silence all help us enter the prayer of the Church.',
    thinkAbout:
      'Which part of Mass feels most familiar, and which part do you most want to understand better?',
    takeStep:
      'Attend Mass or watch closely next time you go. Notice when people stand, sit, kneel, listen, and pray.',
    prayer:
      'Heavenly Father, thank You for inviting me to Your table. Lord Jesus, You gave Yourself for me; teach me to worship You with my whole heart at Mass. Holy Spirit, open my eyes to what is truly happening in this holy gift, quiet my distractions, and strengthen my faith, that I may meet Christ more closely each time I come. Amen.',
  },
  {
    title: 'The Eucharist',
    reflection:
      'The Eucharist is at the center of Catholic life because Catholics believe Jesus gives us His true Body and Blood. This is a mystery of love, not a reward for having no struggles.',
    thinkAbout:
      'What does it mean to you that Jesus wants to be close to His people in this way?',
    takeStep:
      'Spend one quiet minute in church, or at home, thanking Jesus for staying close to His Church.',
    prayer:
      'Lord Jesus, I believe You give Yourself to us in the Eucharist out of love. Heavenly Father, thank You for keeping Your Son so near to Your people. Holy Spirit, increase my faith, soften my heart, and help me to receive this gift with reverence and love, that I may grow closer to Christ each day. Amen.',
  },
  {
    title: 'Learning to Pray',
    reflection:
      'Prayer can feel difficult. Sometimes it feels powerful and sometimes it feels like words. The important thing is continuing to turn toward God with honesty, even when you do not know what to say.',
    thinkAbout:
      'What makes prayer hard for you: distraction, doubt, time, shame, or not knowing where to begin?',
    takeStep:
      'Pray one Our Father slowly. If your mind wanders, gently begin again.',
    prayer:
      'Heavenly Father, I want to learn to speak with You. Lord Jesus, You taught Your disciples to pray; teach me too. Holy Spirit, come into my heart, help me when I do not know what to say, and lead both my words and my silence closer to Christ. Even when prayer feels quiet, keep me faithful and near to You. Amen.',
  },
  {
    title: 'Mary and the Saints',
    reflection:
      'Catholics honor Mary and the saints because they followed Christ before us and are alive with Him. We ask them to pray with us and for us. Worship belongs to God alone.',
    thinkAbout:
      'Does asking the saints to pray for you feel comforting, confusing, or unfamiliar?',
    takeStep:
      'Ask Mary or a saint you know about to pray for you, then turn your heart to Jesus.',
    prayer:
      'Heavenly Father, thank You for the great family of saints who followed Your Son before me. Lord Jesus, You are the One to whom all worship belongs; let Mary and the saints always lead me to You. Holy Spirit, strengthen me through their prayers and their example, and draw me closer to Christ. Amen.',
  },
  {
    title: 'Confession and Mercy',
    reflection:
      'Confession is not about being shamed. It is about returning to God, receiving forgiveness, and beginning again. The mercy of God is greater than the sins and habits we bring to Him.',
    thinkAbout:
      'Is there something in your life where you long for forgiveness, healing, or a new beginning?',
    takeStep:
      'Find your parish confession times or ask a priest how to prepare if it has been a long time.',
    prayer:
      'Heavenly Father, Your mercy is greater than my sins. Lord Jesus, You came to seek and save the lost, so I bring my heart honestly to You. Holy Spirit, give me courage to return, to be honest, and to begin again. Wash me, heal me, and lead me closer to Christ. Amen.',
  },
  {
    title: 'Living the Faith',
    reflection:
      'Faith continues into everyday life: family, work, choices, struggles, habits, forgiveness, and trying again. Catholic life grows through small faithful steps, not through pretending we never fall.',
    thinkAbout:
      'Where is God inviting you to live your faith more honestly this week?',
    takeStep:
      'Choose one small act of love today: forgive, serve, pray, listen, or make time for someone.',
    prayer:
      'Heavenly Father, You meet me in the ordinary moments of each day. Lord Jesus, help me to follow You in my family, my work, and my choices. Holy Spirit, strengthen me to love when it is hard, to forgive, to serve, and to rise again when I fall, so that my whole life grows closer to Christ. Amen.',
  },
  {
    title: 'Your Next Step',
    reflection:
      'Catholic Journey 365 helps you learn and grow, but your faith is lived in the Church. The app can walk beside you, but it does not replace your parish, priest, RCIA, the Sacraments, or personal spiritual guidance.',
    thinkAbout:
      'What next step feels possible now: attending Mass, learning to pray, asking a question, or speaking with someone at a parish?',
    takeStep:
      'Speak with your local priest or parish about RCIA, Sacraments, and personal guidance.',
    prayer:
      'Heavenly Father, thank You for walking with me this far. Lord Jesus, lead me into the life of Your Church, the Sacraments, and the people who can guide me. Holy Spirit, give me courage to take the next step, whatever it may be, and keep drawing me closer to Christ each day. Amen.',
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

  function markCurrentIncomplete() {
    setCompletedSteps((steps) => steps.filter((step) => step !== selectedStep));
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
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            A Prayer
          </p>
          <p className="mt-2 whitespace-pre-line text-sm italic leading-relaxed text-stone-600">
            {current.prayer}
          </p>
        </div>

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
