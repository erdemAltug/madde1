-- Clause B2C: cüzdan / kredi (device_id = istemci tarafında üretilen kalıcı kimlik)
-- API route'ları SUPABASE_SERVICE_ROLE_KEY ile yazar; RLS açık, anon için politika yok.

create table if not exists public.user_credits (
  device_id text primary key,
  credits integer not null default 0 check (credits >= 0),
  unlimited_until timestamptz null,
  updated_at timestamptz not null default now()
);

create index if not exists user_credits_updated_at_idx on public.user_credits (updated_at desc);

alter table public.user_credits enable row level security;

comment on table public.user_credits is 'B2C kredi; yalnızca service role / server erişimi önerilir.';
