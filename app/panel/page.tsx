"use client";

import * as React from "react";
import Link from "next/link";
import {
  BellRing,
  Check,
  FileSearch,
  FolderOpen,
  GitCompare,
  Landmark,
  Loader2,
  Send,
  MessageSquareText,
  Plus,
  Reply,
  Scale,
  Trash2,
} from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import { CountdownChip, formatTrDate } from "@/components/assistant/countdown-chip";
import { useAuthSession } from "@/hooks/use-auth-session";
import { listMyAnalyses } from "@/lib/inventory/save-analysis";
import type { InventoryRow } from "@/lib/inventory/types";
import {
  EVENT_KIND_LABELS,
  addEvents,
  deleteEvent,
  listMyEvents,
  setEventDone,
  type LegalEvent,
} from "@/lib/assistant/events";
import { daysUntil, type LegalEventKind } from "@/lib/assistant/date-extract";
import { captureEvent } from "@/lib/analytics/capture";
import { cn } from "@/lib/utils";
import { PushToggle } from "@/components/pwa/push-toggle";
import { DarkScope, ThemeToggle } from "@/components/theme/dark-scope";
import { relevantUpdates } from "@/lib/legal/regulation-updates";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { useRouter } from "next/navigation";

const QUICK_ACTIONS = [
  {
    href: "/?dene=1",
    title: "Sözleşme tara",
    text: "Riskleri ve tarihleri çıkaralım",
    icon: FileSearch,
  },
  {
    href: "/cevap-taslagi",
    title: "Karşı tarafa cevap",
    text: "Ev sahibine, işverene, müşteriye",
    icon: Reply,
  },
  {
    href: "/asistan",
    title: "Asistana sor",
    text: "Sorunuzu sade dilde cevaplayalım",
    icon: MessageSquareText,
  },
  {
    href: "/haklarim/kontrol",
    title: "Haklarım Kontrolü",
    text: "İşten çıkarıldım, ev sahibi çıkın diyor…",
    icon: Scale,
  },
  {
    href: "/karsilastir",
    title: "Sürüm karşılaştır",
    text: "Yeni gelen sözleşmede ne değişti?",
    icon: GitCompare,
  },
] as const;

/** Panelin altında sabit soru kutusu: soruyu asistana taşır. */
function AskBar() {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!q.trim()) return;
        router.push(`/asistan?soru=${encodeURIComponent(q.trim().slice(0, 500))}`);
      }}
      className="sticky bottom-20 z-30 mt-10 flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 p-2 shadow-lg backdrop-blur dark:bg-slate-900/95 md:bottom-4"
    >
      <label htmlFor="panel-soru" className="sr-only">
        Asistana sorun
      </label>
      <input
        id="panel-soru"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Sözleşmelerinizle ilgili bir şey sorun…"
        className="h-11 flex-1 rounded-xl bg-transparent px-3 text-base outline-none sm:text-sm"
      />
      <Button type="submit" disabled={!q.trim()} className="h-11 rounded-xl bg-[#005BEA] px-4 text-white" aria-label="Sor">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

const KIND_OPTIONS: LegalEventKind[] = [
  "rent_increase",
  "renewal",
  "contract_end",
  "notice",
  "payment",
  "probation",
  "deadline",
  "other",
];

function scoreTone(score: number | null): { label: string; className: string } {
  if (score === null || Number.isNaN(score)) {
    return { label: "Skor yok", className: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400" };
  }
  if (score < 40) return { label: `Güven ${score}/100`, className: "bg-red-50 text-red-700" };
  if (score < 70) return { label: `Güven ${score}/100`, className: "bg-amber-50 text-amber-800" };
  return { label: `Güven ${score}/100`, className: "bg-emerald-50 text-emerald-700" };
}

function AddEventForm({ onAdded }: { onAdded: (e: LegalEvent[]) => void }) {
  const [title, setTitle] = React.useState("");
  const [kind, setKind] = React.useState<LegalEventKind>("rent_increase");
  const [date, setDate] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!title.trim() || !date) {
      setError("Başlık ve tarih gerekli.");
      return;
    }
    setBusy(true);
    setError(null);
    const saved = await addEvents([{ title, kind, due_date: date }]);
    setBusy(false);
    if (!saved) {
      setError("Kaydedilemedi. Tekrar deneyin.");
      return;
    }
    captureEvent("reminders_saved", { count: 1, surface: "panel_manual" });
    onAdded(saved);
    setTitle("");
    setDate("");
  };

  return (
    <form onSubmit={(e) => void submit(e)} className="grid gap-2 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
      <label className="block">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Ne hatırlatalım?</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Örn. Kira artış dönemi"
          maxLength={160}
          className="mt-1 h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-base outline-none focus:border-[#005BEA] focus:ring-2 focus:ring-[#005BEA]/20 sm:text-sm"
        />
      </label>
      <label className="block">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tür</span>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as LegalEventKind)}
          className="mt-1 h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-base outline-none focus:border-[#005BEA] sm:text-sm"
        >
          {KIND_OPTIONS.map((k) => (
            <option key={k} value={k}>
              {EVENT_KIND_LABELS[k]}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tarih</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-base outline-none focus:border-[#005BEA] sm:text-sm"
        />
      </label>
      <Button
        type="submit"
        disabled={busy}
        className="h-11 rounded-xl bg-[#005BEA] font-semibold text-white hover:bg-[#004BC4]"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Plus className="mr-1.5 h-4 w-4" aria-hidden />}
        Ekle
      </Button>
      {error ? (
        <p className="text-sm text-red-600 sm:col-span-4" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}

export default function PanelPage() {
  const { user, isLoggedIn, loading: authLoading } = useAuthSession();
  const [events, setEvents] = React.useState<LegalEvent[]>([]);
  const [contracts, setContracts] = React.useState<InventoryRow[]>([]);
  const [busy, setBusy] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);

  const load = React.useCallback(async () => {
    setBusy(true);
    const [ev, rows] = await Promise.all([listMyEvents(), listMyAnalyses()]);
    setEvents(ev);
    setContracts(rows);
    setBusy(false);
  }, []);

  React.useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) {
      setBusy(false);
      return;
    }
    void load();
    captureEvent("panel_viewed", {});
  }, [authLoading, isLoggedIn, load]);

  const markDone = async (e: LegalEvent) => {
    setEvents((prev) => prev.filter((x) => x.id !== e.id));
    const ok = await setEventDone(e.id, true);
    if (!ok) void load();
  };

  const remove = async (e: LegalEvent) => {
    setEvents((prev) => prev.filter((x) => x.id !== e.id));
    const ok = await deleteEvent(e.id);
    if (!ok) void load();
  };

  const updates = React.useMemo(() => relevantUpdates(events.map((e) => e.kind)), [events]);
  React.useEffect(() => {
    if (updates.length > 0) captureEvent(AnalyticsEvents.REGULATION_ALERT_VIEWED, { count: updates.length });
  }, [updates.length]);
  const upcoming = events.filter((e) => daysUntil(e.due_date) >= 0);
  const overdue = events.filter((e) => daysUntil(e.due_date) < 0);
  const next = upcoming.at(0);
  const firstName =
    (user?.user_metadata?.full_name as string | undefined)?.split(" ").at(0) ??
    (user?.user_metadata?.name as string | undefined)?.split(" ").at(0) ??
    null;

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <SiteNavbar />
      <DarkScope>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {!authLoading && !isLoggedIn ? (
          <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Hukuki hayatınız tek yerde</h1>
            <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-400">
              Sözleşmelerinizi saklayın, kira artışı ve sözleşme sonu gibi tarihleri biz takip edelim.
              Zamanı gelmeden e-postayla hatırlatalım.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              <Button asChild className="h-11 rounded-xl bg-[#005BEA] px-6 font-semibold text-white hover:bg-[#004BC4]">
                <Link href="/giris?next=/panel">Giriş yap veya ücretsiz kayıt ol</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-xl px-6 font-semibold">
                <Link href="/?dene=1">Önce bir sözleşme tara</Link>
              </Button>
            </div>
          </section>
        ) : (
          <>
            <header>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#005BEA]">Hukuki hayatım</p>
                <ThemeToggle />
              </div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {firstName ? `Merhaba ${firstName}` : "Merhaba"}
              </h1>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
                {busy
                  ? "Takviminiz yükleniyor…"
                  : next
                    ? `Sıradaki: ${next.title} — ${formatTrDate(next.due_date)}.`
                    : "Yaklaşan bir tarih yok. Bir sözleşme tarayın, tarihlerini biz çıkaralım."}
              </p>
            </header>

            <nav aria-label="Hızlı eylemler" className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
              {QUICK_ACTIONS.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#005BEA]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005BEA]/40"
                >
                  <a.icon className="h-5 w-5 text-[#005BEA]" aria-hidden />
                  <span className="mt-3 block text-sm font-bold text-slate-900 dark:text-slate-50">{a.title}</span>
                  <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{a.text}</span>
                </Link>
              ))}
            </nav>

            <section id="takvim" className="mt-10 scroll-mt-24" aria-labelledby="takvim-baslik">
              <div className="flex items-center justify-between gap-3">
                <h2 id="takvim-baslik" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-50">
                  <BellRing className="h-5 w-5 text-[#005BEA]" aria-hidden />
                  Yaklaşan tarihler
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-semibold"
                  onClick={() => setShowForm((v) => !v)}
                  aria-expanded={showForm}
                >
                  <Plus className="mr-1 h-4 w-4" aria-hidden />
                  Tarih ekle
                </Button>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Her tarih için 30, 7 ve 1 gün kala e-postayla hatırlatırız.
              </p>
              <div className="mt-3">
                <PushToggle />
              </div>

              {showForm ? (
                <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                  <AddEventForm
                    onAdded={(saved) => {
                      setEvents((prev) =>
                        [...prev, ...saved].sort((a, b) => a.due_date.localeCompare(b.due_date)),
                      );
                      setShowForm(false);
                    }}
                  />
                </div>
              ) : null}

              {busy ? (
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Yükleniyor…
                </div>
              ) : events.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-white/60 dark:bg-slate-900/60 p-6 text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Henüz takip edilen bir tarih yok. Kira sözleşmenizi tarayın; yenileme, zam dönemi ve
                    bildirim süresini otomatik çıkaralım.
                  </p>
                  <Button asChild className="mt-4 h-10 rounded-xl bg-[#005BEA] font-semibold text-white hover:bg-[#004BC4]">
                    <Link href="/?dene=1">Sözleşme tara</Link>
                  </Button>
                </div>
              ) : (
                <ul className="mt-4 space-y-2">
                  {[...overdue, ...upcoming].map((e) => (
                    <li
                      key={e.id}
                      className={cn(
                        "flex items-start gap-3 rounded-2xl border bg-white dark:bg-slate-900 p-4 shadow-sm",
                        daysUntil(e.due_date) < 0 ? "border-slate-200 dark:border-slate-700 opacity-75" : "border-slate-200 dark:border-slate-700",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-50">{e.title}</span>
                          <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                            {EVENT_KIND_LABELS[e.kind] ?? "Diğer"}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">{formatTrDate(e.due_date)}</p>
                        {e.notes ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{e.notes}</p> : null}
                        {e.kind === "rent_increase" ? (
                          <Link
                            href="/araclar/kira-sozlesmesi-artis-orani-hesaplama"
                            className="mt-2 inline-block text-xs font-semibold text-[#005BEA] hover:underline"
                          >
                            Bu yılki yasal tavanı hesapla →
                          </Link>
                        ) : null}
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <CountdownChip date={e.due_date} />
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => void markDone(e)}
                            className="rounded-lg p-2 text-slate-500 dark:text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700"
                            aria-label={`${e.title} tamamlandı`}
                            title="Tamamlandı"
                          >
                            <Check className="h-4 w-4" aria-hidden />
                          </button>
                          <button
                            type="button"
                            onClick={() => void remove(e)}
                            className="rounded-lg p-2 text-slate-500 dark:text-slate-400 transition hover:bg-red-50 hover:text-red-700"
                            aria-label={`${e.title} sil`}
                            title="Sil"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {updates.length > 0 ? (
              <section className="mt-12" aria-labelledby="degisiklik-baslik">
                <h2 id="degisiklik-baslik" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-50">
                  <Landmark className="h-5 w-5 text-[#005BEA]" aria-hidden />
                  Sizi etkileyen değişiklikler
                </h2>
                <ul className="mt-4 space-y-3">
                  {updates.map((u) => (
                    <li key={u.id} className="rounded-2xl border border-l-4 border-slate-200 dark:border-slate-700 border-l-[#005BEA] bg-white dark:bg-slate-900 p-4 shadow-sm">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{formatTrDate(u.publishedAt)}</p>
                      <p className="mt-0.5 font-bold text-slate-900 dark:text-slate-50">{u.title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{u.body}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Kaynak: {u.source}</p>
                      <Link href={u.cta.href} className="mt-2 inline-block text-sm font-semibold text-[#005BEA] hover:underline">
                        {u.cta.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="mt-12" aria-labelledby="cuzdan-baslik">
              <div className="flex items-center justify-between gap-3">
                <h2 id="cuzdan-baslik" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-50">
                  <FolderOpen className="h-5 w-5 text-[#005BEA]" aria-hidden />
                  Sözleşme cüzdanım
                </h2>
                <Link href="/hesabim" className="text-sm font-semibold text-[#005BEA] hover:underline">
                  Tümü
                </Link>
              </div>

              {busy ? null : contracts.length === 0 ? (
                <p className="mt-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-white/60 dark:bg-slate-900/60 p-6 text-center text-sm text-slate-600 dark:text-slate-400">
                  Taradığınız sözleşmeler burada birikir. Kira, iş, hizmet ve abonelik sözleşmelerinizi tek
                  yerde tutun.
                </p>
              ) : (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {contracts.slice(0, 6).map((c) => {
                    const tone = scoreTone(c.risk_score);
                    const red = c.ai_report?.teaser?.criticalRiskCount ?? c.ai_report?.red?.length ?? null;
                    return (
                      <li key={c.id}>
                        <Link
                          href={`/hesabim/${c.id}`}
                          className="block h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm transition hover:border-[#005BEA]/40 hover:shadow-md"
                        >
                          <span className="line-clamp-2 text-sm font-bold text-slate-900 dark:text-slate-50">
                            {c.contract_title || "Adsız sözleşme"}
                          </span>
                          <span className="mt-2 flex flex-wrap items-center gap-2">
                            <span className={cn("rounded-md px-1.5 py-0.5 text-[11px] font-semibold", tone.className)}>
                              {tone.label}
                            </span>
                            {typeof red === "number" && red > 0 ? (
                              <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[11px] font-semibold text-red-700">
                                {red} kritik madde
                              </span>
                            ) : null}
                          </span>
                          <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">
                            {formatTrDate(c.created_at.slice(0, 10))}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <AskBar />

            <p className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
              Clause bir ön kontrol aracıdır, hukuki tavsiye değildir. Önemli kararlardan önce bir avukata danışın.
            </p>
          </>
        )}
      </main>
      </DarkScope>
      <SiteFooter showAsk={false} />
    </div>
  );
}
