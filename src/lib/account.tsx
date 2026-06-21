import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import {
  AccountStatus,
  SubscriptionPlan,
  SubscriptionStatus,
  hasSubscriptionAccess,
  openCustomerPortal,
  startCheckout,
} from './billing';

/** A journey member as shown in the UI. completion_id is their progress namespace. */
export interface Member {
  id: string;
  display_name: string;
  completion_id: string;
}

interface Profile {
  id: string;
  display_name: string;
  completion_id: string | null;
}

type LoadGuard = () => boolean;

interface AccountValue {
  loading: boolean;
  accountLoading: boolean;
  billingLoading: boolean;
  user: User | null;
  profile: Profile | null;
  accountStatus: AccountStatus;
  subscription: SubscriptionStatus | null;
  hasBillingAccess: boolean;
  completionId: string | null;
  journeyId: string | null;
  journeyName: string | null;
  inviteCode: string | null;
  role: string | null;
  members: Member[];
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  startSubscription: (plan: SubscriptionPlan) => Promise<{ error?: string }>;
  manageSubscription: () => Promise<{ error?: string }>;
  deactivateAccount: () => Promise<{ error?: string }>;
  claim: (namespace: string) => Promise<void>;
  updateDisplayName: (name: string) => Promise<void>;
  createJourney: (name: string) => Promise<{ error?: string }>;
  joinJourney: (code: string) => Promise<boolean>;
  updateJourneyName: (name: string) => Promise<void>;
  regenerateInviteCode: () => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
}

const AccountContext = createContext<AccountValue>({} as AccountValue);

function randomCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 4; i++)
    s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `CJ365-${s}`;
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [accountLoading, setAccountLoading] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [accountStatus, setAccountStatus] = useState<AccountStatus>('active');
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(
    null
  );
  const [journeyId, setJourneyId] = useState<string | null>(null);
  const [journeyName, setJourneyName] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const loadToken = useRef(0);

  const clearJourney = useCallback(() => {
    setJourneyId(null);
    setJourneyName(null);
    setInviteCode(null);
    setRole(null);
    setMembers([]);
  }, []);

  const loadJourney = useCallback(async (uid: string, shouldApply: LoadGuard = () => true) => {
    const { data: membership } = await supabase
      .from('journey_members')
      .select('journey_id, member_role')
      .eq('user_id', uid)
      .limit(1)
      .maybeSingle();
    if (!shouldApply()) return;

    if (!membership) {
      clearJourney();
      return;
    }

    const jid = membership.journey_id as string;
    setJourneyId(jid);
    setRole(membership.member_role as string);

    const { data: journey } = await supabase
      .from('journeys')
      .select('name, invite_code')
      .eq('id', jid)
      .maybeSingle();
    if (!shouldApply()) return;
    if (journey) {
      setJourneyName(journey.name as string);
      setInviteCode(journey.invite_code as string);
    } else {
      setJourneyName(null);
      setInviteCode(null);
    }

    const { data: mem } = await supabase
      .from('journey_members')
      .select('profiles(id, display_name, completion_id)')
      .eq('journey_id', jid);
    if (!shouldApply()) return;
    const list: Member[] = (mem ?? [])
      .map((r: any) => r.profiles)
      .filter((p: any) => p && p.completion_id)
      .map((p: any) => ({
        id: p.id,
        display_name: p.display_name,
        completion_id: p.completion_id,
      }));
    setMembers(list);
  }, [clearJourney]);

  const loadAll = useCallback(
    async (u: User | null) => {
      const token = loadToken.current + 1;
      loadToken.current = token;
      const shouldApply = () => loadToken.current === token;

      if (!u) {
        setProfile(null);
        setAccountStatus('active');
        setSubscription(null);
        clearJourney();
        setAccountLoading(false);
        setBillingLoading(false);
        return;
      }

      setAccountLoading(true);
      setBillingLoading(true);
      setProfile(null);
      setAccountStatus('active');
      setSubscription(null);
      clearJourney();

      try {
        const { data: prof } = await supabase
          .from('profiles')
          .select('id, display_name, completion_id')
          .eq('id', u.id)
          .maybeSingle();
        if (!shouldApply()) return;

        setProfile((prof as Profile) ?? null);

        const { data: statusRecord } = await supabase
          .from('account_statuses')
          .select('status')
          .eq('user_id', u.id)
          .maybeSingle();
        if (!shouldApply()) return;
        setAccountStatus(
          statusRecord?.status === 'deactivated' ? 'deactivated' : 'active'
        );

        const { data: sub } = await supabase
          .from('billing_subscriptions')
          .select(
            'id, user_id, stripe_customer_id, stripe_subscription_id, status, price_id, current_period_start, current_period_end, cancel_at_period_end, created_at, updated_at'
          )
          .eq('user_id', u.id)
          .maybeSingle();
        if (!shouldApply()) return;
        setSubscription((sub as SubscriptionStatus) ?? null);

        if (prof && (prof as Profile).completion_id) {
          await loadJourney(u.id, shouldApply);
        }
      } finally {
        if (shouldApply()) {
          setAccountLoading(false);
          setBillingLoading(false);
        }
      }
    },
    [clearJourney, loadJourney]
  );

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      if (!active) return;
      setUser(u);
      setLoading(false);
      void loadAll(u);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      setLoading(false);
      void loadAll(u);
    });

    return () => {
      active = false;
      loadToken.current += 1;
      sub.subscription.unsubscribe();
    };
  }, [loadAll]);

  const signUp = async (name: string, email: string, password: string) => {
    const emailRedirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/app/login`
        : undefined;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo },
    });
    if (error) return { error: error.message };
    const uid = data.user?.id;
    if (uid) {
      await supabase
        .from('profiles')
        .upsert({ id: uid, display_name: name.trim() }, { onConflict: 'id' });
      setProfile({ id: uid, display_name: name.trim(), completion_id: null });
    }
    return {};
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: error.message };
    return {};
  };

  // Send a Supabase password-reset email. The link returns the user to the app
  // where Supabase establishes a recovery session.
  const resetPassword = async (email: string) => {
    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/app/reset-password`
        : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
    });
    if (error) return { error: error.message };
    return {};
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setAccountStatus('active');
    setSubscription(null);
    setJourneyId(null);
    setMembers([]);
  };

  const startSubscription = async (plan: SubscriptionPlan) => {
    return startCheckout(plan);
  };

  const manageSubscription = async () => {
    return openCustomerPortal();
  };

  const deactivateAccount = async () => {
    if (!user) return { error: 'Not signed in' };
    const { error } = await supabase.rpc('deactivate_my_account');
    if (error) return { error: error.message };
    setAccountStatus('deactivated');
    await signOut();
    return {};
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { error: error.message };
    return {};
  };

  const claim = async (namespace: string) => {
    if (!user) return;
    await supabase
      .from('profiles')
      .update({ completion_id: namespace })
      .eq('id', user.id);
    setProfile((p) => (p ? { ...p, completion_id: namespace } : p));
    await loadJourney(user.id);
  };

  const updateDisplayName = async (name: string) => {
    if (!user) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    await supabase
      .from('profiles')
      .update({ display_name: trimmed })
      .eq('id', user.id);
    setProfile((p) => (p ? { ...p, display_name: trimmed } : p));
    await loadJourney(user.id);
  };

  const createJourney = async (name: string) => {
    if (!user) return { error: 'Not signed in' };
    let code = randomCode();
    let res = await supabase
      .from('journeys')
      .insert({ name: name.trim(), owner_id: user.id, invite_code: code })
      .select('id, invite_code')
      .single();
    if (res.error) {
      code = randomCode();
      res = await supabase
        .from('journeys')
        .insert({ name: name.trim(), owner_id: user.id, invite_code: code })
        .select('id, invite_code')
        .single();
      if (res.error) return { error: res.error.message };
    }
    const jid = res.data.id as string;
    await supabase
      .from('journey_members')
      .insert({ journey_id: jid, user_id: user.id, member_role: 'owner' });
    await loadJourney(user.id);
    return {};
  };

  const joinJourney = async (code: string) => {
    if (!user) return false;
    const c = code.trim().toUpperCase();
    const { data } = await supabase
      .from('journeys')
      .select('id')
      .eq('invite_code', c)
      .maybeSingle();
    if (!data) return false;
    await supabase
      .from('journey_members')
      .upsert(
        { journey_id: data.id, user_id: user.id, member_role: 'member' },
        { onConflict: 'journey_id,user_id' }
      );
    await loadJourney(user.id);
    return true;
  };

  // Rename the current journey (owner only). Uses the existing `name` column.
  const updateJourneyName = async (name: string) => {
    if (!user || !journeyId) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    await supabase
      .from('journeys')
      .update({ name: trimmed })
      .eq('id', journeyId);
    setJourneyName(trimmed);
  };

  // Generate a new unique invite code for the current journey (owner only).
  // Updates the existing `invite_code` column; the old code stops working.
  const regenerateInviteCode = async () => {
    if (!user || !journeyId) return;
    let code = randomCode();
    let res = await supabase
      .from('journeys')
      .update({ invite_code: code })
      .eq('id', journeyId)
      .select('invite_code')
      .single();
    if (res.error) {
      code = randomCode();
      res = await supabase
        .from('journeys')
        .update({ invite_code: code })
        .eq('id', journeyId)
        .select('invite_code')
        .single();
      if (res.error) return;
    }
    setInviteCode(res.data.invite_code as string);
  };

  // Remove a member from the current journey (owner only). Deletes their
  // journey_members row; cannot remove yourself. Their progress is untouched.
  const removeMember = async (memberId: string) => {
    if (!user || !journeyId || memberId === user.id) return;
    await supabase
      .from('journey_members')
      .delete()
      .eq('journey_id', journeyId)
      .eq('user_id', memberId);
    await loadJourney(user.id);
  };

  const hasBillingAccess = hasSubscriptionAccess(subscription, user?.id);

  return (
    <AccountContext.Provider
      value={{
        loading,
        accountLoading,
        billingLoading,
        user,
        profile,
        accountStatus,
        subscription,
        hasBillingAccess,
        completionId: profile?.completion_id ?? null,
        journeyId,
        journeyName,
        inviteCode,
        role,
        members,
        signUp,
        signIn,
        resetPassword,
        updatePassword,
        signOut,
        startSubscription,
        manageSubscription,
        deactivateAccount,
        claim,
        updateDisplayName,
        createJourney,
        joinJourney,
        updateJourneyName,
        regenerateInviteCode,
        removeMember,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}
