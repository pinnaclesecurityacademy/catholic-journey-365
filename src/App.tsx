import { useEffect, lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import AuthScreen from './components/AuthScreen';
import JourneySetup from './components/JourneySetup';
import { AccountProvider, useAccount } from './lib/account';

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
const Prayer = lazy(() => import('./pages/Prayer'));
const PrayerDetail = lazy(() => import('./pages/PrayerDetail'));
const Rosary = lazy(() => import('./pages/Rosary'));
const OrderOfMass = lazy(() => import('./pages/OrderOfMass'));
const Bible = lazy(() => import('./pages/Bible'));
const ScriptureReading = lazy(() => import('./pages/ScriptureReading'));
const Landing = lazy(() => import('./pages/Landing'));

function Splash() {
  return (
    <div className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-[1.75rem] border border-parchment-200 bg-white/85 p-7 text-center shadow-[0_24px_56px_rgba(74,55,40,0.12)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-parchment-50 text-2xl font-semibold text-gold">
          +
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold text-leather-900">
          Catholic Journey 365
        </h1>
        <p className="mt-2 text-sm font-medium text-leather-600">
          Preparing your journey...
        </p>
        <p className="mt-4 text-sm italic text-stone-500">
          Peace be with you.
        </p>
      </div>
    </div>
  );
}

function AppFrame({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter basename="/app">
      <div className="min-h-screen bg-parchment-100" style={{ paddingBottom: 80 }}>
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
        <Route path="/day/:dayNumber" element={<DayDetail />} />
        <Route path="/day/:dayNumber/deeper" element={<DiveDeeper />} />
        <Route path="/saint" element={<SaintOfDay />} />
        <Route path="/saint/:key" element={<SaintOfDay />} />
        <Route path="/saints" element={<SaintLibrary />} />
        <Route path="/faith" element={<Faith />} />
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

function PrivateApp() {
  return (
    <AppFrame>
      <PrivateRoutes />
    </AppFrame>
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
  const { loading, accountLoading, user, profile, completionId, journeyId, claim } =
    useAccount();

  // A first-time user starts fresh on their own progress namespace, then
  // chooses or joins a journey. No legacy import step is shown publicly.
  useEffect(() => {
    if (user && profile && !completionId) {
      claim(user.id);
    }
  }, [user, profile, completionId, claim]);

  if (loading) return <AuthGateLoading />;
  if (!user) return <AuthScreen />;
  if (accountLoading || !profile || !completionId) return <LoadingAppFrame />;
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

export default function App() {
  return (
    <AccountProvider>
      <Suspense fallback={<AuthGateLoading />}>
        {isAppPath() ? <AppShell /> : <Landing />}
      </Suspense>
    </AccountProvider>
  );
}
