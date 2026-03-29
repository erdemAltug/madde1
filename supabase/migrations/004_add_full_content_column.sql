-- Add full_content column for storing complete case text (up to 15000 chars)
-- This allows smart chunking: store full, embed only meaningful part
  
alter table public.legal_knowledge 
add column if not exists full_content text;

create index if not exists legal_knowledge_full_content_idx
  on public.legal_knowledge (category, full_content);
