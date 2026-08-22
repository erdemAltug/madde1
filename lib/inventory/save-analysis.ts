import { getSupabaseBrowser } from "@/lib/supabase/browser";
import type { InventoryReport, InventoryRow } from "@/lib/inventory/types";
import { titleFromText } from "@/lib/inventory/types";

const TEXT_CAP = 24_000;

export async function saveContractAnalysis(input: {
  originalText: string;
  report: InventoryReport;
  title?: string;
  riskScore?: number | null;
}): Promise<string | null> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const original = input.originalText.slice(0, TEXT_CAP);
  const title =
    input.title?.trim() ||
    titleFromText(original, "Sözleşme taraması");

  const { data, error } = await supabase
    .from("contract_analyses")
    .insert({
      user_id: user.id,
      contract_title: title,
      original_text: original,
      ai_report: { version: 1, ...input.report },
      risk_score:
        input.riskScore ?? input.report.teaser?.securityScore ?? null,
    })
    .select("id")
    .single();

  if (error || !data?.id) return null;
  return data.id as string;
}

export async function listMyAnalyses(): Promise<InventoryRow[]> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("contract_analyses")
    .select("id, contract_title, original_text, ai_report, risk_score, created_at")
    .order("created_at", { ascending: false })
    .limit(80);

  if (error || !data) return [];
  return data as InventoryRow[];
}

export async function getMyAnalysis(id: string): Promise<InventoryRow | null> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("contract_analyses")
    .select("id, contract_title, original_text, ai_report, risk_score, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as InventoryRow;
}

export async function setAnalysisPinned(
  id: string,
  report: InventoryReport | null,
  pinned: boolean,
): Promise<boolean> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return false;

  const next: InventoryReport = { version: 1, ...(report ?? {}), pinned };
  const { error } = await supabase
    .from("contract_analyses")
    .update({ ai_report: next })
    .eq("id", id);

  return !error;
}
