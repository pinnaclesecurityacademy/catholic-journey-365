-- Catholic Journey 365 — Safety backup + verification for completions.
-- The auth migration is NON-DESTRUCTIVE (no completions row is ever changed),
-- but run these for peace of mind and an auditable before/after.

-- 1) BACKUP: snapshot the completions table into a copy (safe, additive).
--    Run this BEFORE anyone signs up / claims.
create table if not exists public.completions_backup as
  table public.completions;

-- 2) BASELINE COUNTS: record per-namespace completed counts before migration.
select user_id, count(*) as completed_days
from public.completions
where completed = true
group by user_id
order by user_id;

-- 3) NEXT READING (per namespace): the smallest day NOT completed.
--    Capture this for 'chris' and 'saua' so you can confirm it is unchanged.
select 'chris' as user_id,
       coalesce(min(d.day_number), 366) as next_reading
from generate_series(1, 365) as d(day_number)
where not exists (
  select 1 from public.completions c
  where c.user_id = 'chris' and c.day_number = d.day_number and c.completed = true
)
union all
select 'saua',
       coalesce(min(d.day_number), 366)
from generate_series(1, 365) as d(day_number)
where not exists (
  select 1 from public.completions c
  where c.user_id = 'saua' and c.day_number = d.day_number and c.completed = true
);

-- 4) AFTER migration: re-run steps 2 and 3 and confirm the numbers are
--    IDENTICAL. They must be — claiming only sets profiles.completion_id and
--    never writes to completions for existing days.
