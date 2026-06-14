// Stations of the Cross formation content, educational, simple, faithful.
// Each station has unique reflection content (no repeated explanations).

export interface Station {
  number: number;
  title: string;
  whatHappened: string;
  whyMeditate: string;
  teaches: string;
  reflection: string;
}

export const stationsEducation = {
  whatAre:
    'The Stations of the Cross are fourteen steps that follow Jesus on his final journey, from his condemnation to his burial. Each station is a moment to pause and remember a part of Christ’s Passion.',
  whyPray:
    'Catholics pray the Stations to walk with Jesus in his suffering and to thank him for the love that led him to the Cross. It is a way of being close to Christ in his hardest hours, drawn from the Gospel accounts (Matthew 27; Luke 23; John 19).',
  howToPray:
    'To pray the Stations, move prayerfully through each one: pause at each moment of Jesus’ Passion, reflect on his suffering and love, and apply it to your own life. At each station we say, “We adore you, O Christ, and we praise you, because by your holy Cross you have redeemed the world.” In churches, people often physically walk from station to station; at home, you can pray them spiritually, simply moving from one to the next in your heart. The Stations are especially loved during Lent and on Fridays.',
};

/** Combine a station's parts into one flowing reflection for beginners. */
export function stationReflection(s: Station): string {
  return `${s.whatHappened} ${s.whyMeditate} ${s.teaches} ${s.reflection}`;
}

export const stations: Station[] = [
  {
    number: 1,
    title: 'Jesus is Condemned to Death',
    whatHappened:
      'Pilate gives in to the crowd and sentences Jesus to be crucified, though he finds no guilt in him.',
    whyMeditate:
      'We pause here to see Jesus accept an unjust sentence in silence and peace.',
    teaches:
      'Jesus teaches us to trust the Father even when we are treated unfairly.',
    reflection:
      'When I am blamed or misunderstood today, I can ask Jesus for the grace to stay calm and kind.',
  },
  {
    number: 2,
    title: 'Jesus Takes Up His Cross',
    whatHappened:
      'Jesus is handed the heavy Cross and willingly takes it upon his shoulders.',
    whyMeditate:
      'We pause to see Jesus embrace the Cross rather than run from it.',
    teaches:
      'Jesus teaches us that love is willing to carry a heavy burden for others.',
    reflection:
      'What cross am I being asked to carry right now, and will I take it up with love?',
  },
  {
    number: 3,
    title: 'Jesus Falls the First Time',
    whatHappened:
      'Weak and exhausted, Jesus falls to the ground under the weight of the Cross.',
    whyMeditate:
      'We pause to see that Jesus knows what it is to be weak and to stumble.',
    teaches:
      'Jesus teaches us that falling is not the end, what matters is rising again.',
    reflection:
      'When I fail or feel I cannot go on, Jesus understands and helps me get back up.',
  },
  {
    number: 4,
    title: 'Jesus Meets His Mother',
    whatHappened:
      'Along the way Jesus meets his mother Mary, whose heart is pierced with sorrow.',
    whyMeditate:
      'We pause to see the love between Jesus and Mary even in deep pain.',
    teaches:
      'Jesus teaches us the strength of love that stays close in suffering.',
    reflection:
      'Who is suffering near me that I can simply be present to today?',
  },
  {
    number: 5,
    title: 'Simon of Cyrene Helps Jesus',
    whatHappened:
      'The soldiers force Simon of Cyrene to help Jesus carry the Cross.',
    whyMeditate:
      'We pause to see that even Jesus accepted help on the way.',
    teaches:
      'Jesus teaches us that helping others carry their burdens is holy work.',
    reflection:
      'Whose burden can I help carry today, even in a small way?',
  },
  {
    number: 6,
    title: 'Veronica Wipes the Face of Jesus',
    whatHappened:
      'A woman named Veronica steps forward to wipe the bloodied face of Jesus.',
    whyMeditate:
      'We pause to see one small act of kindness in the middle of cruelty.',
    teaches:
      'Jesus teaches us that no act of love offered to him is ever too small.',
    reflection:
      'What small kindness can I offer someone in need today?',
  },
  {
    number: 7,
    title: 'Jesus Falls the Second Time',
    whatHappened:
      'Jesus falls again, his strength almost gone, yet he rises to continue.',
    whyMeditate:
      'We pause to see Jesus persevere when everything is against him.',
    teaches:
      'Jesus teaches us not to give up, even when we fall more than once.',
    reflection:
      'Is there a sin or struggle I keep returning to? Jesus invites me to keep trying again.',
  },
  {
    number: 8,
    title: 'Jesus Meets the Women of Jerusalem',
    whatHappened:
      'Jesus speaks to the weeping women, telling them to weep for themselves and their children.',
    whyMeditate:
      'We pause to see Jesus caring for others even as he suffers.',
    teaches:
      'Jesus teaches us that true sorrow leads us to turn our hearts back to God.',
    reflection:
      'Where do I need to turn my heart back to God today?',
  },
  {
    number: 9,
    title: 'Jesus Falls the Third Time',
    whatHappened:
      'Near the end of the journey, Jesus collapses a third time but does not stop.',
    whyMeditate:
      'We pause to see Jesus push onward out of pure love for us.',
    teaches:
      'Jesus teaches us that love endures to the very end.',
    reflection:
      'When I feel worn down, I can offer my weariness to Jesus and ask for strength.',
  },
  {
    number: 10,
    title: 'Jesus is Stripped of His Garments',
    whatHappened:
      'Jesus is stripped of his clothing, left exposed before the crowd.',
    whyMeditate:
      'We pause to see Jesus humbled and stripped of all comfort.',
    teaches:
      'Jesus teaches us to value dignity and to find our worth in God, not in possessions.',
    reflection:
      'What do I cling to that I could let go of to be freer for God?',
  },
  {
    number: 11,
    title: 'Jesus is Nailed to the Cross',
    whatHappened:
      'Jesus is nailed to the Cross and lifted up between two criminals.',
    whyMeditate:
      'We pause to see the depth of what Jesus suffered for us.',
    teaches:
      'Jesus teaches us to forgive, praying even for those who hurt him.',
    reflection:
      'Is there someone I need to forgive, with Jesus’ help, today?',
  },
  {
    number: 12,
    title: 'Jesus Dies on the Cross',
    whatHappened:
      'After hours of agony, Jesus entrusts his spirit to the Father and dies.',
    whyMeditate:
      'We pause in gratitude before the greatest act of love in history.',
    teaches:
      'Jesus teaches us that his death opens the way to forgiveness and life.',
    reflection:
      'I can quietly thank Jesus for giving his life for me.',
  },
  {
    number: 13,
    title: 'Jesus is Taken Down from the Cross',
    whatHappened:
      'The body of Jesus is taken down and placed in the arms of his mother.',
    whyMeditate:
      'We pause with Mary, holding her Son in sorrow and love.',
    teaches:
      'Jesus teaches us that God is near even in grief and loss.',
    reflection:
      'I can bring my own losses and sorrows to Jesus, who understands them.',
  },
  {
    number: 14,
    title: 'Jesus is Laid in the Tomb',
    whatHappened:
      'The body of Jesus is laid in a new tomb, and a stone is rolled across it.',
    whyMeditate:
      'We pause in quiet hope, knowing the story does not end here.',
    teaches:
      'Jesus teaches us to wait in faith, trusting that resurrection is coming.',
    reflection:
      'Where am I waiting in the dark? I can trust that Jesus brings new life.',
  },
];
