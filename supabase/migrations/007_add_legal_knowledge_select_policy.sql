-- Add SELECT policy for legal_knowledge table to fix RPC function access
-- The match_legal_knowledge RPC function runs with caller permissions,
-- but there's no RLS policy allowing SELECT on legal_knowledge

-- Allow authenticated users to read from legal_knowledge
create policy "legal_knowledge_select_authenticated"
  on public.legal_knowledge for select
  to authenticated
  using (true);

-- Allow service_role to read from legal_knowledge  
create policy "legal_knowledge_select_service_role"
  on public.legal_knowledge for select
  to service_role
  using (true);

-- Allow anon (for testing via API) to read from legal_knowledge
create policy "legal_knowledge_select_anon"
  on public.legal_knowledge for select
  to anon
  using (true);
