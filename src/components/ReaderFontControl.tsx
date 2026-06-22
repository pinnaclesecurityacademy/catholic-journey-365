import { ReaderFontSize } from '../lib/readerFont';

// Compact reading text size control for long-form pages. A single "aA" button
// cycles Normal -> Large -> Extra Large -> Normal.
const CYCLE: ReaderFontSize[] = ['normal', 'large', 'xlarge'];
const LABELS: Record<ReaderFontSize, string> = {
  normal: 'Normal',
  large: 'Large',
  xlarge: 'Extra Large',
};

export function ReaderFontControl({
  size,
  setSize,
}: {
  size: ReaderFontSize;
  setSize: (size: ReaderFontSize) => void;
}) {
  const next = () => {
    const index = CYCLE.indexOf(size);
    setSize(CYCLE[(index + 1) % CYCLE.length]);
  };

  return (
    <button
      type="button"
      onClick={next}
      aria-label={`Reading text size: ${LABELS[size]}. Tap to change.`}
      title={`Text size: ${LABELS[size]}`}
      className="flex items-baseline gap-0.5 rounded-full border border-parchment-200 bg-white px-3 py-1 font-semibold text-leather-600 transition active:scale-[0.97]"
    >
      <span className="text-xs">a</span>
      <span className="text-base">A</span>
    </button>
  );
}
