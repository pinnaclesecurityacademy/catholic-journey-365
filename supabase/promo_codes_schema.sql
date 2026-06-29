-- Catholic Journey 365 promotional access code schema
-- Run this in the Supabase SQL editor before releasing promo-code UI.

create extension if not exists pgcrypto;

create table if not exists public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (
    code = upper(code)
    and code ~ '^[A-Z0-9][A-Z0-9-]{2,63}$'
  ),
  benefit_type text not null default 'access' check (
    benefit_type in ('access', 'discount')
  ),
  access_type text check (
    access_type is null
    or access_type in ('founder', 'clergy', 'review', 'premium')
  ),
  duration_days integer check (duration_days is null or duration_days > 0),
  lifetime_access boolean not null default false,
  expires_at timestamptz,
  discount_percent numeric(5, 2) check (
    discount_percent is null or discount_percent > 0
  ),
  discount_plan text check (
    discount_plan is null or discount_plan in ('monthly', 'yearly')
  ),
  max_redemptions integer check (
    max_redemptions is null or max_redemptions > 0
  ),
  times_redeemed integer not null default 0 check (times_redeemed >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint promo_codes_benefit_configuration_check check (
    (
      benefit_type = 'access'
      and access_type is not null
      and (lifetime_access = true or duration_days is not null)
      and discount_percent is null
      and discount_plan is null
    )
    or
    (
      benefit_type = 'discount'
      and access_type is null
      and lifetime_access = false
      and duration_days is null
      and discount_percent is not null
    )
  )
);

create table if not exists public.promo_redemptions (
  id uuid primary key default gen_random_uuid(),
  promo_code_id uuid not null references public.promo_codes (id) on delete restrict,
  user_id uuid not null references auth.users (id) on delete cascade,
  redeemed_code text not null,
  access_type text not null check (
    access_type in ('founder', 'clergy', 'review', 'premium')
  ),
  lifetime_access boolean not null default false,
  access_starts_at timestamptz not null default now(),
  access_expires_at timestamptz,
  redeemed_at timestamptz not null default now(),
  unique (promo_code_id, user_id)
);

alter table public.promo_codes
  add column if not exists benefit_type text not null default 'access';

alter table public.promo_codes
  add column if not exists discount_percent numeric(5, 2);

alter table public.promo_codes
  add column if not exists discount_plan text;

alter table public.promo_codes
  alter column access_type drop not null;

alter table public.promo_codes
  drop constraint if exists promo_codes_access_type_check;

alter table public.promo_codes
  drop constraint if exists promo_codes_benefit_type_check;

alter table public.promo_codes
  drop constraint if exists promo_codes_discount_percent_check;

alter table public.promo_codes
  drop constraint if exists promo_codes_discount_plan_check;

alter table public.promo_codes
  drop constraint if exists promo_codes_benefit_configuration_check;

alter table public.promo_codes
  drop constraint if exists promo_codes_check;

alter table public.promo_codes
  add constraint promo_codes_access_type_check check (
    access_type is null
    or access_type in ('founder', 'clergy', 'review', 'premium')
  );

alter table public.promo_codes
  add constraint promo_codes_benefit_type_check check (
    benefit_type in ('access', 'discount')
  );

alter table public.promo_codes
  add constraint promo_codes_discount_percent_check check (
    discount_percent is null or discount_percent > 0
  );

alter table public.promo_codes
  add constraint promo_codes_discount_plan_check check (
    discount_plan is null or discount_plan in ('monthly', 'yearly')
  );

alter table public.promo_codes
  add constraint promo_codes_benefit_configuration_check check (
    (
      benefit_type = 'access'
      and access_type is not null
      and (lifetime_access = true or duration_days is not null)
      and discount_percent is null
      and discount_plan is null
    )
    or
    (
      benefit_type = 'discount'
      and access_type is null
      and lifetime_access = false
      and duration_days is null
      and discount_percent is not null
    )
  );

create index if not exists promo_redemptions_user_id_idx
  on public.promo_redemptions (user_id);

create index if not exists promo_redemptions_active_access_idx
  on public.promo_redemptions (user_id, access_expires_at);

alter table public.promo_codes enable row level security;
alter table public.promo_redemptions enable row level security;

drop policy if exists "promo redemptions read own" on public.promo_redemptions;
create policy "promo redemptions read own"
  on public.promo_redemptions for select
  using (auth.uid() = user_id);

create or replace function public.normalize_promo_code(p_code text)
returns text
language sql
immutable
as $$
  select upper(regexp_replace(trim(coalesce(p_code, '')), '\s+', '', 'g'));
$$;

create or replace function public.validate_promo_code(p_code text)
returns table (
  valid boolean,
  message text,
  access_type text,
  duration_days integer,
  lifetime_access boolean,
  expires_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text;
  v_promo public.promo_codes%rowtype;
begin
  v_code := public.normalize_promo_code(p_code);

  if length(v_code) < 3 then
    return query select
      false,
      'Enter a valid promo code.',
      null::text,
      null::integer,
      false,
      null::timestamptz;
    return;
  end if;

  select *
    into v_promo
    from public.promo_codes
   where code = v_code;

  if not found then
    return query select
      false,
      'That promo code was not found.',
      null::text,
      null::integer,
      false,
      null::timestamptz;
    return;
  end if;

  if not v_promo.active then
    return query select
      false,
      'That promo code is no longer active.',
      null::text,
      null::integer,
      false,
      null::timestamptz;
    return;
  end if;

  if v_promo.benefit_type = 'discount' then
    return query select
      false,
      'That promo code is for a future billing discount and is not available yet.',
      null::text,
      null::integer,
      false,
      null::timestamptz;
    return;
  end if;

  if v_promo.expires_at is not null and v_promo.expires_at <= now() then
    return query select
      false,
      'That promo code has expired.',
      null::text,
      null::integer,
      false,
      null::timestamptz;
    return;
  end if;

  if v_promo.max_redemptions is not null
     and v_promo.times_redeemed >= v_promo.max_redemptions then
    return query select
      false,
      'That promo code has reached its redemption limit.',
      null::text,
      null::integer,
      false,
      null::timestamptz;
    return;
  end if;

  return query select
    true,
    'Promo code is valid.',
    v_promo.access_type,
    v_promo.duration_days,
    v_promo.lifetime_access,
    v_promo.expires_at;
end;
$$;

create or replace function public.grant_promo_code_to_user(
  p_user_id uuid,
  p_code text
)
returns table (
  success boolean,
  message text,
  access_type text,
  access_expires_at timestamptz,
  lifetime_access boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text;
  v_promo public.promo_codes%rowtype;
  v_access_expires_at timestamptz;
begin
  v_code := public.normalize_promo_code(p_code);

  if p_user_id is null then
    return query select
      false,
      'Please sign in to redeem a promo code.',
      null::text,
      null::timestamptz,
      false;
    return;
  end if;

  if length(v_code) < 3 then
    return query select
      false,
      'Enter a valid promo code.',
      null::text,
      null::timestamptz,
      false;
    return;
  end if;

  select *
    into v_promo
    from public.promo_codes
   where code = v_code
   for update;

  if not found then
    return query select
      false,
      'That promo code was not found.',
      null::text,
      null::timestamptz,
      false;
    return;
  end if;

  if exists (
    select 1
      from public.promo_redemptions
     where promo_code_id = v_promo.id
       and user_id = p_user_id
  ) then
    return query select
      false,
      'That promo code has already been redeemed for this account.',
      null::text,
      null::timestamptz,
      false;
    return;
  end if;

  if not v_promo.active then
    return query select
      false,
      'That promo code is no longer active.',
      null::text,
      null::timestamptz,
      false;
    return;
  end if;

  if v_promo.benefit_type = 'discount' then
    return query select
      false,
      'That promo code is for a future billing discount and is not available yet.',
      null::text,
      null::timestamptz,
      false;
    return;
  end if;

  if v_promo.expires_at is not null and v_promo.expires_at <= now() then
    return query select
      false,
      'That promo code has expired.',
      null::text,
      null::timestamptz,
      false;
    return;
  end if;

  if v_promo.max_redemptions is not null
     and v_promo.times_redeemed >= v_promo.max_redemptions then
    return query select
      false,
      'That promo code has reached its redemption limit.',
      null::text,
      null::timestamptz,
      false;
    return;
  end if;

  v_access_expires_at := case
    when v_promo.lifetime_access then null
    else now() + make_interval(days => v_promo.duration_days)
  end;

  insert into public.promo_redemptions (
    promo_code_id,
    user_id,
    redeemed_code,
    access_type,
    lifetime_access,
    access_expires_at
  )
  values (
    v_promo.id,
    p_user_id,
    v_promo.code,
    v_promo.access_type,
    v_promo.lifetime_access,
    v_access_expires_at
  );

  update public.promo_codes
     set times_redeemed = times_redeemed + 1,
         updated_at = now()
   where id = v_promo.id;

  return query select
    true,
    'Promo code redeemed.',
    v_promo.access_type,
    v_access_expires_at,
    v_promo.lifetime_access;
end;
$$;

create or replace function public.redeem_promo_code(p_code text)
returns table (
  success boolean,
  message text,
  access_type text,
  access_expires_at timestamptz,
  lifetime_access boolean
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select *
    from public.grant_promo_code_to_user(auth.uid(), p_code);
end;
$$;

create or replace function public.redeem_signup_promo_code()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text;
begin
  v_code := new.raw_user_meta_data ->> 'signup_promo_code';

  if v_code is not null and length(trim(v_code)) > 0 then
    perform *
      from public.grant_promo_code_to_user(new.id, v_code);
  end if;

  return new;
end;
$$;

drop trigger if exists redeem_signup_promo_code_on_user_created on auth.users;
create trigger redeem_signup_promo_code_on_user_created
after insert on auth.users
for each row
execute function public.redeem_signup_promo_code();

revoke execute on function public.grant_promo_code_to_user(uuid, text)
  from public, anon, authenticated;

grant execute on function public.validate_promo_code(text)
  to anon, authenticated;

grant execute on function public.redeem_promo_code(text)
  to authenticated;

insert into public.promo_codes (
  code,
  benefit_type,
  access_type,
  duration_days,
  lifetime_access,
  expires_at,
  discount_percent,
  discount_plan,
  max_redemptions,
  active,
  updated_at
)
values
  (
    'FOUNDER365',
    'access',
    'founder',
    null,
    true,
    null,
    null,
    null,
    365,
    true,
    now()
  ),
  (
    'CLERGYFREE',
    'access',
    'clergy',
    null,
    true,
    null,
    null,
    null,
    500,
    true,
    now()
  ),
  (
    'REVIEW30',
    'access',
    'review',
    30,
    false,
    null,
    null,
    null,
    100,
    true,
    now()
  ),
  (
    'BETA2026',
    'access',
    'premium',
    90,
    false,
    '2026-12-31 23:59:59+00',
    null,
    null,
    2026,
    true,
    now()
  ),
  (
    '30DAYSFREE',
    'access',
    'premium',
    30,
    false,
    null,
    null,
    null,
    500,
    true,
    now()
  )
on conflict (code)
do update set
  benefit_type = excluded.benefit_type,
  access_type = excluded.access_type,
  duration_days = excluded.duration_days,
  lifetime_access = excluded.lifetime_access,
  expires_at = excluded.expires_at,
  discount_percent = excluded.discount_percent,
  discount_plan = excluded.discount_plan,
  max_redemptions = excluded.max_redemptions,
  active = excluded.active,
  updated_at = now();

delete from public.promo_codes
where code = 'RCIA15'
  and benefit_type = 'discount'
  and times_redeemed = 0;
