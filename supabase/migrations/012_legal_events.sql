-- Hukuki takvim: sözleşmeden çıkarılan veya elle eklenen kritik tarihler.
-- RLS: kullanıcı yalnızca kendi satırlarını görür ve değiştirir.

create table if not exists public.legal_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  analysis_id uuid references public.contract_analyses (id) on delete set null,
  title text not null,
  kind text not null default 'other'
    check (kind in ('renewal', 'rent_increase', 'contract_end', 'notice', 'payment', 'probation', 'deadline', 'other')),
  due_date date not null,
  notes text,
  done boolean not null default false,
  -- Hatırlatma günleri (son tarihten kaç gün önce e-posta gönderilecek)
  remind_days int[] not null default '{30,7,1}',
  -- Gönderilmiş hatırlatmalar: aynı gün için ikinci e-postayı engeller
  reminded_days int[] not null default '{}',
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists legal_events_user_due_idx
  on public.legal_events (user_id, due_date asc);

create index if not exists legal_events_due_open_idx
  on public.legal_events (due_date)
  where done = false;

alter table public.legal_events enable row level security;

drop policy if exists "legal_events_select_own" on public.legal_events;
drop policy if exists "legal_events_insert_own" on public.legal_events;
drop policy if exists "legal_events_update_own" on public.legal_events;
drop policy if exists "legal_events_delete_own" on public.legal_events;

create policy "legal_events_select_own"
  on public.legal_events for select
  to authenticated
  using (auth.uid() = user_id);

create policy "legal_events_insert_own"
  on public.legal_events for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "legal_events_update_own"
  on public.legal_events for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "legal_events_delete_own"
  on public.legal_events for delete
  to authenticated
  using (auth.uid() = user_id);
