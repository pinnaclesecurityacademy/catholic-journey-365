import { useNavigate } from 'react-router-dom';
import { SacredCard } from '../components/SacredCard';
import { BackButton } from '../components/BackButton';
import {
  sacraments,
  sacramentsIntro,
  myJourneyCard,
  journeyTimeline,
  sacramentsClosing,
} from '../data/sacramentsContent';

export default function Sacraments() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md px-4 pt-5 pb-6">
      <div className="mb-4">
        <BackButton fallback="/faith" />
      </div>

      <section className="relative mb-4 overflow-hidden rounded-[1.75rem] bg-leather-950 text-white shadow-[0_22px_50px_rgba(74,55,40,0.2)]">
        <img
          src="/images/faith/sacraments.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_38%] opacity-[0.74]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-leather-950/98 via-leather-950/78 to-leather-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-leather-950/96 to-transparent" />
        <div className="relative p-5 pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Catholic Life
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            {sacramentsIntro.title}
          </h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-parchment-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {sacramentsIntro.theme}
          </p>
        </div>
      </section>

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-sm leading-relaxed text-stone-600">
          {sacramentsIntro.whatAreThey}
        </p>
        <div className="mt-4 rounded-2xl border border-gold/25 bg-gold/10 p-4">
          <p className="text-sm italic leading-relaxed text-leather-800">
            {sacramentsIntro.heart}
          </p>
        </div>
      </SacredCard>

      <SacredCard className="mb-4">
        <h2 className="font-display text-xl font-bold text-leather-900">
          {myJourneyCard.title}
        </h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-stone-600">
          {myJourneyCard.body}
        </p>
      </SacredCard>

      <SacredCard className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          The Sacrament Journey
        </p>
        <h2 className="mt-2 font-display text-xl font-bold text-leather-900">
          A path into the life of Christ
        </h2>

        <div className="mt-4 space-y-2">
          {journeyTimeline.initiation.map((step, index) => (
            <div key={step}>
              <div className="flex items-center gap-3 rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leather-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-leather-900">
                  {step}
                </span>
              </div>
              {index < journeyTimeline.initiation.length - 1 && (
                <div className="flex justify-center py-1 text-gold" aria-hidden="true">
                  &darr;
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-gold/25 bg-gold/10 p-4">
          <h3 className="text-sm font-semibold text-leather-900">
            Continuing life with Christ
          </h3>
          <ul className="mt-2 space-y-1.5">
            {journeyTimeline.continuing.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-stone-600"
              >
                <span className="text-gold" aria-hidden="true">
                  &middot;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SacredCard>

      <div className="mb-4 space-y-3">
        {sacraments.map((sacrament) => (
          <button
            key={sacrament.id}
            type="button"
            onClick={() => navigate(`/sacraments/${sacrament.id}`)}
            className="group flex w-full items-center gap-4 rounded-2xl border border-parchment-200 bg-white/90 p-4 text-left shadow-[0_12px_32px_rgba(74,55,40,0.08)] transition active:scale-[0.99]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-parchment-50 text-lg font-semibold text-gold">
              +
            </span>
            <span className="flex-1">
              <span className="block font-display text-lg font-bold leading-tight text-leather-900">
                {sacrament.name}
              </span>
              <span className="mt-0.5 block text-sm leading-relaxed text-stone-500">
                {sacrament.subtitle}
              </span>
            </span>
            <span className="text-gold" aria-hidden="true">
              &rarr;
            </span>
          </button>
        ))}
      </div>

      <SacredCard className="bg-gradient-to-br from-leather-900 to-leather-700 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          {sacramentsClosing.title}
        </p>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-parchment-100">
          {sacramentsClosing.body}
        </p>
      </SacredCard>
    </div>
  );
}
