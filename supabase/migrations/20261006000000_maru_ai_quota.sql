-- Shared limits across all Edge Function instances: 20/account/day, 500/site/day (UTC).
create table public.maru_ai_usage (
  day date not null,
  subject text not null,
  requests integer not null default 0,
  primary key (day, subject)
);
alter table public.maru_ai_usage enable row level security;
revoke all on public.maru_ai_usage from anon, authenticated;
create or replace function public.maru_consume_ai_quota(p_user_id uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
declare
  d date := (now() at time zone 'UTC')::date;
  global_count integer;
  user_count integer;
begin
  insert into public.maru_ai_usage(day, subject) values (d, 'global') on conflict do nothing;
  select requests into global_count from public.maru_ai_usage where day=d and subject='global' for update;
  if global_count >= 500 then return false; end if;
  insert into public.maru_ai_usage(day, subject) values (d, p_user_id::text) on conflict do nothing;
  select requests into user_count from public.maru_ai_usage where day=d and subject=p_user_id::text for update;
  if user_count >= 20 then return false; end if;
  update public.maru_ai_usage set requests=requests+1 where day=d and subject in ('global', p_user_id::text);
  return true;
end;
$$;
revoke all on function public.maru_consume_ai_quota(uuid) from public, anon, authenticated;
grant execute on function public.maru_consume_ai_quota(uuid) to service_role;
