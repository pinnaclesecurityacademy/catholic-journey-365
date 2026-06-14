// Rosary formation content, educational, Scripture-based, simple and faithful.
// No prayers are invented; this explains the traditional Rosary and its mysteries.

export interface Mystery {
  title: string;
  scripture: string;
  whatHappened: string;
  meditate: string;
  connection: string;
}

export interface MysteryGroup {
  id: string;
  title: string;
  /** Traditional days this set is prayed. */
  days: string;
  represents: string;
  connection: string;
  mysteries: Mystery[];
}

export const rosaryEducation = {
  whatIsIt:
    'The Rosary is a way of praying with Jesus at its centre. As our hands move along the beads and our lips repeat familiar prayers, our hearts rest quietly on the life of Christ.',
  whyPray:
    'We pray the Rosary to draw closer to Jesus. Walking slowly through the Gospel, from his birth to his rising, we ponder his life in our hearts, as Mary did (Luke 2:19).',
  howToPray:
    'For each of the five decades, we recall a moment from the life of Jesus, then pray one Our Father, ten Hail Marys, and a Glory Be. The gentle repetition quiets us so we can keep our eyes on Christ.',
};

export const mysteryGroups: MysteryGroup[] = [
  {
    id: 'joyful',
    title: 'Joyful Mysteries',
    days: 'Monday & Saturday',
    represents:
      'The Joyful Mysteries celebrate the joy of God coming to us in Jesus.',
    connection:
      'They draw us into Christ’s birth and early life, and the wonder of the Word made flesh.',
    mysteries: [
      {
        title: 'The Annunciation',
        scripture: 'Luke 1:26-38',
        whatHappened:
          'The angel Gabriel announces to Mary that she will be the mother of Jesus, and she answers, “Let it be done to me according to your word.”',
        meditate:
          'We meditate on Mary’s humble “yes” and her openness to God’s plan.',
        connection:
          'It is the moment God the Son begins to take on our human nature for our salvation.',
      },
      {
        title: 'The Visitation',
        scripture: 'Luke 1:39-56',
        whatHappened:
          'Mary visits her cousin Elizabeth, who greets her with joy, and Mary praises God in the prayer we call the Magnificat.',
        meditate:
          'We meditate on carrying Christ to others and rejoicing in God’s goodness.',
        connection:
          'Even before his birth, Jesus brings joy and the Holy Spirit to those he meets.',
      },
      {
        title: 'The Nativity',
        scripture: 'Luke 2:1-21',
        whatHappened:
          'Jesus is born in Bethlehem and laid in a manger, and angels announce the good news to the shepherds.',
        meditate:
          'We meditate on God’s humility in becoming a little child for us.',
        connection:
          'God so loved the world that he entered it as one of us, poor and small.',
      },
      {
        title: 'The Presentation',
        scripture: 'Luke 2:22-38',
        whatHappened:
          'Mary and Joseph present the infant Jesus in the Temple, where Simeon and Anna recognise him as the promised Saviour.',
        meditate:
          'We meditate on offering our lives to God, as Jesus was offered.',
        connection:
          'Jesus is revealed as the light to the nations and the hope of his people.',
      },
      {
        title: 'The Finding in the Temple',
        scripture: 'Luke 2:41-52',
        whatHappened:
          'After three days of searching, Mary and Joseph find the boy Jesus in the Temple, among the teachers.',
        meditate:
          'We meditate on seeking Jesus when he seems hidden from us.',
        connection:
          'Jesus shows that he must be about his Father’s business, pointing us to God.',
      },
    ],
  },
  {
    id: 'luminous',
    title: 'Luminous Mysteries',
    days: 'Thursday',
    represents:
      'The Luminous Mysteries, or Mysteries of Light, shine on Jesus’ public ministry.',
    connection:
      'They reveal Jesus teaching, healing, and showing us the Kingdom of God.',
    mysteries: [
      {
        title: 'The Baptism of Jesus',
        scripture: 'Matthew 3:13-17',
        whatHappened:
          'Jesus is baptised in the Jordan, the Spirit descends like a dove, and the Father’s voice calls him his beloved Son.',
        meditate:
          'We meditate on our own Baptism, which makes us God’s children.',
        connection:
          'Jesus begins his mission and the Holy Trinity is revealed.',
      },
      {
        title: 'The Wedding at Cana',
        scripture: 'John 2:1-11',
        whatHappened:
          'At Mary’s request, Jesus changes water into wine, his first miracle.',
        meditate:
          'We meditate on trusting Jesus and on Mary’s words, “Do whatever he tells you.”',
        connection:
          'Jesus shows his care for our needs and begins to reveal his glory.',
      },
      {
        title: 'The Proclamation of the Kingdom',
        scripture: 'Mark 1:14-15',
        whatHappened:
          'Jesus preaches the good news, calling people to repent and believe in the Kingdom of God.',
        meditate:
          'We meditate on turning from sin and welcoming God’s reign in our lives.',
        connection:
          'Jesus invites everyone into a new life of mercy and conversion.',
      },
      {
        title: 'The Transfiguration',
        scripture: 'Matthew 17:1-8',
        whatHappened:
          'On the mountain, Jesus is transfigured in glory before Peter, James, and John, and the Father says, “Listen to him.”',
        meditate:
          'We meditate on the glory of Jesus and our call to listen to him.',
        connection:
          'We glimpse the divine glory of Christ that will shine at the Resurrection.',
      },
      {
        title: 'The Institution of the Eucharist',
        scripture: 'Matthew 26:26-28',
        whatHappened:
          'At the Last Supper, Jesus gives his Body and Blood under bread and wine, telling his disciples, “Do this in memory of me.”',
        meditate:
          'We meditate on the gift of the Eucharist and Jesus’ abiding presence.',
        connection:
          'Jesus gives himself to us, remaining with us in every Mass.',
      },
    ],
  },
  {
    id: 'sorrowful',
    title: 'Sorrowful Mysteries',
    days: 'Tuesday & Friday',
    represents:
      'The Sorrowful Mysteries remember the suffering and death of Jesus.',
    connection:
      'They walk us through Christ’s Passion, the price of his love for us.',
    mysteries: [
      {
        title: 'The Agony in the Garden',
        scripture: 'Matthew 26:36-46',
        whatHappened:
          'In Gethsemane, Jesus prays in deep sorrow, accepting the Father’s will.',
        meditate:
          'We meditate on trusting God in our own moments of fear and pain.',
        connection:
          'Jesus freely embraces the suffering he will offer for our sake.',
      },
      {
        title: 'The Scourging at the Pillar',
        scripture: 'John 19:1',
        whatHappened:
          'Jesus is brutally whipped at Pilate’s command.',
        meditate:
          'We meditate on how much Jesus endured out of love for us.',
        connection:
          'By his wounds we are healed, as Isaiah foretold.',
      },
      {
        title: 'The Crowning with Thorns',
        scripture: 'Matthew 27:27-31',
        whatHappened:
          'The soldiers mock Jesus as a king, pressing a crown of thorns on his head.',
        meditate:
          'We meditate on Christ’s patience under cruelty and scorn.',
        connection:
          'The true King wears a crown of thorns to win us a kingdom of love.',
      },
      {
        title: 'The Carrying of the Cross',
        scripture: 'John 19:17',
        whatHappened:
          'Jesus carries his Cross to Calvary, helped along the way by Simon.',
        meditate:
          'We meditate on carrying our own crosses with Jesus.',
        connection:
          'Jesus invites us to take up our cross and follow him.',
      },
      {
        title: 'The Crucifixion',
        scripture: 'Luke 23:33-46',
        whatHappened:
          'Jesus is nailed to the Cross and dies, forgiving those who crucify him and giving us his Mother.',
        meditate:
          'We meditate on the love that gave everything to save us.',
        connection:
          'On the Cross, Jesus opens the way to forgiveness and eternal life.',
      },
    ],
  },
  {
    id: 'glorious',
    title: 'Glorious Mysteries',
    days: 'Wednesday & Sunday',
    represents:
      'The Glorious Mysteries rejoice in Christ’s victory over death.',
    connection:
      'They lift our hearts to the Resurrection and the promise of eternal life.',
    mysteries: [
      {
        title: 'The Resurrection',
        scripture: 'Matthew 28:1-10',
        whatHappened:
          'On the third day Jesus rises from the dead, and his joyful followers meet the risen Lord.',
        meditate:
          'We meditate on the hope and joy of new life in Christ.',
        connection:
          'Jesus conquers death and offers us a share in his risen life.',
      },
      {
        title: 'The Ascension',
        scripture: 'Acts 1:6-11',
        whatHappened:
          'Jesus ascends to heaven, promising to be with his Church always.',
        meditate:
          'We meditate on heaven as our true home with God.',
        connection:
          'Jesus goes before us to prepare a place for us with the Father.',
      },
      {
        title: 'The Descent of the Holy Spirit',
        scripture: 'Acts 2:1-13',
        whatHappened:
          'At Pentecost the Holy Spirit fills the apostles, and the Church is born.',
        meditate:
          'We meditate on the Spirit at work in our own lives.',
        connection:
          'The Spirit Jesus sends gives us courage to live and share the Gospel.',
      },
      {
        title: 'The Assumption of Mary',
        scripture: 'Luke 1:46-49',
        whatHappened:
          'At the end of her life, Mary is taken body and soul into heaven.',
        meditate:
          'We meditate on God’s promise of resurrection for those who love him.',
        connection:
          'Mary shares fully in her Son’s victory, showing us our own hope.',
      },
      {
        title: 'The Coronation of Mary',
        scripture: 'Revelation 12:1',
        whatHappened:
          'Mary is crowned Queen of heaven and earth, honoured as the Mother of the King.',
        meditate:
          'We meditate on Mary’s closeness to her Son and her prayers for us.',
        connection:
          'Mary reigns with Christ and continues to lead us to him.',
      },
    ],
  },
];

// Step-by-step guided prayers (traditional texts).
export const rosaryOpening = [
  'Sign of the Cross',
  'Apostles’ Creed',
  'Our Father',
  'Three Hail Marys',
  'Glory Be',
];

export const decadePrayer = {
  ourFather:
    'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
  hailMary:
    'Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
  gloryBe:
    'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
  fatima:
    'O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to heaven, especially those in most need of your mercy.',
  rhythm:
    'The vocal prayers guide the rhythm while the heart meditates on the mystery of Christ.',
};

// Prayer-book line breaks for display only. The words are identical to
// `decadePrayer`; only the visual line/stanza breaks differ.
export const decadePrayerVerse = {
  ourFather:
    'Our Father,\nwho art in heaven,\nhallowed be thy name.\n\nThy kingdom come,\nthy will be done,\non earth as it is in heaven.\n\nGive us this day\nour daily bread,\nand forgive us our trespasses,\nas we forgive those who trespass against us,\nand lead us not into temptation,\nbut deliver us from evil.\n\nAmen.',
  hailMary:
    'Hail Mary, full of grace,\nthe Lord is with thee.\n\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb,\nJesus.\n\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death.\n\nAmen.',
  gloryBe:
    'Glory be to the Father,\nand to the Son,\nand to the Holy Spirit.\n\nAs it was in the beginning,\nis now, and ever shall be,\nworld without end.\n\nAmen.',
  fatima:
    'O my Jesus,\nforgive us our sins,\nsave us from the fires of hell,\nand lead all souls to heaven,\nespecially those in most need of your mercy.',
};

// Opening prayers of the Rosary, with prayer-book line breaks for display only
// (traditional texts; the words are not altered). The Our Father, Hail Mary, and
// Glory Be reuse the verses in `decadePrayerVerse`.
export const rosaryOpeningVerse = {
  signOfCross:
    'In the name of the Father,\nand of the Son,\nand of the Holy Spirit.\n\nAmen.',
  apostlesCreed:
    'I believe in God,\nthe Father almighty,\nCreator of heaven and earth,\n\nand in Jesus Christ,\nhis only Son, our Lord,\nwho was conceived by the Holy Spirit,\nborn of the Virgin Mary,\nsuffered under Pontius Pilate,\nwas crucified, died, and was buried;\nhe descended into hell;\non the third day he rose again from the dead;\nhe ascended into heaven,\nand is seated at the right hand of God the Father almighty;\nfrom there he will come to judge the living and the dead.\n\nI believe in the Holy Spirit,\nthe holy catholic Church,\nthe communion of saints,\nthe forgiveness of sins,\nthe resurrection of the body,\nand life everlasting.\n\nAmen.',
};

// Short key Scripture excerpts (public-domain Douay-Rheims), keyed by mystery
// title. References + short excerpts only, no full passages.
const MYSTERY_EXCERPTS: Record<string, string> = {
  'The Annunciation':
    '“Behold the handmaid of the Lord; be it done to me according to thy word.”',
  'The Visitation':
    '“Blessed art thou among women, and blessed is the fruit of thy womb.”',
  'The Nativity':
    '“This day is born to you a Saviour, who is Christ the Lord.”',
  'The Presentation':
    '“A light to the revelation of the Gentiles, and the glory of thy people Israel.”',
  'The Finding in the Temple':
    '“Did you not know that I must be about my Father’s business?”',
  'The Baptism of Jesus':
    '“This is my beloved Son, in whom I am well pleased.”',
  'The Wedding at Cana': '“Whatsoever he shall say to you, do ye.”',
  'The Proclamation of the Kingdom':
    '“The kingdom of God is at hand: repent, and believe the gospel.”',
  'The Transfiguration': '“This is my beloved Son… hear ye him.”',
  'The Institution of the Eucharist':
    '“Take ye, and eat. This is my body.”',
  'The Agony in the Garden': '“Not as I will, but as thou wilt.”',
  'The Scourging at the Pillar':
    '“Pilate therefore took Jesus, and scourged him.”',
  'The Crowning with Thorns': '“Hail, King of the Jews.”',
  'The Carrying of the Cross':
    '“And bearing his own cross, he went forth.”',
  'The Crucifixion':
    '“Father, forgive them, for they know not what they do.”',
  'The Resurrection': '“He is not here, for he is risen, as he said.”',
  'The Ascension':
    '“This Jesus shall so come as you have seen him going into heaven.”',
  'The Descent of the Holy Spirit':
    '“And they were all filled with the Holy Ghost.”',
  'The Assumption of Mary':
    '“He that is mighty hath done great things to me.”',
  'The Coronation of Mary':
    '“A woman clothed with the sun, and the moon under her feet.”',
};

export function mysteryExcerpt(title: string): string {
  return MYSTERY_EXCERPTS[title] ?? '';
}

export const rosaryClosing = {
  hailHolyQueen:
    'Hail, holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To you do we cry, poor banished children of Eve; to you do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, your eyes of mercy toward us; and after this our exile, show unto us the blessed fruit of your womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.',
  finalPrayer:
    'O God, whose only begotten Son, by his life, death, and resurrection, has purchased for us the rewards of eternal life: grant, we beseech you, that meditating upon these mysteries of the most holy Rosary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.',
};

// Prayer-book line breaks for the closing prayers (display only; same words).
export const rosaryClosingVerse = {
  hailHolyQueen:
    'Hail, holy Queen, Mother of Mercy,\nour life, our sweetness, and our hope.\n\nTo you do we cry,\npoor banished children of Eve;\nto you do we send up our sighs,\nmourning and weeping in this valley of tears.\n\nTurn then, most gracious Advocate,\nyour eyes of mercy toward us;\nand after this our exile,\nshow unto us the blessed fruit of your womb,\nJesus.\n\nO clement, O loving, O sweet Virgin Mary.\n\nPray for us, O holy Mother of God,\nthat we may be made worthy of the promises of Christ.\n\nAmen.',
  finalPrayer:
    'O God, whose only begotten Son,\nby his life, death, and resurrection,\nhas purchased for us the rewards of eternal life:\ngrant, we beseech you,\nthat meditating upon these mysteries\nof the most holy Rosary,\nwe may imitate what they contain\nand obtain what they promise,\nthrough the same Christ our Lord.\n\nAmen.',
};

export function getMysteryGroup(id: string): MysteryGroup | undefined {
  return mysteryGroups.find((g) => g.id === id);
}
