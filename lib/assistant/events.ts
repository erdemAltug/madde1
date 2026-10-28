import { getSupabaseBrowser } from "@/lib/supabase/browser";
import type { LegalEventKind } from "@/lib/assistant/date-extract";

export type LegalEvent = {
  id: string;
  analysis_id: string | null;
  title: string;
  kind: LegalEventKind;
  due_date: string;
  notes: string | null;
  done: boolean;
  remind_days: number[];
  created_at: string;
};

export type NewLegalEvent = {
  title: string;
  kind: LegalEventKind;
  due_date: string;
  notes?: string | null;
  analysis_id?: string | null;
};

const COLUMNS = "id, analysis_id, title, kind, due_date, notes, done, remind_days, created_at";

export const EVENT_KIND_LABELS: Record<LegalEventKind, string> = {
  renewal: "Yenileme",
  rent_increase: "Kira artışı",
  contract_end: "Sözleşme sonu",
  notice: "Bildirim",
  payment: "Ödeme",
  probation: "Deneme süresi",
  deadline: "Son tarih",
  other: "Diğer",
};

export async function listMyEvents(opts: { includeDone?: boolean } = {}): Promise<LegalEvent[]> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return [];

  let q = supabase.from("legal_events").select(COLUMNS).order("due_date", { ascending: true }).limit(200);
  if (!opts.includeDone) q = q.eq("done", false);

  const { data, error } = await q;
  if (error || !data) return [];
  return data as LegalEvent[];
}

export async function addEvents(events: NewLegalEvent[]): Promise<LegalEvent[] | null> {
  const supabase = getSupabaseBrowser();
  if (!supabase || events.length === 0) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const rows = events.map((e) => ({
    user_id: user.id,
    title: e.title.trim().slice(0, 160),
    kind: e.kind,
    due_date: e.due_date,
    notes: e.notes?.trim() || null,
    analysis_id: e.analysis_id ?? null,
  }));

  const { data, error } = await supabase.from("legal_events").insert(rows).select(COLUMNS);
  if (error || !data) return null;
  return data as LegalEvent[];
}

export async function setEventDone(id: string, done: boolean): Promise<boolean> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return false;
  const { error } = await supabase.from("legal_events").update({ done }).eq("id", id);
  return !error;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return false;
  const { error } = await supabase.from("legal_events").delete().eq("id", id);
  return !error;
}

/**
 * Kayıt öncesi seçilen tarihleri geçici olarak saklar.
 * Misafir kullanıcı "Hatırlat" dediğinde kayıt olduktan sonra panelde otomatik eklenir.
 */
const PENDING_KEY = "clause_pending_events_v1";

export function stashPendingEvents(events: NewLegalEvent[]): void {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(events.slice(0, 10)));
  } catch {
    /* depolama kapalı olabilir */
  }
}

export function takePendingEvents(): NewLegalEvent[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    localStorage.removeItem(PENDING_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is NewLegalEvent =>
        typeof e === "object" &&
        e !== null &&
        typeof (e as NewLegalEvent).title === "string" &&
        typeof (e as NewLegalEvent).due_date === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test((e as NewLegalEvent).due_date),
    );
  } catch {
    return [];
  }
}
