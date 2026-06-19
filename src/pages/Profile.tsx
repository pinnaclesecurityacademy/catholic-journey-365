import { useState } from 'react';
import { useAccount } from '../lib/account';
import { usePWAUpdate } from '../lib/pwaUpdates';

export default function Profile() {
  const {
    user,
    profile,
    role,
    journeyName,
    inviteCode,
    members,
    updateDisplayName,
    updateJourneyName,
    joinJourney,
    removeMember,
    signOut,
  } = useAccount();
  const { status, updateReady, checkForUpdates, updateNow } = usePWAUpdate();

  const isOwner = role === 'owner';

  const [name, setName] = useState(profile?.display_name ?? '');
  const [savingName, setSavingName] = useState(false);
  const [savedName, setSavedName] = useState(false);
  const [copied, setCopied] = useState(false);

  const [jName, setJName] = useState(journeyName ?? '');
  const [savingJourney, setSavingJourney] = useState(false);
  const [savedJourney, setSavedJourney] = useState(false);

  const [joinCode, setJoinCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const [aboutOpen, setAboutOpen] = useState(false);

  const sectionTitle =
    'mb-3 px-1 text-xs font-semibold uppercase tracking-[0.24em] text-gold';
  const cardClass =
    'rounded-2xl bg-white/90 border border-parchment-200 p-5 shadow-[0_12px_32px_rgba(74,55,40,0.08)]';
  const inputClass =
    'w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400';
  const primaryButtonClass =
    'w-full rounded-xl bg-leather-600 py-2.5 font-semibold text-white disabled:opacity-50 active:scale-[0.99] transition';
  const subtleButtonClass =
    'w-full rounded-xl border border-parchment-200 bg-white py-2.5 font-semibold text-stone-500 active:scale-[0.99] transition';

  const saveName = async () => {
    if (!name.trim() || name.trim() === profile?.display_name) return;
    setSavingName(true);
    setSavedName(false);
    try {
      await updateDisplayName(name);
      setSavedName(true);
    } finally {
      setSavingName(false);
    }
  };

  const saveJourneyName = async () => {
    if (!jName.trim() || jName.trim() === journeyName) return;
    setSavingJourney(true);
    setSavedJourney(false);
    try {
      await updateJourneyName(jName);
      setSavedJourney(true);
    } finally {
      setSavingJourney(false);
    }
  };

  const doJoin = async () => {
    if (!joinCode.trim()) return;
    setJoinError(null);
    setJoining(true);
    try {
      const ok = await joinJourney(joinCode);
      if (!ok) {
        setJoinError('No journey found with that code.');
      } else {
        setJoinCode('');
      }
    } finally {
      setJoining(false);
    }
  };

  const handleRemove = async (memberId: string, displayName: string) => {
    const ok = window.confirm(`Remove ${displayName} from this journey?`);
    if (!ok) return;
    await removeMember(memberId);
  };

  const shareInvite = async () => {
    if (!inviteCode) return;
    const text = `Join our Catholic Journey 365! Use invite code ${inviteCode} at https://www.catholicjourney365.com`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Catholic Journey 365', text });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        /* clipboard unavailable */
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 pt-8 pb-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Profile
        </h1>
      </header>

      <p className={sectionTitle}>My Profile</p>
      <section className={`${cardClass} mb-6`}>
        <div className="mb-4">
          <h2 className="font-display text-xl font-semibold text-leather-900">
            Account
          </h2>
          {user?.email && (
            <p className="mt-1 text-sm text-stone-500">{user.email}</p>
          )}
        </div>

        <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">
          Display Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSavedName(false);
          }}
          className={`${inputClass} mt-2`}
        />
        <button
          onClick={saveName}
          disabled={
            savingName ||
            !name.trim() ||
            name.trim() === profile?.display_name
          }
          className={`${primaryButtonClass} mt-3`}
        >
          {savingName ? 'Saving...' : savedName ? 'Saved' : 'Save name'}
        </button>

        <div className="mt-5 border-t border-parchment-200 pt-4">
          <button onClick={signOut} className={subtleButtonClass}>
            Sign out
          </button>
        </div>
      </section>

      <p className={sectionTitle}>Shared Journey</p>
      <p className="mb-3 px-1 text-sm leading-relaxed text-stone-500">
        Walk the journey with your spouse, family, friends, or small group.
      </p>
      <section className={`${cardClass} mb-6`}>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            Journey Name
          </h2>

          {isOwner ? (
            <>
              <input
                type="text"
                value={jName}
                onChange={(e) => {
                  setJName(e.target.value);
                  setSavedJourney(false);
                }}
                placeholder="Name your journey"
                className={inputClass}
              />
              <button
                onClick={saveJourneyName}
                disabled={
                  savingJourney || !jName.trim() || jName.trim() === journeyName
                }
                className={`${primaryButtonClass} mt-3`}
              >
                {savingJourney
                  ? 'Saving...'
                  : savedJourney
                  ? 'Saved'
                  : 'Save journey name'}
              </button>
            </>
          ) : (
            <p className="font-display text-xl font-semibold text-leather-900">
              {journeyName ?? 'My Journey'}
            </p>
          )}
        </div>

        {members.length > 0 && (
          <div className="mt-4 border-t border-parchment-200 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
              Members
            </h3>
            <div className="space-y-2">
              {members.map((m) => (
                <div
                  key={m.completion_id}
                  className="flex items-center justify-between rounded-xl bg-parchment-50 px-3 py-2"
                >
                  <span className="text-sm text-leather-900">
                    {m.display_name}
                  </span>
                  {isOwner && m.id !== user?.id && (
                    <button
                      onClick={() => handleRemove(m.id, m.display_name)}
                      className="text-xs font-semibold text-stone-400 active:scale-[0.99] transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {inviteCode && (
          <div className="mt-4 border-t border-parchment-200 pt-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
              Invite
            </h2>
            <p className="text-sm text-stone-500 mb-3">
              Invite family to walk this journey with you.
            </p>
            <button
              onClick={shareInvite}
              className="w-full rounded-xl bg-leather-600 py-3 font-semibold text-white active:scale-[0.99] transition"
            >
              {copied ? 'Invite copied' : 'Share Journey Invite'}
            </button>
          </div>
        )}

        <div className="mt-4 border-t border-parchment-200 pt-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            Join a Journey
          </h2>
          <p className="text-sm text-stone-500 mb-3">
            Have an invite code? Join a family member's journey.
          </p>
          <input
            type="text"
            value={joinCode}
            onChange={(e) => {
              setJoinCode(e.target.value);
              setJoinError(null);
            }}
            placeholder="CJ365-ABCD"
            className={inputClass}
          />
          {joinError && <p className="mt-3 text-sm text-red-600">{joinError}</p>}
          <button
            onClick={doJoin}
            disabled={joining || !joinCode.trim()}
            className={`${primaryButtonClass} mt-3`}
          >
            {joining ? 'Joining...' : 'Join Journey'}
          </button>
        </div>
      </section>

      <p className={sectionTitle}>About Catholic Journey 365</p>
      <section className="rounded-2xl bg-gradient-to-br from-white to-parchment-50 border border-parchment-200 p-5 mb-6 shadow-[0_12px_32px_rgba(74,55,40,0.08)]">
        <button
          type="button"
          onClick={() => setAboutOpen((open) => !open)}
          aria-expanded={aboutOpen}
          className="flex w-full items-center justify-between gap-3 text-left active:scale-[0.99] transition"
        >
          <span>
            <span className="block font-display text-lg font-bold text-leather-900">
              About Catholic Journey 365
            </span>
            <span className="mt-0.5 block text-sm text-stone-500">
              Why this app was created.
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-leather-600">
            {aboutOpen ? 'Close' : 'Read more'}
            <span
              aria-hidden="true"
              className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`}
            >
              v
            </span>
          </span>
        </button>

        {aboutOpen && (
          <p className="mt-4 whitespace-pre-line border-t border-parchment-200 pt-4 text-sm leading-relaxed text-stone-600">
            {`Catholic Journey 365 was built by a Catholic trying to return more deeply to the faith, not by someone pretending to have every answer.

I was baptised Catholic, but like many people, I reached adulthood still needing to understand what the Church teaches, how to pray, how to follow the Mass, and how to build a real relationship with Jesus Christ.

This app was created for people like me: Catholics returning, people who feel unsure at Mass, spouses and family members trying to understand Catholic belief, and anyone who wants to begin again.

Catholic Journey 365 is here to help you pray, read Scripture, learn the faith, and take the next step. It does not replace the Church. The journey continues in your parish, with the Sacraments, your priest, and the life of the Church.`}
          </p>
        )}
      </section>

      <p className={sectionTitle}>App Updates</p>
      <section className={`${cardClass} mb-5`}>
        <div className="mb-4">
          <h2 className="font-display text-lg font-semibold text-leather-900">
            Version
          </h2>
          {updateReady ? (
            <p className="mt-1 text-sm font-semibold text-leather-700">
              A new version is ready.
            </p>
          ) : status === 'checking' ? (
            <p className="mt-1 text-sm text-stone-500">Checking for updates.</p>
          ) : status === 'unsupported' ? (
            <p className="mt-1 text-sm text-stone-500">
              App updates are checked after installation.
            </p>
          ) : (
            <p className="mt-1 text-sm text-stone-500">
              You're using the latest version.
            </p>
          )}
        </div>

        {updateReady ? (
          <button onClick={updateNow} className={primaryButtonClass}>
            Update now
          </button>
        ) : (
          <button
            onClick={checkForUpdates}
            disabled={status === 'checking' || status === 'unsupported'}
            className={primaryButtonClass}
          >
            {status === 'checking' ? 'Checking...' : 'Check for updates'}
          </button>
        )}
      </section>
    </div>
  );
}
