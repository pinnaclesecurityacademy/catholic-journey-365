export const FAITH_JOURNEY_ITEMS = [
  'Morning Prayer',
  'Scripture Reading',
  'Dive Deeper',
  'Saint of the Day',
  'Faith Formation',
  'Daily Devotion',
  'Personal Prayer',
  'Seeing God Today',
  'Evening Prayer',
];

export const SCRIPTURE_READING_ITEM = 'Scripture Reading';
export const DIVE_DEEPER_ITEM = 'Dive Deeper';
export const SAINT_OF_DAY_ITEM = 'Saint of the Day';
export const PERSONAL_PRAYER_ITEM = 'Personal Prayer';

export type DevotionCard = {
  title: string;
  body: string;
  linkLabel?: string;
  linkTo?: string;
};

export type SeeingGodReflection = {
  noticedWhere: string;
  noticedGod: string;
  personBeforeMe: string;
  graceToRemember: string;
};

export const MORNING_PRAYERS = [
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nLord Jesus, I give you this morning before I give it to my tasks, my worries, or my plans. Receive my thoughts, words, work, and rest. Teach me to begin with trust, to notice your grace, and to love the people you place before me. Keep me close to your Sacred Heart when I am hurried, distracted, or afraid. Let Scripture shape my mind, prayer soften my heart, and charity guide my actions. May this day become a quiet offering of love to you. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nFather of mercy, thank you for the gift of this day and for the faith that lets me begin it with you. Help me welcome today as a path to holiness, not a burden to survive. May my choices honor you, my words bring peace, and my heart remain open to the Holy Spirit. Through Mary, lead me closer to Jesus in all things. Give me courage to do what is right, humility to ask forgiveness, and joy in the small duties before me. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nHoly Spirit, come into this day. Give me wisdom when I am unsure, patience when I am tested, and courage when love asks something of me. Make my work an offering and my prayer sincere. Guard me from resentment, selfishness, and discouragement. Help me listen before I speak and forgive before bitterness takes root. Let me follow Christ with a steady heart, trusting that grace is enough for every moment you permit. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nJesus, I place this day in your hands. Walk with me in quiet duties, ordinary conversations, and hidden sacrifices. Help me receive Scripture with faith and carry it into action. When I am tempted to rush past people, slow me down. When I am tempted to judge, teach me mercy. When I am tired, remind me that you are gentle and humble of heart. Let my life today become a simple yes to your love. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nLord God, before the day becomes busy, I turn to you. Guard my mind from distraction, my tongue from harm, and my heart from pride. May I seek your will, serve with humility, and remember that every moment can become prayer. Bless my home, my work, my responsibilities, and the people I will meet. Help me choose faith over fear and love over self-protection. Keep my eyes fixed on Christ from morning until night. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nChrist my Lord, you are the light of the world. Shine into my morning and guide my steps. Where I am weak, be my strength. Where I am anxious, be my peace. Where I am tempted, keep me faithful. I belong to you today. Teach me to see this day as a place of encounter with you: in Scripture, in prayer, in the poor, in my family, and in every person who needs patience or kindness from me. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nHeavenly Father, I offer you my prayers, works, joys, and sufferings of this day. Unite them to the sacrifice of Jesus. Bless my family, my duties, and all who need mercy. Help me live this day as your child, not as someone alone or forgotten. Give me a clean heart, a teachable spirit, and a willingness to begin again whenever I fall. May the Holy Spirit make my ordinary life a place where your love is visible. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nLord Jesus, teach me to love as you love. Let me see the lonely, forgive the difficult, encourage the weary, and serve without seeking praise. May Mary, your mother, pray for me and lead me always to you. Keep me from using faith as a mask while my heart remains closed. Make me honest in prayer, generous in service, and faithful in small things. Let every part of this day draw me deeper into your mercy. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nGod of all goodness, I receive this day from your hand. Give me a listening heart for your word, a generous heart for others, and a repentant heart when I fall. Let me be attentive to the quiet invitations of grace. Help me notice where you are at work in ordinary things: a conversation, a task, a delay, a need I did not expect. Keep me close to the Church, close to Scripture, and close to Christ. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nJesus, meek and humble of heart, make my heart like yours. Help me choose patience over anger, truth over comfort, and mercy over judgment. Let my ordinary work become a place where your grace can be seen. If I carry worry today, teach me to surrender it. If I meet conflict, teach me peace. If I receive joy, teach me gratitude. May I walk through this day as someone loved by God and sent to love. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nHoly Trinity, I adore you and thank you for this new day. Draw me into the life of your love. May my prayer be honest, my service cheerful, and my conscience attentive. Lead me step by step toward holiness. Help me begin again without discouragement and keep going without pride. Let the Cross of Christ shape how I think, speak, forgive, and serve. May my day end with a heart more open to you than when it began. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nLord, I do not know all this day will hold, but you do. Help me trust your providence. Give me grace for each task, charity for each person, and peace in each interruption. When plans change, help me stay gentle. When I feel stretched, help me remember that you are near. Keep me faithful to prayer, honest in my work, and generous with my attention. Let me walk with Christ today in the hidden places of ordinary life. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nFather, awaken gratitude in me. Thank you for breath, faith, family, the Church, and the promise of your mercy. Help me spend this day well, not in fear or hurry, but in love for you and my neighbor. Let me receive your word with humility and practice it with courage. Show me one concrete way to love today. If I fail, lead me quickly back to you with trust. May this day belong to you. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nJesus, Good Shepherd, lead me today. Keep me near your voice in Scripture and prayer. Bring back what wanders in me, heal what is wounded, and teach me to care for others with your tenderness. Protect me from the noise that makes me forget you. Give me a heart that can be corrected, comforted, and sent. Let my steps today follow your path of mercy, truth, humility, and peace. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nLord God, I begin again with you. Forgive yesterday\'s failures and strengthen today\'s faith. May I choose what is good, reject what leads me from you, and finish this day closer to Christ than when I began. Help me carry my cross without complaint, receive blessings without entitlement, and meet others with patience. Let the Holy Spirit guide my thoughts, steady my emotions, and make my love practical. Amen.',
];

export const EVENING_PRAYERS = [
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nFather, thank you for the graces of this day. Show me where you were near, where I loved well, and where I failed to love. I am sorry for my sins, especially the moments when I chose pride, impatience, fear, or selfishness. I trust in your mercy more than in my own strength. Bless the people I met today, heal what I wounded, and receive what I offered in love. Guard me through the night and let me rest in your peace. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nLord Jesus, I look back on this day with you. Thank you for every hidden gift: breath, food, work, prayer, kindness, and protection. Forgive my impatience, pride, neglect, and any time I passed by someone who needed love. Heal what I cannot repair tonight. I place my worries, unfinished tasks, and restless thoughts in your hands. Teach me to trust your mercy while I sleep, and wake me ready to begin again. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nHoly Spirit, help me review this day with honesty and hope. Where I noticed grace, let me give thanks. Where I resisted love, lead me to repentance. Where I feel tired, give me rest. Bring to mind one moment where God was present, one person I should pray for, and one fault I should surrender. I trust that the Father is still working even when I cannot see it. Prepare my heart for tomorrow. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nGod of mercy, thank you for carrying me through this day. I offer you its joys, burdens, conversations, silences, and disappointments. Forgive what was selfish, careless, or untrue. Bless those I met, especially anyone I found difficult to love. Help me release resentment and receive your peace. Keep me close to Jesus while I sleep, and let this night become a quiet act of trust in your care. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nJesus, before I rest, I place this day before your Sacred Heart. Thank you for the good I received and the good you allowed me to do. Forgive the good I failed to do and the sins I excused too easily. Teach me to trust your mercy and begin again tomorrow without discouragement. I give you my body, mind, memory, and heart. Stay with me through the night and let me rest in your love. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nFather, I thank you for your patience with me. Help me see where I followed your grace and where I turned away. I repent of my sins and ask for a peaceful heart. If I spoke harshly, make me humble. If I avoided what was right, give me courage. If I carried worry alone, teach me trust. Into your hands I commend this night, my loved ones, and all who need your mercy. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nLord, the day is ending. I thank you for protection, food, friendship, work, prayer, and every grace I noticed or missed. I ask forgiveness for careless words, wasted time, and missed chances to love. Cover my home with peace and let me rest in you. Bless the sick, the lonely, the grieving, and those who feel forgotten tonight. May the angels guard us and may Christ be our light in the darkness. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nChrist my Savior, review this day with me. Let gratitude rise for every gift. Let repentance be sincere for every sin. Let trust replace worry. I give you the moments that brought joy and the moments that exposed my weakness. Thank you for never leaving me. Forgive me, heal me, and teach me to love better tomorrow. Stay with me in the quiet of night and let my soul rest in your mercy. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nLoving Father, I remember this day before you. For kindness received, thank you. For kindness withheld, forgive me. For wounds and worries, heal me. For tomorrow, guide me. I place before you the people I love, the people I failed, and the people who need prayer tonight. Help me forgive and be forgiven. Let my soul rest in your care, trusting that your mercy is new every morning. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nJesus, I surrender this day to you. Receive what was good, purify what was sinful, and repair what was broken. I trust your mercy more than my weakness. Thank you for every quiet sign of your presence. Forgive the ways I resisted grace or forgot your love. Teach me to let go of what I cannot control. Grant me peaceful sleep, a clean heart, and a faithful desire to follow you tomorrow. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nHoly Spirit, bring light to my memory. Show me one grace to thank you for, one fault to confess, and one person to pray for. I do not want to end this day in fear or self-judgment, but in truth before the Father who loves me. Lead me to repentance without despair and gratitude without pride. I trust that God is still working as I rest. Come, Holy Spirit, and renew my heart. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nFather, I end this day in your presence. Thank you for staying near even when I forgot you. Forgive my sins and renew my desire for holiness. Help me learn from this day without being trapped by it. Keep watch over all who suffer tonight: the sick, the poor, the anxious, the lonely, and those close to death. Hold my loved ones in your mercy. Let me rest as your child, safe in your hands. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nLord Jesus, be my peace tonight. I thank you for the graces I noticed and the graces I missed. I repent of what drew me from you. Help me forgive others and receive your forgiveness. If I am carrying regret, meet me with mercy. If I am carrying fear, meet me with peace. If I am carrying gratitude, make it worship. Let my sleep be restful and my waking be offered to you. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nGod of rest, I place my body, mind, and soul before you. Thank you for this day and for every way you sustained me. Cleanse my heart of sin, calm my fears, and teach me to trust you. I release the work left unfinished and the burdens I cannot solve tonight. May your mercy cover my home, my thoughts, and my dreams. Let me wake ready to love again, strengthened by your grace. Amen.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nFather, into your hands I place the day now finished. I thank you, I repent, I forgive, and I trust. Receive every small act of love and forgive every failure to love. Let Mary pray for me, let the angels guard me, and let Christ be my peace. I surrender the night to your providence. May my heart rest in your mercy and rise tomorrow ready to walk with you again. Amen.',
];

export const DEVOTION_CARDS: DevotionCard[] = [
  {
    title: 'Rosary',
    body: 'Pray with Mary by meditating on the life of Christ. Let each decade turn your attention to Jesus.',
    linkLabel: 'Open Rosary',
    linkTo: '/rosary',
  },
  {
    title: 'Divine Mercy',
    body: 'Entrust yourself and the world to the mercy flowing from the pierced Heart of Jesus.',
    linkLabel: 'Pray Chaplet',
    linkTo: '/prayer/devotions/divine-mercy-chaplet',
  },
  {
    title: 'Saint Reflection',
    body: 'Learn from a holy life and ask the saints to pray for you as you follow Christ.',
    linkLabel: 'Saint of the Day',
    linkTo: '/saint',
  },
  {
    title: 'Eucharistic Reflection',
    body: 'Pause before the mystery of Christ truly present in the Eucharist. Ask for deeper reverence and hunger for him.',
  },
  {
    title: 'Marian Devotion',
    body: 'Ask Mary to pray for you and lead you closer to her Son. Her heart always points to Christ.',
    linkLabel: 'Marian Prayers',
    linkTo: '/prayer/devotions/immaculate-heart-of-mary',
  },
  {
    title: 'Works of Mercy',
    body: 'Choose one act of mercy today: feed, visit, forgive, encourage, teach, comfort, or pray.',
  },
  {
    title: 'Sunday Mass Focus',
    body: 'Prepare your heart for Mass. Bring your week, your needs, and your gratitude to the altar.',
    linkLabel: 'Mass Readings',
    linkTo: '/mass',
  },
];

export function mergeFaithJourneyChecks(
  localItems: string[],
  autoItems: string[]
) {
  return Array.from(new Set([...localItems, ...autoItems]));
}

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function faithJourneyStorageKey(date = new Date()) {
  return `cj365-faith-journey-${todayKey(date)}`;
}

export function readFaithJourneyChecks(date = new Date()) {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(faithJourneyStorageKey(date));
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === 'string')
      .map((item) => (item === 'Five Finger Prayer' ? PERSONAL_PRAYER_ITEM : item));
  } catch {
    return [];
  }
}

export function writeFaithJourneyChecks(items: string[], date = new Date()) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    faithJourneyStorageKey(date),
    JSON.stringify(items)
  );
}

export function getRotatingMorningPrayer(dayNumber: number) {
  return MORNING_PRAYERS[(dayNumber - 1) % MORNING_PRAYERS.length];
}

export function getRotatingEveningPrayer(dayNumber: number) {
  return EVENING_PRAYERS[(dayNumber - 1) % EVENING_PRAYERS.length];
}

export function getRotatingDevotion(dayNumber: number) {
  return DEVOTION_CARDS[(dayNumber - 1) % DEVOTION_CARDS.length];
}

export type FormationLesson = {
  title: string;
  introduction: string;
  sections: { title: string; body: string }[];
  scriptureConnection: string;
  catholicPractice: string;
  reflection: string;
};

// Starter daily Faith Formation lessons. This is the structure for a future
// daily formation journey; more lessons can be added over time. The Faith tab
// remains the full learning library.
export const FORMATION_LESSONS: FormationLesson[] = [
  {
    title: 'Why Catholics Begin with the Sign of the Cross',
    introduction:
      'The Sign of the Cross is one of the simplest Catholic prayers. It is also one of the richest. Before we say many words, we place ourselves before God, remember Christ, and begin with faith.',
    sections: [
      {
        title: 'We begin with God as Trinity',
        body: 'When Catholics say, "In the name of the Father, and of the Son, and of the Holy Spirit," we are not just starting a prayer. We are naming the God who has loved us first. Christian prayer begins in the life of the Trinity, not in our own effort.',
      },
      {
        title: 'We remember the Cross of Christ',
        body: 'Tracing the Cross over the body reminds us that Jesus saved us through his death and Resurrection. The Cross is not a decoration. It is the sign of the love that entered suffering, conquered sin, and opened the way to new life.',
      },
      {
        title: 'We offer our whole self',
        body: 'The gesture touches the head, heart, and shoulders. It quietly says that our mind, our love, our strength, and our actions belong to God. Even before a longer prayer begins, the body is already praying.',
      },
    ],
    scriptureConnection:
      'Jesus tells his disciples to baptize "in the name of the Father and of the Son and of the Holy Spirit" (Matthew 28:19). Saint Paul also reminds us that Christ crucified is the power and wisdom of God (1 Corinthians 1:23-24). The Sign of the Cross holds both truths together.',
    catholicPractice:
      'When you make the Sign of the Cross, try making it slowly. Let the words mean what they say. You are beginning in God, remembering Jesus, and asking the Holy Spirit to help you pray with your whole life.',
    reflection:
      'When I make the Sign of the Cross today, what part of my life do I most need to place under the love and mercy of Christ?',
  },
  {
    title: 'What Is Prayer?',
    introduction:
      'Before prayer is a skill, it is a relationship. Prayer is simply lifting our mind and heart to God, the way we naturally open up to someone we love and trust.',
    sections: [
      {
        title: 'Prayer is conversation with God',
        body: 'We can speak to God in our own words, use prayers He has given us like the Our Father, ponder Scripture slowly, or simply rest quietly in His presence. There is more than one way to pray because prayer is a living relationship.',
      },
      {
        title: 'Faithfulness, not feelings',
        body: 'Sometimes prayer feels rich and sometimes it feels dry. Many saints lived long seasons where God felt distant, and they kept praying anyway. God is near even when we feel nothing. What matters is showing up honestly, again and again.',
      },
    ],
    scriptureConnection:
      'When the disciples asked, "Lord, teach us to pray," Jesus gave them the Our Father (Luke 11:1-4). Saint Paul urges us to "pray without ceasing" (1 Thessalonians 5:17).',
    catholicPractice:
      'Pray one Our Father slowly today. If your mind wanders, gently begin again without discouragement.',
    reflection:
      'What makes prayer hard for me right now, and where is God inviting me to simply begin?',
  },
  {
    title: 'What Is the Eucharist?',
    introduction:
      'The Eucharist is at the very heart of the Catholic faith. The Church calls it the source and summit of the Christian life, because everything flows from Christ and everything leads back to Him.',
    sections: [
      {
        title: 'The gift of the Last Supper',
        body: 'At the Last Supper, Jesus took bread and said, "This is my body," and took the cup and said, "This is my blood," telling the Apostles, "Do this in remembrance of me." Catholics believe that at every Mass these same words make Christ truly present.',
      },
      {
        title: 'Truly present, not only a symbol',
        body: 'In John 6, Jesus called Himself the Bread of Life and said His flesh is true food. Catholics believe He is truly present, Body, Blood, Soul, and Divinity. This is why the Eucharist is received with such reverence.',
      },
    ],
    scriptureConnection:
      'On the road to Emmaus the disciples recognised the risen Jesus "in the breaking of the bread" (Luke 24:35).',
    catholicPractice:
      'Spend one quiet minute today thanking Jesus for staying close to His Church in the Eucharist. If you cannot receive Communion, make a Spiritual Communion, asking Him into your heart.',
    reflection:
      'What does it mean to me that Jesus wants to be this close to His people?',
  },
  {
    title: 'Why Catholics Honour the Saints',
    introduction:
      'This is often the most misunderstood part of the Catholic faith. Catholics worship God alone. We do not worship Mary or the saints. We honour them, which is something different.',
    sections: [
      {
        title: 'One family in Christ',
        body: 'The saints are Christians who have run the race before us and now live fully with God. Because death does not cut a Christian off from Christ or from us, we can ask the saints to pray with us, just as we ask friends here to pray for us.',
      },
      {
        title: 'They always point to Jesus',
        body: 'Asking the saints to pray for us never replaces Jesus. Catholics go directly to Him every day. At Cana, Mary\'s words were about her Son: "Do whatever he tells you" (John 2:5). That is what the saints always do.',
      },
    ],
    scriptureConnection:
      'We are "surrounded by so great a cloud of witnesses" (Hebrews 12:1), the whole family of God gathered around the one Lord, Jesus Christ.',
    catholicPractice:
      'Ask Mary or a saint you know about to pray for you today, then turn your heart directly to Jesus.',
    reflection:
      'Does asking the saints to pray for me feel comforting, confusing, or unfamiliar, and why?',
  },
  {
    title: 'What Happens at Mass?',
    introduction:
      'The Mass can feel like everyone knows a rhythm you have not learned yet. That is normal. The Mass is really one journey with a clear shape.',
    sections: [
      {
        title: 'The Liturgy of the Word',
        body: 'We gather, ask for God\'s mercy, and listen to readings from Scripture, standing for the Gospel out of reverence because we are hearing the words and deeds of Jesus. The homily helps us understand and live what we have heard.',
      },
      {
        title: 'The Liturgy of the Eucharist',
        body: 'Bread and wine are offered, and in the consecration the priest, acting in the person of Christ, speaks Jesus\' own words from the Last Supper. Catholics believe Christ becomes truly present, and we are then sent out to carry Him into daily life.',
      },
    ],
    scriptureConnection:
      'The first Christians "devoted themselves to the apostles\' teaching and fellowship, to the breaking of bread and the prayers" (Acts 2:42).',
    catholicPractice:
      'Next time you are at Mass, notice when people stand, sit, and kneel. The body prays along with the heart.',
    reflection:
      'Which part of the Mass do I most want to understand better?',
  },
  {
    title: 'Why Scripture Matters',
    introduction:
      'Scripture is the Word of God, given to us through the Church which prayed, preserved, and discerned which writings are inspired. In it, God speaks to us still.',
    sections: [
      {
        title: 'God speaks to us',
        body: 'Reading Scripture is not only studying an ancient text. It is listening to a living God who wants to meet us. The Church reads it at every Mass and invites us to make it part of daily prayer.',
      },
      {
        title: 'Word and Church together',
        body: 'Christ gave us both His Word and a living Church to help us understand and live it together, so that we are not left to figure everything out alone.',
      },
    ],
    scriptureConnection:
      '"All Scripture is inspired by God and profitable for teaching" (2 Timothy 3:16). Saint Jerome wrote that ignorance of Scripture is ignorance of Christ.',
    catholicPractice:
      'Read a short Gospel passage slowly today, such as Luke 15:1-7, and let one line speak to you.',
    reflection:
      'Where is God inviting me to listen to His Word more closely this week?',
  },
  {
    title: 'Why Fasting Matters',
    introduction:
      'Fasting is the deliberate giving up of food, or other good things, for a time, to turn our hearts more fully toward God. With prayer and almsgiving, it is one of the three great practices Jesus assumes His followers will live.',
    sections: [
      {
        title: 'Making room for God',
        body: 'By going without, we make room. The small hunger we feel becomes a reminder to pray and to depend on God. Fasting humbles us and loosens the grip our desires can have on us.',
      },
      {
        title: 'Joined to prayer and charity',
        body: 'Fasting on its own can become mere willpower. Joined to prayer it becomes a conversation with God, and what we give up can become what we give away to those in need.',
      },
    ],
    scriptureConnection:
      'Jesus fasted forty days in the desert and overcame temptation, saying, "Man shall not live by bread alone, but by every word that comes from the mouth of God" (Matthew 4:4).',
    catholicPractice:
      'Choose one small thing to give up today, a snack, a comfort, or some screen time, and offer that small hunger to God in prayer.',
    reflection:
      'What is one good thing I could set aside today to make more room for God?',
  },
];

export function getRotatingFormationLesson(dayNumber: number): FormationLesson {
  const index = ((dayNumber - 1) % FORMATION_LESSONS.length + FORMATION_LESSONS.length) %
    FORMATION_LESSONS.length;
  return FORMATION_LESSONS[index];
}

export function seeingGodStorageKey(date = new Date()) {
  return `cj365-seeing-god-${todayKey(date)}`;
}

export function readSeeingGodReflection(date = new Date()): SeeingGodReflection {
  if (typeof window === 'undefined') {
    return {
      noticedWhere: '',
      noticedGod: '',
      personBeforeMe: '',
      graceToRemember: '',
    };
  }

  try {
    const raw = window.localStorage.getItem(seeingGodStorageKey(date));
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      noticedWhere:
        typeof parsed.noticedWhere === 'string' ? parsed.noticedWhere : '',
      noticedGod: typeof parsed.noticedGod === 'string' ? parsed.noticedGod : '',
      personBeforeMe:
        typeof parsed.personBeforeMe === 'string' ? parsed.personBeforeMe : '',
      graceToRemember:
        typeof parsed.graceToRemember === 'string'
          ? parsed.graceToRemember
          : '',
    };
  } catch {
    return {
      noticedWhere: '',
      noticedGod: '',
      personBeforeMe: '',
      graceToRemember: '',
    };
  }
}

export function writeSeeingGodReflection(
  reflection: SeeingGodReflection,
  date = new Date()
) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    seeingGodStorageKey(date),
    JSON.stringify(reflection)
  );
}
