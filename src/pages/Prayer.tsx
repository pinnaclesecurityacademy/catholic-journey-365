import { useNavigate } from 'react-router-dom';
import { prayerCategories, PrayerCategory } from '../data/prayers';

// Top-level prayer-library categories. Each maps to one or more underlying data
// categories (whose ids and routing are unchanged), so prayers are grouped for
// display without moving or deleting any content.
const PRAYER_GROUPS: { title: string; categoryIds: string[] }[] = [
  { title: 'Essential Prayers', categoryIds: ['essential'] },
  { title: 'Daily Prayers', categoryIds: ['daily'] },
  { title: 'Rosary', categoryIds: ['rosary'] },
  { title: 'Devotions & Novenas', categoryIds: ['stations', 'devotions'] },
  { title: 'Intentions', categoryIds: ['protection', 'family'] },
];

export default function Prayer() {
  const navigate = useNavigate();

  const findCategory = (id: string): PrayerCategory | undefined =>
    prayerCategories.find((c) => c.id === id);

  return (
    <div className="max-w-md mx-auto px-5 pt-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Prayer
        </h1>
        <p className="text-stone-500">A simple companion for daily prayer</p>
      </header>

      <div className="space-y-6">
        {PRAYER_GROUPS.map((group) => {
          const cats = group.categoryIds
            .map(findCategory)
            .filter((c): c is PrayerCategory => Boolean(c));
          if (cats.length === 0) return null;
          return (
            <section key={group.title}>
              <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
                {group.title}
              </h2>
              <div className="space-y-2">
                {cats.map((cat) =>
                  cat.id === 'stations' ? (
                    // Stations shows a single entry that launches the guide.
                    <button
                      key={cat.id}
                      onClick={() => navigate('/prayer/stations/about')}
                      className="w-full text-left rounded-xl bg-white border border-parchment-200 px-4 py-3 font-medium text-leather-900 active:scale-[0.99] transition"
                    >
                      Stations of the Cross
                    </button>
                  ) : (
                    cat.prayers.map((p) => (
                      <button
                        key={p.id}
                        onClick={() =>
                          cat.isRosary
                            ? navigate(`/rosary/${p.id}`)
                            : navigate(`/prayer/${cat.id}/${p.id}`)
                        }
                        className="w-full text-left rounded-xl bg-white border border-parchment-200 px-4 py-3 font-medium text-leather-900 active:scale-[0.99] transition"
                      >
                        {p.title}
                      </button>
                    ))
                  )
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
