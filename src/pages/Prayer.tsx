import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prayerCategories, PrayerCategory } from '../data/prayers';

// Top-level prayer-library categories. Each maps to one or more underlying data
// categories (whose ids and routing are unchanged), so prayers are grouped for
// display without moving or deleting any content. The home view shows only
// these category cards; tapping one opens that category's list.
const PRAYER_GROUPS: { title: string; categoryIds: string[] }[] = [
  { title: 'Essential Prayers', categoryIds: ['essential'] },
  { title: 'Daily Prayers', categoryIds: ['daily'] },
  { title: 'Rosary', categoryIds: ['rosary'] },
  { title: 'Devotions & Novenas', categoryIds: ['devotions', 'stations'] },
  { title: 'Intentions', categoryIds: ['protection', 'family'] },
];

export default function Prayer() {
  const navigate = useNavigate();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const findCategory = (id: string): PrayerCategory | undefined =>
    prayerCategories.find((c) => c.id === id);

  // Category list view.
  if (openGroup) {
    const group = PRAYER_GROUPS.find((g) => g.title === openGroup);
    const cats = (group?.categoryIds ?? [])
      .map(findCategory)
      .filter((c): c is PrayerCategory => Boolean(c));

    return (
      <div className="max-w-md mx-auto px-5 pt-8">
        <button
          onClick={() => setOpenGroup(null)}
          className="text-leather-600 font-medium mb-4"
        >
          ← Prayer
        </button>

        <header className="mb-6">
          <h1 className="font-display text-3xl font-bold text-leather-900">
            {openGroup}
          </h1>
        </header>

        <div className="space-y-2">
          {cats.flatMap((cat) =>
            cat.id === 'stations'
              ? [
                  // Stations shows a single entry that launches the guide.
                  <button
                    key={cat.id}
                    onClick={() => navigate('/prayer/stations/about')}
                    className="w-full text-left rounded-xl bg-white border border-parchment-200 px-4 py-3 font-medium text-leather-900 active:scale-[0.99] transition"
                  >
                    Stations of the Cross
                  </button>,
                ]
              : cat.prayers.map((p) => (
                  <button
                    key={`${cat.id}-${p.id}`}
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
          )}
        </div>
      </div>
    );
  }

  // Category home view (cards only).
  return (
    <div className="max-w-md mx-auto px-5 pt-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Prayer
        </h1>
        <p className="text-stone-500">A simple companion for daily prayer</p>
      </header>

      <div className="space-y-3">
        {PRAYER_GROUPS.map((group) => {
          const cats = group.categoryIds
            .map(findCategory)
            .filter((c): c is PrayerCategory => Boolean(c));
          if (cats.length === 0) return null;
          return (
            <button
              key={group.title}
              onClick={() => setOpenGroup(group.title)}
              className="w-full text-left rounded-2xl bg-white border border-parchment-200 p-5 active:scale-[0.99] transition flex items-center justify-between"
            >
              <span className="font-display text-xl font-semibold text-leather-900">
                {group.title}
              </span>
              <span className="text-leather-600 text-lg">→</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
