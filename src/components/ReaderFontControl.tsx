import { ReaderFontSize } from '../lib/readerFont';

// Small Aa / A+ control for choosing reading text size on long-form pages.
const OPTIONS: { value: ReaderFontSize; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Large' },
  { value: 'xlarge', label: 'Extra Large' },
];

export function ReaderFontControl({
  size,
  setSize,
}: {
  size: ReaderFontSize;
  setSize: (size: ReaderFontSize) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex items-baseline gap-0.5 text-stone-400"
        aria-hidden="true"
      >
        <span className="text-sm font-semibold">Aa</span>
        <span className="text-base font-semibold">A+</span>
      </span>
      <div
        className="flex rounded-full border border-parchment-200 bg-white p-0.5"
        role="group"
        aria-label="Reading text size"
      >
        {OPTIONS.map((option) => {
          const active = size === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSize(option.value)}
              aria-pressed={active}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                active
                  ? 'bg-leather-600 text-white'
                  : 'text-leather-600'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
