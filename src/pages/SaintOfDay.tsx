import { useEffect, useState, ReactNode } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  getSaintOfDay,
  getSaintByKey,
  SAINT_CLOSING,
  Saint,
} from '../data/saints';
import { SacredPrayer } from '../components/SacredPrayer';
import {
  SAINT_OF_DAY_ITEM,
  readFaithJourneyChecks,
  writeFaithJourneyChecks,
} from '../lib/faithJourney';
import { useReaderFont, readerFontClass } from '../lib/readerFont';
import { ReaderFontControl } from '../components/ReaderFontControl';

// Saint of the Day experience (route: /saint).
// Rendering is driven by the entry's `type`:
//   saint    -> Story, Why Catholics Remember Them, What They Teach Us Today,
//               Patron Saint Of, Virtues, Ask Their Intercession.
//   marian   -> Story, Meaning, Church Significance, Ask Mary's Intercession.
//   feast/   -> What Happened?, Why Catholics Celebrate, Scripture Connection,
//   solemnity   Reflection, Prayer (addressed to God).
//
// The three existing prose fields (story, whyRemembered, teachToday) hold the
// approved content and are mapped to the headings above. Newer fields are
// optional and only render when present.
//
// Future-ready (intentionally NOT implemented yet): an image at the top and an
// audio reflection below the text.

/** A standard prose section card. */
function ProseSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-2xl bg-white border border-parchment-200 p-5">
      <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
        {title}
      </h2>
      <p className="text-leather-900 leading-relaxed whitespace-pre-line">
        {body}
      </p>
    </section>
  );
}

/** A bulleted list section (e.g. Patron Saint Of, Virtues). */
function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl bg-white border border-parchment-200 p-5">
      <h2 className="font-display text-lg font-semibold text-leather-600 mb-2">
        {title}
      </h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-leather-900 leading-relaxed">
            <span className="text-gold mr-2">&bull;</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** An intercession block, sacred-prayer style with a divider. */
function Intercession({ title, text }: { title: string; text: string }) {
  return (
    <section className="mt-8 text-center">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
        {title}
      </p>
      <div
        className="mb-6 flex items-center justify-center gap-3"
        aria-hidden="true"
      >
        <span className="h-px w-10 bg-gold/50" />
        <span className="text-gold text-[0.5rem] leading-none">&#9670;</span>
        <span className="h-px w-10 bg-gold/50" />
      </div>
      <SacredPrayer text={text} />
    </section>
  );
}

/** Renders the type-specific body sections for an entry. */
function EntryBody({ saint }: { saint: Saint }) {
  const sections: ReactNode[] = [];

  if (saint.type === 'saint') {
    sections.push(
      <ProseSection key="story" title="Story" body={saint.story} />,
      <ProseSection
        key="why"
        title="Why Catholics Remember Them"
        body={saint.whyRemembered}
      />,
      <ProseSection
        key="teach"
        title="What They Teach Us Today"
        body={saint.teachToday}
      />,
    );
    if (saint.patronSaintOf && saint.patronSaintOf.length > 0) {
      sections.push(
        <ListSection
          key="patron"
          title="Patron Saint Of"
          items={saint.patronSaintOf}
        />,
      );
    }
    if (saint.virtues && saint.virtues.length > 0) {
      sections.push(
        <ListSection key="virtues" title="Virtues" items={saint.virtues} />,
      );
    }
  } else if (saint.type === 'marian') {
    sections.push(
      <ProseSection key="story" title="Story" body={saint.story} />,
      <ProseSection
        key="meaning"
        title="Meaning"
        body={saint.meaning ?? saint.whyRemembered}
      />,
      <ProseSection
        key="significance"
        title="Church Significance"
        body={saint.churchSignificance ?? saint.teachToday}
      />,
    );
  } else {
    // feast or solemnity
    sections.push(
      <ProseSection
        key="what"
        title="What Happened?"
        body={saint.whatHappened ?? saint.story}
      />,
      <ProseSection
        key="why"
        title="Why Catholics Celebrate"
        body={saint.whyCatholicsCelebrate ?? saint.whyRemembered}
      />,
    );
    if (saint.scriptureConnection) {
      sections.push(
        <ProseSection
          key="scripture"
          title="Scripture Connection"
          body={saint.scriptureConnection}
        />,
      );
    }
    sections.push(
      <ProseSection
        key="reflection"
        title="Reflection"
        body={saint.reflection ?? saint.teachToday}
      />,
    );
    if (saint.prayer) {
      sections.push(
        <ProseSection key="prayer" title="Prayer" body={saint.prayer} />,
      );
    }
  }

  return <div className="space-y-4">{sections}</div>;
}

/** Renders the closing intercession (saint/marian) below the encouragement. */
function ClosingIntercession({ saint }: { saint: Saint }) {
  if (saint.type === 'saint') {
    return (
      <Intercession
        title="Ask Their Intercession"
        text={saint.intercessionPrayer ?? `${saint.name},\npray for us.`}
      />
    );
  }
  if (saint.type === 'marian') {
    return (
      <Intercession
        title="Ask Mary's Intercession"
        text={saint.intercessionPrayer ?? `${saint.name},\npray for us.`}
      />
    );
  }
  // feast/solemnity: no saint invocation; any prayer to God is shown in the body.
  return null;
}

export default function SaintOfDay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { size, setSize } = useReaderFont();
  // When opened from the Saint Library a "MM-DD" key is provided; otherwise the
  // page shows today's saint exactly as before.
  const { key } = useParams<{ key: string }>();
  const fromLibrary = Boolean(key);
  const saint = key ? getSaintByKey(key) : getSaintOfDay();

  // Only show Today's Formation controls when opened from there (not the Library).
  const fromToday =
    !fromLibrary &&
    (location.state as { source?: string } | null)?.source === 'today';
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  useEffect(() => {
    if (fromToday) {
      setCompleted(readFaithJourneyChecks().includes(SAINT_OF_DAY_ITEM));
    }
  }, [fromToday]);

  const completeSaint = () => {
    const checks = readFaithJourneyChecks();
    if (!checks.includes(SAINT_OF_DAY_ITEM)) {
      writeFaithJourneyChecks([...checks, SAINT_OF_DAY_ITEM]);
    }
    setCompleted(true);
  };

  return (
    <div className={`max-w-md mx-auto px-5 pt-6 pb-12 ${readerFontClass(size)}`}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-leather-600 font-medium"
        >
          ← Back
        </button>
        <ReaderFontControl size={size} setSize={setSize} />
      </div>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          {fromLibrary ? 'Saint Library' : 'Saint of the Day'}
        </p>
        {saint ? (
          <>
            <h1 className="font-display text-4xl font-bold text-leather-600 leading-tight mt-1">
              {saint.name}
            </h1>
            <p className="text-sm text-leather-900 mt-2">
              Feast day · {saint.feastDay}
            </p>
          </>
        ) : (
          <h1 className="font-display text-4xl font-bold text-leather-600 leading-tight mt-1">
            A Saint for Today
          </h1>
        )}
      </header>

      {/* Future-ready: a saint image will appear here. Not implemented yet. */}

      {saint ? (
        <EntryBody saint={saint} />
      ) : (
        <section className="rounded-2xl bg-white border border-parchment-200 p-5">
          <p className="text-leather-900 leading-relaxed">
            Each day a saint will be featured here, their story, why the Church
            remembers them, and what they teach us today.
          </p>
        </section>
      )}

      {/* Future-ready: an audio reflection will appear here. Not implemented yet. */}

      {/* Closing encouragement, always shown */}
      <section className="rounded-2xl bg-parchment-100 border border-gold/40 p-5 mt-4">
        <p className="text-leather-900 leading-relaxed italic">
          {SAINT_CLOSING}
        </p>
      </section>

      {/* Closing intercession, by type (saint / marian only) */}
      {saint && <ClosingIntercession saint={saint} />}

      {/* Today's Formation controls, only when opened from Today */}
      {fromToday && (
        <div className="mt-8 space-y-3">
          {completed ? (
            <div className="w-full rounded-xl border border-gold/30 bg-parchment-50 py-3 text-center font-semibold text-leather-700">
              &#10003; Saint of the Day Completed
            </div>
          ) : (
            <button
              type="button"
              onClick={completeSaint}
              className="w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
            >
              Complete Saint of the Day
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate('/journey/faith')}
            className="w-full rounded-xl border border-parchment-200 bg-white py-3 font-semibold text-leather-600 transition active:scale-[0.99]"
          >
            Back to Today
          </button>
        </div>
      )}
    </div>
  );
}
