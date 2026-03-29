-- Fix match_legal_knowledge RPC function with proper parameters
-- This version uses vector embedding and allows filtering by threshold

create or replace function public.match_legal_knowledge(
  query_embedding vector(1536),
  match_threshold double precision default 0.5,
  match_count int default 10,
  filter_category text default null
)
returns table (
  id uuid,
  content text,
  full_content text,
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
    lk.full_content,
    lk.category,
    lk.metadata,
    (1 - (lk.embedding <=> query_embedding))::double precision as similarity
  from public.legal_knowledge lk
  where lk.embedding is not null
    and (1 - (lk.embedding <=> query_embedding)) >= match_threshold
    and (filter_category is null or lk.category = filter_category)
  order by lk.embedding <=> query_embedding asc
  limit greatest(1, least(match_count, 100));
$$;

-- Grant execute to authenticated users
grant execute on function public.match_legal_knowledge(vector, double precision, int, text) to authenticated;
grant execute on function public.match_legal_knowledge(vector, double precision, int, text) to service_role;
