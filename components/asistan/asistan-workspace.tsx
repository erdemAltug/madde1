"use client";

import * as React from "react";
import Link from "next/link";
import {
  Archive,
  Loader2,
  MessageSquarePlus,
  Scale,
  Send,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import { useAuthSession } from "@/hooks/use-auth-session";
import {
  archiveAsistanThread,
  createAsistanThread,
  getAsistanAccessToken,
  listAsistanMessages,
  listAsistanThreads,
} from "@/lib/asistan/client";
import {
  ASISTAN_EXAMPLE_PROMPTS,
  type AsistanMessage,
  type AsistanThread,
} from "@/lib/asistan/types";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

export function AsistanWorkspace() {
  const { isLoggedIn, loading: authLoading } = useAuthSession();
  const [threads, setThreads] = React.useState<AsistanThread[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<AsistanMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [loadingMsgs, setLoadingMsgs] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [citations, setCitations] = React.useState<string[]>([]);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [mobileShowChat, setMobileShowChat] = React.useState(false);

  const refreshThreads = React.useCallback(async () => {
    const list = await listAsistanThreads();
    setThreads(list);
    return list;
  }, []);

  React.useEffect(() => {
    if (authLoading || !isLoggedIn) return;
    void (async () => {
      const list = await refreshThreads();
      if (list[0] && !activeId) setActiveId(list[0].id);
    })();
  }, [authLoading, isLoggedIn, refreshThreads, activeId]);

  React.useEffect(() => {
    if (!activeId || !isLoggedIn) {
      setMessages([]);
      return;
    }
    setLoadingMsgs(true);
    void listAsistanMessages(activeId).then((msgs) => {
      setMessages(msgs);
      setLoadingMsgs(false);
      setMobileShowChat(true);
    });
  }, [activeId, isLoggedIn]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  const startNew = async () => {
    setError(null);
    const t = await createAsistanThread();
    if (!t) {
      setError("En fazla 20 aktif sohbet. Eskilerden birini arşivleyin.");
      return;
    }
    await refreshThreads();
    setActiveId(t.id);
    setMessages([]);
    setCitations([]);
    setMobileShowChat(true);
  };

  const send = async (text?: string) => {
    const raw = (text ?? input).trim();
    if (!raw || busy) return;
    setError(null);
    setBusy(true);
    setInput("");

    let threadId = activeId;
    if (!threadId) {
      const t = await createAsistanThread(raw);
      if (!t) {
        setError("Sohbet oluşturulamadı. Giriş yaptığınızdan emin olun.");
        setBusy(false);
        return;
      }
      threadId = t.id;
      setActiveId(t.id);
      await refreshThreads();
    }

    const optimistic: AsistanMessage = {
      id: `local-${Date.now()}`,
      thread_id: threadId,
      role: "user",
      content: raw,
      created_at: new Date().toISOString(),
    };
    setMessages((m) => [...m, optimistic]);

    const token = await getAsistanAccessToken();
    if (!token) {
      setError("Oturum süresi dolmuş olabilir. Yeniden giriş yapın.");
      setBusy(false);
      return;
    }

    captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
      source: "asistan_message_sent",
    });

    try {
      const res = await fetch("/api/asistan/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ threadId, message: raw }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(
          typeof j.error === "string" ? j.error : "Yanıt alınamadı",
        );
      }

      const citeHeader = res.headers.get("X-Clause-Citations");
      if (citeHeader) {
        try {
          setCitations(JSON.parse(decodeURIComponent(citeHeader)) as string[]);
        } catch {
          /* ignore */
        }
      }

      const assistantId = `local-a-${Date.now()}`;
      setMessages((m) => [
        ...m,
        {
          id: assistantId,
          thread_id: threadId!,
          role: "assistant",
          content: "",
          created_at: new Date().toISOString(),
        },
      ]);

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Akış yok");
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        const snapshot = full;
        setMessages((m) =>
          m.map((msg) =>
            msg.id === assistantId ? { ...msg, content: snapshot } : msg,
          ),
        );
      }

      await refreshThreads();
      const synced = await listAsistanMessages(threadId);
      if (synced.length) setMessages(synced);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Bir hata oluştu");
    } finally {
      setBusy(false);
    }
  };

  const onArchive = async (id: string) => {
    await archiveAsistanThread(id);
    const list = await refreshThreads();
    if (activeId === id) {
      setActiveId(list[0]?.id ?? null);
      setMobileShowChat(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="h-6 w-6 animate-spin text-[#005BEA]" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <SiteNavbar />
        <main className="mx-auto max-w-lg px-4 py-20 text-center">
          <Scale className="mx-auto h-10 w-10 text-[#005BEA]" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Hukuk asistanı — üyelere özel
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Mevzuat dayanaklı kalıcı sohbet için ücretsiz hesap oluşturun.
            Sohbetleriniz tarayıcıda değil, hesabınızda saklanır.
          </p>
          <Button asChild className="mt-6 rounded-xl bg-[#005BEA]">
            <Link href="/giris?kayit=1&next=/asistan">Ücretsiz kayıt ol</Link>
          </Button>
          <Button asChild variant="outline" className="mt-3 rounded-xl">
            <Link href="/giris?next=/asistan">Giriş yap</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SiteNavbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-0 px-0 sm:px-4 sm:py-6 lg:flex-row lg:gap-4 lg:px-6">
        {/* Thread list */}
        <aside
          className={cn(
            "border-b border-slate-200 bg-white lg:w-72 lg:shrink-0 lg:rounded-2xl lg:border",
            mobileShowChat && "hidden lg:block",
          )}
        >
          <div className="flex items-center justify-between gap-2 p-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#005BEA]">
                Clause Asistan
              </p>
              <h1 className="text-lg font-bold text-slate-900">Sohbetlerim</h1>
            </div>
            <Button
              size="sm"
              className="rounded-lg bg-[#005BEA]"
              onClick={() => void startNew()}
            >
              <MessageSquarePlus className="h-4 w-4" />
            </Button>
          </div>
          <ul className="max-h-[50vh] space-y-1 overflow-y-auto px-2 pb-4 lg:max-h-[70vh]">
            {threads.length === 0 ? (
              <li className="px-3 py-6 text-center text-sm text-slate-500">
                Henüz sohbet yok. Bir soru sorun.
              </li>
            ) : (
              threads.map((t) => (
                <li key={t.id} className="group flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(t.id);
                      setMobileShowChat(true);
                    }}
                    className={cn(
                      "min-w-0 flex-1 rounded-xl px-3 py-2.5 text-left text-sm font-medium",
                      activeId === t.id
                        ? "bg-blue-50 text-[#005BEA]"
                        : "text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <span className="line-clamp-2">{t.title}</span>
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 opacity-0 hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100"
                    title="Arşivle"
                    onClick={() => void onArchive(t.id)}
                  >
                    <Archive className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="border-t border-slate-100 p-3">
            <Link
              href="/hesabim"
              className="text-xs font-semibold text-slate-500 hover:text-[#005BEA]"
            >
              ← Sözleşme arşivi
            </Link>
          </div>
        </aside>

        {/* Chat */}
        <section
          className={cn(
            "flex min-h-[70vh] flex-1 flex-col bg-white lg:rounded-2xl lg:border lg:border-slate-200",
            !mobileShowChat && "hidden lg:flex",
          )}
        >
          <header className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
            <button
              type="button"
              className="text-sm font-semibold text-[#005BEA] lg:hidden"
              onClick={() => setMobileShowChat(false)}
            >
              ← Liste
            </button>
            <Sparkles className="hidden h-4 w-4 text-[#005BEA] sm:block" />
            <p className="text-sm font-semibold text-slate-800">
              Türk hukuku asistanı · dayanaklı yanıt
            </p>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {loadingMsgs ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
              </div>
            ) : messages.length === 0 ? (
              <div className="mx-auto max-w-md py-8 text-center">
                <Scale className="mx-auto h-8 w-8 text-[#005BEA]" />
                <p className="mt-3 text-base font-semibold text-slate-900">
                  Genel chatbot değil — hukuk bağlamlı asistan
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Sorunuzu yazın veya örneklerden birini seçin. Yanıtlar mümkünse
                  mevzuat dayanağıyla gelir; avukat yerine geçmez.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {ASISTAN_EXAMPLE_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      disabled={busy}
                      onClick={() => void send(q)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    m.role === "user"
                      ? "ml-auto bg-[#005BEA] text-white"
                      : "mr-auto border border-slate-200 bg-slate-50 text-slate-800",
                  )}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-p:my-2 prose-headings:mb-2 prose-headings:mt-3">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content || "…"}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  )}
                </div>
              ))
            )}
            {citations.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {citations.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800"
                  >
                    Dayanak: {c}
                  </span>
                ))}
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>

          {error ? (
            <p className="px-4 text-sm font-medium text-red-600">{error}</p>
          ) : null}

          <form
            className="border-t border-slate-100 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                placeholder="Hukuki sorunuzu yazın veya sözleşme parçası yapıştırın…"
                className="min-h-[48px] flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none ring-[#005BEA] placeholder:text-slate-400 focus:ring-2"
                disabled={busy}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
              />
              <Button
                type="submit"
                disabled={busy || !input.trim()}
                className="h-auto rounded-xl bg-[#005BEA] px-4"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Clause avukatlık hizmeti vermez. Kritik kararlarda uzman görüşü
              alın. Sohbet hesabınızda saklanır.
            </p>
          </form>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
