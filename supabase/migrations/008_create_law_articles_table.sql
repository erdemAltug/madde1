-- Create law_articles table for Turkish Law Dataset
-- This table stores law articles with embeddings for vector search

create table if not exists public.law_articles (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb,
  embedding vector(1536),
  category text,
  source text,
  score int,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- Index for category filtering
create index if not exists law_articles_category_idx
  on public.law_articles (category);

-- Index for source filtering
create index if not exists law_articles_source_idx
  on public.law_articles (source);

-- Vector index for similarity search
create index if not exists law_articles_embedding_ivfflat_idx
  on public.law_articles
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- RLS
alter table public.law_articles enable row level security;

-- Allow all authenticated/anon users to read
create policy "law_articles_select_authenticated"
  on public.law_articles for select
  to authenticated
  using (true);

create policy "law_articles_select_service_role"
  on public.law_articles for select
  to service_role
  using (true);

create policy "law_articles_select_anon"
  on public.law_articles for select
  to anon
  using (true);

-- Create RPC function for law_articles similarity search
create or replace function public.match_law_articles(
  query_embedding vector(1536),
  match_threshold double precision default 0.45,
  match_count int default 10,
  filter_category text default null
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  category text,
  source text,
  score int,
  similarity double precision
)
language sql
stable
parallel safe
set search_path = public
as $$
  select
    la.id,
    la.content,
    la.metadata,
    la.category,
    la.source,
    la.score,
    (1 - (la.embedding <=> query_embedding))::double precision as similarity
  from public.law_articles la
  where la.embedding is not null
    and (1 - (la.embedding <=> query_embedding)) >= match_threshold
    and (filter_category is null or la.category = filter_category)
  order by la.embedding <=> query_embedding asc
  limit greatest(1, least(match_count, 100));
$$;

-- Grant execute permissions
grant execute on function public.match_law_articles(vector(1536), double precision, int, text) to authenticated;
grant execute on function public.match_law_articles(vector(1536), double precision, int, text) to service_role;
grant execute on function public.match_law_articles(vector(1536), double precision, int, text) to anon;
