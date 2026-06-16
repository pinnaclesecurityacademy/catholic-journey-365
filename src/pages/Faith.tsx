import { useNavigate } from 'react-router-dom';
import {
  SacredCard,
  sacredButtonCardClassName,
} from '../components/SacredCard';

// Faith hub. Groups the app's devotional libraries (Prayer, Saints) and
// upcoming areas (Mass, Sacraments) behind one tab. Access only: each live
// card routes to its existing, unchanged library.
type FaithCard = {
  title: string;
  description: string;
  to?: string;
  comingSoon?: boolean;
};

const FAITH_CARDS: FaithCard[] = [
  {
    title: 'Prayer',
    description:
      'Spend time with God through daily prayer, devotion, and reflection.',
    to: '/prayer',
  },
  {
    title: 'Saints',
    description:
      'Learn from the men and women who followed Christ and discover their example of faith.',
    to: '/saints',
  },
  {
    title: 'Introduction to the Mass',
    description:
      'Learn what happens at Mass, what to do, what to say, and why it matters.',
    to: '/mass',
  },
  {
    title: 'Sacraments',
    description:
      'Discover how God works through the Sacraments of the Church.',
    comingSoon: true,
  },
];

export default function Faith() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md px-4 pt-5 pb-6">
      <header className="mb-6 px-1">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Faith
        </h1>
        <p className="text-stone-500">
          Grow closer to God through prayer, the Church, and the lives of the
          saints.
        </p>
      </header>

      <div className="space-y-3">
        {FAITH_CARDS.map((card) => {
          if (card.comingSoon) {
            return (
              <SacredCard key={card.title} className="opacity-70">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-semibold text-leather-900">
                    {card.title}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-500">{card.description}</p>
              </SacredCard>
            );
          }
          return (
            <button
              key={card.title}
              onClick={() => navigate(card.to!)}
              className={`${sacredButtonCardClassName} w-full text-left`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-leather-900">
                  {card.title}
                </span>
                <span className="text-lg text-leather-600">&rarr;</span>
              </div>
              <p className="mt-1 text-sm text-stone-500">{card.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
