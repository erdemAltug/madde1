-- pgvector + auth.profiles + ödemeler + RAG (legal_knowledge) + sözleşme analiz geçmişi
-- Supabase SQL Editor veya: psql "$DATABASE_URL" -f ... (şifreyi asla repoya koymayın)

create extension if not exists vector;

-- 2. Kullanıcı profili (auth.users ile 1:1)
create table if not exists public.profiles (
  id uuid references auth.users (id) on delete cascade primary key,
  email text unique,
  full_name text,
  subscription_tier text not null default 'free'
    check (subscription_tier in ('free', 'pro', 'enterprise')),
  credits int not null default 1 check (credits >= 0),
  created_at timestamptz not null default timezone('utc'::text, now())
);

comment on table public.profiles is 'Auth kullanıcısı; kredi/abonelik (auth tabanlı ürün yolu).';

-- Yeni kayıtta satır oluştur (service role / trigger)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Ödeme kayıtları
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  stripe_payment_intent_id text,
  amount numeric(10, 2),
  status text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists payments_user_id_created_at_idx
  on public.payments (user_id, created_at desc);

-- 4. Hukuk bilgi tabanı (embedding araması)
create table if not exists public.legal_knowledge (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb,
  embedding vector(1536),
  category text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists legal_knowledge_category_idx
  on public.legal_knowledge (category);

-- 5. Analiz geçmişi
create table if not exists public.contract_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  contract_title text,
  original_text text,
  ai_report jsonb,
  risk_score int check (risk_score is null or (risk_score between 0 and 100)),
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists contract_analyses_user_id_created_at_idx
  on public.contract_analyses (user_id, created_at desc);

-- 6. Vektör indeksi (veri arttıkça lists değerini yeniden değerlendirin)
create index if not exists legal_knowledge_embedding_ivfflat_idx
  on public.legal_knowledge
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- RLS
alter table public.profiles enable row level security;
alter table public.payments enable row level security;
alter table public.legal_knowledge enable row level security;
alter table public.contract_analyses enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "payments_select_own" on public.payments;
drop policy if exists "contract_analyses_select_own" on public.contract_analyses;
drop policy if exists "contract_analyses_insert_own" on public.contract_analyses;
drop policy if exists "contract_analyses_update_own" on public.contract_analyses;

-- Profil: kullanıcı kendi satırını okur/günceller
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Ödemeler: yalnızca kendi kayıtları (ekleme genelde webhook/service role)
create policy "payments_select_own"
  on public.payments for select
  using (auth.uid() = user_id);

-- Sözleşme analizleri
create policy "contract_analyses_select_own"
  on public.contract_analyses for select
  using (auth.uid() = user_id);

create policy "contract_analyses_insert_own"
  on public.contract_analyses for insert
  with check (auth.uid() = user_id);

create policy "contract_analyses_update_own"
  on public.contract_analyses for update
  using (auth.uid() = user_id);

-- legal_knowledge: istemciden doğrudan erişim yok; sorgular service role ile
