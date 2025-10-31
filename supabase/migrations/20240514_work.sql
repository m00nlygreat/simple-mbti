create table if not exists public.mbti_results (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  answers text[] not null,
  result text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists mbti_results_created_at_idx on public.mbti_results (created_at desc);
