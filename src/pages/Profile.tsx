import { useState } from 'react';
import { useAccount } from '../lib/account';

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
    regenerateInviteCode,
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
  const [regenerating, setRegenerating] = useState(false);

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

  const regenerate = async () => {
    if (regenerating) return;
    const ok = window.confirm(
      'Generate a new invite code? The current code will stop working.'
    );
    if (!ok) return;
    setRegenerating(true);
    try {
      await regenerateInviteCode();
    } finally {
      setRegenerating(false);
    }
  };

  const handleRemove = async (memberId: string, displayName: string) => {
    const ok = window.confirm(`Remove ${displayName} from this journey?`);
    if (!ok) return;
    await removeMember(memberId);
  };

  const copyCode = async () => {
    if (!inviteCode) return;
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const shareCode = async () => {
    if (!inviteCode) return;
    const text = `Join our Catholic Journey 365, use invite code ${inviteCode}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Catholic Journey 365', text });
      } catch {
        /* user cancelled */
      }
    } else {
      copyCode();
    }
  };

  const canShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

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
          <p className="text-sm text-stone-500 mb-2">
            Share this code so family can join your journey.
          </p>
          <div className="rounded-xl bg-parchment-100 px-4 py-3 text-center font-display text-2xl font-bold tracking-wider text-leather-600">
            {inviteCode}
          </div>
          <div className="mt-3 flex gap-3">
            <button
              onClick={copyCode}
              className="flex-1 rounded-xl border border-leather-600 py-2.5 font-semibold text-leather-600 active:scale-[0.99] transition"
            >
              {copied ? 'Copied ✓' : 'Copy code'}
            </button>
            {canShare && (
              <button
                onClick={shareCode}
                className="flex-1 rounded-xl bg-leather-600 py-2.5 font-semibold text-white active:scale-[0.99] transition"
              >
                Share
              </button>
            )}
          </div>
          {isOwner && (
            <button
              onClick={regenerate}
              disabled={regenerating}
              className="mt-3 w-full rounded-xl border border-parchment-200 py-2.5 text-sm font-semibold text-stone-500 disabled:opacity-50 active:scale-[0.99] transition"
            >
              {regenerating ? 'Generating…' : 'Regenerate code'}
            </button>
          )}
        </section>
      )}

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
