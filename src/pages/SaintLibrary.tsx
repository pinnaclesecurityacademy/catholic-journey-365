import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSaints, SaintType } from '../data/saints';

// Saint Library (route: /saints).
// A browsable view over the existing Saint of the Day entries. It does not
// create, alter, or add any saint content; it only lists what is already
// authored and links each entry to the existing detail page (/saint/:key).

type Filter = 'all' | SaintType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'saint', label: 'Saints' },
  { id: 'marian', label: 'Marian' },
  { id: 'feast', label: 'Feasts' },
  { id: 'solemnity', label: 'Solemnities' },
];

/** A short, human label for an entry's type. */
function typeLabel(type: SaintType): string {
  switch (type) {
    case 'saint':
      return 'Saint';
    case 'marian':
      return 'Marian';
    case 'feast':
      return 'Feast';
    case 'solemnity':
      return 'Solemnity';
  }
}

export default function SaintLibrary() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const all = useMemo(() => getAllSaints(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter(({ saint }) => {
      if (filter !== 'all' && saint.type !== filter) return false;
      if (q && !saint.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [all, query, filter]);

  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="text-leather-600 font-medium mb-6"
      >
        ← Back
      </button>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          Saint Library
        </p>
        <h1 className="font-display text-4xl font-bold text-leather-600 leading-tight mt-1">
          The Communion of Saints
        </h1>
        <p className="text-sm text-leather-900 mt-2">
          Browse the saints and feasts who help us follow Christ.
        </p>
      </header>

      {/* Search by name */}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name"
        className="w-full rounded-xl bg-white border border-parchment-200 px-4 py-3 text-leather-900 placeholder:text-stone-400 focus:outline-none focus:border-gold"
      />

      {/* Category filters */}
      <div className="mt-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              filter === f.id
                ? 'bg-leather-600 text-white'
                : 'bg-white border border-parchment-200 text-leather-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="mt-5 text-xs uppercase tracking-widest text-stone-400">
        {results.length} {results.length === 1 ? 'entry' : 'entries'}
      </p>

      <div className="mt-3 space-y-3">
        {results.map(({ key, saint }) => (
          <button
            key={key}
            onClick={() => navigate(`/saint/${key}`)}
            className="w-full text-left rounded-2xl bg-white border border-parchment-200 p-4 active:scale-[0.99] transition"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-leather-900 leading-snug">
                {saint.name}
              </h2>
              <span className="shrink-0 rounded-full bg-parchment-100 border border-gold/40 px-2.5 py-0.5 text-xs text-leather-600">
                {typeLabel(saint.type)}
              </span>
            </div>
            {saint.feastDay && (
              <p className="mt-1 text-sm text-stone-500">{saint.feastDay}</p>
            )}
          </button>
        ))}

        {results.length === 0 && (
          <div className="rounded-2xl bg-white border border-parchment-200 p-5">
            <p className="text-leather-900 leading-relaxed">
              No saints match your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
