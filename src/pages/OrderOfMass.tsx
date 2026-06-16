import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  massWelcome,
  massComplete,
  massSections,
  spiritualCommunionPrayer,
  MassCard,
} from '../data/massContent';
import { SacredPrayer, SacredPrayerLabel } from '../components/SacredPrayer';

// Introduction to the Mass. A beginner-friendly guide reached from the Faith
// hub. Flow: a welcome intro, a menu of the parts of the Mass, then one page
// per part. Inside each part the subtopics are collapsible accordions rather
// than a long forced scroll, so the reader chooses what to open.

// The fixed teaching prompts. Any card whose heading is not one of these is the
// start of a new subtopic group (its heading names the subtopic).
const PROMPTS = new Set([
  'What is happening?',
  'Biblical connection',
  'History and Tradition',
  'What do I do?',
  'What do I say?',
  'Why does this matter?',
]);

// Group a section's flat card list into subtopics. A subtopic begins with a
// non-prompt heading and gathers the prompt cards that follow it.
function groupSubtopics(cards: MassCard[]): MassCard[][] {
  const groups: MassCard[][] = [];
  for (const card of cards) {
    if (groups.length === 0 || !PROMPTS.has(card.heading)) {
      groups.push([card]);
    } else {
      groups[groups.length - 1].push(card);
    }
  }
  return groups;
}

type View =
  | { kind: 'welcome' }
  | { kind: 'menu' }
  | { kind: 'part'; index: number }
  | { kind: 'complete' };

export default function OrderOfMass() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>({ kind: 'welcome' });
  const [openSub, setOpenSub] = useState<number | null>(null);

  const total = massSections.length;

  // Land at the top whenever the view changes, and close any open accordion
  // when moving between parts.
  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenSub(null);
  }, [view]);

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-md mx-auto px-5 pt-6 min-h-screen flex flex-col">
      <button
        onClick={() => navigate('/faith')}
        className="text-leather-600 font-medium mb-4 self-start"
      >
        ← Faith
      </button>
      <div className="flex-1">{children}</div>
    </div>
  );

  const primaryBtn =
    'w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition';
  const secondaryBtn =
    'w-full rounded-xl bg-white border border-parchment-200 py-3 font-semibold text-leather-900 active:scale-[0.99] transition';

  const readingsCard = (hint: string) => (
    <div className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mb-5">
      <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
        Today’s Mass Readings
      </h2>
      <p className="text-sm text-stone-500 mb-4">{hint}</p>
      <a
        href="https://universalis.com/mass.htm"
        target="_blank"
        rel="noreferrer"
        className="block w-full text-center rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
      >
        Open Today’s Readings
      </a>
    </div>
  );

  // ---- Welcome ----
  if (view.kind === 'welcome') {
    return (
      <Shell>
        <header className="mb-6">
          <h1 className="font-display text-4xl font-bold text-leather-900">
            {massWelcome.title}
          </h1>
        </header>
        <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
          <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
            What is the Mass?
          </h2>
          <p className="text-leather-900 leading-relaxed">
            {massWelcome.whatIsIt}
          </p>
        </section>
        <section className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mb-4">
          <h2 className="font-display text-xl font-semibold text-leather-600 mb-2">
            Who is this for?
          </h2>
          <p className="text-leather-900 leading-relaxed">
            {massWelcome.whoIsItFor}
          </p>
        </section>
        <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
          <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
            How to use this guide
          </h2>
          <p className="text-leather-900 leading-relaxed">
            {massWelcome.howToUse}
          </p>
        </section>
        <button className={primaryBtn} onClick={() => setView({ kind: 'menu' })}>
          Begin
        </button>
      </Shell>
    );
  }

  // ---- Menu of the parts of the Mass ----
  if (view.kind === 'menu') {
    return (
      <Shell>
        <header className="mb-6">
          <h1 className="font-display text-3xl font-bold text-leather-900">
            Choose a part of the Mass
          </h1>
        </header>
        <div className="space-y-3">
          {massSections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setView({ kind: 'part', index: i })}
              className="w-full text-left rounded-2xl bg-white border border-parchment-200 p-5 active:scale-[0.99] transition flex items-center justify-between"
            >
              <span className="font-display text-xl font-semibold text-leather-900">
                {s.title}
              </span>
              <span className="text-leather-600 text-lg">→</span>
            </button>
          ))}
        </div>
      </Shell>
    );
  }

  // ---- Complete (reached only after the final part, via Finish) ----
  if (view.kind === 'complete') {
    return (
      <Shell>
        <header className="mb-6">
          <h1 className="font-display text-4xl font-bold text-leather-900">
            {massComplete.title}
          </h1>
        </header>
        <section className="rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-7 mb-5 shadow-sm">
          <p className="text-leather-900 leading-relaxed">{massComplete.body}</p>
        </section>
        {readingsCard(
          'Pray with Catholics around the world through today’s Mass readings.'
        )}
        <div className="flex gap-3 mb-6">
          <button className={secondaryBtn} onClick={() => setView({ kind: 'menu' })}>
            ← Mass Parts
          </button>
          <button className={primaryBtn} onClick={() => navigate('/faith')}>
            Finish
          </button>
        </div>
      </Shell>
    );
  }

  // ---- A single part of the Mass ----
  const index = view.index;
  const section = massSections[index];
  const subtopics = groupSubtopics(section.cards);
  const isLast = index === total - 1;

  return (
    <Shell>
      <header className="mb-5">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          {section.title}
        </h1>
        <p className="text-stone-500 mt-2 leading-relaxed">{section.intro}</p>
      </header>

      <div className="mb-5">
        {subtopics.map((group, gi) => {
          const open = openSub === gi;
          const [first, ...rest] = group;
          return (
            <section key={gi} className="mb-3">
              <button
                type="button"
                onClick={() => setOpenSub(open ? null : gi)}
                aria-expanded={open}
                className="w-full flex items-center justify-between rounded-2xl bg-white border border-parchment-200 px-5 py-4 text-left active:scale-[0.99] transition"
              >
                <span className="font-display text-lg font-semibold text-leather-900">
                  {first.heading}
                </span>
                <span
                  className={`text-leather-400 transition-transform ${
                    open ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                >
                  &#9662;
                </span>
              </button>
              {open && (
                <div className="rounded-b-2xl bg-white border border-t-0 border-parchment-200 px-5 py-5 -mt-1 space-y-5">
                  {first.body && (
                    <p className="text-leather-900 leading-relaxed whitespace-pre-line">
                      {first.body}
                    </p>
                  )}
                  {rest.map((card, ci) =>
                    card.pray ? (
                      <div
                        key={ci}
                        className="rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-7"
                      >
                        <h3 className="font-display text-base font-semibold text-leather-600 mb-2">
                          {card.heading}
                        </h3>
                        <p className="text-leather-900 leading-relaxed mb-6">
                          {card.body}
                        </p>
                        <div className="pt-5 border-t border-parchment-200">
                          <SacredPrayerLabel>Spiritual Communion</SacredPrayerLabel>
                          <SacredPrayer text={spiritualCommunionPrayer} />
                        </div>
                      </div>
                    ) : (
                      <div key={ci}>
                        <h3 className="font-display text-base font-semibold text-leather-600 mb-1">
                          {card.heading}
                        </h3>
                        <p className="text-leather-900 leading-relaxed whitespace-pre-line">
                          {card.body}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Today's Mass readings link, available within the Word part. */}
      {section.id === 'liturgy-of-the-word' &&
        readingsCard('Follow along with today’s readings from the Mass.')}

      <button
        className={secondaryBtn + ' mb-3'}
        onClick={() => setView({ kind: 'menu' })}
      >
        ← Back to Mass Parts
      </button>

      <div className="flex gap-3 mb-6">
        <button
          className={secondaryBtn}
          disabled={index === 0}
          onClick={() => setView({ kind: 'part', index: index - 1 })}
          style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
        >
          ← Previous Part
        </button>
        <button
          className={primaryBtn}
          onClick={() =>
            isLast
              ? setView({ kind: 'complete' })
              : setView({ kind: 'part', index: index + 1 })
          }
        >
          {isLast ? 'Finish →' : 'Next Part →'}
        </button>
      </div>
    </Shell>
  );
}
