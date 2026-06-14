-- Catholic Journey 365 — Auth + Shared Journeys schema
-- Run in the Supabase SQL editor. NON-DESTRUCTIVE: it does not touch the
-- existing `completions` table or its rows.
--
-- PREREQUISITE (Dashboard): Authentication → Providers → enable "Email".
-- For a smooth first-launch flow, turn OFF "Confirm email" so sign-up returns
-- a session immediately (Authentication → Providers → Email → Confirm email).

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user. completion_id is the progress NAMESPACE
-- this account reads/writes in `completions` ('chris' / 'saua' for claimed
-- legacy progress, or the auth UUID for fresh accounts).
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  display_name  text not null,
  completion_id text,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- journeys: a shared journey walked together.
-- ---------------------------------------------------------------------------
create table if not exists public.journeys (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  owner_id    uuid not null references auth.users (id) on delete cascade,
  invite_code text unique not null,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- journey_members: membership (keyed by auth user id).
-- ---------------------------------------------------------------------------
create table if not exists public.journey_members (
  id         uuid primary key default gen_random_uuid(),
  journey_id  uuid not null references public.journeys (id) on delete cascade,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  member_role text not null default 'member',
  joined_at   timestamptz not null default now(),
  unique (journey_id, user_id)
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
create policy "profiles read"       on public.profiles for select using (true);
create policy "profiles insert own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles update own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

alter table public.journeys enable row level security;
create policy "journeys read"       on public.journeys for select using (true);
create policy "journeys insert own" on public.journeys for insert with check (auth.uid() = owner_id);

alter table public.journey_members enable row level security;
create policy "members read"        on public.journey_members for select using (true);
create policy "members insert self" on public.journey_members for insert with check (auth.uid() = user_id);

-- NOTE: completions is intentionally NOT modified. Its existing read/insert/
-- update policies remain in place and continue to serve the 'chris' / 'saua'
-- namespaces unchanged.
