-- Seed existing progress: Chris and Saua are on Day 144.
-- Marks Days 1-144 complete for both readers.
-- Safe to re-run (existing rows are left untouched via ON CONFLICT).

insert into public.completions (user_id, day_number, completed, completed_at)
select u.user_id, d.day_number, true, now()
from (values ('chris'), ('saua')) as u(user_id)
cross join generate_series(1, 144) as d(day_number)
on conflict (user_id, day_number) do nothing;
