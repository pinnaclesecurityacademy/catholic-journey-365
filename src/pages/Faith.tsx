import { useNavigate } from 'react-router-dom';

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
    description: 'Spend time with God through prayer.',
    to: '/prayer',
  },
  {
    title: 'Saints',
    description: 'Learn from the lives of those who followed Christ.',
    to: '/saints',
  },
  {
    title: 'Mass',
    description: 'Discover the meaning and beauty of the Mass.',
    comingSoon: true,
  },
  {
    title: 'Sacraments',
    description: "Learn about God's grace through the Sacraments.",
    comingSoon: true,
  },
];

export default function Faith() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-5 pt-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Faith
        </h1>
        <p className="text-stone-500">Grow deeper in your Catholic journey.</p>
      </header>

      <div className="space-y-3">
        {FAITH_CARDS.map((card) => {
          if (card.comingSoon) {
            return (
              <div
                key={card.title}
                className="w-full text-left rounded-2xl bg-white border border-parchment-200 p-5 opacity-70"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-semibold text-leather-900">
                    {card.title}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-500">{card.description}</p>
              </div>
            );
          }
          return (
            <button
              key={card.title}
              onClick={() => navigate(card.to!)}
              className="w-full text-left rounded-2xl bg-white border border-parchment-200 p-5 active:scale-[0.99] transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-leather-900">
                  {card.title}
                </span>
                <span className="text-leather-600 text-lg">→</span>
              </div>
              <p className="mt-1 text-sm text-stone-500">{card.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
