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
      'Coming together as the family of God. The Introductory Rites begin the celebration of the Mass. We entered the church as individuals, carrying different worries, struggles, joys, and prayers. Now we are gathered together as one Body of Christ. Before listening to Scripture and before receiving the Eucharist, the Church prepares our hearts. The Mass begins by reminding us: we belong to God, we need His mercy, and we are here to worship Him.',
    cards: [
      {
        heading: 'Entrance Procession',
        body:
          'The priest, deacon, and ministers process toward the altar while the people sing.\n\nThis is more than simply walking to the front of the church.\n\nThe procession represents the Church journeying toward God. We are a pilgrim people moving toward heaven.\n\nThe priest reverences the altar because the altar represents Christ and is where the Eucharistic sacrifice will take place.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Throughout Scripture, God’s people are on a journey.\n\nThe Israelites journeyed from slavery in Egypt toward the Promised Land.\n\nJesus journeyed to Jerusalem, where He offered Himself for our salvation.\n\nAt Mass, we join the journey toward God.',
      },
      {
        heading: 'What do I do?',
        body:
          'Stand.\n\nJoin the hymn if you can.\n\nIf you do not know the words, that is okay. Listen, pray, and allow yourself to enter into worship.',
      },
      {
        heading: 'What do I say?',
        body:
          'Usually nothing.\n\nThe entrance hymn is the prayer of the people at this moment.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Mass is not a performance where the priest acts and everyone watches.\n\nEveryone present participates.\n\nThe Entrance Procession reminds us:\n\n"The journey toward God begins together."',
      },
      {
        heading: 'Sign of the Cross',
        body:
          'The priest begins Mass by calling upon the Holy Trinity:\n\nFather.\nSon.\nHoly Spirit.\n\nThis is the same name in which Christians are baptised.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Jesus told His disciples:\n\n"Baptise them in the name of the Father and of the Son and of the Holy Spirit."\nMatthew 28:19',
      },
      {
        heading: 'What do I do?',
        body:
          'Stand.\n\nMake the Sign of the Cross:\n\nForehead.\nChest.\nLeft shoulder.\nRight shoulder.',
      },
      {
        heading: 'What do I say?',
        body: 'Amen.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The first words and actions of Mass remind us:\n\nThis is not about ourselves.\n\nWe enter into the life and love of God.',
      },
      {
        heading: 'Greeting',
        body:
          'The priest greets the people, and the people respond.\n\nThis greeting recognises that Christ is present with His Church gathered in prayer.',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nListen and respond.',
      },
      {
        heading: 'What do I say?',
        body:
          'The priest may say:\n\n"The Lord be with you."\n\nWe respond:\n\n"And with your spirit."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'This is not simply saying hello back.\n\nThe response recognises the work of the Holy Spirit through the priest as he leads the celebration of the Mass.',
      },
      {
        heading: 'Penitential Act',
        body:
          'Before moving deeper into worship, we acknowledge our sins and ask God for mercy.\n\nThe Church does not begin Mass by pretending everyone is perfect.\n\nWe begin with humility.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Jesus taught:\n\n"God, be merciful to me, a sinner."\nLuke 18:13',
      },
      {
        heading: 'What do I do?',
        body:
          'Stand.\n\nThink about your life.\n\nWhere have I failed to love God?\n\nWhere have I failed to love others?\n\nAsk sincerely for mercy.',
      },
      {
        heading: 'What do I say?',
        body:
          'The priest invites everyone to acknowledge their sins.\n\nThe response may take different forms depending on the Mass.\n\nYou may pray:\n\n"I confess to almighty God..."\n\nor respond:\n\n"Lord, have mercy."\n"Christ, have mercy."\n"Lord, have mercy."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'This moment reminds us:\n\nWe do not earn God’s love.\n\nWe receive His mercy.\n\nThe Penitential Act prepares our hearts, but it does not replace the Sacrament of Confession for serious sin.',
      },
      {
        heading: 'Gloria',
        body:
          'The Church praises God.\n\nAfter asking for mercy, we respond with worship.\n\nThe focus moves from our weakness to God’s greatness.',
      },
      {
        heading: 'Biblical connection',
        body:
          'The opening words come from the angels announcing the birth of Jesus:\n\n"Glory to God in the highest."\nLuke 2:14',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nSing or pray along.',
      },
      {
        heading: 'What do I say?',
        body:
          'Follow the words used at your parish.\n\nThe Gloria begins, "Glory to God in the highest, and on earth peace to people of good will."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The Gloria reminds us that worship is not only about asking God for help.\n\nSometimes we simply praise Him because He is God.',
      },
      {
        heading: 'Collect Prayer',
        body:
          'The priest invites everyone to pray.\n\nThere is a moment of silence.\n\nThe prayers of everyone gathered are brought together into one prayer offered to God.',
      },
      {
        heading: 'What do I do?',
        body:
          'Stand.\n\nUse the silence.\n\nBring your intentions before God:\n\nFamily.\nStruggles.\nGratitude.\nPeople who need prayer.',
      },
      {
        heading: 'What do I say?',
        body: 'Amen.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'We came into church with many different prayers.\n\nNow the Church moves forward united.\n\nThe preparation is complete.\n\nWe are ready to listen to God speak.',
      },
    ],
  },
  {
    id: 'liturgy-of-the-word',
    number: '2',
    title: 'Liturgy of the Word',
    intro:
      'God speaks to His people. After preparing our hearts, we sit and listen. The Mass now moves from gathering together to hearing the voice of God through Sacred Scripture. Catholics believe Scripture is not just a history book or inspirational writing. When the Bible is proclaimed at Mass, God is speaking to His people today. The same God who spoke to Abraham, Moses, the prophets, and the apostles continues to speak to His Church.',
    cards: [
      {
        heading: 'Today’s Mass Readings',
        body:
          'Every Mass has Scripture readings chosen by the Church.\n\nCatholics around the world hear the same readings each day, uniting the Church in prayer.\n\nYou can prepare your heart by reading and reflecting on the readings before Mass. This is a time to listen.',
      },
      {
        heading: 'First Reading',
        body:
          'A reader proclaims the first Scripture reading.\n\nMost Sundays, this reading comes from the Old Testament.\n\nThe Old Testament tells the story of creation, God’s promises, His covenant with Israel, and His preparation for the coming of Jesus.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Jesus Himself read Scripture publicly in worship.\n\nIn the synagogue, He stood and read from the prophet Isaiah.\n\nHe said:\n\n"Today this Scripture has been fulfilled in your hearing."\nLuke 4:21',
      },
      {
        heading: 'What do I do?',
        body:
          'Sit.\n\nListen carefully.\n\nDo not think of this as someone simply reading a book.\n\nHear it as God speaking.',
      },
      {
        heading: 'What do I say?',
        body:
          'At the end:\n\nReader:\n"The word of the Lord."\n\nYou respond:\n\n"Thanks be to God."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The story of salvation did not begin when Jesus was born in Bethlehem.\n\nGod was preparing humanity for Christ from the beginning.\n\nThe Old Testament helps us understand who Jesus is and why He came.',
      },
      {
        heading: 'Responsorial Psalm',
        body:
          'After the First Reading, we respond by praying a Psalm.\n\nThe Psalms are ancient prayers from Scripture.\n\nThey express every human emotion:\n\nJoy.\nFear.\nSuffering.\nRepentance.\nTrust.\nPraise.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Jesus Himself prayed the Psalms.\n\nEven on the Cross, Jesus prayed using the words of Psalm 22:\n\n"My God, my God, why have you forsaken me?"',
      },
      {
        heading: 'What do I do?',
        body: 'Sit.\n\nListen and join the repeated response.',
      },
      {
        heading: 'What do I say?',
        body:
          'The response changes each Mass.\n\nThe reader or cantor will usually say it first.\n\nYou repeat the response.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'After God speaks, we respond.\n\nThe Psalms teach us how to bring our whole life before God.',
      },
      {
        heading: 'Second Reading',
        body:
          'On Sundays and special celebrations, there is usually a second reading.\n\nThis normally comes from the letters of the apostles in the New Testament.\n\nThese letters were written to guide the early Christians.',
      },
      {
        heading: 'History and Tradition',
        body:
          'The first Christians gathered together and listened to the teaching of the apostles.\n\nThe same letters that strengthened the early Church continue to strengthen us today.',
      },
      {
        heading: 'What do I do?',
        body: 'Sit.\n\nListen.',
      },
      {
        heading: 'What do I say?',
        body:
          'At the end:\n\nReader:\n"The word of the Lord."\n\nYou respond:\n\n"Thanks be to God."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The Church today is connected to the Church of the apostles.\n\nWe are listening to the same faith handed down from the beginning.',
      },
      {
        heading: 'Gospel Acclamation',
        body:
          'The assembly stands to welcome the Gospel.\n\nThe Gospel is the high point of the Liturgy of the Word because it contains the words and actions of Jesus Christ.',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nSing or say the acclamation.',
      },
      {
        heading: 'What do I say?',
        body: 'Usually:\n\n"Alleluia."\n\nDuring Lent, another acclamation is used.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'We stand because we are about to hear the words and life of our King.\n\nThe Gospel receives special honour because Christ Himself is at the centre.',
      },
      {
        heading: 'Gospel Reading',
        body:
          'The priest or deacon proclaims the Gospel.\n\nBefore hearing it, Catholics make three small crosses:\n\nOne on the forehead.\nOne on the lips.\nOne on the heart.\n\nIt is a silent prayer:\n\nMay God’s Word be in my mind.\n\nMay God’s Word be on my lips.\n\nMay God’s Word be in my heart.',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nMake the three small crosses.\n\nListen.',
      },
      {
        heading: 'What do I say?',
        body:
          'Priest:\n"A reading from the holy Gospel according to..."\n\nYou respond:\n\n"Glory to you, O Lord."\n\nAt the end:\n\nPriest:\n"The Gospel of the Lord."\n\nYou respond:\n\n"Praise to you, Lord Jesus Christ."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The Gospel is not only information about Jesus.\n\nIt is an encounter with Jesus.',
      },
      {
        heading: 'Homily',
        body:
          'The priest or deacon explains the Scriptures and connects them to our lives.',
      },
      {
        heading: 'Biblical connection',
        body:
          'After His Resurrection, Jesus walked with two disciples on the road to Emmaus.\n\nHe explained the Scriptures and showed how they pointed to Him.\n\nThe homily continues this tradition.',
      },
      {
        heading: 'What do I do?',
        body: 'Sit.\n\nListen.\n\nAsk:\n\n"What is God trying to show me?"',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The purpose is not just learning.\n\nThe goal is conversion.\n\nWe allow God to change our hearts.',
      },
      {
        heading: 'Profession of Faith',
        body:
          'After hearing God’s Word and the homily, the Church responds by proclaiming what we believe.\n\nThe Creed is a summary of the Christian faith handed down through the centuries.\n\nWe do not say only what we feel.\n\nWe profess the faith of the Church.',
      },
      {
        heading: 'History and Tradition',
        body:
          'The Nicene Creed comes from the early centuries of Christianity, especially the Councils of Nicaea in 325 and Constantinople in 381.\n\nThe Church used it to clearly explain the faith and protect the truth about who Jesus is.',
      },
      {
        heading: 'What do I do?',
        body:
          'Stand.\n\nPray together with the Church.\n\nBow when remembering the mystery of Jesus becoming man.',
      },
      {
        heading: 'What do I say?',
        body:
          'Pray the Creed together with the Church, following the words used at your parish.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The Creed reminds us that Christianity is bigger than ourselves.\n\nWe join the same faith proclaimed by Christians across the world and throughout history.',
      },
      {
        heading: 'Prayers of the Faithful',
        body:
          'The Church brings prayers and needs before God.\n\nWe pray for:\n\nThe Church.\nThe world.\nThose suffering.\nOur community.',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nPray with everyone.',
      },
      {
        heading: 'What do I say?',
        body: 'Usually:\n\n"Lord, hear our prayer."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The Mass is never only about ourselves.\n\nWe pray as members of the Body of Christ for the needs of others.',
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
