import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import AuthScreen from './components/AuthScreen';
import ClaimScreen from './components/ClaimScreen';
import JourneySetup from './components/JourneySetup';
import { AccountProvider, useAccount } from './lib/account';
import Home from './pages/Home';
import Journey from './pages/Journey';
import DayDetail from './pages/DayDetail';
import DiveDeeper from './pages/DiveDeeper';
import SaintOfDay from './pages/SaintOfDay';
import Profile from './pages/Profile';
import Prayer from './pages/Prayer';
import PrayerDetail from './pages/PrayerDetail';
import Rosary from './pages/Rosary';
import Bible from './pages/Bible';

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
  const { loading, user, profile, completionId, journeyId } = useAccount();

  if (loading) return <Splash />;
  if (!user) return <AuthScreen />;
  if (!profile) return <Splash />;
  if (!completionId) return <ClaimScreen />;
  if (!journeyId) return <JourneySetup />;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-parchment-100" style={{ paddingBottom: 80 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/day/:dayNumber" element={<DayDetail />} />
          <Route path="/day/:dayNumber/deeper" element={<DiveDeeper />} />
          <Route path="/saint" element={<SaintOfDay />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/prayer/:categoryId/:prayerId" element={<PrayerDetail />} />
          <Route path="/rosary" element={<Rosary />} />
          <Route path="/rosary/:mystery" element={<Rosary />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AccountProvider>
      <AppShell />
    </AccountProvider>
  );
}
