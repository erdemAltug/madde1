import type { SupabaseClient } from "@supabase/supabase-js";

const MAX_EVENTS = 6;
const MAX_CONTRACTS = 4;

type EventRow = { title: string; kind: string; due_date: string; notes: string | null };
type AnalysisRow = {
  contract_title: string | null;
  risk_score: number | null;
  created_at: string;
  ai_report: Record<string, unknown> | null;
};

/**
 * Kullanıcının kendi dosyası: yaklaşan tarihler + son taranan sözleşmeler.
 * Asistan "benim kira sözleşmem" dendiğinde neye bakıldığını bilir.
 * Kullanıcının oturum token'ı ile okunur; RLS dışına çıkmaz.
 */
export async function buildPersonalContext(
  supabase: SupabaseClient,
  userId: string,
): Promise<string> {
  const today = new Date().toISOString().slice(0, 10);

  const [eventsRes, analysesRes] = await Promise.all([
    supabase
      .from("legal_events")
      .select("title, kind, due_date, notes")
      .eq("user_id", userId)
      .eq("done", false)
      .gte("due_date", today)
      .order("due_date", { ascending: true })
      .limit(MAX_EVENTS),
    supabase
      .from("contract_analyses")
      .select("contract_title, risk_score, created_at, ai_report")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(MAX_CONTRACTS),
  ]);

  const events = (eventsRes.data || []) as EventRow[];
  const analyses = (analysesRes.data || []) as AnalysisRow[];
  if (events.length === 0 && analyses.length === 0) return "";

  const lines: string[] = [];
  if (analyses.length > 0) {
    lines.push("Taranmış sözleşmeleri:");
    for (const a of analyses) {
      const summary = pickSummary(a.ai_report);
      const risk = a.risk_score != null ? ` · güven skoru ${a.risk_score}/100` : "";
      lines.push(
        `- ${a.contract_title || "Adsız sözleşme"} (${a.created_at.slice(0, 10)}${risk})${summary ? `: ${summary}` : ""}`,
      );
    }
  }
  if (events.length > 0) {
    lines.push("Yaklaşan tarihleri:");
    for (const e of events) {
      const days = daysUntil(e.due_date);
      lines.push(`- ${e.due_date} (${days} gün kaldı): ${e.title}`);
    }
  }

  return `## KULLANICININ DOSYASI (yalnızca bu kullanıcıya ait, Clause hesabından)
${lines.join("\n")}

Kural: Kullanıcı "sözleşmem", "kiram", "son tarihim" gibi kendi durumuna atıf yaparsa bu dosyayı kullan.
Dosyada olmayan bir sözleşme maddesi hakkında tahmin yürütme; metni paylaşmasını iste.`;
}

function pickSummary(report: Record<string, unknown> | null): string {
  if (!report) return "";
  for (const key of ["summary", "ozet", "executiveSummary", "verdict"]) {
    const v = report[key];
    if (typeof v === "string" && v.trim()) {
      return v.replace(/\s+/g, " ").trim().slice(0, 220);
    }
  }
  // Analiz raporu markdown olarak saklanır: başlıkları atıp ilk cümleleri al
  const md = report.markdown;
  if (typeof md === "string" && md.trim()) {
    return md
      .split("\n")
      .filter((l) => l.trim() && !l.trim().startsWith("#"))
      .join(" ")
      .replace(/[*_`>|]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 220);
  }
  return "";
}

function daysUntil(isoDate: string): number {
  const due = new Date(`${isoDate}T00:00:00Z`).getTime();
  const now = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z").getTime();
  return Math.round((due - now) / 86_400_000);
}
