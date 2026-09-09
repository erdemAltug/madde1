-- Legal RAG: law_articles metadata için ifade indeksleri (kanun_no / madde_no)
-- Mevcut jsonb metadata alanlarını hızlandırmak için; veri migration değil.

create index if not exists law_articles_metadata_kanun_no_idx
  on public.law_articles ((metadata->>'kanun_no'));

create index if not exists law_articles_metadata_madde_no_idx
  on public.law_articles ((metadata->>'madde_no'));

create index if not exists law_articles_metadata_kategori_idx
  on public.law_articles ((metadata->>'kategori'));

-- match_law_articles: service_role zaten var; anon/authenticated korunur.
-- İsteğe bağlı: metadata filtreli eşleşme (kanun_no).

create or replace function public.match_law_articles_by_kanun(
  query_embedding vector(1536),
  match_threshold double precision default 0.42,
  match_count int default 10,
  filter_kanun_no text default null,
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
    and (
      filter_kanun_no is null
      or la.metadata->>'kanun_no' = filter_kanun_no
      or la.source ilike '%' || filter_kanun_no || '%'
    )
  order by la.embedding <=> query_embedding asc
  limit greatest(1, least(match_count, 100));
$$;

grant execute on function public.match_law_articles_by_kanun(vector(1536), double precision, int, text, text) to authenticated;
grant execute on function public.match_law_articles_by_kanun(vector(1536), double precision, int, text, text) to service_role;
grant execute on function public.match_law_articles_by_kanun(vector(1536), double precision, int, text, text) to anon;
