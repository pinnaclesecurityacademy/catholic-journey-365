type LegalPageKind = 'privacy' | 'terms' | 'support';

type LegalSection = {
  title: string;
  body: string;
};

const contactEmail = 'catholicjourney365@gmail.com';

const legalContent: Record<
  LegalPageKind,
  {
    eyebrow: string;
    title: string;
    intro: string;
    sections: LegalSection[];
  }
> = {
  privacy: {
    eyebrow: 'Privacy',
    title: 'Privacy Policy',
    intro:
      'Catholic Journey 365 is built to help you learn, pray, and continue your Catholic faith formation with respect for your personal information.',
    sections: [
      {
        title: 'Account information',
        body:
          'When you create an account, we may collect account information such as your email address, display name, journey settings, invite codes, subscription status, and app progress.',
      },
      {
        title: 'Supabase authentication',
        body:
          'Catholic Journey 365 uses Supabase authentication to provide sign in, account sessions, and related account security features.',
      },
      {
        title: 'Stripe payment processing',
        body:
          'Payments and subscription billing are processed by Stripe. Stripe may receive information needed to complete payment, manage subscriptions, prevent fraud, and provide receipts.',
      },
      {
        title: 'Card details',
        body:
          'Catholic Journey 365 does not store your card details on its own servers. Card details are handled by Stripe through its secure payment systems.',
      },
      {
        title: 'User data handling',
        body:
          'We use your data to operate the app, maintain your account, provide subscription access, save journey progress, support shared journeys, improve reliability, and respond to support requests.',
      },
      {
        title: 'Contact',
        body: `For privacy questions or data requests, contact ${contactEmail}.`,
      },
    ],
  },
  terms: {
    eyebrow: 'Terms',
    title: 'Terms of Use',
    intro:
      'By using Catholic Journey 365, you agree to use the app as a Catholic faith formation companion and to manage your subscription responsibly.',
    sections: [
      {
        title: 'Subscription terms',
        body:
          'Catholic Journey 365 may offer monthly and yearly subscription plans. Subscription prices, billing periods, trial terms, and renewal dates are shown before purchase and may also be available through your account or Stripe billing portal.',
      },
      {
        title: 'Cancellation',
        body:
          'You may cancel your subscription through the secure Stripe Customer Portal when available in your account. Cancellation stops future renewals, but access may continue until the end of the current paid period unless otherwise stated.',
      },
      {
        title: 'Faith formation purpose',
        body:
          'Catholic Journey 365 is intended for Catholic learning, prayer, Scripture reading, and personal faith formation. It is offered as a companion for ordinary daily growth in the faith.',
      },
      {
        title: 'Not a replacement for parish life',
        body:
          'Catholic Journey 365 is not a replacement for parish life, clergy guidance, spiritual direction, RCIA or OCIA, confession, Mass, the Eucharist, or any of the Sacraments.',
      },
      {
        title: 'Independent Catholic resource',
        body:
          'Catholic Journey 365 is an independent Catholic resource. It is not an official product of any diocese, parish, religious order, episcopal conference, or Vatican office unless explicitly stated.',
      },
      {
        title: 'Contact',
        body: `For questions about these terms, contact ${contactEmail}.`,
      },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'Contact Support',
    intro:
      'Need help with your account, subscription, sign in, or app access? Catholic Journey 365 support can help point you in the right direction.',
    sections: [
      {
        title: 'Account and sign in',
        body:
          'For help with Supabase authentication, sign in links, account access, or display name issues, include the email address used for your account.',
      },
      {
        title: 'Billing and subscriptions',
        body:
          'For billing, payment method, renewal, or cancellation questions, use the Stripe Customer Portal from your Profile when possible. If you still need help, contact support.',
      },
      {
        title: 'Faith content questions',
        body:
          'Catholic Journey 365 is a formation companion. For pastoral, sacramental, or personal spiritual guidance, please speak with your parish priest or local parish.',
      },
      {
        title: 'Email',
        body: `Contact ${contactEmail}.`,
      },
    ],
  },
};

function CrossMark() {
  return (
    <img
      src="/images/landing/jerusalem-cross.png"
      alt=""
      aria-hidden="true"
      className="h-5 w-5 object-contain"
    />
  );
}

function PublicLegalFooter() {
  return (
    <footer className="border-t border-amber-100/70 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 text-sm text-leather-900/70 sm:flex-row sm:items-center sm:justify-between">
        <a href="/" className="font-display text-lg font-semibold text-leather-900">
          Catholic Journey 365
        </a>
        <div className="flex flex-wrap gap-4">
          <a className="font-semibold hover:text-leather-900" href="/privacy">
            Privacy
          </a>
          <a className="font-semibold hover:text-leather-900" href="/terms">
            Terms
          </a>
          <a className="font-semibold hover:text-leather-900" href="/support">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function LegalPage({ page }: { page: LegalPageKind }) {
  const content = legalContent[page];

  return (
    <div className="min-h-screen bg-[#f5ead1] text-leather-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.92),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(214,157,72,0.2),transparent_28%),linear-gradient(180deg,#fff7e4_0%,#f1dfbd_52%,#ead4ad_100%)]" />
      <nav className="border-b border-white/30 bg-[#fff4dc]/76 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-leather-900 text-amber-200 shadow-sm">
              <CrossMark />
            </span>
            <span className="font-display text-xl font-semibold text-leather-900 sm:text-2xl">
              Catholic Journey <span className="text-amber-600">365</span>
            </span>
          </a>
          <a
            href="/app"
            className="rounded-full bg-gradient-to-b from-amber-400 to-amber-600 px-5 py-2.5 text-sm font-bold text-leather-900 shadow-sm"
          >
            Open App
          </a>
        </div>
      </nav>

      <main className="px-5 py-8 sm:px-8 md:py-12">
        <article className="mx-auto max-w-4xl rounded-[2rem] border border-white/54 bg-white/70 p-5 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur sm:p-7 md:p-9">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
            {content.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-leather-900 md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-leather-900/82">
            {content.intro}
          </p>

          <div className="mt-8 divide-y divide-parchment-200">
            {content.sections.map((section) => (
              <section key={section.title} className="py-5 first:pt-0 last:pb-0">
                <h2 className="font-display text-2xl font-semibold text-leather-900">
                  {section.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-stone-600">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>

      <PublicLegalFooter />
    </div>
  );
}
