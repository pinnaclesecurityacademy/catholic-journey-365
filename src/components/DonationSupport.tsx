// Voluntary donation section. Catholic Journey 365 is free for everyone.
// Donations are optional, never unlock extra features, and no one should ever
// feel pressured to give. Keep this gentle and non-commercial.

// Placeholder link until the final donation URL is provided.
export const DONATION_URL = 'https://example.com/support-catholic-journey-365';

export function DonationSupport({ className = '' }: { className?: string }) {
  return (
    <section
      className={`rounded-2xl border border-parchment-200 bg-gradient-to-br from-white to-parchment-50 p-5 shadow-[0_12px_32px_rgba(74,55,40,0.08)] ${className}`}
    >
      <h2 className="font-display text-xl font-semibold text-leather-900">
        Support Catholic Journey 365
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        Catholic Journey 365 is free for everyone. If this journey has helped
        you and you would like to support its continued development, you can make
        an optional donation. Your support helps us keep the platform available
        and continue creating Catholic formation resources.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-stone-500">
        Donations are completely optional and do not unlock any extra features.
        Everyone receives the same full experience.
      </p>
      <a
        href={DONATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
      >
        Support Catholic Journey 365
      </a>
    </section>
  );
}
