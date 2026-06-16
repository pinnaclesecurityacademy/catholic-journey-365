// Order of the Mass: a beginner-friendly guided walk through the parts of the
// Mass. Structure and placeholder content only. Each section carries a set of
// optional teaching cards. The actual catechesis is filled in later, after a
// Catholic accuracy review, so the prose below is intentionally placeholder.
//
// Copyright note: this guide does not reproduce the full official Roman Missal
// text, full Eucharistic Prayers, the full Gloria, or the full Creed. Only
// short common responses appear, and only once approved content is added.

export type MassCard = {
  // The fixed teaching prompt this card answers.
  heading:
    | 'What is happening?'
    | 'Biblical connection'
    | 'History and Tradition'
    | 'What do I do?'
    | 'What do I say?'
    | 'Why does this matter?';
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
      'Placeholder. How we prepare ourselves as we arrive, entering into a spirit of reverence and prayer.',
    cards: [
      {
        heading: 'What is happening?',
        body:
          'Placeholder. We arrive, quiet our hearts, and prepare to enter into worship.',
      },
      {
        heading: 'What do I do?',
        body:
          'Placeholder. Blessing yourself with holy water at the entrance as a reminder of Baptism. Genuflecting toward the tabernacle before taking your seat, out of reverence for the presence of Christ. Keeping a prayerful silence before Mass begins.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Placeholder. These small gestures help us turn our attention to God and recall who we are about to meet.',
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
