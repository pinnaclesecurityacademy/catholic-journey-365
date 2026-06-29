import { ReactNode } from 'react';

const PUBLIC_NAV_LINKS = [
  { label: 'The Path', href: '/#path' },
  { label: 'Features', href: '/#features' },
  { label: 'Questions', href: '/questions' },
  { label: 'Pricing', href: '/#pricing' },
];

function goToApp() {
  window.location.href = '/app/login';
}

function CrossMark({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/landing/jerusalem-cross.png"
      alt=""
      aria-hidden="true"
      className={`block h-7 w-7 object-contain ${className}`}
    />
  );
}

export function PublicBeginButton({
  label = 'Start Your 14 Day Journey',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={goToApp}
      className={`rounded-full bg-gradient-to-b from-amber-300 to-amber-600 px-9 py-4 text-base font-bold text-leather-900 shadow-[0_20px_45px_rgba(161,106,28,0.26)] transition active:scale-[0.99] ${className}`}
    >
      {label}
    </button>
  );
}

export function PublicGoldRule({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent ${className}`}
    />
  );
}

export function PublicSiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f5ead1] text-leather-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.92),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(214,157,72,0.2),transparent_28%),linear-gradient(180deg,#fff7e4_0%,#f1dfbd_52%,#ead4ad_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(83,54,31,0.09)_1px,transparent_1px),linear-gradient(rgba(83,54,31,0.08)_1px,transparent_1px)] [background-size:30px_30px]" />

      <nav className="fixed inset-x-0 top-0 z-30 border-b border-white/30 bg-[#fff4dc]/76 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-leather-900 text-amber-200 shadow-sm">
              <CrossMark className="h-4 w-4" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-wide text-leather-900">
              Catholic Journey <span className="text-amber-600">365</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {PUBLIC_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-leather-900/75 transition hover:text-leather-900"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={goToApp}
              className="rounded-full bg-gradient-to-b from-amber-400 to-amber-600 px-6 py-3 text-sm font-bold text-leather-900 shadow-[0_12px_30px_rgba(161,106,28,0.25)] transition active:scale-[0.99]"
            >
              Begin Your Journey
            </button>
          </div>

          <button
            type="button"
            onClick={goToApp}
            className="rounded-full bg-gradient-to-b from-amber-400 to-amber-600 px-5 py-2.5 text-sm font-bold text-leather-900 shadow-sm md:hidden"
          >
            Begin
          </button>
        </div>
      </nav>

      {children}

      <footer className="border-t border-amber-100/70 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-leather-900/70 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="font-display text-lg font-semibold text-leather-900">
            Catholic Journey 365
          </a>
          <div className="flex flex-wrap gap-4">
            <a className="font-semibold transition hover:text-leather-900" href="/privacy">
              Privacy
            </a>
            <a className="font-semibold transition hover:text-leather-900" href="/terms">
              Terms
            </a>
            <a className="font-semibold transition hover:text-leather-900" href="/support">
              Support
            </a>
            <a className="font-semibold transition hover:text-leather-900" href="/questions">
              Questions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
