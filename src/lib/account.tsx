import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

/** A journey member as shown in the UI. completion_id is their progress namespace. */
export interface Member {
  display_name: string;
  completion_id: string;
}

interface Profile {
  id: string;
  display_name: string;
  completion_id: string | null;
}

interface AccountValue {
  loading: boolean;
  user: User | null;
  profile: Profile | null;
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
  signOut: () => Promise<void>;
  claim: (namespace: string) => Promise<void>;
  updateDisplayName: (name: string) => Promise<void>;
  createJourney: (name: string) => Promise<{ error?: string }>;
  joinJourney: (code: string) => Promise<boolean>;
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
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [journeyId, setJourneyId] = useState<string | null>(null);
  const [journeyName, setJourneyName] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const loadJourney = useCallback(async (uid: string) => {
    const { data: membership } = await supabase
      .from('journey_members')
      .select('journey_id, member_role')
      .eq('user_id', uid)
      .limit(1)
      .maybeSingle();

    if (!membership) {
      setJourneyId(null);
      setJourneyName(null);
      setInviteCode(null);
      setRole(null);
      setMembers([]);
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
    if (journey) {
      setJourneyName(journey.name as string);
      setInviteCode(journey.invite_code as string);
    }

    const { data: mem } = await supabase
      .from('journey_members')
      .select('profiles(display_name, completion_id)')
      .eq('journey_id', jid);
    const list: Member[] = (mem ?? [])
      .map((r: any) => r.profiles)
      .filter((p: any) => p && p.completion_id)
      .map((p: any) => ({
        display_name: p.display_name,
        completion_id: p.completion_id,
      }));
    setMembers(list);
  }, []);

  const loadAll = useCallback(
    async (u: User | null) => {
      if (!u) {
        setProfile(null);
        setJourneyId(null);
        setMembers([]);
        return;
      }
      const { data: prof } = await supabase
        .from('profiles')
        .select('id, display_name, completion_id')
        .eq('id', u.id)
        .maybeSingle();
      setProfile((prof as Profile) ?? null);
      if (prof && (prof as Profile).completion_id) {
        await loadJourney(u.id);
      }
    },
    [loadJourney]
  );

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      if (!active) return;
      setUser(u);
      await loadAll(u);
      if (active) setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      await loadAll(u);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [loadAll]);

  const signUp = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
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

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setJourneyId(null);
    setMembers([]);
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

  return (
    <AccountContext.Provider
      value={{
        loading,
        user,
        profile,
        completionId: profile?.completion_id ?? null,
        journeyId,
        journeyName,
        inviteCode,
        role,
        members,
        signUp,
        signIn,
        signOut,
        claim,
        updateDisplayName,
        createJourney,
        joinJourney,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}
