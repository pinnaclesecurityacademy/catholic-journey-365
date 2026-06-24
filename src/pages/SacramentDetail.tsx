import { useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { SacredCard } from '../components/SacredCard';
import { getSacrament, sacraments } from '../data/sacramentsContent';
import { useReaderFont, readerFontClass } from '../lib/readerFont';
import { ReaderFontControl } from '../components/ReaderFontControl';
import { BackButton } from '../components/BackButton';

export default function SacramentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { size, setSize } = useReaderFont();
  const sacrament = id ? getSacrament(id) : undefined;

  // Land at the top when opening a new sacrament.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!sacrament) {
    return <Navigate to="/sacraments" replace />;
  }

  const index = sacraments.findIndex((item) => item.id === sacrament.id);
  const next = sacraments[index + 1];

  return (
    <div className={`mx-auto max-w-md px-4 pt-5 pb-6 ${readerFontClass(size)}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <BackButton fallback="/sacraments" />
        <ReaderFontControl size={size} setSize={setSize} />
      </div>

      <section className="relative mb-4 overflow-hidden rounded-[1.75rem] bg-leather-950 text-white shadow-[0_22px_50px_rgba(74,55,40,0.2)]">
        <img
          src="/images/faith/sacraments.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_38%] opacity-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-leather-950 via-leather-950/80 to-leather-900/40" />
        <div className="relative p-5 pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            The Sacraments
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
            {sacrament.name}
          </h1>
          <p className="mt-2 text-sm font-medium leading-relaxed text-parchment-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {sacrament.subtitle}
          </p>
        </div>
      </section>

      <SacredCard className="mb-4">
        <h2 className="font-display text-lg font-bold text-leather-900">
          What is it?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          {sacrament.whatIsIt}
        </p>
      </SacredCard>

      <SacredCard className="mb-4">
        <h2 className="font-display text-lg font-bold text-leather-900">
          Why does it matter?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          {sacrament.whyItMatters}
        </p>
      </SacredCard>

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Scripture Connection
        </p>
        <p className="mt-1 font-display text-base font-bold text-leather-900">
          {sacrament.scriptureReference}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          {sacrament.scriptureConnection}
        </p>
      </SacredCard>

      <SacredCard className="mb-4">
        <h2 className="font-display text-lg font-bold text-leather-900">
          Common Questions
        </h2>
        <div className="mt-3 space-y-3">
          {sacrament.questions.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-parchment-200 bg-parchment-50 p-4"
            >
              <h3 className="text-sm font-semibold text-leather-900">
                {item.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </SacredCard>

      <SacredCard className="mb-4 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          A Prayer
        </p>
        <p className="mt-2 whitespace-pre-line text-sm italic leading-relaxed text-stone-600">
          {sacrament.prayer}
        </p>
      </SacredCard>

      <SacredCard className="mb-4 border-gold/30 bg-gold/10">
        <h2 className="font-display text-lg font-bold text-leather-900">
          My Next Step
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          {sacrament.nextStep}
        </p>
      </SacredCard>

      <div className="grid gap-2">
        {next && (
          <button
            type="button"
            onClick={() => navigate(`/sacraments/${next.id}`)}
            className="w-full rounded-xl bg-leather-600 py-3 font-semibold text-white shadow-[0_12px_24px_rgba(74,55,40,0.14)] transition active:scale-[0.99]"
          >
            Next: {next.name}
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate('/sacraments')}
          className="w-full rounded-xl border border-parchment-200 py-2.5 text-sm font-semibold text-leather-600 transition active:scale-[0.99]"
        >
          Back to all Sacraments
        </button>
      </div>
    </div>
  );
}
