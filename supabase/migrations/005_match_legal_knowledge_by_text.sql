-- Match legal knowledge by text query (auto-generates embedding)
-- This RPC function takes text query, generates embedding, and returns matches

create or replace function public.match_legal_knowledge(
  query_text text,
  match_threshold double precision default 0.5,
  match_count int default 10
)
returns table (
  id uuid,
  content text,
  full_content text,
  category text,
  metadata jsonb,
  similarity double precision
)
language plpgsql
stable
set search_path = public
as $$
begin
  return query
  select
    lk.id,
    lk.content,
    lk.full_content,
    lk.category,
    lk.metadata,
    (1 - (lk.embedding <=> openai.embedding('text-embedding-3-small', query_text)::vector))::double precision as similarity
  from public.legal_knowledge lk
  where lk.embedding is not null
    and (1 - (lk.embedding <=> openai.embedding('text-embedding-3-small', query_text)::vector)) >= match_threshold
  order by lk.embedding <=> openai.embedding('text-embedding-3-small', query_text)::vector asc
  limit greatest(1, least(match_count, 100));
end;
$$;

-- Grant execute to authenticated users
grant execute on function public.match_legal_knowledge(text, double precision, int) to authenticated;
grant execute on function public.match_legal_knowledge(text, double precision, int) to service_role;
