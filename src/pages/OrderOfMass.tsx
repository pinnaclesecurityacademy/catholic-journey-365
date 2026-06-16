import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  massWelcome,
  massComplete,
  massSections,
  spiritualCommunionPrayer,
} from '../data/massContent';
import { SacredPrayer, SacredPrayerLabel } from '../components/SacredPrayer';

// Guided Order of the Mass. A beginner-friendly walk through the parts of the
// Mass, following the same step-by-step flow used by the Rosary guide:
// a welcome screen, one screen per section, then a closing screen.
// Steps: 0 = welcome, 1..N = sections, N+1 = complete.
export default function OrderOfMass() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const total = massSections.length;
  const completeStep = total + 1;

  // Land at the top whenever the step changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-md mx-auto px-5 pt-6 min-h-screen flex flex-col">
      <button
        onClick={() => navigate('/prayer')}
        className="text-leather-600 font-medium mb-4 self-start"
      >
        ← Prayer
      </button>
      <div className="flex-1">{children}</div>
    </div>
  );

  const primaryBtn =
    'w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition';
  const secondaryBtn =
    'w-full rounded-xl bg-white border border-parchment-200 py-3 font-semibold text-leather-900 active:scale-[0.99] transition';

  // ---- Welcome ----
  if (step === 0) {
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
        <button className={primaryBtn} onClick={() => setStep(1)}>
          Begin
        </button>
      </Shell>
    );
  }

  // ---- Complete ----
  if (step >= completeStep) {
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
        <div className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
          <h2 className="font-display text-lg font-semibold text-leather-900 mb-2">
            Today’s Mass Readings
          </h2>
          <p className="text-sm text-stone-500 mb-4">
            Pray with Catholics around the world through today’s Mass readings.
          </p>
          <a
            href="https://universalis.com/mass.htm"
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
          >
            Open Today’s Readings
          </a>
        </div>
        <button className={primaryBtn} onClick={() => navigate('/prayer')}>
          Finish
        </button>
      </Shell>
    );
  }

  // ---- Section ----
  const section = massSections[step - 1];
  return (
    <Shell>
      <header className="mb-5">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          Step {step} of {total}
        </p>
        <h1 className="font-display text-3xl font-bold text-leather-900 mt-1">
          {section.number}. {section.title}
        </h1>
        <p className="text-stone-500 mt-2 leading-relaxed">{section.intro}</p>
      </header>

      <div className="mb-5">
        {section.cards.map((card, i) =>
          card.pray ? (
            <section
              key={i}
              className="rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-7 mb-4 shadow-sm"
            >
              <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
                {card.heading}
              </h2>
              <p className="text-leather-900 leading-relaxed mb-6">
                {card.body}
              </p>
              <div className="pt-5 border-t border-parchment-200">
                <SacredPrayerLabel>Spiritual Communion</SacredPrayerLabel>
                <SacredPrayer text={spiritualCommunionPrayer} />
              </div>
            </section>
          ) : (
            <section
              key={i}
              className="rounded-2xl bg-white border border-parchment-200 px-5 py-5 mb-4"
            >
              <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
                {card.heading}
              </h2>
              <p className="text-leather-900 leading-relaxed whitespace-pre-line">
                {card.body}
              </p>
            </section>
          )
        )}
      </div>

      {/* Today's Mass readings card, available within the Word section. */}
      {section.id === 'liturgy-of-the-word' && (
        <div className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mb-5">
          <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
            Today’s Mass Readings
          </h2>
          <p className="text-sm text-stone-500 mb-4">
            Follow along with today’s readings from the Mass.
          </p>
          <a
            href="https://universalis.com/mass.htm"
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
          >
            Open Today’s Readings
          </a>
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <button className={secondaryBtn} onClick={() => setStep(step - 1)}>
          ← {step === 1 ? 'Welcome' : 'Previous'}
        </button>
        <button className={primaryBtn} onClick={() => setStep(step + 1)}>
          {step === total ? 'Complete →' : 'Next →'}
        </button>
      </div>
    </Shell>
  );
}
