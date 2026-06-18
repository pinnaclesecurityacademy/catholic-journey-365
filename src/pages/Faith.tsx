import { useNavigate } from 'react-router-dom';

type FaithCard = {
  title: string;
  description: string;
  cta?: string;
  imageSrc: string;
  imagePosition?: string;
  to?: string;
  comingSoon?: boolean;
};

const FAITH_CARDS: FaithCard[] = [
  {
    title: 'Begin Here',
    description:
      'New, returning, or unsure where to start? Take the first steps into the Catholic faith.',
    cta: 'Start the Journey',
    imageSrc: '/images/landing/pilgrimage-path.png',
    imagePosition: 'object-[66%_center]',
    to: '/faith/begin',
  },
  {
    title: 'The Mass',
    description:
      'Understand what is happening, why it matters, and the beauty behind every moment.',
    cta: 'Enter the Mass',
    imageSrc: '/images/landing/first-communion.png',
    imagePosition: 'object-[70%_center]',
    to: '/mass',
  },
  {
    title: 'Prayer',
    description:
      'Learn how to speak with God, even when you do not know where to begin.',
    cta: 'Begin to Pray',
    imageSrc: '/images/rosary/sorrowful-agony-garden.webp',
    imagePosition: 'object-[68%_center]',
    to: '/prayer',
  },
  {
    title: 'Rosary & Devotions',
    description:
      'Discover the prayers that have guided Catholics for generations.',
    cta: 'Pray the Rosary',
    imageSrc: '/images/rosary/joyful-annunciation.webp',
    imagePosition: 'object-[72%_center]',
    to: '/rosary',
  },
  {
    title: 'Saints',
    description:
      'Walk with the men and women who followed Christ before us.',
    cta: 'Meet the Saints',
    imageSrc: '/images/rosary/glorious-coronation.webp',
    imagePosition: 'object-[70%_center]',
    to: '/saints',
  },
  {
    title: 'Sacraments',
    description:
      'Discover the encounters with God at the heart of Catholic life.',
    imageSrc: '/images/rosary/luminous-baptism.webp',
    imagePosition: 'object-[70%_center]',
    comingSoon: true,
  },
];

function FaithHeroCard({ card }: { card: FaithCard }) {
  const navigate = useNavigate();
  const content = (
    <>
      <img
        src={card.imageSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover opacity-[0.82] saturate-[0.92] transition duration-500 group-active:scale-[1.01] ${card.imagePosition ?? 'object-center'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-leather-950/98 via-leather-950/80 to-leather-900/28" />
      <div className="absolute inset-0 bg-gradient-to-t from-leather-950/96 via-leather-950/22 to-transparent" />
      <div className="absolute inset-0 shadow-[inset_0_0_72px_rgba(17,12,8,0.8)]" />
      <div className="relative flex min-h-[178px] flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/45 bg-parchment-50/10 text-lg font-semibold text-gold shadow-[0_8px_18px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            +
          </div>
          {card.comingSoon && (
            <span className="rounded-full border border-parchment-100/20 bg-parchment-50/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-parchment-100/80 backdrop-blur-sm">
              Coming Soon
            </span>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            {card.title}
          </h2>
          <p className="mt-2 max-w-[18rem] text-sm font-medium leading-relaxed text-parchment-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {card.description}
          </p>
          {card.cta && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-leather-950 shadow-[0_12px_24px_rgba(212,169,106,0.22)]">
              <span>{card.cta}</span>
              <span aria-hidden="true">&rarr;</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (card.comingSoon || !card.to) {
    return (
      <div className="relative overflow-hidden rounded-[1.75rem] border border-parchment-200 bg-leather-900 shadow-[0_18px_44px_rgba(74,55,40,0.16)]">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => navigate(card.to!)}
      className="group relative w-full overflow-hidden rounded-[1.75rem] border border-parchment-200 bg-leather-900 text-left shadow-[0_18px_44px_rgba(74,55,40,0.16)] transition active:scale-[0.99]"
    >
      {content}
    </button>
  );
}

export default function Faith() {
  return (
    <div className="mx-auto max-w-md px-4 pt-5 pb-6">
      <header className="mb-5 px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          Catholic Life
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-leather-900">
          Faith
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-stone-500">
          Walk deeper into prayer, the Mass, the saints, and the life of the
          Church one step at a time.
        </p>
      </header>

      <div className="space-y-4">
        {FAITH_CARDS.map((card) => (
          <FaithHeroCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}
