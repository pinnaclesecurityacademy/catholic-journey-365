// Shared prayer-book display used across the whole app (Essential Prayers,
// Daily Prayers, Devotions, Rosary, Novenas) so every prayer looks consistent.
//
// Renders prayer text centred, in a larger serif, with generous line height and
// spacing between stanzas. The WORDS are never altered here, only how they
// break visually. Stanzas are separated by a blank line ("\n\n"), individual
// lines by "\n".

interface SacredPrayerProps {
  text: string;
}

/** The reverent, centred prayer text itself (no surrounding card). */
export function SacredPrayer({ text }: SacredPrayerProps) {
  const stanzas = text
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="text-center">
      {stanzas.map((stanza, i) => (
        <p
          key={i}
          className="font-display text-leather-900 text-[1.6rem] leading-[2.4rem] mb-7 last:mb-0"
        >
          {stanza.split('\n').map((line, j) => (
            <span key={j} className="block">
              {line}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

/** A small uppercase label that sits above a prayer (e.g. "Our Father"). */
export function SacredPrayerLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-leather-400 mb-4">
      {children}
    </p>
  );
}

/** The prayer set inside the warm parchment card used on prayer pages. */
export function SacredPrayerCard({ text }: SacredPrayerProps) {
  return (
    <section className="rounded-2xl bg-parchment-50 border border-parchment-200 px-6 py-9 shadow-sm">
      <SacredPrayer text={text} />
    </section>
  );
}
