// Prayer library, traditional Catholic prayers (fixed, canonical texts) with
// a short "Why Catholics pray this" explanation for each.
// No tracking, no database, no external content.

import {
  stations as stationData,
  stationsEducation,
  stationReflection,
} from './stationsContent';

export interface PrayerSection {
  heading: string;
  body: string;
  /** When true, the body is a prayer and is shown in the Sacred Prayer style. */
  pray?: boolean;
}

export interface Prayer {
  id: string;
  title: string;
  content: string;
  explanation: string;
  /**
   * Optional prayer-book line/stanza formatting for display only.
   * The words are identical to `content`; only the visual line breaks differ
   * (semicolon run-ons become line/stanza breaks). `content` remains the
   * canonical, unaltered text. Lines are separated by "\n", stanzas by "\n\n".
   */
  verse?: string;
  /** Optional structured formation sections (used by the Stations). */
  sections?: PrayerSection[];
  /**
   * When true, this prayer is a novena: its sections are an intro followed by
   * nine days, presented one day at a time (About → Begin → Day 1 … Day 9).
   */
  isNovena?: boolean;
  /** When true, this prayer is shown as a guided Divine Mercy Chaplet flow. */
  isChaplet?: boolean;
}

export interface PrayerCategory {
  id: string;
  title: string;
  /** When true, items launch the guided Rosary flow instead of a detail page. */
  isRosary?: boolean;
  prayers: Prayer[];
}

const STATION_VERSICLE =
  'We adore you, O Christ, and we praise you.\nBecause by your holy Cross you have redeemed the world.';

const stations: Prayer[] = [
  {
    id: 'about',
    title: 'About the Stations',
    content: '',
    explanation: '',
    sections: [
      { heading: 'What are the Stations?', body: stationsEducation.whatAre },
      { heading: 'Why Catholics pray them', body: stationsEducation.whyPray },
      { heading: 'How to pray them', body: stationsEducation.howToPray },
    ],
  },
  ...stationData.map((s) => ({
    id: `station-${s.number}`,
    title: `${s.number}. ${s.title}`,
    content: '',
    explanation: '',
    sections: [
      { heading: 'Reflection', body: stationReflection(s) },
      { heading: 'Prayer', body: STATION_VERSICLE },
    ],
  })),
];

export const prayerCategories: PrayerCategory[] = [
  {
    id: 'essential',
    title: 'Essential Prayers',
    prayers: [
      {
        id: 'sign-of-the-cross',
        title: 'Sign of the Cross',
        content:
          'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        verse:
          'In the name of the Father,\nand of the Son,\nand of the Holy Spirit.\n\nAmen.',
        explanation:
          'The Sign of the Cross opens and closes our prayer, marking us as followers of Jesus, who died on the Cross for us. Naming the Father, Son, and Holy Spirit professes our faith in the Holy Trinity and recalls our Baptism (Matthew 28:19). Tracing the cross over ourselves asks God to bless our thoughts, words, and actions. It is a simple gesture that turns our whole self toward God.',
      },
      {
        id: 'our-father',
        title: 'Our Father',
        content:
          'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
        verse:
          'Our Father,\nwho art in heaven,\nhallowed be thy name.\n\nThy kingdom come,\nthy will be done,\non earth as it is in heaven.\n\nGive us this day\nour daily bread,\nand forgive us our trespasses,\nas we forgive those who trespass against us,\nand lead us not into temptation,\nbut deliver us from evil.\n\nAmen.',
        explanation:
          'The Our Father is the prayer Jesus himself taught his disciples when they asked him how to pray (Matthew 6:9-13; Luke 11:1-4). In it we call God our Father and trust him for our daily needs, our forgiveness, and our protection. Because it comes from the lips of Christ, the Church calls it a summary of the whole Gospel. Praying it forms us to live as God’s beloved children.',
      },
      {
        id: 'hail-mary',
        title: 'Hail Mary',
        content:
          'Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
        verse:
          'Hail Mary, full of grace,\nthe Lord is with thee.\n\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb,\nJesus.\n\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death.\n\nAmen.',
        explanation:
          'The Hail Mary joins the words of the angel Gabriel and St. Elizabeth from the Gospel (Luke 1:28, 42) with the Church’s prayer asking Mary to intercede for us. We honor Mary not as God, but as the Mother of Jesus who always points us to her Son. Asking her prayers is like asking a loving mother to pray for us “now and at the hour of our death.” It draws us closer to Christ through the one who knew him best.',
      },
      {
        id: 'glory-be',
        title: 'Glory Be',
        content:
          'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
        verse:
          'Glory be to the Father,\nand to the Son,\nand to the Holy Spirit.\n\nAs it was in the beginning,\nis now, and ever shall be,\nworld without end.\n\nAmen.',
        explanation:
          'The Glory Be is a short hymn of praise to the Holy Trinity: Father, Son, and Holy Spirit. It echoes the worship of heaven and the baptismal faith of the Church (Matthew 28:19). By praying it we give God glory simply for who he is, not only for what he gives us. It reminds us that God’s love is eternal, “as it was in the beginning, is now, and ever shall be.”',
      },
      {
        id: 'apostles-creed',
        title: 'Apostles Creed',
        content:
          'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
        verse:
          'I believe in God,\nthe Father almighty,\nCreator of heaven and earth,\n\nand in Jesus Christ, his only Son, our Lord,\nwho was conceived by the Holy Spirit,\nborn of the Virgin Mary,\nsuffered under Pontius Pilate,\nwas crucified, died and was buried;\nhe descended into hell;\non the third day he rose again from the dead;\nhe ascended into heaven,\nand is seated at the right hand of God the Father almighty;\nfrom there he will come to judge the living and the dead.\n\nI believe in the Holy Spirit,\nthe holy catholic Church,\nthe communion of saints,\nthe forgiveness of sins,\nthe resurrection of the body,\nand life everlasting.\n\nAmen.',
        explanation:
          'The Apostles’ Creed is an ancient summary of the Christian faith, rooted in the teaching of the apostles. It walks through the whole story of salvation: God the Father who creates, Jesus the Son who saves, and the Holy Spirit who gives life in the Church. Professing it unites us with Christians across the centuries who have believed the same truths. It forms our faith by reminding us of all that God has done for us in Christ.',
      },
      {
        id: 'nicene-creed',
        title: 'Nicene Creed',
        content:
          'I believe in one God, the Father almighty, maker of heaven and earth, of all things visible and invisible. I believe in one Lord Jesus Christ, the Only Begotten Son of God, born of the Father before all ages. God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through him all things were made. For us men and for our salvation he came down from heaven, and by the Holy Spirit was incarnate of the Virgin Mary, and became man. For our sake he was crucified under Pontius Pilate, he suffered death and was buried, and rose again on the third day in accordance with the Scriptures. He ascended into heaven and is seated at the right hand of the Father. He will come again in glory to judge the living and the dead and his kingdom will have no end. I believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is adored and glorified, who has spoken through the prophets. I believe in one, holy, catholic and apostolic Church. I confess one Baptism for the forgiveness of sins and I look forward to the resurrection of the dead and the life of the world to come. Amen.',
        verse:
          'I believe in one God,\nthe Father almighty,\nmaker of heaven and earth,\nof all things visible and invisible.\n\nI believe in one Lord Jesus Christ,\nthe Only Begotten Son of God,\nborn of the Father before all ages.\nGod from God, Light from Light,\ntrue God from true God,\nbegotten, not made,\nconsubstantial with the Father;\nthrough him all things were made.\n\nFor us men and for our salvation\nhe came down from heaven,\nand by the Holy Spirit was incarnate of the Virgin Mary,\nand became man.\n\nFor our sake he was crucified under Pontius Pilate,\nhe suffered death and was buried,\nand rose again on the third day\nin accordance with the Scriptures.\nHe ascended into heaven\nand is seated at the right hand of the Father.\nHe will come again in glory\nto judge the living and the dead\nand his kingdom will have no end.\n\nI believe in the Holy Spirit, the Lord, the giver of life,\nwho proceeds from the Father and the Son,\nwho with the Father and the Son is adored and glorified,\nwho has spoken through the prophets.\n\nI believe in one, holy, catholic and apostolic Church.\nI confess one Baptism for the forgiveness of sins\nand I look forward to the resurrection of the dead\nand the life of the world to come.\n\nAmen.',
        explanation:
          'The Nicene Creed was written by the early Church to clearly profess who Jesus is: true God and true man. Catholics pray it together at Mass each Sunday, proclaiming one shared faith. It draws deeply on Scripture, especially that Christ died and “rose again on the third day in accordance with the Scriptures” (1 Corinthians 15:3-4). Reciting it roots us in the unchanging truth of the Gospel.',
      },
    ],
  },
  {
    id: 'daily',
    title: 'Daily Prayers',
    prayers: [
      {
        id: 'morning-prayer',
        title: 'Morning Prayer',
        content:
          'O Jesus, through the Immaculate Heart of Mary, I offer you my prayers, works, joys, and sufferings of this day, in union with the Holy Sacrifice of the Mass throughout the world. I offer them for all the intentions of your Sacred Heart. Amen.',
        verse:
          'O Jesus,\nthrough the Immaculate Heart of Mary,\nI offer you my prayers, works, joys,\nand sufferings of this day,\nin union with the Holy Sacrifice of the Mass\nthroughout the world.\n\nI offer them for all the intentions\nof your Sacred Heart.\n\nAmen.',
        explanation:
          'Catholics begin the day with God so that everything that follows, our work, our struggles, our small joys, is offered to him. This Morning Offering hands the whole day to Jesus before it even begins. Starting with prayer keeps our hearts turned toward Christ from our very first waking moments, so the day becomes a gift returned to God.',
      },
      {
        id: 'midday-prayer',
        title: 'Midday Prayer',
        content:
          'Lord, in the middle of this day I pause to remember you. Quiet my busyness, renew my strength, and turn my heart back to you in all that I do. Help me to carry your peace into the rest of this day. Amen.',
        verse:
          'Lord, in the middle of this day\nI pause to remember you.\n\nQuiet my busyness,\nrenew my strength,\nand turn my heart back to you\nin all that I do.\n\nHelp me to carry your peace\ninto the rest of this day.\n\nAmen.',
        explanation:
          'Life can pull us in many directions, and by midday we often forget God in the rush. Pausing to pray returns our attention to him and steadies us. This small moment of stillness lets Christ back into our day, reminding us that he is with us in our work as much as in our rest.',
      },
      {
        id: 'night-prayer',
        title: 'Night Prayer',
        content:
          'Lord, before I sleep I thank you for the gifts of this day. I am sorry for the times I failed to love. Watch over me and those I love through this night, and let me rest safely in your peace. Amen.',
        verse:
          'Lord, before I sleep\nI thank you for the gifts of this day.\n\nI am sorry for the times I failed to love.\n\nWatch over me and those I love\nthrough this night,\nand let me rest safely in your peace.\n\nAmen.',
        explanation:
          'Catholics end the day by looking back with gratitude, asking forgiveness for their failings, and entrusting the night to God. This gentle examination of the day keeps our hearts honest and humble. Resting in God’s mercy each night teaches us to trust Christ with everything, even our sleep.',
      },
      {
        id: 'prayer-before-meals',
        title: 'Prayer Before Meals',
        content:
          'Bless us, O Lord, and these your gifts, which we are about to receive from your bounty, through Christ our Lord. Amen.',
        verse:
          'Bless us, O Lord,\nand these your gifts,\nwhich we are about to receive\nfrom your bounty,\nthrough Christ our Lord.\n\nAmen.',
        explanation:
          'Pausing before a meal reminds us that everything we have is a gift from God. Giving thanks keeps us humble and grateful rather than taking our blessings for granted. It also calls us to remember those who are hungry, joining our small table to Christ’s care for the whole world.',
      },
      {
        id: 'simple-way-to-pray',
        title: 'A Simple Way to Pray',
        content: '',
        explanation: '',
        sections: [
          {
            heading: 'A simple way to pray',
            body: 'Pope Francis once shared a simple way of using the five fingers of the hand as reminders of who to pray for. It teaches us that prayer is not only about asking for ourselves, but about bringing others before God. You can pray through your hand, one finger at a time.',
          },
          {
            heading: 'Thumb, Those closest to us',
            body: 'The thumb is closest to you, reminding you to pray for those nearest your heart: your family, your friends, and your loved ones.',
          },
          {
            heading: 'Index finger, Those who guide us',
            body: 'The pointing finger reminds you to pray for those who teach and guide: parents, teachers, priests, mentors, and all who help others find the way.',
          },
          {
            heading: 'Middle finger, Leaders',
            body: 'The tallest finger reminds you to pray for those in authority: leaders, governments, and all who carry heavy responsibility for others.',
          },
          {
            heading: 'Ring finger, Those who are struggling',
            body: 'The weakest finger reminds you to pray for those who are struggling: the sick, the suffering, the lonely, and the vulnerable.',
          },
          {
            heading: 'Little finger, Ourselves',
            body: 'The smallest finger reminds you to come before God with humility, placing your own needs last and gently in his hands.',
          },
          {
            heading: 'A habit of prayer',
            body: 'This simple guide helps us build a habit of prayer that looks outward with love before turning inward, drawing us closer to the heart of Christ, who gave himself for others.',
          },
        ],
      },
    ],
  },
  {
    id: 'rosary',
    title: 'Rosary & Marian Prayers',
    isRosary: true,
    prayers: [
      {
        id: 'joyful',
        title: 'Joyful Mysteries',
        content: '',
        explanation: '',
      },
      {
        id: 'luminous',
        title: 'Luminous Mysteries',
        content: '',
        explanation: '',
      },
      {
        id: 'sorrowful',
        title: 'Sorrowful Mysteries',
        content: '',
        explanation: '',
      },
      {
        id: 'glorious',
        title: 'Glorious Mysteries',
        content: '',
        explanation: '',
      },
    ],
  },
  {
    id: 'stations',
    title: 'Stations of the Cross',
    prayers: stations,
  },
  {
    id: 'devotions',
    title: 'Devotions',
    prayers: [
      {
        id: 'divine-mercy-chaplet',
        title: 'Divine Mercy Chaplet',
        content: '',
        sections: [
          {
            heading: 'How to begin',
            body: 'Begin with the Sign of the Cross, one Our Father, one Hail Mary, and the Apostles’ Creed.',
          },
          {
            heading: 'On the large bead before each decade',
            body: 'Eternal Father, I offer you the Body and Blood,\nSoul and Divinity of Your dearly beloved Son,\nOur Lord Jesus Christ,\nin atonement for our sins\nand those of the whole world.',
            pray: true,
          },
          {
            heading: 'On the ten small beads of each decade',
            body: 'For the sake of His sorrowful Passion,\nhave mercy on us and on the whole world.',
            pray: true,
          },
          {
            heading: 'Conclude (three times)',
            body: 'Holy God, Holy Mighty One, Holy Immortal One,\nhave mercy on us and on the whole world.',
            pray: true,
          },
        ],
        explanation:
          "The Divine Mercy Chaplet is a prayer of trust in God’s mercy, given through St. Faustina. Prayed on ordinary rosary beads, it offers to the Father the sacrifice of Jesus for the forgiveness of the whole world. It keeps our eyes on the mercy that flows from Christ’s Passion and his pierced Heart (John 19:34). Praying it forms us to trust Jesus and to ask his mercy for ourselves and for everyone.",
        isChaplet: true,
      },
      {
        id: 'mary-undoer-of-knots',
        title: 'Mary, Undoer of Knots Novena',
        content: '',
        explanation: '',
        isNovena: true,
        sections: [
          {
            heading: 'About this Novena',
            body: 'This devotion asks for Mary’s intercession in the tangled “knots” of our lives. The knots are the struggles, worries, sins, wounds, and difficulties we cannot seem to undo on our own. We bring them to Mary, trusting that she will gently untie them and lead us closer to her Son, Jesus.\n\nThis devotion became widely known through Pope Francis, who helped spread devotion to Mary Undoer of Knots.\n\nA novena is prayed over nine days. Each day below offers a theme, a short reflection, and a prayer. Pray one day at a time, bringing your own knots to Mary as you go.',
          },
          {
            heading: 'Day 1 · Trusting God',
            body: 'No knot is too tangled for God. When life feels beyond our control, Mary teaches us to place everything into the hands of her Son, who loves us and is never overwhelmed by our troubles.\n\nPrayer\nVirgin Mary, Undoer of Knots, today I bring you the burdens I cannot carry alone. Help me to trust that God is at work even when I cannot see the way. Take my worries into your hands and lead me to Jesus. Amen.',
          },
          {
            heading: 'Day 2 · Forgiveness',
            body: 'Some knots are tied by old hurts and resentments. Mary, who stood by the cross where Jesus forgave, helps us to let go and to forgive as we have been forgiven.\n\nPrayer\nMother Mary, untie the knots of bitterness in my heart. Help me to forgive those who have hurt me and to ask forgiveness where I have failed, so that the mercy of Jesus may set me free. Amen.',
          },
          {
            heading: 'Day 3 · Healing',
            body: 'Wounds of the heart can bind us tightly. Mary brings our hidden pain to Jesus, the gentle Healer, who restores what is broken in his own time and with great tenderness.\n\nPrayer\nUndoer of Knots, I place my wounds before you. Bring them to your Son, that his healing love may touch the places that still ache, and grant me the peace that only he can give. Amen.',
          },
          {
            heading: 'Day 4 · Patience',
            body: 'Not every knot is undone at once. Mary, who waited and pondered all things in her heart, teaches us to be patient with God, with others, and with ourselves.\n\nPrayer\nMother of fair love, when I grow weary of waiting, calm my restless heart. Help me to trust God’s timing and to walk patiently, knowing that you are gently untying what I cannot. Amen.',
          },
          {
            heading: 'Day 5 · Family Struggles',
            body: 'Many of our deepest knots are found in our homes and relationships. Mary, who cared for the Holy Family, intercedes for our families and helps love to grow where it has frayed.\n\nPrayer\nVirgin Mary, I entrust my family to you. Untie the knots of tension and misunderstanding among us, and draw us closer to one another and to Jesus, who is welcomed in every loving home. Amen.',
          },
          {
            heading: 'Day 6 · Surrender',
            body: 'There are knots we cannot loosen by force, only by letting go. Mary shows us how to say, as she did, “Let it be done to me,” surrendering our lives into the hands of God.\n\nPrayer\nMother Mary, teach me to surrender. Take from my grip the things I cannot fix, and help me to trust them to your Son, who holds all things with love. Amen.',
          },
          {
            heading: 'Day 7 · Faith',
            body: 'When the way is dark, faith holds on. Mary believed the promise of God even when she could not see how it would unfold, and she strengthens our faith in the same way.\n\nPrayer\nUndoer of Knots, when my faith grows weak, hold me close. Help me to believe in God’s goodness through every difficulty, and to keep my eyes fixed on Jesus. Amen.',
          },
          {
            heading: 'Day 8 · Hope',
            body: 'No tangle is the end of the story. Mary, who stood at the cross and rejoiced at the Resurrection, fills us with hope that God can bring new life out of every difficulty.\n\nPrayer\nMother Mary, renew my hope. Where I see only knots, help me to trust that God is preparing something good, and lead me toward the joy of your risen Son. Amen.',
          },
          {
            heading: 'Day 9 · Peace',
            body: 'When our knots are placed in God’s hands, peace returns. Mary leads us to Jesus, the Prince of Peace, who calms our hearts and quiets our fears.\n\nPrayer\nVirgin Mary, Undoer of Knots, thank you for carrying my struggles to your Son. Untie what remains tangled, and fill my heart with the peace of Christ, now and always. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'protection',
    title: 'Protection Prayers',
    prayers: [
      {
        id: 'st-michael',
        title: 'St Michael Prayer',
        content:
          'Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the heavenly host, by the power of God, cast into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen.',
        verse:
          'Saint Michael the Archangel,\ndefend us in battle.\n\nBe our protection\nagainst the wickedness and snares of the devil.\n\nMay God rebuke him, we humbly pray,\nand do thou, O Prince of the heavenly host,\nby the power of God,\ncast into hell Satan and all the evil spirits\nwho prowl about the world\nseeking the ruin of souls.\n\nAmen.',
        explanation:
          'St Michael the Archangel appears in Scripture as a great defender of God’s people (Daniel 12:1; Revelation 12:7). Catholics ask his intercession for protection against evil and for strength in spiritual struggle, because the Christian life includes a real battle against temptation and darkness, and we are not meant to fight it alone.\n\nCatholics worship God alone. We do not worship saints or angels. St Michael protects and intercedes only through the power of God, and calling on him reminds us that God’s power is far greater than any evil. This prayer draws us to trust in Christ, who has already won the victory.',
      },
    ],
  },
  {
    id: 'family',
    title: 'Family & Special Intentions',
    prayers: [
      {
        id: 'prayer-for-family',
        title: 'Prayer for Family',
        content:
          'Loving Father, bless our family. Strengthen our faith, deepen our love, and grant us patience with one another. Where there is hurt, give us forgiveness; where there is division, give us unity. Make our home a place where Christ is welcomed and your peace dwells. Amen.',
        verse:
          'Loving Father,\nbless our family.\n\nStrengthen our faith,\ndeepen our love,\nand grant us patience with one another.\n\nWhere there is hurt, give us forgiveness;\nwhere there is division, give us unity.\n\nMake our home a place\nwhere Christ is welcomed\nand your peace dwells.\n\nAmen.',
        explanation:
          'The family is often called the “domestic church”, the first place where we learn to love, forgive, and know God. Catholics pray for their families so that faith, love, patience, forgiveness, and unity may grow at home. When we ask God to bless our families, we invite Christ to dwell among us and make our homes a place where his peace is real.',
      },
    ],
  },
];

export function getCategory(categoryId: string): PrayerCategory | undefined {
  return prayerCategories.find((c) => c.id === categoryId);
}

export function getPrayer(
  categoryId: string,
  prayerId: string
): Prayer | undefined {
  return getCategory(categoryId)?.prayers.find((p) => p.id === prayerId);
}
