// The Sacraments: a beginner-friendly, reverent walk through the seven
// Sacraments of the Catholic Church. Each Sacrament carries the same shape so
// the experience feels consistent: what it is, why it matters, the Scripture
// connection, common questions, a heartfelt prayer, and a next step.
//
// Catholic accuracy notes held throughout this content:
// - The Sacraments are instituted by Christ; grace comes from God.
// - The priest acts in the person of Christ, not instead of Christ.
// - The Eucharist is truly Jesus Christ, not a metaphor or symbol.
// - The Mass makes present the one sacrifice of Christ; it does not repeat it.
// - Confession restores us through God's mercy.
// - Baptism is not only symbolic; Confirmation is not merely a commitment.

export type SacramentQuestion = {
  question: string;
  answer: string;
};

export type Sacrament = {
  id: string;
  name: string;
  subtitle: string;
  // Short line shown on the overview cards.
  summary: string;
  whatIsIt: string;
  whyItMatters: string;
  scriptureReference: string;
  scriptureConnection: string;
  questions: SacramentQuestion[];
  prayer: string;
  nextStep: string;
};

export const sacramentsIntro = {
  title: 'The Sacraments',
  theme: 'Encounters with Christ through His Church.',
  whatAreThey:
    'Catholics believe the Sacraments are not just symbols or ceremonies. They are visible signs, given by Christ Himself, where God truly gives His grace. In each one, something real happens. Heaven reaches into an ordinary moment with water, oil, bread, wine, words, and touch, and Christ meets us there.',
  heart:
    'The Sacraments are not rewards for perfect people. They are gifts from God to strengthen, heal, forgive, and draw us closer to Him.',
};

export const myJourneyCard = {
  title: 'My Sacrament Journey',
  body:
    'Many Catholics carry different stories. Some were baptized as babies but never really taught the faith. Some made their First Communion and then drifted away. Some were never confirmed. Some have been away from Confession for many years.\n\nThe Church does not begin by asking, "Why were you gone?" The invitation is simpler and warmer than that. Come home.\n\nIf you are unsure which Sacraments you have already received, speak with your parish. They can help you find where you are and what your next step might be.',
};

export const journeyTimeline = {
  initiation: ['Baptism', 'First Confession', 'First Eucharist', 'Confirmation'],
  continuing: [
    'Eucharist, received again and again',
    'Confession, whenever we need to return',
    'Marriage or Holy Orders, as God calls',
    'Anointing of the Sick, in times of illness',
  ],
};

export const sacramentsClosing = {
  title: 'Wherever You Are',
  body:
    'If you are unsure where you stand on your Catholic journey, you do not have to figure it out alone. Reach out to your local parish. Speak with a priest. Ask about RCIA or OCIA, or about completing the Sacraments you have not yet received.\n\nGod is not waiting for you to be ready. He is the One drawing you closer even now. The next step is simply to begin.',
};

export const sacraments: Sacrament[] = [
  {
    id: 'baptism',
    name: 'Baptism',
    subtitle: 'Where the Christian journey begins',
    summary: 'Becoming a child of God and entering the life of the Church.',
    whatIsIt:
      'Baptism is the first of the Sacraments, the doorway into the Christian life. Through water and the words "I baptize you in the name of the Father, and of the Son, and of the Holy Spirit," a person is washed clean of sin and born into new life in Christ. Original sin and, for adults, personal sins are forgiven. The baptized person becomes a child of God, a member of the Church, and a temple of the Holy Spirit. It is celebrated once and marks the soul forever.',
    whyItMatters:
      'Baptism is not only a symbol of belonging. Catholics believe God truly acts in it. In Baptism we are joined to the death and resurrection of Jesus, freed from sin, and filled with grace. It is the foundation everything else is built upon. Every other Sacrament flows from this first gift of new life.',
    scriptureReference: 'Matthew 28:19',
    scriptureConnection:
      'Before returning to the Father, Jesus told His Apostles, "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit" (Matthew 28:19). Jesus Himself was baptized in the Jordan by John, and as He came up from the water the heavens opened and the Spirit descended upon Him. Baptism was given to us by Christ and rooted in His own life.',
    questions: [
      {
        question: 'I was baptized as a child but never practised the faith. What now?',
        answer:
          'Your Baptism is real and it remains. You do not need to be baptized again. The grace given then is still waiting to grow. Returning to the faith is not starting from nothing; it is coming home to something that was always yours. A good next step is to speak with a parish and ask about Confession, Confirmation, and the Eucharist.',
      },
      {
        question: 'Can someone be baptized as an adult?',
        answer:
          'Yes. Many adults are baptized after coming to know Christ and His Church, often through RCIA or OCIA. Adult Baptism is a beautiful and complete beginning of the Christian life.',
      },
    ],
    prayer:
      'Heavenly Father,\n\nThank You for the gift of Baptism, where You called me Your own child and washed me in Your love.\n\nLord Jesus, You went down into the waters of the Jordan to walk beside us. Help me to live the new life You have given me.\n\nHoly Spirit, You came to dwell within me. Stir up that grace again. Renew in me the faith of my Baptism, and lead me closer to Christ each day.\n\nAmen.',
    nextStep:
      'If you are baptized, thank God for it today and ask Him to renew that grace. If you are not yet baptized, or are unsure, contact your parish and ask about RCIA or OCIA.',
  },
  {
    id: 'confirmation',
    name: 'Confirmation',
    subtitle: 'Strengthened by the Holy Spirit',
    summary: 'Receiving the gifts of the Holy Spirit to live the faith fully.',
    whatIsIt:
      'Confirmation completes the grace of Baptism. Through the anointing with sacred chrism and the words "Be sealed with the Gift of the Holy Spirit," the bishop or priest calls down the Holy Spirit upon the person in a deeper way. It strengthens us to live and witness to our faith with courage. Like Baptism, it is received once and marks the soul forever.',
    whyItMatters:
      'Confirmation is not merely a personal commitment ceremony or a graduation from religious education. It is a true outpouring of the Holy Spirit, the same Spirit who came upon the Apostles. Through it we receive the gifts of the Holy Spirit, including wisdom, understanding, counsel, fortitude, knowledge, piety, and fear of the Lord, so that we can live as mature disciples of Christ.',
    scriptureReference: 'Acts 2:1-4',
    scriptureConnection:
      'At Pentecost the Holy Spirit came upon the Apostles like tongues of fire, and the frightened followers of Jesus were transformed into bold witnesses (Acts 2:1-4). In the Acts of the Apostles we also see the Apostles laying hands on the baptized so that they would receive the Holy Spirit (Acts 8:14-17). Confirmation is our share in that same Pentecost grace.',
    questions: [
      {
        question: 'I am an adult Catholic who was never confirmed. Is it too late?',
        answer:
          'It is not too late. Many adults complete their initiation by being confirmed later in life. Parishes regularly help adults prepare for Confirmation, often through RCIA or OCIA or a dedicated group. Speak with your parish; they will welcome you and walk you through it.',
      },
      {
        question: 'Do I need to be confirmed to receive Communion?',
        answer:
          'Confirmation and the Eucharist are distinct. A baptized Catholic in good standing can receive the Eucharist even before Confirmation. Still, Confirmation completes Christian initiation, so the Church encourages every Catholic to receive it.',
      },
    ],
    prayer:
      'Heavenly Father,\n\nYou promised to send Your Spirit upon Your people. Pour out that same Spirit on me.\n\nLord Jesus, You filled Your Apostles with courage at Pentecost. Give me courage to live my faith honestly, even when it is hard.\n\nHoly Spirit, come with Your gifts of wisdom, understanding, counsel, fortitude, knowledge, piety, and holy fear. Strengthen me, guide me, and make me a faithful witness to Christ.\n\nAmen.',
    nextStep:
      'If you have been confirmed, ask the Holy Spirit to stir His gifts in you today. If you have not, contact your parish and ask how an adult can prepare to be confirmed.',
  },
  {
    id: 'eucharist',
    name: 'The Eucharist',
    subtitle: 'Jesus truly present',
    summary: 'The source and summit of the Christian life, Christ Himself.',
    whatIsIt:
      'The Eucharist is at the very heart of the Catholic faith. The Church calls it the source and summit of the Christian life, because everything flows from Christ and everything leads back to Him. At Mass, through the words and actions Jesus gave us at the Last Supper, bread and wine become the Body and Blood of Christ. Catholics believe Jesus is truly present, Body, Blood, Soul, and Divinity. This is why the Eucharist is treated with such reverence, with kneeling, silence, and adoration.',
    whyItMatters:
      'When Catholics ask, "Is it just a symbol?" the answer the Church has held from the very beginning is no. The Eucharist truly is Jesus Christ. This is not magic, and it is not something we make happen by our own power. It is Christ keeping His promise to remain with us. The Mass does not repeat the sacrifice of Calvary; it makes present that one perfect sacrifice of Jesus, so that we can be united to Him. To receive the Eucharist is to receive the Lord Himself.',
    scriptureReference: 'John 6 and Luke 22:19-20',
    scriptureConnection:
      'At the Last Supper, Jesus took bread and said, "This is my body," and took the cup and said, "This is my blood," and told the Apostles, "Do this in remembrance of me" (Luke 22:19-20). Earlier, in John chapter 6, Jesus called Himself the Bread of Life and said plainly that His flesh is true food and His blood is true drink. This was a hard teaching, and many disciples walked away. Jesus did not call them back to say He had only meant it as a symbol. After the Resurrection, two disciples on the road to Emmaus knew Him "in the breaking of the bread" (Luke 24:35). The earliest Christians, in the very first generations, wrote that the Eucharist is truly the Body and Blood of Christ.',
    questions: [
      {
        question: 'Is it just a symbol?',
        answer:
          'No. Catholics believe the Eucharist truly is Jesus Christ, present Body, Blood, Soul, and Divinity. This belief comes from the words of Jesus Himself and has been held by Christians from the beginning. The appearances of bread and wine remain, but what they truly are has been changed.',
      },
      {
        question: 'Why does not everyone receive Communion right away?',
        answer:
          'Receiving Christ in the Eucharist expresses a unity of faith and life that is still growing in someone on the journey. Those not yet in full communion with the Catholic Church, or not yet prepared, do not receive Communion immediately. This is not a rejection of the person or a judgement of their heart. The Church guards this gift with great care because of who it truly is.',
      },
      {
        question: 'What can I do if I cannot receive Communion yet?',
        answer:
          'You can make a Spiritual Communion. This is simply asking Jesus in prayer to come into your heart, expressing your love and desire for Him while you continue on the journey toward Him. Many saints treasured this prayer.',
      },
    ],
    prayer:
      'Lord Jesus,\n\nI believe that You give Yourself to me in the Eucharist out of love. You are truly here, the same Lord who walked the roads of Galilee and gave Your life on the Cross.\n\nHeavenly Father, thank You for keeping Your Son so near to Your people, closer than I could ever deserve.\n\nHoly Spirit, increase my faith, soften my heart, and prepare me to receive this gift with reverence and love.\n\nJesus, even now, come into my heart. Make me one with You.\n\nAmen.',
    nextStep:
      'Spend a quiet minute before Jesus in the tabernacle at a nearby church, or make a Spiritual Communion at home. If you long to receive the Eucharist and are unsure how, ask your parish about the steps.',
  },
  {
    id: 'reconciliation',
    name: 'Confession',
    subtitle: "Returning to the Father's mercy",
    summary: "God's forgiveness, spoken aloud and personally to you.",
    whatIsIt:
      'Confession, also called Reconciliation or Penance, is the Sacrament of God\'s mercy. In it we tell our sins honestly, express our sorrow, and receive absolution, the forgiveness Christ won for us. The priest, acting in the person of Christ, speaks the words of forgiveness, and our friendship with God is restored. It can be received as often as we need it, as many times as we return.',
    whyItMatters:
      'Many people ask why they should tell their sins to a priest instead of only to God in their own heart. The priest is not there because God does not already know your sins. God knows them fully and loves you still. The priest acts in the person of Christ, so that the mercy of Jesus is not only believed quietly but actually heard, spoken aloud, gently and personally, to you. We are physical people, and Christ meets us in a real, human way, with real words of mercy. The mercy of God is always greater than the sins and habits we bring to Him.',
    scriptureReference: 'John 20:21-23',
    scriptureConnection:
      'After the Resurrection, Jesus appeared to the Apostles, breathed on them, and said, "Receive the Holy Spirit. If you forgive the sins of any, they are forgiven them; if you withhold forgiveness from any, it is withheld" (John 20:22-23). Jesus deliberately gave His Apostles the authority to forgive sins in His name. The Sacrament of Reconciliation is how that gift continues today.',
    questions: [
      {
        question: 'I am afraid to go, especially if it has been a long time.',
        answer:
          'That fear is normal, and the priest understands it well. You can simply say, "It has been a long time, and I am not sure what to do." He will gently help you. The priest is bound to absolute secrecy and is there to welcome you, not to shame you. Many people describe a deep peace and lightness afterward.',
      },
      {
        question: 'What actually happens in Confession?',
        answer:
          'You greet the priest, then confess your sins. The priest may offer encouragement and gives you a small penance, often a prayer. You pray an Act of Contrition expressing your sorrow, and the priest speaks the words of absolution. That is the moment Christ forgives you through His Church. Then you go in peace.',
      },
    ],
    prayer:
      'Heavenly Father,\n\nYour mercy is greater than all my sins. I do not come to You because I am good, but because You are good, and You have promised to forgive.\n\nLord Jesus, You came to seek and save the lost. I bring my heart honestly to You, with nothing hidden.\n\nHoly Spirit, give me courage to return, to be honest, and to begin again. Wash me clean, heal what is broken in me, and lead me closer to Christ.\n\nAmen.',
    nextStep:
      'Find your parish confession times. If it has been a long time, you can call the parish or simply tell the priest when you arrive; he will help you.',
  },
  {
    id: 'anointing',
    name: 'Anointing of the Sick',
    subtitle: 'Christ with us in suffering',
    summary: 'Grace, strength, and peace for those who are ill or suffering.',
    whatIsIt:
      'In the Anointing of the Sick, a priest anoints the forehead and hands of someone who is seriously ill, suffering, or weakened by age, praying for God\'s grace and healing. This Sacrament gives strength, peace, and courage, unites the person\'s suffering to Christ, and forgives sins when the person is unable to confess. It can be received more than once, whenever a serious illness or condition returns.',
    whyItMatters:
      'This Sacrament is not only for the final moments before death, and asking for it is not a sign of giving up. It is for anyone facing serious sickness, surgery, or the frailty of age. In it, Christ draws near to us precisely in our weakness. He does not promise to remove every illness, but He promises His presence, His grace, and a peace that the world cannot give. No one has to carry suffering alone.',
    scriptureReference: 'James 5:14-15',
    scriptureConnection:
      'The Letter of James tells us, "Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord; and the prayer of faith will save the sick man" (James 5:14-15). From the earliest days, the Church has cared for the sick in this way, following the example of Jesus, who laid His hands on the sick and healed them.',
    questions: [
      {
        question: 'Is this the same as the Last Rites?',
        answer:
          'It is related but broader. The Anointing of the Sick can be received any time a person faces serious illness, not only at the very end of life. When someone is near death, the Church offers the Last Rites, which include Confession, Anointing, and the Eucharist given as Viaticum.',
      },
      {
        question: 'Will I be physically healed?',
        answer:
          'The Sacrament always gives spiritual grace, strength, and peace, and sometimes God grants physical healing as well. Physical healing is not guaranteed, but Christ\'s closeness, comfort, and grace are always given to those who receive it in faith.',
      },
    ],
    prayer:
      'Heavenly Father,\n\nYou are near to the brokenhearted and to all who suffer. I place my body, my fears, and my weakness into Your hands.\n\nLord Jesus, You healed the sick and carried the Cross. Be close to me now. Whatever comes, let me know that I am not alone.\n\nHoly Spirit, fill me with peace that the world cannot give, and strength to trust the Father. Unite my suffering to Christ, and draw me ever closer to Him.\n\nAmen.',
    nextStep:
      'If you or someone you love is seriously ill, facing surgery, or weakened by age, contact your parish and ask for the Anointing of the Sick. Do not wait until the last moment.',
  },
  {
    id: 'marriage',
    name: 'Marriage',
    subtitle: 'A covenant of love',
    summary: 'A lifelong covenant where two help each other toward God.',
    whatIsIt:
      'Marriage is the Sacrament in which a man and a woman give themselves to each other in a lifelong, faithful, and life-giving covenant. In a Catholic wedding the couple themselves are the ministers of the Sacrament; they confer it on each other through their vows, as the Church witnesses and blesses their union. From that moment Christ is present in their marriage, giving them grace to love faithfully for the rest of their lives.',
    whyItMatters:
      'Marriage is a vocation, a true calling from God, not only a legal arrangement or a celebration. Husband and wife are meant to help each other grow in holiness and reach heaven, and to welcome and raise children in the faith. Their love is meant to be a living sign of something greater. Christian marriage reflects the faithful, self-giving, unbreakable love of Christ for His Church.',
    scriptureReference: 'Ephesians 5:25 and Genesis 2:24',
    scriptureConnection:
      'From the beginning, Scripture says, "A man shall leave his father and his mother and hold fast to his wife, and the two shall become one flesh" (Genesis 2:24). Saint Paul lifts marriage even higher, telling husbands, "Love your wives, as Christ loved the church and gave himself up for her" (Ephesians 5:25). Jesus performed His first miracle at a wedding in Cana, blessing marriage by His presence.',
    questions: [
      {
        question: 'What makes marriage a Sacrament and not just a wedding?',
        answer:
          'When two baptized people marry in the Church, Christ Himself enters their union and gives them grace for the whole of their married life. It becomes a channel of God\'s help, not only a beautiful day. The couple promises faithful, lifelong, and open-to-life love, reflecting God\'s own faithfulness.',
      },
      {
        question: 'How does a couple prepare for this Sacrament?',
        answer:
          'Parishes guide engaged couples through marriage preparation, helping them build their relationship on prayer, communication, and the teaching of the Church. If you are considering marriage, speak with your parish early, as preparation usually takes several months.',
      },
    ],
    prayer:
      'Heavenly Father,\n\nYou created love and called it good, and You invite husbands and wives to share in Your faithful love.\n\nLord Jesus, You blessed marriage at Cana and gave Yourself completely for Your Church. Teach married couples to love that way, patiently and faithfully, all their lives.\n\nHoly Spirit, strengthen every marriage with Your grace. Where there is weariness, bring tenderness; where there is hurt, bring forgiveness; and draw every family closer to Christ.\n\nAmen.',
    nextStep:
      'If you are married, pray together today, even briefly. If you are considering marriage, speak with your parish about marriage preparation and what a Catholic marriage means.',
  },
  {
    id: 'holy-orders',
    name: 'Holy Orders',
    subtitle: 'Serving Christ and His Church',
    summary: 'Men ordained to serve the Church as bishops, priests, and deacons.',
    whatIsIt:
      'Holy Orders is the Sacrament through which men are ordained to serve the Church in the person of Christ. There are three degrees: bishops, priests, and deacons. Through the laying on of hands and prayer, the Holy Spirit configures the ordained man to Christ so that he can serve God\'s people, especially by teaching, leading, and bringing the Sacraments. Like Baptism and Confirmation, ordination marks the soul forever.',
    whyItMatters:
      'The priesthood exists for service, not status. When a priest baptizes, forgives sins, or consecrates the Eucharist, it is Christ who acts through him. The priest does not stand in place of Christ but allows Christ to work through his hands and words. This Sacrament continues the mission Jesus gave the Apostles, handed down through the bishops to our own day, so that every generation can receive the Sacraments and be fed by the Word of God.',
    scriptureReference: 'Luke 22:19 and 2 Timothy 1:6',
    scriptureConnection:
      'At the Last Supper, Jesus told the Apostles, "Do this in remembrance of me" (Luke 22:19), entrusting them with the Eucharist. He sent them out to teach, baptize, and forgive sins in His name. The Apostles in turn laid hands on others to continue this ministry, as Saint Paul reminds Timothy: "Rekindle the gift of God that is within you through the laying on of my hands" (2 Timothy 1:6). This unbroken handing on is called apostolic succession.',
    questions: [
      {
        question: 'What is the difference between bishops, priests, and deacons?',
        answer:
          'Bishops have the fullness of Holy Orders and are successors of the Apostles, leading and teaching the Church. Priests work in union with their bishop, celebrating the Eucharist, forgiving sins, and shepherding parishes. Deacons are ordained to serve through the Word, the liturgy, and works of charity.',
      },
      {
        question: 'How does someone know they are called to this?',
        answer:
          'A call to Holy Orders, often felt as a quiet, persistent draw toward serving God and His Church, is discerned over time with prayer and guidance. Anyone wondering about it can speak with a priest or the vocations office of their diocese. Discernment is unhurried and prayerful.',
      },
    ],
    prayer:
      'Heavenly Father,\n\nThank You for the gift of priests, bishops, and deacons who bring Your Word and Your Sacraments to Your people.\n\nLord Jesus, You called ordinary men to follow You and to serve Your Church. Keep all who are ordained close to Your heart, humble and faithful.\n\nHoly Spirit, raise up holy shepherds for every generation, and give those who are called the courage to answer. Through their service, draw all of us closer to Christ.\n\nAmen.',
    nextStep:
      'Pray for priests, deacons, and seminarians today, and for more men to answer God\'s call. If you sense a call yourself, speak with a trusted priest or your diocese\'s vocations office.',
  },
];

export function getSacrament(id: string): Sacrament | undefined {
  return sacraments.find((sacrament) => sacrament.id === id);
}
