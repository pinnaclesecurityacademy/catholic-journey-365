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
      {
        id: 'act-of-contrition',
        title: 'Act of Contrition',
        content:
          'O my God, I am heartily sorry for having offended you, and I detest all my sins because of your just punishments, but most of all because they offend you, my God, who are all good and deserving of all my love. I firmly resolve, with the help of your grace, to sin no more and to avoid the near occasions of sin. Amen.',
        verse:
          'O my God,\nI am heartily sorry for having offended you,\nand I detest all my sins\nbecause of your just punishments,\nbut most of all because they offend you,\nmy God, who are all good\nand deserving of all my love.\n\nI firmly resolve,\nwith the help of your grace,\nto sin no more\nand to avoid the near occasions of sin.\n\nAmen.',
        explanation:
          'An Act of Contrition expresses our sorrow for sin and our desire to turn back to God. Catholics pray it especially in the Sacrament of Reconciliation, trusting that God is faithful to forgive (1 John 1:9). Its sorrow is rooted in love, grieving sin most of all because it offends God who is all good. Praying it opens our hearts to the mercy Christ won for us.',
      },
      {
        id: 'guardian-angel',
        title: 'Guardian Angel Prayer',
        content:
          'Angel of God, my guardian dear, to whom God’s love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen.',
        verse:
          'Angel of God,\nmy guardian dear,\nto whom God’s love commits me here,\never this day be at my side,\nto light and guard,\nto rule and guide.\n\nAmen.',
        explanation:
          'Scripture tells us that God entrusts his angels to watch over us (Psalm 91:11; Matthew 18:10). This simple prayer asks our guardian angel to guide and protect us through the day. Angels are servants of God who act only by his power and never in place of him, for Catholics worship God alone. Asking their help reminds us that we are surrounded by God’s loving care.',
      },
      {
        id: 'memorare',
        title: 'Memorare',
        content:
          'Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to your protection, implored your help, or sought your intercession was left unaided. Inspired by this confidence, I fly unto you, O Virgin of virgins, my Mother. To you do I come, before you I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in your mercy hear and answer me. Amen.',
        verse:
          'Remember, O most gracious Virgin Mary,\nthat never was it known\nthat anyone who fled to your protection,\nimplored your help,\nor sought your intercession\nwas left unaided.\n\nInspired by this confidence,\nI fly unto you,\nO Virgin of virgins, my Mother.\n\nTo you do I come,\nbefore you I stand,\nsinful and sorrowful.\n\nO Mother of the Word Incarnate,\ndespise not my petitions,\nbut in your mercy hear and answer me.\n\nAmen.',
        explanation:
          'The Memorare is a trusting prayer asking the Virgin Mary to bring our needs to her Son. It grew from the long Christian experience that Mary faithfully intercedes for those who turn to her. Catholics honor Mary as the Mother of Jesus, never as God, and her help always leads us to Christ. Praying it places us with confidence under a mother’s care.',
      },
      {
        id: 'hail-holy-queen',
        title: 'Hail Holy Queen',
        content:
          'Hail, holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To you do we cry, poor banished children of Eve. To you do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, your eyes of mercy toward us, and after this our exile show unto us the blessed fruit of your womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.',
        verse:
          'Hail, holy Queen,\nMother of Mercy,\nour life, our sweetness, and our hope.\n\nTo you do we cry,\npoor banished children of Eve.\nTo you do we send up our sighs,\nmourning and weeping in this valley of tears.\n\nTurn then, most gracious advocate,\nyour eyes of mercy toward us,\nand after this our exile\nshow unto us the blessed fruit of your womb,\nJesus.\n\nO clement, O loving, O sweet Virgin Mary.\n\nPray for us, O holy Mother of God,\nthat we may be made worthy\nof the promises of Christ.\n\nAmen.',
        explanation:
          'The Hail Holy Queen, or Salve Regina, is an ancient hymn that traditionally closes the Rosary. It pours out our needs to Mary as a loving mother and advocate in this life of trials. Even as it honors her, every line turns toward Jesus, asking that she show us the blessed fruit of her womb. Catholics seek Mary’s prayers so that we may be made worthy of the promises of Christ.',
      },
      {
        id: 'fatima-prayer',
        title: 'Fatima Prayer',
        content:
          'O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to heaven, especially those in most need of your mercy. Amen.',
        verse:
          'O my Jesus,\nforgive us our sins,\nsave us from the fires of hell,\nand lead all souls to heaven,\nespecially those in most need of your mercy.\n\nAmen.',
        explanation:
          'This short prayer is addressed directly to Jesus, asking his forgiveness and mercy for all souls. It is associated with the 1917 events at Fatima, which the Church recognizes as a private revelation and not part of the deposit of faith. Many Catholics add it to the Rosary, though it is freely offered rather than required. Praying it widens our hearts to desire mercy for the whole world.',
      },
      {
        id: 'come-holy-spirit',
        title: 'Come Holy Spirit',
        content:
          'Come, Holy Spirit, fill the hearts of your faithful and kindle in them the fire of your love. Send forth your Spirit and they shall be created, and you shall renew the face of the earth. O God, who by the light of the Holy Spirit instructed the hearts of the faithful, grant that by the same Spirit we may be truly wise and ever rejoice in his consolation. Through Christ our Lord. Amen.',
        verse:
          'Come, Holy Spirit,\nfill the hearts of your faithful\nand kindle in them the fire of your love.\n\nSend forth your Spirit and they shall be created,\nand you shall renew the face of the earth.\n\nO God, who by the light of the Holy Spirit\ninstructed the hearts of the faithful,\ngrant that by the same Spirit\nwe may be truly wise\nand ever rejoice in his consolation.\n\nThrough Christ our Lord.\n\nAmen.',
        explanation:
          'This prayer calls on the Holy Spirit, whom Jesus promised to send to his Church (John 14:26; Acts 2). We ask the Spirit to renew us with the fire of God’s love and to make us wise with the wisdom of God. It is often prayed before important work, decisions, or study, when we need the Spirit’s light. Praying it opens us to the gifts God longs to give.',
      },
      {
        id: 'anima-christi',
        title: 'Anima Christi',
        content:
          'Soul of Christ, sanctify me. Body of Christ, save me. Blood of Christ, inebriate me. Water from the side of Christ, wash me. Passion of Christ, strengthen me. O good Jesus, hear me. Within your wounds hide me. Never let me be separated from you. From the wicked foe defend me. In the hour of my death call me, and bid me come to you, that with your saints I may praise you for ever and ever. Amen.',
        verse:
          'Soul of Christ, sanctify me.\nBody of Christ, save me.\nBlood of Christ, inebriate me.\nWater from the side of Christ, wash me.\nPassion of Christ, strengthen me.\n\nO good Jesus, hear me.\nWithin your wounds hide me.\nNever let me be separated from you.\nFrom the wicked foe defend me.\n\nIn the hour of my death call me,\nand bid me come to you,\nthat with your saints\nI may praise you for ever and ever.\n\nAmen.',
        explanation:
          'The Anima Christi is a beloved medieval prayer that draws us close to Jesus in his Passion. Line by line it asks Christ to sanctify, save, strengthen, and shelter us within his wounds. St. Ignatius of Loyola loved this prayer and placed it at the heart of his Spiritual Exercises. Praying it deepens our union with the Lord who gave his life for us.',
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
        id: 'evening-prayer',
        title: 'Evening Prayer',
        content:
          'Lord God, as evening falls I give you thanks for the gifts of this day. For the good I have done, I give you praise; for the times I have failed, I ask your pardon. Gather my family and all I love into your care, and let the light of your presence remain with us as the day ends. Through Christ our Lord. Amen.',
        verse:
          'Lord God,\nas evening falls\nI give you thanks for the gifts of this day.\n\nFor the good I have done,\nI give you praise;\nfor the times I have failed,\nI ask your pardon.\n\nGather my family and all I love\ninto your care,\nand let the light of your presence\nremain with us as the day ends.\n\nThrough Christ our Lord.\n\nAmen.',
        explanation:
          'As the day draws to a close, Catholics pause to thank God and place the evening in his hands. This prayer looks back with gratitude and honesty, praising God for the good and asking pardon for our failings. Entrusting our loved ones to God’s care reminds us that he watches over us through the night. It echoes the Church’s evening prayer, which sanctifies the close of each day.',
      },
      {
        id: 'grace-after-meals',
        title: 'Grace After Meals',
        content:
          'We give you thanks, almighty God, for all your benefits, who live and reign for ever and ever. Amen.',
        verse:
          'We give you thanks,\nalmighty God,\nfor all your benefits,\nwho live and reign\nfor ever and ever.\n\nAmen.',
        explanation:
          'Just as we ask God’s blessing before a meal, the Church gives thanks when it is finished. This brief prayer acknowledges that all good things come from God’s generous hand. Giving thanks after eating keeps gratitude alive in us and guards against taking our blessings for granted. It joins our ordinary meals to a life of thanksgiving in Christ.',
      },
      {
        id: 'daily-examen',
        title: 'Daily Examen',
        content: '',
        explanation:
          'The Daily Examen is a simple way of prayer made well known by St. Ignatius of Loyola. Each evening we look back over the day with God, noticing where he was present and how we responded. It is not anxious self-judgment but a grateful, honest review in the light of God’s love. Praying it regularly helps us recognize God at work in ordinary life and grow closer to Christ.',
        sections: [
          {
            heading: 'Give thanks',
            body: 'Begin by thanking God for the gifts of this day. Recall the moments, large and small, where you received his goodness, and give him praise.',
          },
          {
            heading: 'Ask for light',
            body: 'Ask the Holy Spirit to help you see the day as God sees it, not with discouragement but with honesty and love.',
          },
          {
            heading: 'Review the day',
            body: 'Walk back through the hours of the day. Notice where you felt close to God and where you turned away, paying attention to your actions, your words, and the movements of your heart.',
          },
          {
            heading: 'Ask for pardon',
            body: 'Where you have failed to love, express your sorrow to God and ask his forgiveness, trusting in his mercy.\n\nPrayer\nLord, I am sorry for the times today I failed to love you and others. Thank you for your patient mercy. Wash me clean and draw me back to your heart. Amen.',
          },
          {
            heading: 'Resolve for tomorrow',
            body: 'Look ahead to tomorrow and ask God for the grace you will need. Place the coming day in his hands with hope.',
          },
        ],
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
      {
        id: 'sacred-heart-of-jesus',
        title: 'Sacred Heart of Jesus',
        content:
          'O Sacred Heart of Jesus, full of love for us, I consecrate to you my heart, my life, and all that I have. You loved us to the end and opened your Heart upon the Cross. Make my heart more like yours, gentle and humble, ready to love God and neighbor. Sacred Heart of Jesus, I place my trust in you. Amen.',
        verse:
          'O Sacred Heart of Jesus,\nfull of love for us,\nI consecrate to you\nmy heart, my life,\nand all that I have.\n\nYou loved us to the end\nand opened your Heart upon the Cross.\n\nMake my heart more like yours,\ngentle and humble,\nready to love God and neighbor.\n\nSacred Heart of Jesus,\nI place my trust in you.\n\nAmen.',
        explanation:
          'Devotion to the Sacred Heart of Jesus honors the love of Christ, shown in the Heart pierced for us on the Cross (John 19:34). It invites us to trust in his mercy and to return love for love. This devotion grew through the experiences of St. Margaret Mary Alacoque and is offered to Jesus, who is true God and true man. Praying it draws us into the faithful love at the center of the Gospel.',
      },
      {
        id: 'immaculate-heart-of-mary',
        title: 'Immaculate Heart of Mary',
        content:
          'O Immaculate Heart of Mary, mother most loving, I entrust myself to your care. Lead me always to your Son, Jesus, and help me to love him as you do. Teach me to say yes to God in all things, to ponder his word in my heart, and to trust him completely. Immaculate Heart of Mary, pray for us. Amen.',
        verse:
          'O Immaculate Heart of Mary,\nmother most loving,\nI entrust myself to your care.\n\nLead me always to your Son, Jesus,\nand help me to love him as you do.\n\nTeach me to say yes to God in all things,\nto ponder his word in my heart,\nand to trust him completely.\n\nImmaculate Heart of Mary,\npray for us.\n\nAmen.',
        explanation:
          'Devotion to the Immaculate Heart of Mary honors the pure, loving heart of the mother of Jesus, who treasured God’s word and pondered it in her heart (Luke 2:19). We entrust ourselves to her so that she may lead us closer to Christ, never apart from him. Catholics ask Mary’s prayers and never give her the worship due to God alone. Her heart always points us to her Son.',
      },
      {
        id: 'holy-spirit-novena',
        title: 'Holy Spirit Novena',
        content: '',
        explanation: '',
        isNovena: true,
        sections: [
          {
            heading: 'About this Novena',
            body: 'The Holy Spirit Novena is the oldest novena in the Church, first prayed by Mary and the apostles in the days between the Ascension and Pentecost (Acts 1:14). Over nine days we ask the Holy Spirit to renew us with his presence and his gifts. Each day reflects on one way the Spirit works in us, drawing from the seven gifts named in Scripture (Isaiah 11:2-3). Pray one day at a time, asking the Spirit to come into your life anew.',
          },
          {
            heading: 'Day 1 · Longing for the Spirit',
            body: 'Before Pentecost, the disciples waited in prayer, longing for the gift Jesus had promised. We begin by asking the Holy Spirit to come and fill us, for we cannot live the Christian life by our own strength.\n\nPrayer\nCome, Holy Spirit, fill my heart and kindle in me the fire of your love. I cannot follow Jesus without you. Come and make your home in me, and lead me to the Father through the Son. Amen.',
          },
          {
            heading: 'Day 2 · The Gift of Wisdom',
            body: 'Wisdom lets us see life as God sees it and to love the things of heaven above the things of earth. It helps us taste the goodness of God and treasure him above all.\n\nPrayer\nHoly Spirit, grant me the gift of wisdom, that I may value what truly lasts and love God above all things. Lift my heart from passing things to the things of heaven. Amen.',
          },
          {
            heading: 'Day 3 · The Gift of Understanding',
            body: 'Understanding helps us grasp the truths of faith more deeply, so that God’s word is not only heard but takes root in our hearts.\n\nPrayer\nHoly Spirit, give me the gift of understanding, that the truths of the faith may shine in my mind and warm my heart. Help me to know you more and love you more. Amen.',
          },
          {
            heading: 'Day 4 · The Gift of Counsel',
            body: 'Counsel, or right judgment, guides us to choose what is good in the ordinary decisions of daily life. It is the Spirit gently leading us along the right path.\n\nPrayer\nHoly Spirit, grant me the gift of counsel, that I may know what is right and have the courage to choose it. Guide my decisions according to your will. Amen.',
          },
          {
            heading: 'Day 5 · The Gift of Fortitude',
            body: 'Fortitude, or courage, strengthens us to do what is right even when it is hard, and to remain faithful in trials and temptations.\n\nPrayer\nHoly Spirit, fill me with the gift of fortitude, that I may stand firm in faith and not give in to fear. Be my strength when I am weak. Amen.',
          },
          {
            heading: 'Day 6 · The Gift of Knowledge',
            body: 'Knowledge helps us to see God’s hand in creation and in the events of our lives, recognizing what leads us to him and what leads us away.\n\nPrayer\nHoly Spirit, grant me the gift of knowledge, that I may see your goodness in all things and choose the path that leads to you. Amen.',
          },
          {
            heading: 'Day 7 · The Gift of Piety',
            body: 'Piety fills us with love and reverence for God as our Father, and with affection for his Church and his children. It makes prayer a joy rather than only a duty.\n\nPrayer\nHoly Spirit, give me the gift of piety, that I may love God as a devoted child and serve others with a generous heart. Amen.',
          },
          {
            heading: 'Day 8 · The Fear of the Lord',
            body: 'The fear of the Lord is not terror but a deep reverence and wonder before God, a loving desire never to be separated from him.\n\nPrayer\nHoly Spirit, grant me holy reverence for God, that I may honor him in all I do and dread nothing but turning away from his love. Amen.',
          },
          {
            heading: 'Day 9 · The Fruits of the Spirit',
            body: 'When the Spirit fills us, his presence bears fruit: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control (Galatians 5:22-23). On this final day we ask the Spirit to make our lives fruitful for God.\n\nPrayer\nCome, Holy Spirit, and renew the face of the earth, beginning with me. Make my life bear the fruit of your love, and lead me with all the Church to the glory of the Father, through Christ our Lord. Amen.',
          },
        ],
      },
      {
        id: 'st-joseph-novena',
        title: 'St Joseph Novena',
        content: '',
        explanation: '',
        isNovena: true,
        sections: [
          {
            heading: 'About this Novena',
            body: 'Saint Joseph, the husband of Mary and foster father of Jesus, is honored as a model of faith, humility, and quiet trust in God. Devotion to him has grown throughout the Church’s history, and he is the patron of the universal Church, of families, of workers, and of a holy death. Over nine days we reflect on his example and ask his prayers. Catholics honor Joseph and ask his intercession, while worship belongs to God alone.',
          },
          {
            heading: 'Day 1 · A Just Man',
            body: 'Scripture calls Joseph a just man (Matthew 1:19), faithful to God and gentle toward others. He shows us that holiness is found in quietly doing what is right.\n\nPrayer\nSaint Joseph, just and faithful, help me to do what is right with a humble and gentle heart, and lead me always closer to Jesus, your foster Son. Saint Joseph, pray for us. Amen.',
          },
          {
            heading: 'Day 2 · A Man of Faith',
            body: 'When God spoke to Joseph in dreams, he obeyed without hesitation, trusting even when he could not see the whole plan. His faith teaches us to say yes to God.\n\nPrayer\nSaint Joseph, man of faith, obtain for me the grace to trust God’s word even when the way is unclear, and to obey him with a ready heart. Saint Joseph, pray for us. Amen.',
          },
          {
            heading: 'Day 3 · Husband of Mary',
            body: 'Joseph loved and protected Mary with a pure and faithful heart, caring for her as God entrusted her to him. He is a model for all who are called to love and self-giving.\n\nPrayer\nSaint Joseph, faithful husband, pray for all marriages and families, that they may be filled with love, fidelity, and trust in God. Saint Joseph, pray for us. Amen.',
          },
          {
            heading: 'Day 4 · Foster Father of Jesus',
            body: 'God chose Joseph to raise his own Son, to teach him, protect him, and provide for him. In his fatherly care we glimpse the gentleness of God the Father.\n\nPrayer\nSaint Joseph, foster father of Jesus, watch over all fathers and all children, and help parents to raise their families in faith and love. Saint Joseph, pray for us. Amen.',
          },
          {
            heading: 'Day 5 · The Worker',
            body: 'Joseph labored as a carpenter and taught Jesus the dignity of honest work. He reminds us that our daily work, offered to God, can become holy.\n\nPrayer\nSaint Joseph the Worker, bless the work of my hands and help me to labor honestly for the good of others and the glory of God. Saint Joseph, pray for us. Amen.',
          },
          {
            heading: 'Day 6 · Protector of the Family',
            body: 'Joseph guarded the Holy Family, leading them to safety and providing for their needs. We ask his protection over our own families and homes.\n\nPrayer\nSaint Joseph, protector of the Holy Family, guard my family from all harm and keep us united in love and faith. Saint Joseph, pray for us. Amen.',
          },
          {
            heading: 'Day 7 · A Man of Silence and Prayer',
            body: 'The Gospels record no words of Joseph, only his faithful actions. His quiet, prayerful life teaches us to listen for God in stillness.\n\nPrayer\nSaint Joseph, man of silence, teach me to listen for God’s voice and to trust him in quiet faithfulness. Saint Joseph, pray for us. Amen.',
          },
          {
            heading: 'Day 8 · Patron of the Church',
            body: 'Just as Joseph cared for the Holy Family, he now watches over the whole Church as her patron and protector. We entrust the Church to his prayers.\n\nPrayer\nSaint Joseph, patron of the Church, protect the people of God, our shepherds, and all who are in need, and lead us closer to your Son. Saint Joseph, pray for us. Amen.',
          },
          {
            heading: 'Day 9 · Patron of a Holy Death',
            body: 'Tradition holds that Joseph died in the company of Jesus and Mary, and so he is invoked as the patron of a holy death. We ask his prayers that we too may die in God’s friendship.\n\nPrayer\nSaint Joseph, who fell asleep in the company of Jesus and Mary, pray for me and for all the dying, that we may meet death in the peace and friendship of God. Saint Joseph, pray for us. Amen.',
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
      {
        id: 'spiritual-protection',
        title: 'Prayer for Spiritual Protection',
        content:
          'Lord Jesus Christ, surround me with your protection. Shield me from every temptation and from all that would draw me away from you. Send your holy angels to guard me, and let your Precious Blood cover me and those I love. I trust in you, for you have overcome the world. Amen.',
        verse:
          'Lord Jesus Christ,\nsurround me with your protection.\n\nShield me from every temptation\nand from all that would draw me away from you.\n\nSend your holy angels to guard me,\nand let your Precious Blood\ncover me and those I love.\n\nI trust in you,\nfor you have overcome the world.\n\nAmen.',
        explanation:
          'The Christian life includes a real spiritual battle against temptation and evil (Ephesians 6:12). This prayer asks Jesus, who has already overcome the world (John 16:33), to protect and shield us. Our safety rests in Christ alone, not in any power of our own. Praying it places us with trust under the Lord’s sure protection.',
      },
      {
        id: 'protection-of-family',
        title: 'Prayer for Protection of Family',
        content:
          'Heavenly Father, watch over my family and keep us safe in your care. Guard our home from all harm, protect us in body and soul, and surround each of us with your peace. Help us to trust you in every danger and to remain close to you and to one another. Through Christ our Lord. Amen.',
        verse:
          'Heavenly Father,\nwatch over my family\nand keep us safe in your care.\n\nGuard our home from all harm,\nprotect us in body and soul,\nand surround each of us with your peace.\n\nHelp us to trust you in every danger\nand to remain close to you\nand to one another.\n\nThrough Christ our Lord.\n\nAmen.',
        explanation:
          'Families face many dangers, both seen and unseen, and Catholics turn to God as their true protector (Psalm 91). This prayer entrusts the whole household to the Father’s care, asking his peace and safety. It reminds us that God watches over those we love even when we cannot. Praying it together can draw a family closer to God and to one another.',
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
      {
        id: 'prayer-for-marriage',
        title: 'Prayer for Marriage',
        content:
          'Lord God, bless the covenant of marriage. Fill husbands and wives with patience, faithfulness, and selfless love. In times of joy, keep them grateful; in times of difficulty, keep them united. May their love be a sign of your own faithful love, and may Christ be at the center of their home. Amen.',
        verse:
          'Lord God,\nbless the covenant of marriage.\n\nFill husbands and wives\nwith patience, faithfulness,\nand selfless love.\n\nIn times of joy, keep them grateful;\nin times of difficulty, keep them united.\n\nMay their love be a sign\nof your own faithful love,\nand may Christ be at the center of their home.\n\nAmen.',
        explanation:
          'Marriage is a covenant blessed by God and a sign of Christ’s faithful love for the Church (Ephesians 5:25). This prayer asks God to strengthen husbands and wives in love and fidelity. When Christ is at the center, a marriage becomes a path of holiness for both.',
      },
      {
        id: 'prayer-for-children',
        title: 'Prayer for Children',
        content:
          'Loving Father, watch over my children and keep them in your care. Protect them from harm, guide them in goodness, and help them to grow in wisdom and grace. Plant faith deep in their hearts, and lead them always closer to your Son, Jesus. I entrust them to you. Amen.',
        verse:
          'Loving Father,\nwatch over my children\nand keep them in your care.\n\nProtect them from harm,\nguide them in goodness,\nand help them to grow\nin wisdom and grace.\n\nPlant faith deep in their hearts,\nand lead them always\ncloser to your Son, Jesus.\n\nI entrust them to you.\n\nAmen.',
        explanation:
          'Parents share in God’s love by caring for the children he entrusts to them. Like the parents who brought their little ones to Jesus (Mark 10:13-16), we bring our children to God in prayer. Entrusting them to his care reminds us that he loves them even more than we do.',
      },
      {
        id: 'prayer-for-parents',
        title: 'Prayer for Parents',
        content:
          'Heavenly Father, thank you for the gift of my parents. Bless them for their love and sacrifices, and reward their goodness with your grace. Give them health, peace, and joy, and draw them ever closer to you. Help me to honor them as you command. Amen.',
        verse:
          'Heavenly Father,\nthank you for the gift of my parents.\n\nBless them for their love and sacrifices,\nand reward their goodness with your grace.\n\nGive them health, peace, and joy,\nand draw them ever closer to you.\n\nHelp me to honor them\nas you command.\n\nAmen.',
        explanation:
          'Scripture calls us to honor our father and mother (Exodus 20:12). This prayer gives thanks for parents and asks God to bless them. Praying for those who raised us is a way of returning the love we have received.',
      },
      {
        id: 'prayer-for-family-unity',
        title: 'Prayer for Family Unity',
        content:
          'Lord Jesus, bind our family together in your love. Where there is misunderstanding, bring understanding; where there is division, bring peace; where there is hurt, bring forgiveness. Make our home a place of patience and kindness, and keep us united in you. Amen.',
        verse:
          'Lord Jesus,\nbind our family together in your love.\n\nWhere there is misunderstanding,\nbring understanding;\nwhere there is division,\nbring peace;\nwhere there is hurt,\nbring forgiveness.\n\nMake our home a place\nof patience and kindness,\nand keep us united in you.\n\nAmen.',
        explanation:
          'Families are often where our love is most tested and most needed. This prayer asks Christ to heal divisions and bind the family together in patience and forgiveness. A home united in him becomes a place where his peace can dwell.',
      },
      {
        id: 'prayer-before-work',
        title: 'Prayer Before Work',
        content:
          'Lord God, I offer you the work of this day. Bless the tasks before me, and help me to do them with honesty, care, and a willing heart. Let my labor serve others and give you glory, and keep me mindful of your presence in all I do. Through Christ our Lord. Amen.',
        verse:
          'Lord God,\nI offer you the work of this day.\n\nBless the tasks before me,\nand help me to do them\nwith honesty, care, and a willing heart.\n\nLet my labor serve others\nand give you glory,\nand keep me mindful of your presence\nin all I do.\n\nThrough Christ our Lord.\n\nAmen.',
        explanation:
          'Work offered to God becomes more than a task; it becomes a way of serving him and others. Saint Paul urges us to work heartily, as for the Lord (Colossians 3:23). This prayer hands the day’s labor to God before we begin.',
      },
      {
        id: 'prayer-before-study',
        title: 'Prayer Before Study',
        content:
          'Come, Holy Spirit, enlighten my mind as I study. Help me to concentrate, to understand, and to remember what is true and good. Let all I learn lead me closer to you, the source of all wisdom. Through Christ our Lord. Amen.',
        verse:
          'Come, Holy Spirit,\nenlighten my mind as I study.\n\nHelp me to concentrate,\nto understand,\nand to remember\nwhat is true and good.\n\nLet all I learn\nlead me closer to you,\nthe source of all wisdom.\n\nThrough Christ our Lord.\n\nAmen.',
        explanation:
          'All true knowledge is a gift from God, the source of wisdom (Proverbs 2:6). This prayer asks the Holy Spirit to guide our study and understanding. It reminds students that learning can itself be a path toward God.',
      },
      {
        id: 'prayer-for-discernment',
        title: 'Prayer for Discernment',
        content:
          'Lord, you know the path you have prepared for me. Quiet my heart and help me to hear your voice. Free me from my own fears and desires, that I may seek only your will. Give me light to see the way and courage to follow it. Amen.',
        verse:
          'Lord,\nyou know the path\nyou have prepared for me.\n\nQuiet my heart\nand help me to hear your voice.\n\nFree me from my own fears and desires,\nthat I may seek only your will.\n\nGive me light to see the way\nand courage to follow it.\n\nAmen.',
        explanation:
          'God has a loving plan for each life and gently guides those who seek him (Jeremiah 29:11). Discernment is the prayerful search for his will rather than only our own. This prayer asks for the light and courage to follow where he leads.',
      },
      {
        id: 'prayer-difficult-decision',
        title: 'Prayer Before a Difficult Decision',
        content:
          'Lord Jesus, I bring before you the decision I must make. I do not see clearly, so I place my trust in you. Help me to weigh what is right, to set aside fear and pride, and to choose what brings me closer to you. Whatever I decide, hold me in your hands. Amen.',
        verse:
          'Lord Jesus,\nI bring before you\nthe decision I must make.\n\nI do not see clearly,\nso I place my trust in you.\n\nHelp me to weigh what is right,\nto set aside fear and pride,\nand to choose what brings me closer to you.\n\nWhatever I decide,\nhold me in your hands.\n\nAmen.',
        explanation:
          'Hard decisions can leave us anxious and unsure. This prayer brings the choice to Jesus, asking for clarity and trust rather than fear. It rests in the confidence that God remains with us whatever we decide.',
      },
      {
        id: 'prayer-for-the-sick',
        title: 'Prayer for the Sick',
        content:
          'Lord Jesus, healer of the sick, look with compassion on those who suffer in body or mind. Ease their pain, strengthen them in weakness, and fill them with your peace. If it be your will, restore them to health, and let them know your nearness in their suffering. Amen.',
        verse:
          'Lord Jesus,\nhealer of the sick,\nlook with compassion\non those who suffer in body or mind.\n\nEase their pain,\nstrengthen them in weakness,\nand fill them with your peace.\n\nIf it be your will,\nrestore them to health,\nand let them know your nearness\nin their suffering.\n\nAmen.',
        explanation:
          'Throughout the Gospels, Jesus showed tender compassion for the sick and healed many who came to him (Matthew 4:23). This prayer asks his comfort and healing for those who suffer. We pray with trust, always seeking God’s will, knowing he is near to the brokenhearted.',
      },
      {
        id: 'prayer-during-suffering',
        title: 'Prayer During Suffering',
        content:
          'Lord, in this time of suffering I turn to you. I do not understand why this pain has come, but I trust that you are with me. Give me strength to bear what I must, and unite my suffering to your Cross, that it may not be wasted. Hold me close until this passes. Amen.',
        verse:
          'Lord,\nin this time of suffering\nI turn to you.\n\nI do not understand\nwhy this pain has come,\nbut I trust that you are with me.\n\nGive me strength to bear what I must,\nand unite my suffering to your Cross,\nthat it may not be wasted.\n\nHold me close until this passes.\n\nAmen.',
        explanation:
          'Suffering is a mystery, but Christians do not face it alone. Saint Paul speaks of uniting our trials to the sufferings of Christ (Colossians 1:24). This prayer offers our pain to God and trusts in his presence through it.',
      },
      {
        id: 'prayer-for-grief',
        title: 'Prayer for Grief',
        content:
          'God of all comfort, my heart is heavy with loss. Be near to me in my sorrow and gather my tears in your hands. Give me hope in your promise of eternal life, and let me one day rejoice with those I love in your presence. Until then, carry me in your mercy. Amen.',
        verse:
          'God of all comfort,\nmy heart is heavy with loss.\n\nBe near to me in my sorrow\nand gather my tears in your hands.\n\nGive me hope in your promise\nof eternal life,\nand let me one day rejoice\nwith those I love in your presence.\n\nUntil then,\ncarry me in your mercy.\n\nAmen.',
        explanation:
          'Grief is the deep ache of love that has lost its object for a time. God is called the Father of all comfort (2 Corinthians 1:3-4), close to the brokenhearted. This prayer brings our sorrow to him and holds to the hope of the resurrection.',
      },
      {
        id: 'prayer-for-strength',
        title: 'Prayer for Strength',
        content:
          'Lord, I am weary and my strength is failing. Be my refuge and my help. Renew my spirit, steady my heart, and carry me when I cannot go on. I trust that your grace is enough for me, and that your power is made perfect in weakness. Amen.',
        verse:
          'Lord,\nI am weary\nand my strength is failing.\n\nBe my refuge and my help.\n\nRenew my spirit,\nsteady my heart,\nand carry me\nwhen I cannot go on.\n\nI trust that your grace is enough for me,\nand that your power\nis made perfect in weakness.\n\nAmen.',
        explanation:
          'When our own strength runs out, God invites us to lean on his. The Lord told Saint Paul, my grace is sufficient for you, for my power is made perfect in weakness (2 Corinthians 12:9). This prayer asks God to renew and carry us.',
      },
      {
        id: 'prayer-for-anxiety',
        title: 'Prayer for Anxiety and Worry',
        content:
          'Lord Jesus, my heart is troubled and my mind is full of worry. Calm the storm within me and help me to rest in you. Remind me that you hold all things, and that I need not be afraid. I cast my cares upon you, for you care for me. Amen.',
        verse:
          'Lord Jesus,\nmy heart is troubled\nand my mind is full of worry.\n\nCalm the storm within me\nand help me to rest in you.\n\nRemind me that you hold all things,\nand that I need not be afraid.\n\nI cast my cares upon you,\nfor you care for me.\n\nAmen.',
        explanation:
          'Jesus gently tells us not to be anxious, for our Father knows what we need (Matthew 6:25-34). Saint Peter invites us to cast all our cares on God, who cares for us (1 Peter 5:7). This prayer brings our worries to Christ and asks for his peace.',
      },
      {
        id: 'prayer-for-forgiveness',
        title: 'Prayer for Forgiveness',
        content:
          'Merciful God, I have sinned against you in my thoughts, words, and actions. I am truly sorry. Wash me clean and create in me a new heart. Help me to turn away from sin and to live in your love, and give me grace to forgive others as you forgive me. Amen.',
        verse:
          'Merciful God,\nI have sinned against you\nin my thoughts, words, and actions.\n\nI am truly sorry.\n\nWash me clean\nand create in me a new heart.\n\nHelp me to turn away from sin\nand to live in your love,\nand give me grace to forgive others\nas you forgive me.\n\nAmen.',
        explanation:
          'God is rich in mercy and always ready to forgive the repentant heart (Psalm 51). This prayer expresses sorrow for sin and asks for a clean heart, as well as the grace to forgive others as Jesus taught us. For grave sin, Catholics also seek God’s mercy in the Sacrament of Reconciliation.',
      },
      {
        id: 'prayer-for-patience',
        title: 'Prayer for Patience',
        content:
          'Lord, teach me patience. When I am frustrated or in a hurry, calm my heart. Help me to be gentle with others and with myself, to trust your timing, and to bear delays and difficulties with peace. Make me patient as you are patient with me. Amen.',
        verse:
          'Lord,\nteach me patience.\n\nWhen I am frustrated\nor in a hurry,\ncalm my heart.\n\nHelp me to be gentle\nwith others and with myself,\nto trust your timing,\nand to bear delays and difficulties\nwith peace.\n\nMake me patient\nas you are patient with me.\n\nAmen.',
        explanation:
          'Patience is a fruit of the Holy Spirit and a sign of love (1 Corinthians 13:4; Galatians 5:22). This prayer asks God to calm our hearts and help us trust his timing. It reminds us of how patiently God bears with us.',
      },
      {
        id: 'prayer-against-temptation',
        title: 'Prayer Against Temptation',
        content:
          'Lord Jesus, when temptation comes, be my strength. Help me to turn to you at once and to flee whatever leads me from your love. By your grace, let me choose what is good, and deliver me from evil. I trust in you, who were tempted yet did not sin. Amen.',
        verse:
          'Lord Jesus,\nwhen temptation comes,\nbe my strength.\n\nHelp me to turn to you at once\nand to flee whatever leads me\nfrom your love.\n\nBy your grace,\nlet me choose what is good,\nand deliver me from evil.\n\nI trust in you,\nwho were tempted\nyet did not sin.\n\nAmen.',
        explanation:
          'Jesus himself was tempted and overcame it, so he understands our struggles and helps us (Hebrews 4:15). This prayer asks for his strength to resist temptation and choose the good. Turning to Christ at once is our surest defense.',
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
