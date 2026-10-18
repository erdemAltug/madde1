-- Tam madde eşleşmesi. Vektör aramasından önce kanun_no + madde_no.
-- Metadata normalize edilmemişse boş döner; çağıran vektör aramasına devam eder.

create or replace function public.lookup_law_articles_by_madde(
  filter_kanun_no text,
  filter_madde_no text,
  match_count int default 3
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  category text,
  source text,
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
    1::double precision as similarity
  from public.law_articles la
  where coalesce(filter_madde_no, '') <> ''
    and (
      la.metadata->>'madde_no' = filter_madde_no
      or la.metadata->>'maddeNo' = filter_madde_no
    )
    and (
      coalesce(filter_kanun_no, '') = ''
      or la.metadata->>'kanun_no' = filter_kanun_no
      or la.metadata->>'kanunNo' = filter_kanun_no
      or coalesce(la.source, '') ilike '%' || filter_kanun_no || '%'
    )
  order by la.created_at desc
  limit greatest(1, least(coalesce(match_count, 3), 10));
$$;

grant execute on function public.lookup_law_articles_by_madde(text, text, int) to authenticated;
grant execute on function public.lookup_law_articles_by_madde(text, text, int) to service_role;
grant execute on function public.lookup_law_articles_by_madde(text, text, int) to anon;
