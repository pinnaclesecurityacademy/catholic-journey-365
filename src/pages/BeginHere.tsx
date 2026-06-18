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
      'A natural question for anyone exploring the faith is why the Catholic Church in particular. The Catholic answer begins with Jesus Himself. Jesus did not simply leave behind a book or a set of ideas. He gathered followers, taught them closely, and chose twelve Apostles to carry His mission forward. To Simon, He said, "You are Peter, and on this rock I will build my Church" (Matthew 16:18), giving him a special role of leadership. Jesus gave the Apostles real authority to teach, to forgive, and to lead in His name. Catholics believe this authority did not end when the Apostles died. It was handed on to the bishops who came after them, a continuity called apostolic succession. This is why Catholics care about the past two thousand years of history. The earliest Christians, in the generation right after the Apostles, already gathered around bishops, celebrated the Eucharist, and recognised one shared faith. The Catholic Church understands herself as the same living family that has carried the faith from the Apostles until now. You may wonder, "Why not just read the Bible myself?" Catholics love Scripture deeply, and reading it is part of this journey. But the Bible itself came to us through the Church, which prayed, preserved, and discerned which writings were the Word of God. Christ gave us both His Word and a living Church to help us understand and live it together, so that we are not left to figure everything out alone.',
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
      'If you have never been to Mass, it can feel like everyone knows a rhythm you have not learned yet. That is completely normal, and no one expects you to have it memorised. The Mass is really one journey with a clear shape. It begins with gathering, as the community comes together and makes the Sign of the Cross, marking ourselves as belonging to the Father, the Son, and the Holy Spirit. Early on we pause to acknowledge our sins and ask for mercy, so we come honestly before God. Then comes the Liturgy of the Word, where we listen to readings from Scripture, usually from the Old Testament, the letters of the Apostles, and finally the Gospel. We stand for the Gospel out of reverence, because we are listening to the words and deeds of Jesus Himself. Many Catholics trace a small cross on their forehead, lips, and heart at that moment, quietly asking that Christ be in their mind, on their lips, and in their heart. The priest then gives a homily to help us understand and live what we have heard. In the second half, the Liturgy of the Eucharist, bread and wine are offered, and in the consecration the priest, acting in the person of Christ, speaks Jesus own words from the Last Supper. Catholics believe Christ then becomes truly present, and those prepared come forward to receive Him in Holy Communion. At the end we are sent out, carrying Christ into our homes, work, and daily life. The standing, kneeling, and silence are not random. They are the body praying along with the heart. If you simply watch, follow gently, and let yourself be present, you are already taking part.',
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
      'The Eucharist is at the very heart of the Catholic faith. The Church calls it the source and summit of the Christian life, because everything flows from Christ and everything leads back to Him. To understand why, we go back to the night before Jesus died. At the Last Supper, He took bread and said, "This is my body," and took the cup and said, "This is my blood," and told the Apostles, "Do this in remembrance of me" (Luke 22:19-20). Catholics believe that at every Mass these same words make Christ truly present. Earlier, in John chapter 6, Jesus had already prepared His followers for this. He called Himself the Bread of Life and said plainly that His flesh is true food and His blood is true drink. This was a hard teaching, and Scripture tells us that many disciples walked away because of it. Jesus did not call them back to say He had only meant it as a symbol. After the Resurrection, two disciples on the road to Emmaus did not recognise Jesus as He walked and spoke with them, but they knew Him "in the breaking of the bread" (Luke 24:35). The earliest Christians, in the very first generations, wrote that the Eucharist is truly the Body and Blood of Christ. So when Catholics ask, "Is it just a symbol?" the answer they have held from the beginning is no. Catholics believe Jesus is truly present in the Eucharist, Body, Blood, Soul, and Divinity. This is why the Eucharist is treated with such reverence, with kneeling, silence, and adoration. It also explains something that can be confusing. Those who are not yet in full communion with the Catholic Church, or who are not yet prepared, do not receive Communion right away. This is not a rejection of the person or a judgement of their heart. Receiving Christ in the Eucharist expresses a unity of faith and life that is still growing, and the Church guards this gift with great care. In the meantime, anyone can make a Spiritual Communion, simply asking Jesus in prayer to come into their heart, expressing the same love and desire while they continue on the journey toward Him.',
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
      'Before prayer is a skill, it is a relationship. Prayer is simply lifting our mind and heart to God, the way we naturally open up to someone we love and trust. Because it is a relationship, there is more than one way to pray, and the Catholic tradition gently offers several. There is vocal prayer, where we use words, our own or trusted prayers like the Our Father that Jesus Himself taught. There is meditation, where we slowly ponder a scene from the Gospels or a line of Scripture and let it speak to us. There is the quiet of contemplation, simply resting in God present silence, without needing many words. The Rosary weaves these together, repeating familiar prayers while we walk through the life of Christ with Mary. Praying with Scripture, reading slowly and listening, lets God Word shape our own words back to Him. You may find that prayer sometimes feels dry, distracted, or empty, as if nothing is happening. This is part of almost every life of prayer. Many of the saints, even great ones, lived through long seasons of spiritual dryness, where God felt distant. They kept praying anyway, and discovered that faithfulness, not feelings, is the true measure. God is near even when we feel nothing. The goal is not a perfect performance but simply showing up, honestly, again and again.',
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
      'This is often the most misunderstood part of the Catholic faith, so it is worth saying clearly at the start. Catholics worship God alone. Worship belongs to the Father, the Son, and the Holy Spirit, and to no one else. Catholics do not worship Mary or the saints. We honour them, which is something different. Consider Mary first. She was chosen by God to be the mother of Jesus, the one through whom the Son of God entered the world. When the angel came to her, she said yes to God with her whole life, and so she is often called the first disciple, the first to receive Christ and carry Him to others. Because she carried God Himself within her, early Christians saw her as the Ark of the New Covenant. The old Ark held sacred signs of God presence, while Mary held God present in the flesh. Yet Mary never points to herself. At the wedding at Cana, when the wine ran out, her words were about Jesus: "Do whatever he tells you" (John 2:5). That is what Mary always does. She leads us to her Son. The saints are simply Christians who have run the race before us and now live fully with Christ. Catholics believe that all the baptised, on earth and in heaven, are one Body of Christ, and that death does not cut a Christian off from Christ or from us. So just as you might ask a friend here to pray for you, Catholics ask the saints in heaven to pray with us and for us, trusting they are more alive in God than ever. You may ask, "Why not just go directly to Jesus?" The answer is that Catholics do go directly to Jesus, every day, in prayer and in the Eucharist. Asking others to pray for us never replaces Him. It simply joins our prayer to the whole family of God, all of it gathered around the one Lord, Jesus Christ.',
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
      'For many people the hardest question about confession is simple: why tell my sins to a priest instead of just to God in my own heart? It is a fair question, and the Catholic answer goes back to Jesus Himself. After the Resurrection, Jesus appeared to the Apostles, breathed on them, and said, "Receive the Holy Spirit. If you forgive the sins of any, they are forgiven" (John 20:22-23). Jesus deliberately gave His Apostles the authority to forgive sins in His name. The Sacrament of Reconciliation, which we call confession, is how that gift continues today. The priest is not there because God does not already know your sins. God knows them fully and loves you still. The priest acts in the person of Christ, so that the forgiveness Jesus won for us is not only believed in the heart but actually heard, spoken aloud, gently and personally, to you. There is a deep grace in that. We are physical people, and Christ meets us in a real, human way, with real words of mercy. Confession is not about being shamed or scolded. The priest is bound to absolute secrecy and is there to welcome you home. It is about returning to God, telling the truth, receiving forgiveness, and beginning again, as many times as we need. The mercy of God is always greater than the sins and habits we bring to Him.',
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
      'The Catholic faith is not meant to stay inside a church building for one hour a week. It is meant to fill an ordinary life. The Church speaks of the universal call to holiness, the belief that God calls every person, not only priests and nuns, to become a saint right where they are. Holiness grows in the everyday. In family life, it looks like patience, forgiveness, and love that keeps showing up. In marriage, it is two people helping each other toward God and reflecting His faithful love. In work, it is honesty, diligence, and treating others with dignity, offering even small tasks to God. Living the faith also means facing temptation honestly. Everyone is tempted, and being tempted is not the same as failing. And when we do fall, the Catholic life is not about pretending we never stumble. It is about getting back up, returning to God through prayer and confession, and beginning again. Slowly, through these small faithful steps and the grace of the Sacraments, we are changed. We become, little by little, more like Christ: more loving, more humble, more free. That is the real adventure of the faith, and it is lived one ordinary day at a time.',
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
      'If something in you has been stirring through these steps, that is worth paying attention to. The next move is not complicated, and you do not have to take it all at once. The heart of it is finding a parish, a local Catholic community where the faith is lived with real people. For someone exploring whether to become Catholic, most parishes offer a process often called RCIA, or sometimes OCIA, which simply means a welcoming group that walks with adults who want to learn the faith, ask honest questions, and prepare to enter the Church. Along that path come the Sacraments that bring us fully into the life of Christ: Baptism for those not yet baptised, Confirmation which strengthens us with the Holy Spirit, the Eucharist where we receive Christ Himself, and Confession where we receive His mercy. You do not need to have it all figured out before you begin. You only need to be willing to take one step and let God lead the next. Catholic Journey 365 is glad to walk with you, but it is only a companion. The goal was never the app. The goal is a real life with God and with His Church, shared with a community that will know you, pray with you, and help you grow. Reaching out to a parish or a priest is how that life begins.',
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
