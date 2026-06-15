import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../lib/account';

export default function Profile() {
  const navigate = useNavigate();
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
    <div className="max-w-md mx-auto px-5 pt-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Profile
        </h1>
      </header>

      {/* Display name */}
      <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
          Display Name
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSavedName(false);
          }}
          className="w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400"
        />
        <button
          onClick={saveName}
          disabled={
            savingName ||
            !name.trim() ||
            name.trim() === profile?.display_name
          }
          className="mt-3 w-full rounded-xl bg-leather-600 py-2.5 font-semibold text-white disabled:opacity-50 active:scale-[0.99] transition"
        >
          {savingName ? 'Saving…' : savedName ? 'Saved ✓' : 'Save name'}
        </button>
        {user?.email && (
          <p className="mt-3 text-sm text-stone-500">{user.email}</p>
        )}
      </section>

      {/* Journey */}
      <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
          Journey
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
              className="w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400"
            />
            <button
              onClick={saveJourneyName}
              disabled={
                savingJourney || !jName.trim() || jName.trim() === journeyName
              }
              className="mt-3 w-full rounded-xl bg-leather-600 py-2.5 font-semibold text-white disabled:opacity-50 active:scale-[0.99] transition"
            >
              {savingJourney
                ? 'Saving…'
                : savedJourney
                ? 'Saved ✓'
                : 'Save journey name'}
            </button>
          </>
        ) : (
          <p className="font-display text-xl font-semibold text-leather-900">
            {journeyName ?? 'My Journey'}
          </p>
        )}

        {members.length > 0 && (
          <div className="mt-4 border-t border-parchment-200 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
              Members
            </h3>
            <div className="space-y-2">
              {members.map((m) => (
                <div
                  key={m.completion_id}
                  className="flex items-center justify-between"
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
      </section>

      {/* Invite */}
      {inviteCode && (
        <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
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
            {copied ? 'Invite copied ✓' : 'Share Journey Invite'}
          </button>
        </section>
      )}

      {/* Join a shared journey */}
      <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
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
          className="w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400"
        />
        {joinError && <p className="mt-3 text-sm text-red-600">{joinError}</p>}
        <button
          onClick={doJoin}
          disabled={joining || !joinCode.trim()}
          className="mt-3 w-full rounded-xl bg-leather-600 py-2.5 font-semibold text-white disabled:opacity-50 active:scale-[0.99] transition"
        >
          {joining ? 'Joining…' : 'Join Journey'}
        </button>
      </section>

      {/* Saints Library */}
      <section className="rounded-2xl bg-white border border-parchment-200 p-5 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
          Saints Library
        </h2>
        <p className="text-sm text-stone-500 mb-3">
          Browse the saints and feasts who help us follow Christ.
        </p>
        <button
          onClick={() => navigate('/saints')}
          className="w-full rounded-xl bg-leather-600 py-2.5 font-semibold text-white active:scale-[0.99] transition"
        >
          Open Saints Library
        </button>
      </section>

      {/* Sign out */}
      <button
        onClick={signOut}
        className="mb-4 w-full rounded-xl border border-parchment-200 bg-white py-3 font-semibold text-stone-500 active:scale-[0.99] transition"
      >
        Sign out
      </button>
    </div>
  );
}
