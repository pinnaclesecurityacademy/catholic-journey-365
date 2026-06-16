// Order of the Mass: a beginner-friendly guided walk through the parts of the
// Mass. Each section carries a set of teaching cards covering what is
// happening, the biblical connection, history and tradition, what to do, what
// to say, and why it matters.
//
// Copyright note: this guide does not reproduce the full official Roman Missal
// text, full Eucharistic Prayers, the full Gloria, or the full Creed. Only
// short common responses appear.

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
    'A guide to understanding and entering into the Catholic Mass.\n\nThe Mass is the central prayer of the Catholic Church.\n\nAt Mass, Catholics gather to hear the Word of God, worship the Father, and receive Jesus Christ in the Eucharist.',
  whoIsItFor:
    'This guide is for anyone who is new, returning to the Church, or simply wants to understand the Mass more deeply.',
  howToUse:
    'Walk step by step through what happens, what to do, what to say, and why each moment matters.\n\nThe goal is not just to follow along. The goal is to enter more deeply into the mystery of Christ.\n\nIf you feel unsure at Mass, you are not alone. Follow those around you, listen, pray, and keep coming closer to God.',
};

export const massComplete = {
  title: 'You have completed the Order of the Mass guide',
  body:
    'You now have a deeper understanding of the prayers, actions, and meaning of the Mass.\n\nThe Mass is not only something Catholics attend. It is something we enter into.\n\nThrough the Mass we hear God’s Word, encounter Jesus in the Eucharist, and are sent out to live our faith.\n\nCome back to this guide whenever you need help following along.\n\nYour journey with Christ continues.',
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
      'The sacrifice and gift of Jesus. Everything in the Mass has been leading to this moment. We have gathered as God’s family. We have asked for mercy. We have listened to His Word. Now we enter the Eucharist. Catholics believe the Eucharist is not only a symbol. Jesus Christ becomes truly present: Body, Blood, Soul, and Divinity. At the Last Supper, Jesus gave the Church this gift and commanded, "Do this in remembrance of me." (Luke 22:19). The Mass makes present the one sacrifice of Jesus on the Cross. It is not Jesus being sacrificed again. It is the one sacrifice of Christ made present to us.',
    cards: [
      {
        heading: 'Presentation of the Gifts',
        body:
          'Bread and wine are brought to the altar.\n\nThe priest prepares the gifts that will become the Body and Blood of Christ.\n\nThe collection may also take place, where people offer support for the needs of the Church and others.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Throughout Scripture, people offered gifts to God.\n\nAbel offered the first of his flock.\n\nMelchizedek offered bread and wine.\n\nJesus took bread and wine at the Last Supper.\n\nThese signs find their fulfilment in the Eucharist.',
      },
      {
        heading: 'What do I do?',
        body:
          'Sit.\n\nYou may sing the offertory hymn.\n\nYou can also quietly offer your own life to God:\n\nYour struggles.\nYour family.\nYour work.\nYour worries.\nYour gratitude.',
      },
      {
        heading: 'What do I say?',
        body:
          'Usually nothing.\n\nIf the priest says the prayers aloud, there may be a response.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The bread and wine represent more than physical gifts.\n\nWe place ourselves before God.\n\nWe offer Him our lives and allow Him to transform us.',
      },
      {
        heading: 'Preparation for the Eucharistic Prayer',
        body:
          'The priest invites everyone to pray that the sacrifice may be acceptable to God.\n\nThe Church prepares to enter the most sacred part of the Mass.',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nRespond with the congregation.',
      },
      {
        heading: 'What do I say?',
        body: 'Follow the response at Mass.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The Eucharist is not only the priest’s prayer.\n\nThe whole Church joins together in offering worship to the Father through Jesus Christ.',
      },
      {
        heading: 'Eucharistic Prayer',
        body:
          'This is the centre of the Mass.\n\nThe priest gives thanks to God the Father and calls upon the Holy Spirit.\n\nThrough the words of Jesus and the power of the Holy Spirit, the bread and wine become the Body and Blood of Christ.\n\nThis change is called transubstantiation.\n\nThe appearance of bread and wine remains, but their deepest reality has changed.',
      },
      {
        heading: 'Biblical connection',
        body:
          'At the Last Supper Jesus said:\n\n"This is my body, which is given for you."\nLuke 22:19\n\nSaint Paul wrote:\n\n"The cup of blessing that we bless, is it not a participation in the blood of Christ?"\n1 Corinthians 10:16',
      },
      {
        heading: 'What do I do?',
        body:
          'Stand at the beginning.\n\nWhen appropriate, kneel.\n\nListen carefully.\n\nThis is a moment of deep reverence.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'At the altar, heaven and earth meet.\n\nThe Church joins the worship of Christ offered to the Father.',
      },
      {
        heading: 'Holy, Holy, Holy',
        body:
          'Before the Consecration, the Church joins the song of heaven.',
      },
      {
        heading: 'Biblical connection',
        body:
          'The words come from the worship described by the prophet Isaiah:\n\n"Holy, holy, holy is the Lord of hosts."\nIsaiah 6:3\n\nIn the Book of Revelation, heaven worships God with similar praise.\n\nAt Mass, we join that heavenly worship.',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nSing or pray.\n\nThen kneel where this is the custom.',
      },
      {
        heading: 'What do I say?',
        body: 'Follow the words at your parish.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Catholics believe Mass is not just something happening on earth.\n\nWe are joining the eternal worship of heaven.',
      },
      {
        heading: 'Consecration',
        body:
          'This is the most sacred moment of the Mass.\n\nThe priest repeats the words of Jesus from the Last Supper.\n\nThe bread and wine become the Body and Blood of Christ.\n\nThe priest lifts up the Host and Chalice.',
      },
      {
        heading: 'What do I do?',
        body:
          'Kneel.\n\nLook toward Jesus in the Eucharist.\n\nMany Catholics silently pray:\n\n"My Lord and my God."',
      },
      {
        heading: 'Biblical connection',
        body:
          'After the Resurrection, Thomas saw Jesus and said:\n\n"My Lord and my God."\nJohn 20:28',
      },
      {
        heading: 'Why does this matter?',
        body:
          'This is not a reminder of something Jesus did long ago.\n\nThe sacrifice of the Cross is made present.\n\nWe stand at Calvary with Mary and the disciples.',
      },
      {
        heading: 'Why do bells ring?',
        body:
          'In many Catholic churches, you may hear bells ring during the most sacred moments of the Mass.\n\nThese are often called altar bells.\n\nThey are commonly rung around the time of the Consecration, especially when the priest elevates the Body and Blood of Christ.\n\nThe bells are a way of saying:\n\n"Pay attention. Something sacred is happening."',
      },
      {
        heading: 'History and Tradition',
        body:
          'For centuries, parts of the Mass were prayed quietly and churches were often large.\n\nThe bells helped the faithful know when the Consecration was taking place so they could focus their hearts on Christ.',
      },
      {
        heading: 'What do I do?',
        body:
          'Remain kneeling.\n\nLook toward Jesus in the Eucharist.\n\nPause.\n\nPray.',
      },
      {
        heading: 'What do I say?',
        body:
          'Many Catholics quietly pray:\n\n"My Lord and my God."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The bells are not magic and they do not cause the change to happen.\n\nThe change happens through the power of God during the Eucharistic Prayer.\n\nThe bells are a sign of reverence, joy, and attention.\n\nThey remind us:\n\nJesus is here.\n\nNot every parish uses bells, so do not worry if you do not hear them.',
      },
      {
        heading: 'Memorial Acclamation',
        body:
          'After the Consecration, the people proclaim the mystery of faith.\n\nWe announce the death and resurrection of Jesus and look forward to His return.',
      },
      {
        heading: 'What do I do?',
        body: 'Remain kneeling.\n\nRespond with the congregation.',
      },
      {
        heading: 'What do I say?',
        body: 'Follow the acclamation used at Mass.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Christianity is centred on the death and resurrection of Jesus.\n\nThe Eucharist is connected to this saving mystery.',
      },
      {
        heading: 'Great Amen',
        body:
          'The Eucharistic Prayer ends with praise of God.\n\nThe people respond:\n\nAmen.\n\nThis word means: Yes. I believe. So be it.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'This is one of the most important Amens of the Mass.\n\nThe Church joins itself to everything that has been prayed.',
      },
    ],
  },
  {
    id: 'communion-rite',
    number: '4',
    title: 'Communion Rite',
    intro:
      'Receiving Jesus Christ. The Mass now moves from the altar to our personal encounter with Christ. We have listened to God’s Word. We have witnessed the bread and wine become the Body and Blood of Jesus. Now the Church prepares to receive Him in Holy Communion. For Catholics, Communion is not only a symbol of remembering Jesus. It is a real sharing in His life. Jesus said, "Whoever eats my flesh and drinks my blood remains in me and I in him." (John 6:56).',
    cards: [
      {
        heading: 'The Lord’s Prayer',
        body:
          'The Church stands together and prays the prayer Jesus Himself taught us.\n\nBefore receiving Communion, we call God Father.',
      },
      {
        heading: 'Biblical connection',
        body:
          'When the disciples asked Jesus how to pray, He taught them the Our Father.\n\nThis prayer comes directly from Christ.',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nPray with everyone.',
      },
      {
        heading: 'What do I say?',
        body:
          'Pray the Our Father with the congregation, following the words used at your parish.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Before approaching the altar, we remember who we are:\n\nChildren of God.\n\nWe approach not because we are perfect, but because we trust the Father.',
      },
      {
        heading: 'Sign of Peace',
        body:
          'The priest offers Christ’s peace to the people.\n\nThe congregation may share a simple gesture of peace with those nearby.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Jesus said:\n\n"Peace I leave with you; my peace I give to you."\nJohn 14:27',
      },
      {
        heading: 'What do I do?',
        body:
          'Stand.\n\nOffer peace respectfully to people near you.\n\nDepending on local custom, this might be:\n\nA handshake.\nA nod.\nA simple greeting.',
      },
      {
        heading: 'What do I say?',
        body: '"Peace be with you."\n\nor simply:\n\n"Peace."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Before receiving Communion, we remember we are united as brothers and sisters in Christ.\n\nThe Eucharist brings us into communion with God and each other.',
      },
      {
        heading: 'Lamb of God',
        body:
          'The priest breaks the consecrated Host.\n\nThe Church calls Jesus the Lamb of God.',
      },
      {
        heading: 'Biblical connection',
        body:
          'When John the Baptist saw Jesus, he said:\n\n"Behold, the Lamb of God, who takes away the sin of the world."\nJohn 1:29\n\nThis connects Jesus to the Passover lamb.\n\nThrough His sacrifice, Jesus brings salvation.',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nThen kneel when appropriate.',
      },
      {
        heading: 'What do I say?',
        body: 'Follow the words at your parish.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'We are preparing to receive the same Jesus who gave Himself for us on the Cross.',
      },
      {
        heading: 'Before Communion',
        body:
          'The priest shows the Eucharist to the people.\n\nTogether, we acknowledge our need for God’s mercy before receiving Jesus.',
      },
      {
        heading: 'Biblical connection',
        body:
          'The words we say are connected to the faith of the Roman centurion who came to Jesus.\n\nHe said:\n\n"Lord, I am not worthy to have you come under my roof."\nMatthew 8:8\n\nJesus praised his faith.',
      },
      {
        heading: 'What do I do?',
        body: 'Kneel.\n\nPrepare your heart.',
      },
      {
        heading: 'What do I say?',
        body: 'Follow the words at Mass.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'This prayer is not saying:\n\n"God does not love me."\n\nIt means:\n\n"I recognise how great this gift is."\n\nWe receive Communion because of God’s grace, not because we earned it.',
      },
      {
        heading: 'Receiving Holy Communion',
        body:
          'Catholics who are properly prepared come forward to receive Jesus in the Eucharist.',
      },
      {
        heading: 'What do I do?',
        body:
          'Walk forward reverently.\n\nYou may receive on your tongue or in your hands.\n\nIf receiving in your hands, make a throne with your hands and consume the Host immediately.',
      },
      {
        heading: 'What do I say?',
        body:
          'When the priest or minister says:\n\n"The Body of Christ."\n\nYou respond:\n\n"Amen."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'This small Amen is a huge statement of faith.\n\nYou are saying you believe this is truly Jesus.',
      },
      {
        heading: 'What if I cannot receive Holy Communion?',
        body:
          'Not everyone who attends Mass receives Communion.\n\nSome people are still preparing to become Catholic.\n\nSome have not yet received First Holy Communion.\n\nSome Catholics may choose not to receive because they need to go to Confession first.\n\nIf this is you, do not feel like you do not belong.\n\nBeing at Mass is still a beautiful step toward God.\n\nJesus is still calling you closer.',
      },
      {
        heading: 'What do I do?',
        body:
          'You may remain in your pew and pray.\n\nIn many parishes, you may also join the Communion procession and cross your arms over your chest to indicate that you are not receiving Communion.\n\nThe priest or minister may offer a short blessing or prayer.\n\nBecause customs can vary, follow the practice of your local parish.',
      },
      {
        heading: 'What do I say?',
        body: 'You may pray quietly from your heart.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'If you cannot receive today, do not walk away from Jesus.\n\nKeep coming.\n\nKeep praying.\n\nKeep seeking Him.',
      },
      {
        heading: 'Spiritual Communion',
        body:
          'A Spiritual Communion is a prayer asking Jesus to come into your heart when you cannot receive the Eucharist sacramentally.\n\nIt expresses your desire to be close to Him.\n\nGod sees your love and your desire for Him.',
      },
      {
        heading: 'What do I say?',
        body: 'Pray quietly and sincerely from your heart:',
        pray: true,
      },
      {
        heading: 'Why does this matter?',
        body:
          'The desire for Jesus is already a movement of grace.\n\nThe journey toward Christ continues.',
      },
      {
        heading: 'After Receiving Communion',
        body:
          'After Communion, the church enters a time of prayer and thanksgiving.',
      },
      {
        heading: 'What do I do?',
        body:
          'Return to your pew.\n\nKneel or sit according to local practice.\n\nPray.',
      },
      {
        heading: 'What do I say?',
        body:
          'You might say:\n\n"Jesus, thank you for coming to me. Help me follow you."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'Communion is not the end of Mass.\n\nIt is the beginning of allowing Christ to transform our lives.',
      },
      {
        heading: 'Prayer After Communion',
        body:
          'The priest gathers everyone’s prayers after receiving the Eucharist.',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.',
      },
      {
        heading: 'What do I say?',
        body: 'Amen.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The Church thanks God for the gift received and prepares to go back into the world.',
      },
    ],
  },
  {
    id: 'concluding-rites',
    number: '5',
    title: 'Concluding Rites',
    intro:
      'Sent out to live the Gospel. The Mass does not end because our time with God is finished. It ends because we are being sent. We have gathered as God’s people. We have heard His Word. We have encountered Christ in the Eucharist. Now we are called to carry Christ into our families, workplaces, and the world. The word Mass comes from the Latin dismissal, "Ite, missa est," which carries the idea of being sent on a mission.',
    cards: [
      {
        heading: 'Announcements',
        body:
          'Sometimes the priest or parish community shares announcements.\n\nThese might include parish events, opportunities to serve, or important information.',
      },
      {
        heading: 'What do I do?',
        body:
          'Sit or remain attentive, depending on the parish.\n\nListen.',
      },
      {
        heading: 'What do I say?',
        body: 'Usually nothing.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The Church is not only a place we visit once a week.\n\nIt is a community we are part of.',
      },
      {
        heading: 'Final Blessing',
        body:
          'Before leaving, the priest blesses the people.\n\nWe entered the church making the Sign of the Cross.\n\nNow we leave with the blessing of the Trinity.\n\nThe Mass begins and ends with God.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Before Jesus ascended into heaven, He blessed His disciples.\n\nLuke tells us:\n\n"He lifted up his hands and blessed them."\nLuke 24:50',
      },
      {
        heading: 'What do I do?',
        body:
          'Stand.\n\nMake the Sign of the Cross as the priest gives the blessing.',
      },
      {
        heading: 'What do I say?',
        body: 'Amen.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'A blessing is not just a nice ending.\n\nWe receive God’s grace and are strengthened to live as disciples.',
      },
      {
        heading: 'Dismissal',
        body:
          'The priest or deacon sends the people out.\n\nWe are reminded that the Christian life continues outside the church doors.',
      },
      {
        heading: 'Biblical connection',
        body:
          'Jesus told His disciples:\n\n"Go therefore and make disciples of all nations."\nMatthew 28:19',
      },
      {
        heading: 'What do I do?',
        body: 'Stand.\n\nRespond.',
      },
      {
        heading: 'What do I say?',
        body:
          'The priest or deacon gives the dismissal.\n\nYou respond:\n\n"Thanks be to God."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'We are not saying:\n\n"Thanks, the Mass is finally over."\n\nWe are thanking God for what we have received and accepting the mission to live differently.',
      },
      {
        heading: 'Final Hymn and Leaving the Church',
        body:
          'The priest and ministers process out.\n\nA hymn may be sung.\n\nMany people stay for a moment of personal prayer.',
      },
      {
        heading: 'What do I do?',
        body:
          'You may join the hymn.\n\nBefore leaving your pew:\n\nFace the tabernacle.\nGenuflect or bow reverently.\nLeave quietly.',
      },
      {
        heading: 'What do I say?',
        body:
          'Usually nothing.\n\nYou may quietly thank God for the Mass.',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The same Jesus we honoured when we entered the church remains present.\n\nWe leave with gratitude and respect.',
      },
      {
        heading: 'After Mass',
        body:
          'The real journey begins.\n\nThe goal of Mass is not only to spend an hour with God.\n\nThe goal is transformation.\n\nAsk yourself:\n\nWhat did God say to me today?\n\nWho can I love better?\n\nHow can I bring Christ into my home?\n\nYour family.\nYour workplace.\nYour struggles.\nYour ordinary life.\n\nThat is where you now live the Mass.',
      },
      {
        heading: 'What do I do?',
        body: 'Go in peace.\n\nTry to live what you have received.',
      },
      {
        heading: 'What do I say?',
        body:
          'You might pray:\n\n"Lord, help me live this Mass in my ordinary life."',
      },
      {
        heading: 'Why does this matter?',
        body:
          'The Mass sends us out to love, serve, forgive, and witness to Christ.',
      },
    ],
  },
];
