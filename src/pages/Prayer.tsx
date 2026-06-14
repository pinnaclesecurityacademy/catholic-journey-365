import { useNavigate } from 'react-router-dom';
import { prayerCategories } from '../data/prayers';

export default function Prayer() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-5 pt-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Prayer
        </h1>
        <p className="text-stone-500">A simple companion for daily prayer</p>
      </header>

      <div className="space-y-6">
        {prayerCategories.map((cat) => (
          <section key={cat.id}>
            <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
              {cat.title}
            </h2>
            <div className="space-y-2">
              {cat.id === 'stations' ? (
                // Stations shows a single entry that launches the guide.
                <button
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
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
