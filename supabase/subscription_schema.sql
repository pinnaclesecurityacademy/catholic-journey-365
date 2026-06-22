-- Catholic Journey 365 subscription and account status schema
-- Run in the Supabase SQL editor before enabling the paywall in production.
-- Subscription rows must be written by trusted server code, usually the Stripe
-- webhook function using the Supabase service role key.

create table if not exists public.billing_subscriptions (
  user_id                  uuid primary key references auth.users (id) on delete cascade,
  status                   text not null default 'incomplete',
  plan                     text check (plan in ('monthly', 'yearly')),
  trial_ends_at            timestamptz,
  current_period_end       timestamptz,
  stripe_customer_id       text unique,
  stripe_subscription_id   text unique,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create table if not exists public.account_statuses (
  user_id        uuid primary key references auth.users (id) on delete cascade,
  status         text not null default 'active' check (status in ('active', 'deactivated')),
  deactivated_at timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table if not exists public.user_access (
  user_id                  uuid primary key references auth.users (id) on delete cascade,
  status                   text not null default 'none' check (status in ('free', 'trialing', 'active', 'canceled', 'none')),
  stripe_customer_id       text,
  stripe_subscription_id   text,
  current_period_end       timestamptz,
  updated_at               timestamptz not null default now()
);

alter table public.billing_subscriptions enable row level security;
alter table public.account_statuses enable row level security;
alter table public.user_access enable row level security;

drop policy if exists "subscriptions read own" on public.billing_subscriptions;
create policy "subscriptions read own"
  on public.billing_subscriptions for select
  using (auth.uid() = user_id);

drop policy if exists "account status read own" on public.account_statuses;
create policy "account status read own"
  on public.account_statuses for select
  using (auth.uid() = user_id);

drop policy if exists "user access read own" on public.user_access;
create policy "user access read own"
  on public.user_access for select
  using (auth.uid() = user_id);

insert into public.user_access (user_id, status, updated_at)
select user_id, 'free', now()
from public.account_statuses
where status = 'free'
on conflict (user_id)
do update set
  status = 'free',
  updated_at = now()
where public.user_access.status is null
   or public.user_access.status in ('none', 'canceled');

insert into public.user_access (
  user_id,
  status,
  stripe_customer_id,
  stripe_subscription_id,
  current_period_end,
  updated_at
)
select
  user_id,
  case when status = 'active' then 'free' else status end,
  stripe_customer_id,
  stripe_subscription_id,
  current_period_end,
  now()
from public.billing_subscriptions
where status in ('active', 'trialing')
on conflict (user_id)
do update set
  status = excluded.status,
  stripe_customer_id = excluded.stripe_customer_id,
  stripe_subscription_id = excluded.stripe_subscription_id,
  current_period_end = excluded.current_period_end,
  updated_at = now()
where public.user_access.status is null
   or public.user_access.status in ('none', 'canceled');

-- The browser may create an active account status row for itself, but it may
-- not update status directly. Deactivation is handled through the RPC below.
drop policy if exists "account status insert own active" on public.account_statuses;
create policy "account status insert own active"
  on public.account_statuses for insert
  with check (auth.uid() = user_id and status = 'active');

create or replace function public.deactivate_my_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.account_statuses (user_id, status, deactivated_at, updated_at)
  values (auth.uid(), 'deactivated', now(), now())
  on conflict (user_id)
  do update set
    status = 'deactivated',
    deactivated_at = now(),
    updated_at = now();
end;
$$;

grant execute on function public.deactivate_my_account() to authenticated;

-- Recommended webhook upsert shape for trusted server code:
--
-- insert into public.billing_subscriptions (
--   user_id,
--   status,
--   plan,
--   trial_ends_at,
--   current_period_end,
--   stripe_customer_id,
--   stripe_subscription_id,
--   updated_at
-- ) values (...)
-- on conflict (user_id)
-- do update set
--   status = excluded.status,
--   plan = excluded.plan,
--   trial_ends_at = excluded.trial_ends_at,
--   current_period_end = excluded.current_period_end,
--   stripe_customer_id = excluded.stripe_customer_id,
--   stripe_subscription_id = excluded.stripe_subscription_id,
--   updated_at = now();
