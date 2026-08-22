-- Kayıtlı kullanıcı kendi tarama satırını silebilsin (envanter)

drop policy if exists "contract_analyses_delete_own" on public.contract_analyses;

create policy "contract_analyses_delete_own"
  on public.contract_analyses for delete
  using (auth.uid() = user_id);
