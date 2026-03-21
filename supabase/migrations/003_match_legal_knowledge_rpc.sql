-- Cosine benzerliği: pgvector <=> operatörü (cosine distance). Benzerlik ≈ 1 - distance (birim vektörlerde).

create or replace function public.match_legal_knowledge(
  query_embedding vector(1536),
  match_count int default 5,
  filter_category text default null
)
returns table (
  id uuid,
  content text,
  category text,
  metadata jsonb,
  similarity double precision
)
language sql
stable
parallel safe
set search_path = public
as $$
  select
    lk.id,
    lk.content,
    lk.category,
    lk.metadata,
    (1 - (lk.embedding <=> query_embedding))::double precision as similarity
  from public.legal_knowledge lk
  where lk.embedding is not null
    and (filter_category is null or lk.category = filter_category)
  order by lk.embedding <=> query_embedding asc
  limit greatest(1, least(match_count, 100));
$$;

comment on function public.match_legal_knowledge(vector(1536), int, text) is
  'legal_knowledge üzerinde cosine distance ile en yakın kayıtlar; similarity = 1 - (embedding <=> query).';

grant execute on function public.match_legal_knowledge(vector(1536), int, text) to authenticated;
grant execute on function public.match_legal_knowledge(vector(1536), int, text) to service_role;
