import { useEffect, lazy, Suspense } from 'react';
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
    <div className="min-h-screen bg-parchment-100 flex items-center justify-center">
      <p className="font-display text-2xl text-leather-600">
        Catholic Journey 365
      </p>
    </div>
  );
}

function AppShell() {
  const { loading, user, profile, completionId, journeyId, claim } =
    useAccount();

  // A first-time user starts fresh on their own progress namespace, then
  // chooses or joins a journey. No legacy import step is shown publicly.
  useEffect(() => {
    if (user && profile && !completionId) {
      claim(user.id);
    }
  }, [user, profile, completionId, claim]);

  if (loading) return <Splash />;
  if (!user) return <AuthScreen />;
  if (!profile) return <Splash />;
  if (!completionId) return <Splash />;
  if (!journeyId) return <JourneySetup />;

  return (
    <BrowserRouter basename="/app">
      <div className="min-h-screen bg-parchment-100" style={{ paddingBottom: 80 }}>
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
        <BottomNav />
      </div>
    </BrowserRouter>
  );
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
      <Suspense fallback={<Splash />}>
        {isAppPath() ? <AppShell /> : <Landing />}
      </Suspense>
    </AccountProvider>
  );
}
