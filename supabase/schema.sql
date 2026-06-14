-- Bible in a Year Journey — Supabase schema
-- Paste into the Supabase SQL editor and run.

-- ---------------------------------------------------------------------------
-- reading_days: optional mirror of the 365-day plan (the app ships it in code).
-- ---------------------------------------------------------------------------
create table if not exists public.reading_days (
  id                   uuid primary key default gen_random_uuid(),
  day_number           integer unique not null,
  period               text not null,
  reading_one          text not null,
  reading_two          text,
  psalm_proverb        text,
  summary              text,
  think_about_question text,
  daily_prayer         text,
  quote                text,
  episode_link         text
);

-- ---------------------------------------------------------------------------
-- users: the two readers.
-- ---------------------------------------------------------------------------
create table if not exists public.users (
  id   uuid primary key default gen_random_uuid(),
  name text not null
);

-- ---------------------------------------------------------------------------
-- completions: one row per (reader, day).
-- ---------------------------------------------------------------------------
create table if not exists public.completions (
  id           uuid primary key default gen_random_uuid(),
  user_id      text not null,
  day_number   integer not null,
  completed    boolean default true,
  completed_at timestamptz,
  unique (user_id, day_number)
);

-- ---------------------------------------------------------------------------
-- Row Level Security: private two-person app using the anon key.
-- ---------------------------------------------------------------------------
alter table public.completions enable row level security;

create policy "allow read completions"
  on public.completions for select using (true);

create policy "allow upsert completions insert"
  on public.completions for insert with check (true);

create policy "allow upsert completions update"
  on public.completions for update using (true) with check (true);
