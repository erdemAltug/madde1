import { getSupabaseBrowser } from "@/lib/supabase/browser";
import {
  titleFromFirstMessage,
  type AsistanMessage,
  type AsistanThread,
} from "@/lib/asistan/types";

const MAX_THREADS = 20;

export async function getAsistanAccessToken(): Promise<string | null> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function listAsistanThreads(): Promise<AsistanThread[]> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("legal_chat_threads")
    .select("id, title, archived, created_at, updated_at")
    .eq("archived", false)
    .order("updated_at", { ascending: false })
    .limit(MAX_THREADS);
  if (error || !data) return [];
  return data as AsistanThread[];
}

export async function createAsistanThread(
  firstMessage?: string,
): Promise<AsistanThread | null> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { count } = await supabase
    .from("legal_chat_threads")
    .select("id", { count: "exact", head: true })
    .eq("archived", false)
    .eq("user_id", user.id);

  if ((count ?? 0) >= MAX_THREADS) {
    return null;
  }

  const title = firstMessage
    ? titleFromFirstMessage(firstMessage)
    : "Yeni sohbet";

  const { data, error } = await supabase
    .from("legal_chat_threads")
    .insert({ user_id: user.id, title })
    .select("id, title, archived, created_at, updated_at")
    .single();

  if (error || !data) return null;
  return data as AsistanThread;
}

export async function listAsistanMessages(
  threadId: string,
): Promise<AsistanMessage[]> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("legal_chat_messages")
    .select("id, thread_id, role, content, citations, created_at")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true })
    .limit(200);
  if (error || !data) return [];
  return data as AsistanMessage[];
}

export async function archiveAsistanThread(threadId: string): Promise<boolean> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return false;
  const { error } = await supabase
    .from("legal_chat_threads")
    .update({ archived: true, updated_at: new Date().toISOString() })
    .eq("id", threadId);
  return !error;
}

export async function renameAsistanThread(
  threadId: string,
  title: string,
): Promise<boolean> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return false;
  const { error } = await supabase
    .from("legal_chat_threads")
    .update({
      title: title.slice(0, 80),
      updated_at: new Date().toISOString(),
    })
    .eq("id", threadId);
  return !error;
}
