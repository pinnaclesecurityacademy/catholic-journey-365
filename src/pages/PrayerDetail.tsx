import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPrayer, getCategory, PrayerSection } from '../data/prayers';
import { SacredPrayer, SacredPrayerLabel } from '../components/SacredPrayer';
import NovenaFlow from '../components/NovenaFlow';

/**
 * A formation section (Stations reflections, the "Simple Way to Pray" guide,
 * and the Divine Mercy steps). Reflection prose stays left-aligned and readable;
 * an actual prayer is set apart in the centred Sacred Prayer style.
 *
 * A section is treated as a prayer when it is flagged `pray`, when its heading
 * is "Prayer" (the Stations versicle), or when its body embeds a
 * "<reflection>\n\nPrayer\n<prayer>" block.
 */
function FormationSection({ section }: { section: PrayerSection }) {
  const isPrayerHeading = section.heading.trim().toLowerCase() === 'prayer';

  // A whole section that is itself a prayer.
  if (section.pray || isPrayerHeading) {
    return (
      <section className="rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-7 mb-5">
        <SacredPrayerLabel>{section.heading}</SacredPrayerLabel>
        <SacredPrayer text={section.body} />
      </section>
    );
  }

  // Reflection prose, optionally followed by an embedded prayer.
  const match = section.body.match(/^([\s\S]*?)\n+Prayer\n([\s\S]*)$/);
  const reflection = match ? match[1].trim() : section.body;
  const prayer = match ? match[2].trim() : null;

  return (
    <section className="rounded-2xl bg-white border border-parchment-200 px-5 py-5 mb-5">
      <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
        {section.heading}
      </h2>
      {reflection && (
        <p className="text-leather-900 leading-relaxed whitespace-pre-line">
          {reflection}
        </p>
      )}
      {prayer && (
        <div className="mt-6 pt-5 border-t border-parchment-200">
          <SacredPrayerLabel>Prayer</SacredPrayerLabel>
          <SacredPrayer text={prayer} />
        </div>
      )}
    </section>
  );
}

export default function PrayerDetail() {
  const { categoryId, prayerId } = useParams();
  const navigate = useNavigate();
  const prayer = getPrayer(categoryId ?? '', prayerId ?? '');

  const [aboutOpen, setAboutOpen] = useState(false);

  // Continuous Previous/Next navigation through the Stations guide
  // (About → Station 1 → … → Station 14).
  const stationIds =
    categoryId === 'stations'
      ? getCategory('stations')?.prayers.map((p) => p.id) ?? []
      : [];
  const stationIdx = stationIds.indexOf(prayerId ?? '');
  const inStations = stationIdx !== -1;
  const prevStationId = inStations && stationIdx > 0 ? stationIds[stationIdx - 1] : null;
  const nextStationId =
    inStations && stationIdx < stationIds.length - 1
      ? stationIds[stationIdx + 1]
      : null;

  // Land at the top when moving between prayers/stations; close the About panel.
  useEffect(() => {
    window.scrollTo(0, 0);
    setAboutOpen(false);
  }, [categoryId, prayerId]);

  if (!prayer) {
    return (
      <div className="max-w-md mx-auto px-5 pt-10 text-center">
        <p className="text-stone-500">That prayer could not be found.</p>
        <button
          onClick={() => navigate('/prayer')}
          className="mt-4 text-leather-600 font-medium"
        >
          Back to Prayer
        </button>
      </div>
    );
  }

  // Novenas get their own one-day-at-a-time experience.
  if (prayer.isNovena) {
    return <NovenaFlow prayer={prayer} />;
  }

  // The prayer-book display text: prefer the line-broken `verse`, else `content`.
  const prayerText = prayer.verse || prayer.content;
  const hasPrayerText = Boolean(prayerText);
  const showPrayAlong = hasPrayerText || Boolean(prayer.prayAlongQuery);

  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="text-leather-600 font-medium mb-6"
      >
        ← Back
      </button>

      {/* Title, centred, with a quiet ornamental divider */}
      <header className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold text-leather-900 leading-tight">
          {prayer.title}
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-10 bg-gold/50" />
          <span className="text-gold text-[0.5rem] leading-none">&#9670;</span>
          <span className="h-px w-10 bg-gold/50" />
        </div>
      </header>

      {/* The prayer itself, the focus of the page */}
      {hasPrayerText && (
        <section className="rounded-2xl bg-parchment-50 border border-parchment-200 px-6 py-9 mb-6 shadow-sm">
          {prayer.verse ? (
            <SacredPrayer text={prayer.verse} />
          ) : (
            <p className="text-leather-900 leading-loose whitespace-pre-line text-center">
              {prayer.content}
            </p>
          )}
        </section>
      )}

      {/* Pray Along, layout space reserved for future audio */}
      {showPrayAlong && (
        <section className="mb-7 text-center">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-leather-400 mb-3">
            Pray Along
          </h2>
          {prayer.prayAlongQuery ? (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                prayer.prayAlongQuery
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-leather-600 text-white font-semibold px-7 py-3 active:scale-[0.99] transition"
            >
              Pray on YouTube
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-block rounded-full border border-parchment-200 bg-white/60 text-leather-400 font-medium px-7 py-3 cursor-not-allowed"
            >
              Audio coming soon
            </button>
          )}
        </section>
      )}

      {/* Structured formation sections (Stations, Simple Way, Divine Mercy) */}
      {prayer.sections?.map((s, i) => (
        <FormationSection key={i} section={s} />
      ))}

      {/* About this prayer, closed by default, prayer always appears first */}
      {prayer.explanation && (
        <section className="mb-8">
          <button
            type="button"
            onClick={() => setAboutOpen((v) => !v)}
            aria-expanded={aboutOpen}
            className="w-full flex items-center justify-between rounded-2xl bg-parchment-100 border border-gold/40 px-5 py-4 text-left active:scale-[0.99] transition"
          >
            <span className="font-display text-lg font-semibold text-leather-600">
              About this prayer
            </span>
            <span
              className={`text-leather-400 transition-transform ${
                aboutOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              &#9662;
            </span>
          </button>
          {aboutOpen && (
            <div className="rounded-b-2xl bg-parchment-100/60 border border-t-0 border-gold/40 px-5 py-5 -mt-1">
              <p className="text-leather-900 leading-relaxed whitespace-pre-line">
                {prayer.explanation}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Continuous Station navigation */}
      {inStations && (
        <div className="flex gap-3 mb-4">
          <button
            disabled={!prevStationId}
            onClick={() => navigate(`/prayer/stations/${prevStationId}`)}
            className="flex-1 rounded-xl bg-white border border-parchment-200 py-3 font-semibold text-leather-900 disabled:opacity-40 active:scale-[0.99] transition"
          >
            ← Previous
          </button>
          <button
            disabled={!nextStationId}
            onClick={() => navigate(`/prayer/stations/${nextStationId}`)}
            className="flex-1 rounded-xl bg-leather-600 py-3 font-semibold text-white disabled:opacity-40 active:scale-[0.99] transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
