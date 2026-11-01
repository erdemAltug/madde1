-- Hibrit RAG: vektör aramasının yanına Postgres tam metin araması.
-- Kanun metinlerinde "TÜFE", "güvence bedeli", "m.344" gibi birebir terimler
-- gömme benzerliğinde kaybolabiliyor; tsvector kanalı bunları yakalar.
-- 'simple' yapılandırması: Türkçe kök bulucu Postgres'te yok, kelimeler olduğu gibi eşleşir.

alter table public.law_articles
  add column if not exists fts tsvector
  generated always as (to_tsvector('simple', coalesce(content, ''))) stored;

alter table public.legal_knowledge
  add column if not exists fts tsvector
  generated always as (
    to_tsvector('simple', coalesce(full_content, content, ''))
  ) stored;

create index if not exists law_articles_fts_idx
  on public.law_articles using gin (fts);

create index if not exists legal_knowledge_fts_idx
  on public.legal_knowledge using gin (fts);

-- Her iki tablodan ts_rank ile sıralı sonuç. source_table ile hangi tablodan geldiği ayrılır.
create or replace function public.search_legal_fulltext(
  query_text text,
  match_count int default 8,
  filter_category text default null
)
returns table (
  id uuid,
  content text,
  full_content text,
  metadata jsonb,
  category text,
  source text,
  source_table text,
  rank double precision
)
language sql
stable
parallel safe
set search_path = public
as $$
  with q as (
    select websearch_to_tsquery('simple', query_text) as tsq
  )
  (
    select
      la.id,
      la.content,
      null::text as full_content,
      la.metadata,
      la.category,
      la.source,
      'law_articles'::text as source_table,
      ts_rank_cd(la.fts, q.tsq)::double precision as rank
    from public.law_articles la, q
    where la.fts @@ q.tsq
      and (filter_category is null or la.category = filter_category)
    order by rank desc
    limit match_count
  )
  union all
  (
    select
      lk.id,
      lk.content,
      lk.full_content,
      lk.metadata,
      lk.category,
      lk.source,
      'legal_knowledge'::text as source_table,
      ts_rank_cd(lk.fts, q.tsq)::double precision as rank
    from public.legal_knowledge lk, q
    where lk.fts @@ q.tsq
      and (filter_category is null or lk.category = filter_category)
    order by rank desc
    limit greatest(1, match_count / 2)
  )
$$;

grant execute on function public.search_legal_fulltext(text, int, text)
  to anon, authenticated, service_role;
