create table if not exists public.user_access (
  user_id uuid primary key references auth.users (id) on delete cascade,
  status text not null default 'none' check (status in ('free', 'trialing', 'active', 'canceled', 'none')),
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.user_access enable row level security;

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
