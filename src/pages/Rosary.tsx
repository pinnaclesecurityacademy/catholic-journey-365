import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  rosaryEducation,
  mysteryGroups,
  getMysteryGroup,
  rosaryOpening,
  decadePrayer,
  decadePrayerVerse,
  rosaryClosingVerse,
  mysteryExcerpt,
} from '../data/rosaryContent';
import { SacredPrayer, SacredPrayerLabel } from '../components/SacredPrayer';

// Guided Rosary, Christ-centred meditation. Education + per-mystery content.
type Step = 'start' | 'mysteries' | 'decades' | 'finish';

export default function Rosary() {
  const { mystery } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('start');
  const [selectedMystery, setSelectedMystery] = useState<string>(mystery ?? '');
  const [decade, setDecade] = useState(1);

  // Land at the top whenever the step or decade changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, decade, selectedMystery]);

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

  // ---- Start: what / why / how ----
  if (step === 'start') {
    return (
      <Shell>
        <header className="mb-6">
          <h1 className="font-display text-4xl font-bold text-leather-900">
            Pray the Rosary
          </h1>
        </header>
        <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
          <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
            What is the Rosary?
          </h2>
          <p className="text-leather-900 leading-relaxed">
            {rosaryEducation.whatIsIt}
          </p>
        </section>
        <section className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mb-4">
          <h2 className="font-display text-xl font-semibold text-leather-600 mb-2">
            Why Catholics pray the Rosary
          </h2>
          <p className="text-leather-900 leading-relaxed">
            {rosaryEducation.whyPray}
          </p>
        </section>
        <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
          <h2 className="font-display text-xl font-semibold text-leather-900 mb-2">
            How to pray the Rosary
          </h2>
          <p className="text-leather-900 leading-relaxed">
            {rosaryEducation.howToPray}
          </p>
          <p className="text-sm text-stone-500 mt-4 mb-2">
            Begin with the opening prayers:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-leather-900">
            {rosaryOpening.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-leather-600">
            Then pray each of the five decades.
          </p>
        </section>
        <button
          className={primaryBtn}
          onClick={() => setStep(selectedMystery ? 'decades' : 'mysteries')}
        >
          Begin
        </button>
      </Shell>
    );
  }

  // ---- Mystery selection: the four groups ----
  if (step === 'mysteries') {
    return (
      <Shell>
        <header className="mb-6">
          <h1 className="font-display text-3xl font-bold text-leather-900">
            Choose the Mysteries
          </h1>
        </header>
        <div className="space-y-3">
          {mysteryGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedMystery(g.id);
                setDecade(1);
                setStep('decades');
              }}
              className="w-full text-left rounded-xl bg-white border border-parchment-200 p-4 active:scale-[0.99] transition"
            >
              <h2 className="font-display text-lg font-semibold text-leather-900">
                {g.title}
              </h2>
              <p className="text-xs italic text-stone-400 mt-0.5">{g.days}</p>
              <p className="text-sm text-stone-500 mt-1">{g.represents}</p>
              <p className="text-sm text-leather-600 mt-1">{g.connection}</p>
            </button>
          ))}
        </div>
        <button className={secondaryBtn + ' mt-6'} onClick={() => setStep('start')}>
          ← Back
        </button>
      </Shell>
    );
  }

  // ---- Decades: one mystery per decade ----
  if (step === 'decades') {
    const group = getMysteryGroup(selectedMystery);
    const m = group?.mysteries[decade - 1];
    return (
      <Shell>
        <header className="mb-5">
          <p className="text-xs uppercase tracking-widest text-stone-400">
            {group?.title} · Decade {decade} of 5
          </p>
          <h1 className="font-display text-3xl font-bold text-leather-900 mt-1">
            {m?.title}
          </h1>
        </header>

        {m && (
          <>
            <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-4">
              <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
                Story
              </h2>
              <p className="text-leather-900 leading-relaxed">
                {m.whatHappened}
              </p>
              <p className="mt-3 italic text-stone-600 leading-relaxed">
                {mysteryExcerpt(m.title)}
              </p>
              <p className="mt-1 text-sm font-semibold text-leather-600">
                {m.scripture}
              </p>
            </section>
            <section className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mb-4">
              <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
                Connection to Christ
              </h2>
              <p className="text-leather-900 leading-relaxed">
                {m.connection} {m.meditate}
              </p>
            </section>

            <section className="rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-7 mb-5 shadow-sm">
              <div className="mb-7">
                <SacredPrayerLabel>Our Father</SacredPrayerLabel>
                <SacredPrayer text={decadePrayerVerse.ourFather} />
              </div>

              <div className="mb-7 pt-6 border-t border-parchment-200">
                <SacredPrayerLabel>Hail Mary &times;10</SacredPrayerLabel>
                <SacredPrayer text={decadePrayerVerse.hailMary} />
              </div>

              <div className="mb-7 pt-6 border-t border-parchment-200">
                <SacredPrayerLabel>Glory Be</SacredPrayerLabel>
                <SacredPrayer text={decadePrayerVerse.gloryBe} />
              </div>

              <div className="pt-6 border-t border-parchment-200">
                <SacredPrayerLabel>Fatima Prayer</SacredPrayerLabel>
                <SacredPrayer text={decadePrayerVerse.fatima} />
              </div>

              <p className="mt-7 text-sm text-leather-600 text-center">
                {decadePrayer.rhythm}
              </p>
            </section>
          </>
        )}

        <div className="flex gap-3">
          <button
            className={secondaryBtn}
            onClick={() =>
              decade > 1 ? setDecade(decade - 1) : setStep('mysteries')
            }
          >
            ← {decade > 1 ? 'Previous' : 'Mysteries'}
          </button>
          <button
            className={primaryBtn}
            onClick={() =>
              decade < 5 ? setDecade(decade + 1) : setStep('finish')
            }
          >
            {decade < 5 ? 'Next decade →' : 'Closing →'}
          </button>
        </div>
      </Shell>
    );
  }

  // ---- Finish ----
  return (
    <Shell>
      <header className="mb-6">
        <h1 className="font-display text-4xl font-bold text-leather-900">
          Closing Prayers
        </h1>
        <p className="text-stone-500 mt-1">
          We entrust our prayers to God through Mary, who leads us to her Son.
        </p>
      </header>
      <section className="rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-7 mb-4 shadow-sm">
        <SacredPrayerLabel>Hail, Holy Queen</SacredPrayerLabel>
        <SacredPrayer text={rosaryClosingVerse.hailHolyQueen} />
      </section>
      <section className="rounded-2xl bg-parchment-50 border border-parchment-200 px-5 py-7 mb-5 shadow-sm">
        <SacredPrayerLabel>Final Prayer</SacredPrayerLabel>
        <SacredPrayer text={rosaryClosingVerse.finalPrayer} />
      </section>
      <button className={primaryBtn} onClick={() => navigate('/prayer')}>
        Finish
      </button>
    </Shell>
  );
}
