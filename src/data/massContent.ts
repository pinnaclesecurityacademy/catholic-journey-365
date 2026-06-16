// Order of the Mass: a beginner-friendly guided walk through the parts of the
// Mass. Structure and placeholder content only. Each section carries a set of
// optional teaching cards. The actual catechesis is filled in later, after a
// Catholic accuracy review, so the prose below is intentionally placeholder.
//
// Copyright note: this guide does not reproduce the full official Roman Missal
// text, full Eucharistic Prayers, the full Gloria, or the full Creed. Only
// short common responses appear, and only once approved content is added.

export type MassCard = {
  // Usually one of the fixed teaching prompts ("What is happening?",
  // "Biblical connection", "History and Tradition", "What do I do?",
  // "What do I say?", "Why does this matter?"). A card may also use a short
  // sub-topic label to head a grouped set of prompts within a section.
  heading: string;
  body: string;
  // When true, the body is shown set apart in the Sacred Prayer style.
  pray?: boolean;
};

export type MassSection = {
  id: string;
  // Display label such as "0" or "1"; used in the progress and headings.
  number: string;
  title: string;
  intro: string;
  cards: MassCard[];
};

export const massWelcome = {
  title: 'Order of the Mass',
  whatIsIt:
    'Placeholder. A short, welcoming introduction to what the Mass is and how this guide will walk you through it step by step.',
  whoIsItFor:
    'Placeholder. A friendly note for newcomers, returning Catholics, and anyone who wants to understand the Mass more deeply.',
  howToUse:
    'Placeholder. Explain that the guide moves through the Mass in order, with simple cards explaining what is happening and what to do.',
};

export const massComplete = {
  title: 'Go in Peace',
  body:
    'Placeholder. A closing reflection encouraging the reader to carry the grace of the Mass into daily life.',
};

// The Spiritual Communion prayer, offered for those who cannot receive Holy
// Communion at this time. Provided in full per the approved wording.
export const spiritualCommunionPrayer =
  'Jesus, I believe that You are truly present in the Eucharist.\n\n' +
  'I love You and I desire to receive You.\n\n' +
  'Although I cannot receive Holy Communion at this moment, come spiritually into my heart.\n\n' +
  'Draw me closer to You.\n\n' +
  'Help me turn away from sin, grow in faith, and prepare for the day I can receive You fully in the Eucharist.\n\n' +
  'Stay with me, Lord, and lead me always closer to You.\n\n' +
  'Amen.';

export const massSections: MassSection[] = [
  {
    id: 'before-mass',
    number: '0',
    title: 'Before Mass Begins',
    intro:
      'Preparing to meet Jesus. Before the Mass officially begins, Catholics prepare their hearts. For someone new, returning, or unsure, the questions often begin before the opening hymn. What do I do with the holy water? Why are people kneeling? Where is Jesus in the church? This section helps you enter the church with peace and reverence.',
    cards: [
      {
        heading: 'Entering the Church',
        body:
          'When Catholics enter a church, they are entering a sacred place set apart for prayer and worship.\n\nThe church is not just a meeting hall. At the centre of every Catholic church is Jesus Christ, truly present in the Eucharist reserved in the tabernacle.\n\nBefore Mass begins, Catholics take time to slow down, quiet their hearts, and remember whose presence they are entering.',
      },
      {
        heading: 'Biblical connection',
        body:
          'When Moses approached the burning bush, God said:\n\n"Take your sandals off your feet, for the place where you stand is holy ground."\nExodus 3:5',
      },
      {
        heading: 'What do I do?',
        body: 'Enter quietly and reverently.\n\nTake time to prepare your heart.',
      },
      {
        heading: 'What do I say?',
        body:
          'Usually nothing.\n\nYou may quietly pray:\n\n"Lord, help me be present. Open my heart to hear you."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'You are not simply entering a building.\n\nYou are preparing yourself to encounter God.',
      },
      {
        heading: 'Holy Water',
        body:
          'Near the entrance of most Catholic churches is holy water.\n\nCatholics dip their fingers into the water and make the Sign of the Cross.',
      },
      {
        heading: 'What do I do?',
        body:
          'Dip your fingers lightly into the holy water.\n\nMake the Sign of the Cross:\n\nForehead\nChest\nLeft shoulder\nRight shoulder',
      },
      {
        heading: 'What do I say?',
        body:
          '"In the name of the Father, and of the Son, and of the Holy Spirit. Amen."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Holy water reminds us of Baptism.\n\nThrough Baptism we became children of God and members of the Church.\n\nIt is a small action, but it reminds us:\n\n"I belong to Christ."',
      },
      {
        heading: 'Genuflecting Before Sitting',
        body:
          'Before entering the pew, Catholics usually genuflect toward the tabernacle.\n\nA genuflection is briefly kneeling on one knee as an act of reverence.',
      },
      {
        heading: 'What do I do?',
        body:
          'Face the tabernacle.\n\nLower your right knee briefly to the ground.\n\nMake the Sign of the Cross if you wish.\n\nThen enter the pew.\n\nIf you cannot kneel, a respectful bow is appropriate.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Saint Paul writes:\n\n"At the name of Jesus every knee should bow."\nPhilippians 2:10',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Catholics genuflect because Jesus is truly present in the Eucharist reserved in the tabernacle.\n\nWe are not bowing to a building.\n\nWe are showing love and reverence to Christ.',
      },
      {
        heading: 'Personal Prayer Before Mass',
        body:
          'Before Mass starts, Catholics usually spend a few moments in silent prayer.',
      },
      {
        heading: 'What do I do?',
        body: 'Sit or kneel.\n\nSpeak honestly to God.',
      },
      {
        heading: 'What do I say?',
        body:
          'You might pray:\n\n"Lord, help me be present. Open my heart to hear you."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Mass is not something we watch.\n\nIt is something we enter into.\n\nThis quiet time helps us prepare to receive what God wants to give us.',
      },
    ],
  },
  {
    id: 'introductory-rites',
    number: '1',
    title: 'Introductory Rites',
    intro:
      'Placeholder. The opening of the Mass that gathers us together as one body and prepares us to listen and to celebrate.',
    cards: [
      {
        heading: 'What is happening?',
        body:
          'Placeholder. The procession, the Sign of the Cross, the greeting, the Penitential Act, and the opening prayer.',
      },
      {
        heading: 'Biblical connection',
        body: 'Placeholder. Scriptural roots of gathering, repentance, and praise.',
      },
      {
        heading: 'History and Tradition',
        body: 'Placeholder. How the introductory rites developed in the Church.',
      },
      {
        heading: 'What do I do?',
        body:
          'Placeholder. Stand for the procession, make the Sign of the Cross, and join in the responses.',
      },
      {
        heading: 'What do I say?',
        body:
          'When the priest says "The Lord be with you," we respond, "And with your spirit."',
      },
      {
        heading: 'Why does this matter?',
        body: 'Placeholder. We begin by acknowledging God and asking for mercy.',
      },
    ],
  },
  {
    id: 'liturgy-of-the-word',
    number: '2',
    title: 'Liturgy of the Word',
    intro:
      'Placeholder. God speaks to us through the Scriptures, and we respond in faith.',
    cards: [
      {
        heading: 'What is happening?',
        body:
          'Placeholder. The readings, the Responsorial Psalm, the Gospel, the homily, the Profession of Faith, and the Prayer of the Faithful.',
      },
      {
        heading: 'Biblical connection',
        body: 'Placeholder. The Word of God proclaimed and received.',
      },
      {
        heading: 'What do I do?',
        body:
          'Placeholder. Sit for the readings, stand for the Gospel, and listen attentively.',
      },
      {
        heading: 'What do I say?',
        body:
          'After the readings we respond, "Thanks be to God." Before the Gospel we say, "Glory to you, O Lord," and after it, "Praise to you, Lord Jesus Christ."',
      },
      {
        heading: 'Why does this matter?',
        body: 'Placeholder. God truly speaks to us when the Scriptures are proclaimed.',
      },
    ],
  },
  {
    id: 'liturgy-of-the-eucharist',
    number: '3',
    title: 'Liturgy of the Eucharist',
    intro:
      'Placeholder. The heart of the Mass, where bread and wine become the Body and Blood of Christ.',
    cards: [
      {
        heading: 'What is happening?',
        body:
          'Placeholder. The presentation of the gifts, the Eucharistic Prayer, and the consecration.',
      },
      {
        heading: 'Biblical connection',
        body: 'Placeholder. The Last Supper and the sacrifice of Christ.',
      },
      {
        heading: 'History and Tradition',
        body:
          'Placeholder. The altar bells are sometimes rung at the consecration to call our attention to the moment when the bread and wine become the Body and Blood of Christ.',
      },
      {
        heading: 'What do I do?',
        body: 'Placeholder. Kneel during the Eucharistic Prayer where it is the custom.',
      },
      {
        heading: 'What do I say?',
        body:
          'When the priest says "Pray, brethren...," we respond, "May the Lord accept the sacrifice at your hands, for the praise and glory of his name, for our good and the good of all his holy Church."',
      },
      {
        heading: 'Why does this matter?',
        body: 'Placeholder. Christ makes himself truly present in the Eucharist.',
      },
    ],
  },
  {
    id: 'communion-rite',
    number: '4',
    title: 'Communion Rite',
    intro:
      'Placeholder. We prepare to receive Christ, or to draw near to him spiritually, in unity and peace.',
    cards: [
      {
        heading: 'What is happening?',
        body:
          'Placeholder. The Lord’s Prayer, the Sign of Peace, the Lamb of God, and the reception of Holy Communion.',
      },
      {
        heading: 'Biblical connection',
        body: 'Placeholder. The bread of life and communion with Christ.',
      },
      {
        heading: 'What do I do?',
        body:
          'Placeholder. If you are able to receive Holy Communion, come forward reverently. If you are not able to receive, you may remain in your place in prayer, or come forward with your arms crossed over your chest to ask for a blessing. Local custom varies, so it is good to notice how others in your parish do this.',
      },
      {
        heading: 'What do I say?',
        body:
          'Before Communion we say together, "Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed." When the minister says "The Body of Christ," we respond, "Amen."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Placeholder. For those who cannot receive Holy Communion at this time, you can still unite yourself to Christ through a prayer of Spiritual Communion.',
        pray: true,
      },
    ],
  },
  {
    id: 'concluding-rites',
    number: '5',
    title: 'Concluding Rites',
    intro:
      'Placeholder. We are blessed and sent out to live what we have celebrated.',
    cards: [
      {
        heading: 'What is happening?',
        body: 'Placeholder. The final blessing and the dismissal.',
      },
      {
        heading: 'What do I do?',
        body:
          'Placeholder. Receive the blessing, and you may genuflect toward the tabernacle as you leave.',
      },
      {
        heading: 'What do I say?',
        body: 'At the dismissal we respond, "Thanks be to God."',
      },
      {
        heading: 'Why does this matter?',
        body: 'Placeholder. The Mass sends us out to bring Christ to the world.',
      },
    ],
  },
];
