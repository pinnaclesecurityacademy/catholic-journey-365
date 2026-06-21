import { useEffect, lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import AppErrorBoundary from './components/AppErrorBoundary';
import AuthScreen from './components/AuthScreen';
import JourneySetup from './components/JourneySetup';
import { AccountProvider, useAccount } from './lib/account';
import { PWAUpdateProvider, usePWAUpdate } from './lib/pwaUpdates';

// Route-based code splitting: each page (and the large data it imports) loads
// in its own chunk on demand instead of inflating the initial bundle. Landing
// and the authenticated app no longer download content they do not render.
const Home = lazy(() => import('./pages/Home'));
const Journey = lazy(() => import('./pages/Journey'));
const DayDetail = lazy(() => import('./pages/DayDetail'));
const DiveDeeper = lazy(() => import('./pages/DiveDeeper'));
const SaintOfDay = lazy(() => import('./pages/SaintOfDay'));
const SaintLibrary = lazy(() => import('./pages/SaintLibrary'));
const Profile = lazy(() => import('./pages/Profile'));
const Faith = lazy(() => import('./pages/Faith'));
const BeginHere = lazy(() => import('./pages/BeginHere'));
const Sacraments = lazy(() => import('./pages/Sacraments'));
const SacramentDetail = lazy(() => import('./pages/SacramentDetail'));
const Prayer = lazy(() => import('./pages/Prayer'));
const PrayerDetail = lazy(() => import('./pages/PrayerDetail'));
const Rosary = lazy(() => import('./pages/Rosary'));
const OrderOfMass = lazy(() => import('./pages/OrderOfMass'));
const Bible = lazy(() => import('./pages/Bible'));
const ScriptureReading = lazy(() => import('./pages/ScriptureReading'));
const Landing = lazy(() => import('./pages/Landing'));
const Paywall = lazy(() => import('./pages/Paywall'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

function Splash() {
  const hour = new Date().getHours();
  const prayerLine =
    hour < 12
      ? 'Lord, guide my steps today.'
      : hour < 18
      ? 'Walk with Christ today.'
      : 'Rest in His peace.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-leather-900 via-leather-700 to-parchment-200 flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-[1.75rem] border border-gold/25 bg-parchment-50/95 p-7 text-center shadow-[0_24px_70px_rgba(28,25,23,0.26)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-white shadow-[0_12px_28px_rgba(74,55,40,0.12)]">
          <img
            src="/logo192.png"
            alt=""
            width="34"
            height="34"
            className="h-9 w-9"
          />
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold text-leather-900">
          Catholic Journey 365
        </h1>
        <p className="mt-3 font-display text-xl font-semibold text-leather-700">
          {prayerLine}
        </p>
        <p className="mt-2 text-sm font-medium text-leather-600">
          Preparing your journey...
        </p>
      </div>
    </div>
  );
}

function AppFrame({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter basename="/app">
      <div
        className="min-h-screen bg-parchment-100"
        style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' }}
      >
        {children}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

function LoadingAppFrame() {
  return (
    <AppFrame>
      <Splash />
    </AppFrame>
  );
}

function PrivateRoutes() {
  return (
    <Suspense fallback={<Splash />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/journey/scripture" element={<Journey />} />
        <Route path="/journey/faith" element={<Journey />} />
        <Route path="/day/:dayNumber" element={<DayDetail />} />
        <Route path="/day/:dayNumber/deeper" element={<DiveDeeper />} />
        <Route path="/saint" element={<SaintOfDay />} />
        <Route path="/saint/:key" element={<SaintOfDay />} />
        <Route path="/saints" element={<SaintLibrary />} />
        <Route path="/faith" element={<Faith />} />
        <Route path="/faith/begin" element={<BeginHere />} />
        <Route path="/sacraments" element={<Sacraments />} />
        <Route path="/sacraments/:id" element={<SacramentDetail />} />
        <Route path="/prayer" element={<Prayer />} />
        <Route path="/prayer/:categoryId/:prayerId" element={<PrayerDetail />} />
        <Route path="/rosary" element={<Rosary />} />
        <Route path="/rosary/:mystery" element={<Rosary />} />
        <Route path="/mass" element={<OrderOfMass />} />
        <Route path="/bible" element={<Bible />} />
        <Route path="/bible/reading/:day" element={<ScriptureReading />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}

function JourneySetupFrame() {
  return (
    <BrowserRouter basename="/app">
      <JourneySetup />
    </BrowserRouter>
  );
}

function AccountGateFrame({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter basename="/app">
      <div className="min-h-screen bg-parchment-100">{children}</div>
    </BrowserRouter>
  );
}

function AccountDeactivated() {
  const { signOut } = useAccount();

  return (
    <main className="min-h-screen bg-parchment-100 px-5 py-8">
      <div className="mx-auto max-w-md rounded-[1.75rem] border border-parchment-200 bg-white/90 p-6 text-center shadow-[0_24px_56px_rgba(74,55,40,0.12)]">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-parchment-50 text-2xl font-semibold text-gold">
          +
        </div>
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Account deactivated
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          This account has been deactivated. Please contact support if you
          would like help reactivating Catholic Journey 365.
        </p>
        <button
          type="button"
          onClick={signOut}
          className="mt-6 w-full rounded-xl border border-parchment-200 bg-white py-3 font-semibold text-stone-500 transition active:scale-[0.99]"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}

function PrivateApp() {
  return (
    <AppFrame>
      <PrivateRoutes />
    </AppFrame>
  );
}

function PWAUpdateBanner() {
  const { updateReady, updateNow } = usePWAUpdate();

  if (!updateReady) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-50 px-4">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-gold/40 bg-white px-4 py-3 shadow-[0_16px_36px_rgba(74,55,40,0.16)]">
        <p className="flex-1 text-sm font-medium text-leather-900">
          A new Catholic Journey 365 update is ready.
        </p>
        <button
          onClick={updateNow}
          className="shrink-0 rounded-xl bg-leather-600 px-3 py-2 text-sm font-semibold text-white active:scale-[0.99] transition"
        >
          Update App
        </button>
      </div>
    </div>
  );
}

function AuthGateLoading() {
  return (
    <div className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Catholic Journey 365
        </h1>
        <p className="mt-2 text-leather-600">Peace be with you.</p>
      </div>
    </div>
  );
}

function AppShell() {
  const {
    loading,
    accountLoading,
    billingLoading,
    user,
    profile,
    accountStatus,
    hasBillingAccess,
    completionId,
    journeyId,
    claim,
  } = useAccount();

  // A first-time user starts fresh on their own progress namespace, then
  // chooses or joins a journey. No legacy import step is shown publicly.
  useEffect(() => {
    if (user && profile && !completionId) {
      claim(user.id);
    }
  }, [user, profile, completionId, claim]);

  if (loading) return <AuthGateLoading />;
  if (!user) return <AuthScreen />;
  if (accountLoading || billingLoading || !profile || !completionId) {
    return <LoadingAppFrame />;
  }
  if (accountStatus === 'deactivated') {
    return (
      <AccountGateFrame>
        <AccountDeactivated />
      </AccountGateFrame>
    );
  }
  if (!hasBillingAccess) {
    return (
      <AccountGateFrame>
        <Suspense fallback={<Splash />}>
          <Paywall />
        </Suspense>
      </AccountGateFrame>
    );
  }
  if (!journeyId) return <JourneySetupFrame />;

  return <PrivateApp />;
}

// The authenticated app lives under /app; the public marketing site is served
// at the root. AccountProvider wraps both so a Supabase session present in the
// URL (email confirmation / password recovery links) is established wherever
// the user lands, then Landing forwards signed-in users into the app.
function isAppPath() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  return path === '/app' || path.startsWith('/app/');
}

function PublicPage() {
  if (typeof window === 'undefined') return <Landing />;

  switch (window.location.pathname) {
    case '/privacy':
      return <LegalPage page="privacy" />;
    case '/terms':
      return <LegalPage page="terms" />;
    case '/support':
      return <LegalPage page="support" />;
    default:
      return <Landing />;
  }
}

export default function App() {
  return (
    <AccountProvider>
      <PWAUpdateProvider>
        <AppErrorBoundary>
          <Suspense fallback={<AuthGateLoading />}>
            {isAppPath() ? <AppShell /> : <PublicPage />}
          </Suspense>
        </AppErrorBoundary>
        <PWAUpdateBanner />
      </PWAUpdateProvider>
    </AccountProvider>
  );
}
