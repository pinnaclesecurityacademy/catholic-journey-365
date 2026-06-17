import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prayerCategories, PrayerCategory } from '../data/prayers';
import { scrollToContentStart } from '../lib/scroll';

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

// Display-only sub-sections for the Intentions group. These group existing
// prayers (added in V3.4) under headings for easier navigation. They reference
// prayers by their unchanged data category and id, so routing stays identical.
const INTENTION_SUBSECTIONS: {
  title: string;
  prayers: { categoryId: string; prayerId: string }[];
}[] = [
  {
    title: 'Family',
    prayers: [
      { categoryId: 'family', prayerId: 'prayer-for-family' },
      { categoryId: 'family', prayerId: 'prayer-for-marriage' },
      { categoryId: 'family', prayerId: 'prayer-for-children' },
      { categoryId: 'family', prayerId: 'prayer-for-parents' },
      { categoryId: 'family', prayerId: 'prayer-for-family-unity' },
    ],
  },
  {
    title: 'Work & Calling',
    prayers: [
      { categoryId: 'family', prayerId: 'prayer-before-work' },
      { categoryId: 'family', prayerId: 'prayer-before-study' },
      { categoryId: 'family', prayerId: 'prayer-for-discernment' },
      { categoryId: 'family', prayerId: 'prayer-difficult-decision' },
    ],
  },
  {
    title: 'Healing',
    prayers: [
      { categoryId: 'family', prayerId: 'prayer-for-the-sick' },
      { categoryId: 'family', prayerId: 'prayer-during-suffering' },
      { categoryId: 'family', prayerId: 'prayer-for-grief' },
      { categoryId: 'family', prayerId: 'prayer-for-strength' },
    ],
  },
  {
    title: 'Personal Struggles',
    prayers: [
      { categoryId: 'family', prayerId: 'prayer-for-anxiety' },
      { categoryId: 'family', prayerId: 'prayer-for-forgiveness' },
      { categoryId: 'family', prayerId: 'prayer-for-patience' },
      { categoryId: 'family', prayerId: 'prayer-against-temptation' },
    ],
  },
  {
    title: 'Protection',
    prayers: [
      { categoryId: 'protection', prayerId: 'st-michael' },
      { categoryId: 'protection', prayerId: 'spiritual-protection' },
      { categoryId: 'protection', prayerId: 'protection-of-family' },
    ],
  },
];

export default function Prayer() {
  const navigate = useNavigate();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const contentStartRef = useRef<HTMLElement>(null);

  useEffect(() => {
    scrollToContentStart(contentStartRef.current);
  }, [openGroup]);

  const findCategory = (id: string): PrayerCategory | undefined =>
    prayerCategories.find((c) => c.id === id);

  const findPrayer = (categoryId: string, prayerId: string) =>
    findCategory(categoryId)?.prayers.find((p) => p.id === prayerId);

  // Category list view.
  if (openGroup) {
    const group = PRAYER_GROUPS.find((g) => g.title === openGroup);
    const cats = (group?.categoryIds ?? [])
      .map(findCategory)
      .filter((c): c is PrayerCategory => Boolean(c));

    // Intentions is shown as titled sub-sections rather than a flat list.
    if (openGroup === 'Intentions') {
      return (
        <div className="max-w-md mx-auto px-5 pt-8">
          <button
            onClick={() => setOpenGroup(null)}
            className="text-leather-600 font-medium mb-4"
          >
            ← Prayer
          </button>

          <header ref={contentStartRef} className="mb-6">
            <h1 className="font-display text-3xl font-bold text-leather-900">
              {openGroup}
            </h1>
          </header>

          <div className="space-y-6">
            {INTENTION_SUBSECTIONS.map((sub) => {
              const items = sub.prayers
                .map((ref) => ({
                  ref,
                  prayer: findPrayer(ref.categoryId, ref.prayerId),
                }))
                .filter((i) => Boolean(i.prayer));
              if (items.length === 0) return null;
              return (
                <section key={sub.title}>
                  <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
                    {sub.title}
                  </h2>
                  <div className="space-y-2">
                    {items.map(({ ref, prayer }) => (
                      <button
                        key={ref.prayerId}
                        onClick={() =>
                          navigate(`/prayer/${ref.categoryId}/${ref.prayerId}`)
                        }
                        className="w-full text-left rounded-xl bg-white border border-parchment-200 px-4 py-3 font-medium text-leather-900 active:scale-[0.99] transition"
                      >
                        {prayer!.title}
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto px-5 pt-8">
        <button
          onClick={() => setOpenGroup(null)}
          className="text-leather-600 font-medium mb-4"
        >
          ← Prayer
        </button>

        <header ref={contentStartRef} className="mb-6">
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
      <header ref={contentStartRef} className="mb-6">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Prayer
        </h1>
        <p className="text-stone-500 leading-relaxed">
          Prayer is your personal conversation with God. It is how you build
          your own unique relationship with the Father, the Son, and the Holy
          Spirit. Whether through traditional prayers, quiet reflection,
          gratitude, or simply speaking from the heart, God invites you to spend
          time with Him.
        </p>
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
