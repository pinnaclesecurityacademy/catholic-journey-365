-- End-to-end promo code checks for the linked Supabase project.
-- Creates synthetic users, records pass/fail rows, then removes test data.

create temp table promo_e2e_results (
  scenario text,
  passed boolean,
  details text
);

delete from auth.users
where id in (
  '10000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000007'
);

delete from public.promo_codes
where code in ('LIMIT1E2E', 'DISCOUNT15E2E');

create temp table promo_e2e_original_counts as
select code, times_redeemed
from public.promo_codes
where code in (
  'FOUNDER365',
  'REVIEW30',
  '30DAYSFREE',
  'BETA2026',
  'CLERGYFREE'
);

insert into auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '10000000-0000-0000-0000-000000000001',
    'authenticated',
    'authenticated',
    'cj365-e2e-founder@example.invalid',
    crypt('Password123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"signup_promo_code":"FOUNDER365"}'::jsonb,
    now(),
    now()
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'authenticated',
    'authenticated',
    'cj365-e2e-review@example.invalid',
    crypt('Password123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now() - interval '30 days',
    now()
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'authenticated',
    'authenticated',
    'cj365-e2e-invalid@example.invalid',
    crypt('Password123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now() - interval '30 days',
    now()
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'authenticated',
    'authenticated',
    'cj365-e2e-limit-one@example.invalid',
    crypt('Password123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now() - interval '30 days',
    now()
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    'authenticated',
    'authenticated',
    'cj365-e2e-limit-two@example.invalid',
    crypt('Password123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now() - interval '30 days',
    now()
  ),
  (
    '10000000-0000-0000-0000-000000000006',
    'authenticated',
    'authenticated',
    'cj365-e2e-paid@example.invalid',
    crypt('Password123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now() - interval '90 days',
    now()
  ),
  (
    '10000000-0000-0000-0000-000000000007',
    'authenticated',
    'authenticated',
    'cj365-e2e-trial@example.invalid',
    crypt('Password123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now()
  );

insert into public.user_access (
  user_id,
  status,
  stripe_customer_id,
  stripe_subscription_id,
  current_period_end,
  updated_at
)
values (
  '10000000-0000-0000-0000-000000000006',
  'active',
  'cus_e2e_paid',
  'sub_e2e_paid',
  now() + interval '30 days',
  now()
);

insert into public.promo_codes (
  code,
  benefit_type,
  access_type,
  duration_days,
  lifetime_access,
  max_redemptions,
  active
)
values ('LIMIT1E2E', 'access', 'premium', 1, false, 1, true);

insert into public.promo_codes (
  code,
  benefit_type,
  access_type,
  duration_days,
  lifetime_access,
  discount_percent,
  discount_plan,
  max_redemptions,
  active
)
values (
  'DISCOUNT15E2E',
  'discount',
  null,
  null,
  false,
  15.00,
  'yearly',
  1,
  true
);

insert into promo_e2e_results
select
  'A. New account + FOUNDER365',
  exists (
    select 1
    from public.promo_redemptions
    where user_id = '10000000-0000-0000-0000-000000000001'
      and redeemed_code = 'FOUNDER365'
      and access_type = 'founder'
      and lifetime_access = true
      and access_expires_at is null
  ),
  coalesce((
    select
      'access_type=' || access_type ||
      ', lifetime=' || lifetime_access::text ||
      ', expires=' || coalesce(access_expires_at::text, 'never')
    from public.promo_redemptions
    where user_id = '10000000-0000-0000-0000-000000000001'
      and redeemed_code = 'FOUNDER365'
    limit 1
  ), 'no redemption row');

select set_config(
  'request.jwt.claim.sub',
  '10000000-0000-0000-0000-000000000002',
  true
);
create temp table review_first as
select * from public.redeem_promo_code('REVIEW30');

insert into promo_e2e_results
select
  'B. Existing account + REVIEW30',
  coalesce((select success from review_first limit 1), false)
  and exists (
    select 1
    from public.promo_redemptions
    where user_id = '10000000-0000-0000-0000-000000000002'
      and redeemed_code = 'REVIEW30'
      and access_type = 'review'
      and access_expires_at > now()
  ),
  coalesce((
    select
      message ||
      ', access_type=' || access_type ||
      ', expires=' || access_expires_at::text
    from review_first
    limit 1
  ), 'no RPC result');

select set_config(
  'request.jwt.claim.sub',
  '10000000-0000-0000-0000-000000000003',
  true
);
create temp table invalid_result as
select * from public.redeem_promo_code('NOTREALCODE');

insert into promo_e2e_results
select
  'C. Invalid promo code',
  coalesce((
    select success = false and message ilike '%not found%'
    from invalid_result
    limit 1
  ), false)
  and not exists (
    select 1
    from public.promo_redemptions
    where user_id = '10000000-0000-0000-0000-000000000003'
  ),
  coalesce((select message from invalid_result limit 1), 'no RPC result');

select set_config(
  'request.jwt.claim.sub',
  '10000000-0000-0000-0000-000000000002',
  true
);
create temp table review_second as
select * from public.redeem_promo_code('REVIEW30');

insert into promo_e2e_results
select
  'D. Duplicate redemption',
  coalesce((
    select success = false and message ilike '%already been redeemed%'
    from review_second
    limit 1
  ), false),
  coalesce((select message from review_second limit 1), 'no RPC result');

select set_config(
  'request.jwt.claim.sub',
  '10000000-0000-0000-0000-000000000004',
  true
);
create temp table limit_first as
select * from public.redeem_promo_code('LIMIT1E2E');

select set_config(
  'request.jwt.claim.sub',
  '10000000-0000-0000-0000-000000000005',
  true
);
create temp table limit_second as
select * from public.redeem_promo_code('LIMIT1E2E');

insert into promo_e2e_results
select
  'E. Maximum redemption limit',
  coalesce((select success from limit_first limit 1), false)
  and coalesce((
    select success = false and message ilike '%redemption limit%'
    from limit_second
    limit 1
  ), false),
  'first=' ||
    coalesce((select message from limit_first limit 1), 'none') ||
    '; second=' ||
    coalesce((select message from limit_second limit 1), 'none');

insert into promo_e2e_results
select
  'Confirm Stripe subscriber access unaffected',
  exists (
    select 1
    from public.user_access
    where user_id = '10000000-0000-0000-0000-000000000006'
      and status = 'active'
      and stripe_subscription_id = 'sub_e2e_paid'
  ),
  coalesce((
    select 'status=' || status || ', subscription=' || stripe_subscription_id
    from public.user_access
    where user_id = '10000000-0000-0000-0000-000000000006'
  ), 'no user_access row');

insert into promo_e2e_results
select
  'Confirm 14-day Premium Trial still works',
  exists (
    select 1
    from auth.users
    where id = '10000000-0000-0000-0000-000000000007'
      and created_at > now() - interval '14 days'
  )
  and not exists (
    select 1
    from public.promo_redemptions
    where user_id = '10000000-0000-0000-0000-000000000007'
  )
  and not exists (
    select 1
    from public.user_access
    where user_id = '10000000-0000-0000-0000-000000000007'
      and status in ('free', 'trialing', 'active')
  ),
  'new user has no promo or user_access row; app trial is based on auth.users.created_at';

insert into promo_e2e_results
select
  'Confirm discount placeholder support does not grant access',
  coalesce((
    select valid = false and message ilike '%future billing discount%'
    from public.validate_promo_code('DISCOUNT15E2E')
    limit 1
  ), false)
  and exists (
    select 1
    from public.promo_codes
    where code = 'DISCOUNT15E2E'
      and benefit_type = 'discount'
      and discount_percent = 15.00
      and discount_plan = 'yearly'
  ),
  coalesce((
    select message
    from public.validate_promo_code('DISCOUNT15E2E')
    limit 1
  ), 'no validation result');

insert into promo_e2e_results
select
  'Confirm seeded codes exist',
  (
    select count(*) = 5
    from public.promo_codes
    where code in (
      'FOUNDER365',
      'CLERGYFREE',
      'REVIEW30',
      'BETA2026',
      '30DAYSFREE'
    )
  ),
  (
    select string_agg(
      code || ':' || benefit_type || ':' || coalesce(access_type, discount_plan),
      ', '
      order by code
    )
    from public.promo_codes
    where code in (
      'FOUNDER365',
      'CLERGYFREE',
      'REVIEW30',
      'BETA2026',
      '30DAYSFREE'
    )
  );

select set_config('request.jwt.claim.sub', '', true);

delete from auth.users
where id in (
  '10000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000007'
);

delete from public.promo_codes
where code in ('LIMIT1E2E', 'DISCOUNT15E2E');

update public.promo_codes p
set times_redeemed = c.times_redeemed,
    updated_at = now()
from promo_e2e_original_counts c
where p.code = c.code;

select scenario, passed, details
from promo_e2e_results
order by scenario;
