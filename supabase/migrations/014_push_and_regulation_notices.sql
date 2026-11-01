-- Web push abonelikleri (PWA takvim hatırlatmaları) ve mevzuat değişikliği bildirim kaydı.

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists push_subscriptions_user_idx
  on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;

drop policy if exists "push_subscriptions_select_own" on public.push_subscriptions;
drop policy if exists "push_subscriptions_insert_own" on public.push_subscriptions;
drop policy if exists "push_subscriptions_delete_own" on public.push_subscriptions;

create policy "push_subscriptions_select_own"
  on public.push_subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

create policy "push_subscriptions_insert_own"
  on public.push_subscriptions for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "push_subscriptions_delete_own"
  on public.push_subscriptions for delete
  to authenticated
  using (auth.uid() = user_id);

-- Her kullanıcıya her mevzuat güncellemesi en fazla bir kez gönderilir.
-- notice_id: lib/legal/regulation-updates.ts içindeki sabit kimlik.
create table if not exists public.regulation_notices_sent (
  user_id uuid not null references auth.users (id) on delete cascade,
  notice_id text not null,
  sent_at timestamptz not null default timezone('utc'::text, now()),
  primary key (user_id, notice_id)
);

alter table public.regulation_notices_sent enable row level security;

drop policy if exists "regulation_notices_select_own" on public.regulation_notices_sent;
create policy "regulation_notices_select_own"
  on public.regulation_notices_sent for select
  to authenticated
  using (auth.uid() = user_id);
