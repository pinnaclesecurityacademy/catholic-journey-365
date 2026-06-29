import {
  useCallback,
  useEffect,
  lazy,
  Suspense,
  useState,
  type ReactNode,
} from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import AppErrorBoundary from './components/AppErrorBoundary';
import AuthScreen from './components/AuthScreen';
import JourneySetup from './components/JourneySetup';
import { AccountProvider, useAccount } from './lib/account';
import { PWAUpdateProvider, usePWAUpdate } from './lib/pwaUpdates';
import { useStandalonePWA } from './lib/pwaDisplayMode';
import { supabase } from './lib/supabase';
import { readResumePath, writeResumePath } from './lib/resume';

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
const Fasting = lazy(() => import('./pages/Fasting'));
const Sacraments = lazy(() => import('./pages/Sacraments'));
const SacramentDetail = lazy(() => import('./pages/SacramentDetail'));
const Prayer = lazy(() => import('./pages/Prayer'));
const PrayerDetail = lazy(() => import('./pages/PrayerDetail'));
const Rosary = lazy(() => import('./pages/Rosary'));
const OrderOfMass = lazy(() => import('./pages/OrderOfMass'));
const Questions = lazy(() => import('./pages/Questions'));
const QuestionArticle = lazy(() => import('./pages/QuestionArticle'));
const Bible = lazy(() => import('./pages/Bible'));
const ScriptureReading = lazy(() => import('./pages/ScriptureReading'));
const Landing = lazy(() => import('./pages/Landing'));
const Paywall = lazy(() => import('./pages/Paywall'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const INTRO_STORAGE_KEY = 'cj365_intro_complete_v1';

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

function isLaunchPath(path: string) {
  return path === '/app' || path === '/app/';
}

function getLaunchResumePath(path: string) {
  if (typeof window === 'undefined' || !isLaunchPath(path)) return null;
  const savedPath = readResumePath();
  return savedPath && savedPath !== '/' ? savedPath : null;
}

function ResumeLoadingScreen() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-white px-6"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center">
        <img
          src="/logo192.png"
          alt=""
          width="72"
          height="72"
          className="h-16 w-16 drop-shadow-[0_10px_24px_rgba(28,25,23,0.08)]"
        />
        <div className="mt-5 h-5 w-5 animate-spin rounded-full border-2 border-parchment-200 border-t-leather-500" />
      </div>
    </main>
  );
}

function AppRouteLoading() {
  return <div className="min-h-screen bg-parchment-100" aria-hidden="true" />;
}

// On every route change, reset the window to the top so pages never open
// mid-scroll. Lives inside the Router so it can observe navigation.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function ResumeRouteManager() {
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}${location.hash}`;
  const [pendingResume, setPendingResume] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    if (path !== '/app' && path !== '/app/') return null;
    const savedPath = readResumePath();
    return savedPath && savedPath !== '/' ? savedPath : null;
  });

  useEffect(() => {
    if (pendingResume) {
      if (currentPath === pendingResume) setPendingResume(null);
      return;
    }

    writeResumePath(currentPath);
  }, [currentPath, pendingResume]);

  if (pendingResume && currentPath !== pendingResume) {
    return <Navigate to={pendingResume} replace />;
  }

  return null;
}

function AppFrame({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter basename="/app">
      <ScrollToTop />
      <div
        className="mx-auto min-h-screen max-w-md border-x border-parchment-200 bg-parchment-100"
        style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' }}
      >
        {children}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

function ResumeLaunchRedirect({
  to,
  onNavigated,
}: {
  to: string;
  onNavigated: () => void;
}) {
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    if (currentPath === to) onNavigated();
  }, [currentPath, onNavigated, to]);

  if (currentPath === to) return null;
  return <Navigate to={to} replace />;
}

function ResumeRedirectFrame({
  to,
  onNavigated,
}: {
  to: string;
  onNavigated: () => void;
}) {
  return (
    <BrowserRouter basename="/app">
      <ResumeLaunchRedirect to={to} onNavigated={onNavigated} />
      <ResumeLoadingScreen />
    </BrowserRouter>
  );
}

function LoadingAppFrame() {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setTimedOut(true), 10000);
    return () => window.clearTimeout(timer);
  }, []);

  if (timedOut) return <AuthRecoveryScreen />;

  return <ResumeLoadingScreen />;
}

function PremiumRoute({ children }: { children: ReactNode }) {
  const { hasPremiumAccess } = useAccount();
  return hasPremiumAccess ? <>{children}</> : <Paywall />;
}

function PrivateRoutes() {
  const premium = (page: ReactNode) => <PremiumRoute>{page}</PremiumRoute>;

  return (
    <Suspense fallback={<AppRouteLoading />}>
      <ResumeRouteManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/journey/scripture" element={<Journey />} />
        <Route path="/journey/faith" element={premium(<Journey />)} />
        <Route path="/day/:dayNumber" element={<DayDetail />} />
        <Route path="/day/:dayNumber/deeper" element={premium(<DiveDeeper />)} />
        <Route path="/saint" element={premium(<SaintOfDay />)} />
        <Route path="/saint/:key" element={premium(<SaintOfDay />)} />
        <Route path="/saints" element={premium(<SaintLibrary />)} />
        <Route path="/faith" element={premium(<Faith />)} />
        <Route path="/faith/begin" element={premium(<BeginHere />)} />
        <Route path="/faith/fasting" element={premium(<Fasting />)} />
        <Route path="/sacraments" element={premium(<Sacraments />)} />
        <Route path="/sacraments/:id" element={premium(<SacramentDetail />)} />
        <Route path="/prayer" element={premium(<Prayer />)} />
        <Route path="/prayer/:categoryId/:prayerId" element={premium(<PrayerDetail />)} />
        <Route path="/rosary" element={premium(<Rosary />)} />
        <Route path="/rosary/:mystery" element={premium(<Rosary />)} />
        <Route path="/mass" element={premium(<OrderOfMass />)} />
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

function hasAuthCallbackParams() {
  if (typeof window === 'undefined') return false;
  const url = new URL(window.location.href);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return (
    url.searchParams.has('code') ||
    url.searchParams.has('error') ||
    url.searchParams.has('error_code') ||
    hash.has('access_token') ||
    hash.has('refresh_token') ||
    hash.has('error') ||
    hash.has('error_code')
  );
}

function getCallbackNextPath() {
  if (typeof window === 'undefined') return '/app';
  const next = new URL(window.location.href).searchParams.get('next');
  return next && next.startsWith('/app') ? next : '/app';
}

function AuthCallback() {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setTimedOut(true), 10000);

    const finish = async () => {
      const url = new URL(window.location.href);
      const next = getCallbackNextPath();

      if (url.searchParams.has('error') || url.hash.includes('error=')) {
        window.history.replaceState({}, document.title, '/app/login');
        window.location.replace('/app/login');
        return;
      }

      const code = url.searchParams.get('code');
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      } else {
        await supabase.auth.getSession();
      }

      window.history.replaceState({}, document.title, next);
      window.location.replace(next);
    };

    finish().catch(() => {
      window.history.replaceState({}, document.title, '/app/login');
      window.location.replace('/app/login');
    });

    return () => window.clearTimeout(timeout);
  }, []);

  if (timedOut) return <AuthRecoveryScreen />;
  return <AuthGateLoading />;
}

async function clearAuthAndGoToLogin() {
  try {
    await supabase.auth.signOut();
  } catch {
    // Continue to the login screen even if the remote sign-out fails.
  }

  try {
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const key = window.localStorage.key(i);
      if (key?.startsWith('sb-') && key.includes('auth-token')) {
        window.localStorage.removeItem(key);
      }
    }
    for (let i = window.sessionStorage.length - 1; i >= 0; i--) {
      const key = window.sessionStorage.key(i);
      if (key?.startsWith('sb-') && key.includes('auth-token')) {
        window.sessionStorage.removeItem(key);
      }
    }
  } catch {
    // Storage may be unavailable; the route change still gets the user unstuck.
  }

  window.location.replace('/app/login');
}

function RedirectToLogin() {
  useEffect(() => {
    window.location.replace('/app/login');
  }, []);

  return <AuthGateLoading />;
}

function RedirectToApp() {
  useEffect(() => {
    window.location.replace('/app');
  }, []);

  return <AuthGateLoading />;
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
  const standalone = useStandalonePWA();

  if (!updateReady || !standalone) {
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

// Kept as a named wrapper because several auth and redirect gates reference it.
function AuthGateLoading() {
  return <ResumeLoadingScreen />;
}

function AuthRecoveryScreen() {
  return (
    <main className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-parchment-200 bg-white p-6 text-center shadow-[0_18px_42px_rgba(74,55,40,0.08)]">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Journey setup needs a restart
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Catholic Journey 365 could not finish loading your session. Please
          try again or return to the login screen.
        </p>
        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={clearAuthAndGoToLogin}
            className="w-full rounded-xl border border-parchment-200 bg-white py-3 font-semibold text-leather-600 transition active:scale-[0.99]"
          >
            Return to login
          </button>
          <button
            type="button"
            onClick={clearAuthAndGoToLogin}
            className="w-full rounded-xl border border-parchment-200 bg-parchment-50 py-3 font-semibold text-stone-500 transition active:scale-[0.99]"
          >
            Sign out and restart
          </button>
        </div>
      </div>
    </main>
  );
}

function IntroScreens({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const pages = [
    {
      title: 'Begin the Journey',
      body: 'Scripture, prayer, and formation one day at a time.',
    },
    {
      title: 'Understand the Faith',
      body:
        'See how Catholic teaching, prayer, and tradition connect to Scripture and to Jesus.',
    },
    {
      title: 'Walk With Christ Daily',
      body: 'Build a rhythm of prayer, Scripture, reflection, and faith.',
    },
  ];
  const page = pages[index];

  const next = () => {
    if (index < pages.length - 1) {
      setIndex(index + 1);
      return;
    }
    try {
      window.localStorage.setItem(INTRO_STORAGE_KEY, '1');
    } catch {
      // localStorage may be unavailable; continue into the app.
    }
    onComplete();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-leather-900 via-leather-700 to-parchment-200 flex items-center justify-center px-6">
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
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-gold">
          {index + 1} of {pages.length}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-leather-900">
          {page.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-leather-700">
          {page.body}
        </p>
        <button
          type="button"
          onClick={next}
          className="mt-7 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
        >
          {index === pages.length - 1 ? 'Continue' : 'Next'}
        </button>
      </div>
    </main>
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
    completionId,
    journeyId,
    claim,
  } = useAccount();
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);
  const [, refreshLaunchPath] = useState(0);
  const handleResumeNavigation = useCallback(() => {
    refreshLaunchPath((value) => value + 1);
  }, []);
  const path =
    typeof window === 'undefined' ? '/app' : window.location.pathname;
  const isResetPassword = path === '/app/reset-password';
  const isAuthCallback = path === '/app/auth/callback';
  const isIntroPath = path === '/app/intro';
  const isLoginPath = path === '/app/login';
  const hasCallbackParams = hasAuthCallbackParams();

  // A first-time user starts fresh on their own progress namespace, then
  // chooses or joins a journey. No legacy import step is shown publicly.
  useEffect(() => {
    if (user && profile && !completionId) {
      claim(user.id);
    }
  }, [user, profile, completionId, claim]);

  useEffect(() => {
    const waiting = loading || Boolean(user && (accountLoading || billingLoading));
    if (!waiting) {
      setLoadingTimedOut(false);
      return;
    }
    const timer = window.setTimeout(() => setLoadingTimedOut(true), 10000);
    return () => window.clearTimeout(timer);
  }, [accountLoading, billingLoading, completionId, loading, profile, user]);

  if (isResetPassword) {
    return (
      <AccountGateFrame>
        <Suspense fallback={<Splash />}>
          <ResetPassword />
        </Suspense>
      </AccountGateFrame>
    );
  }
  if (loadingTimedOut) return <AuthRecoveryScreen />;
  if (isAuthCallback || hasCallbackParams) return <AuthCallback />;
  if (loading) return <AuthGateLoading />;
  if (isLoginPath) {
    return user ? <RedirectToApp /> : <AuthScreen initialMode="login" />;
  }
  if (isIntroPath) {
    return <IntroScreens onComplete={() => window.location.replace('/app/login')} />;
  }
  if (!user) return <RedirectToLogin />;
  const launchResumePath = getLaunchResumePath(path);
  const waitingForAccountState =
    accountLoading || billingLoading || !profile || !completionId;
  if (launchResumePath && waitingForAccountState) {
    return (
      <ResumeRedirectFrame
        to={launchResumePath}
        onNavigated={handleResumeNavigation}
      />
    );
  }
  if (accountLoading || billingLoading) {
    return <LoadingAppFrame />;
  }
  if (accountStatus === 'deactivated') {
    return (
      <AccountGateFrame>
        <AccountDeactivated />
      </AccountGateFrame>
    );
  }
  if (!profile || !completionId) {
    return <LoadingAppFrame />;
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

  if (hasAuthCallbackParams()) {
    return <AuthCallback />;
  }

  if (
    window.location.pathname === '/questions' ||
    window.location.pathname.startsWith('/questions/')
  ) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/questions" element={<Questions />} />
          <Route path="/questions/:slug" element={<QuestionArticle />} />
        </Routes>
      </BrowserRouter>
    );
  }

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
  const isAuthenticatedAppPath = isAppPath();

  return (
    <AccountProvider>
      <PWAUpdateProvider>
        <AppErrorBoundary>
          <Suspense fallback={isAuthenticatedAppPath ? <Splash /> : null}>
            {isAuthenticatedAppPath ? <AppShell /> : <PublicPage />}
          </Suspense>
        </AppErrorBoundary>
        <PWAUpdateBanner />
      </PWAUpdateProvider>
    </AccountProvider>
  );
}
