"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, FileSearch, FolderOpen, Loader2, Plus } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import { useAuthSession } from "@/hooks/use-auth-session";
import {
  listMyAnalyses,
  setAnalysisPinned,
} from "@/lib/inventory/save-analysis";
import { isPinned, type InventoryRow } from "@/lib/inventory/types";
import { KIRA_ANALIZI_TOOL_PATH } from "@/lib/seo/free-tools-routes";

function formatTr(iso: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function HesabimPage() {
  const { isLoggedIn, loading: authLoading } = useAuthSession();
  const [rows, setRows] = React.useState<InventoryRow[]>([]);
  const [busy, setBusy] = React.useState(true);

  const load = React.useCallback(async () => {
    setBusy(true);
    const list = await listMyAnalyses();
    setRows(list);
    setBusy(false);
  }, []);

  React.useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) {
      setBusy(false);
      return;
    }
    void load();
  }, [authLoading, isLoggedIn, load]);

  const togglePin = async (row: InventoryRow) => {
    const next = !isPinned(row);
    const ok = await setAnalysisPinned(row.id, row.ai_report, next);
    if (ok) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? { ...r, ai_report: { ...r.ai_report, version: 1, pinned: next } }
            : r,
        ),
      );
    }
  };

  const pinned = rows.filter(isPinned);
  const rest = rows.filter((r) => !isPinned(r));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-wide text-[#005BEA]">
          Kişisel asistan
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Taramalarım
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-600">
          Kaydettiğin sözleşmeler, tuzak taramaları ve risk notları burada.
          Avukatlık yerine geçmez; senin envanterin.
        </p>

        <div className="mt-6">
          <Button className="rounded-xl bg-[#005BEA] font-semibold hover:bg-[#0047b8]" asChild>
            <Link href={KIRA_ANALIZI_TOOL_PATH}>
              <Plus className="mr-1 h-4 w-4" />
              Yeni tarama
            </Link>
          </Button>
        </div>

        {authLoading || busy ? (
          <p className="mt-12 flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Envanter yükleniyor…
          </p>
        ) : !isLoggedIn ? (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <FolderOpen className="mx-auto h-10 w-10 text-slate-400" />
            <p className="mt-3 text-sm font-semibold text-slate-800">
              Envanter hesapla açılır
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Ücretsiz kayıt ol; taramaların bu sayfada birikir.
            </p>
            <Button className="mt-5 rounded-xl bg-[#005BEA] font-semibold" asChild>
              <Link href="/giris?kayit=1&next=/hesabim">Ücretsiz kayıt</Link>
            </Button>
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <FileSearch className="mx-auto h-10 w-10 text-slate-400" />
            <p className="mt-3 text-sm font-semibold text-slate-800">
              Henüz kayıtlı tarama yok
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Girişliyken bir sözleşme tara; rapor otomatik bu listeye düşer.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {pinned.length > 0 ? (
              <section>
                <h2 className="text-sm font-bold text-slate-800">Sabitlenenler</h2>
                <ul className="mt-3 space-y-2">
                  {pinned.map((row) => (
                    <InventoryCard
                      key={row.id}
                      row={row}
                      onPin={() => void togglePin(row)}
                    />
                  ))}
                </ul>
              </section>
            ) : null}
            <section>
              <h2 className="text-sm font-bold text-slate-800">Tüm taramalar</h2>
              <ul className="mt-3 space-y-2">
                {rest.map((row) => (
                  <InventoryCard
                    key={row.id}
                    row={row}
                    onPin={() => void togglePin(row)}
                  />
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function InventoryCard({
  row,
  onPin,
}: {
  row: InventoryRow;
  onPin: () => void;
}) {
  const pinned = isPinned(row);
  const source = row.ai_report?.source;
  return (
    <li className="flex items-stretch gap-2 rounded-xl border border-slate-200 bg-white">
      <Link
        href={`/hesabim/${row.id}`}
        className="min-w-0 flex-1 px-4 py-3 hover:bg-slate-50"
      >
        <p className="truncate text-sm font-semibold text-slate-900">
          {row.contract_title ?? "Tarama"}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">
          {formatTr(row.created_at)}
          {typeof row.risk_score === "number" ? ` · skor ${row.risk_score}` : ""}
          {source ? ` · ${source}` : ""}
        </p>
      </Link>
      <button
        type="button"
        onClick={onPin}
        className="shrink-0 px-3 text-slate-400 hover:text-[#005BEA]"
        aria-label={pinned ? "Sabiti kaldır" : "Sabitle"}
      >
        <Bookmark className={`h-4 w-4 ${pinned ? "fill-[#005BEA] text-[#005BEA]" : ""}`} />
      </button>
    </li>
  );
}
