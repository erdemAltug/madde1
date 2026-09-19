-- Kalıcı mevzuat asistanı: thread + mesaj (RLS: yalnız kendi satırları)

create table if not exists public.legal_chat_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default 'Yeni sohbet',
  archived boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists legal_chat_threads_user_updated_idx
  on public.legal_chat_threads (user_id, updated_at desc);

create table if not exists public.legal_chat_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.legal_chat_threads (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  citations jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists legal_chat_messages_thread_created_idx
  on public.legal_chat_messages (thread_id, created_at asc);

alter table public.legal_chat_threads enable row level security;
alter table public.legal_chat_messages enable row level security;

drop policy if exists "legal_chat_threads_select_own" on public.legal_chat_threads;
drop policy if exists "legal_chat_threads_insert_own" on public.legal_chat_threads;
drop policy if exists "legal_chat_threads_update_own" on public.legal_chat_threads;
drop policy if exists "legal_chat_threads_delete_own" on public.legal_chat_threads;

create policy "legal_chat_threads_select_own"
  on public.legal_chat_threads for select
  to authenticated
  using (auth.uid() = user_id);

create policy "legal_chat_threads_insert_own"
  on public.legal_chat_threads for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "legal_chat_threads_update_own"
  on public.legal_chat_threads for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "legal_chat_threads_delete_own"
  on public.legal_chat_threads for delete
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "legal_chat_messages_select_own" on public.legal_chat_messages;
drop policy if exists "legal_chat_messages_insert_own" on public.legal_chat_messages;
drop policy if exists "legal_chat_messages_delete_own" on public.legal_chat_messages;

create policy "legal_chat_messages_select_own"
  on public.legal_chat_messages for select
  to authenticated
  using (auth.uid() = user_id);

create policy "legal_chat_messages_insert_own"
  on public.legal_chat_messages for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "legal_chat_messages_delete_own"
  on public.legal_chat_messages for delete
  to authenticated
  using (auth.uid() = user_id);

comment on table public.legal_chat_threads is 'Clause mevzuat asistanı sohbetleri (kalıcı)';
comment on table public.legal_chat_messages is 'Asistan mesajları; sessionStorage kullanılmaz';
