"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Bookmark, Loader2 } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { StreamingMarkdown } from "@/components/analysis/streaming-markdown";
import { useAuthSession } from "@/hooks/use-auth-session";
import { getMyAnalysis, setAnalysisPinned } from "@/lib/inventory/save-analysis";
import { isPinned, type InventoryRow } from "@/lib/inventory/types";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";

export default function HesabimDetailPage() {
  const params = useParams<{ id: string }>();
  const { isLoggedIn, loading: authLoading } = useAuthSession();
  const [row, setRow] = React.useState<InventoryRow | null>(null);
  const [busy, setBusy] = React.useState(true);

  React.useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn || !params.id) {
      setBusy(false);
      return;
    }
    void getMyAnalysis(params.id).then((r) => {
      setRow(r);
      setBusy(false);
    });
  }, [authLoading, isLoggedIn, params.id]);

  const pin = async () => {
    if (!row) return;
    const next = !isPinned(row);
    const ok = await setAnalysisPinned(row.id, row.ai_report, next);
    if (ok) {
      setRow({
        ...row,
        ai_report: { version: 1, ...row.ai_report, pinned: next },
      });
    }
  };

  const md = row?.ai_report?.markdown?.trim() ?? "";
  const refactor = row?.ai_report?.refactorMarkdown?.trim() ?? "";
  const flags = row?.ai_report;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/hesabim"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#005BEA]"
        >
          <ArrowLeft className="h-4 w-4" />
          Taramalarım
        </Link>

        {authLoading || busy ? (
          <p className="mt-10 flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Yükleniyor…
          </p>
        ) : !isLoggedIn ? (
          <p className="mt-10 text-sm">
            <Link href="/giris?next=/hesabim" className="font-semibold text-[#005BEA]">
              Giriş yap
            </Link>{" "}
            bu tarama için.
          </p>
        ) : !row ? (
          <p className="mt-10 text-sm text-slate-600">Kayıt bulunamadı.</p>
        ) : (
          <article className="mt-6">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-slate-900">
                {row.contract_title ?? "Tarama"}
              </h1>
              <button
                type="button"
                onClick={() => void pin()}
                className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-white hover:text-[#005BEA]"
                aria-label="Sabitle"
              >
                <Bookmark
                  className={`h-5 w-5 ${isPinned(row) ? "fill-[#005BEA] text-[#005BEA]" : ""}`}
                />
              </button>
            </div>
            {typeof row.risk_score === "number" ? (
              <p className="mt-2 text-sm text-slate-600">
                Güven / risk skoru: {row.risk_score}
              </p>
            ) : null}

            {flags?.red?.length || flags?.yellow?.length || flags?.green?.length ? (
              <div className="mt-6 space-y-3 text-sm">
                {flags.red && flags.red.length > 0 ? (
                  <FlagBlock title="Yüksek risk" items={flags.red} />
                ) : null}
                {flags.yellow && flags.yellow.length > 0 ? (
                  <FlagBlock title="Dikkat" items={flags.yellow} />
                ) : null}
                {flags.green && flags.green.length > 0 ? (
                  <FlagBlock title="Lehine" items={flags.green} />
                ) : null}
              </div>
            ) : null}

            {md ? (
              <div className="prose prose-slate mt-8 max-w-none">
                <StreamingMarkdown content={md} />
              </div>
            ) : null}
            {refactor ? (
              <div className="prose prose-slate mt-8 max-w-none">
                <h2 className="text-lg font-bold">İyileştirme</h2>
                <StreamingMarkdown content={refactor} />
              </div>
            ) : null}

            {row.original_text ? (
              <details className="mt-8 rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-800">
                  Yapıştırılan metin
                </summary>
                <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap text-xs text-slate-600">
                  {row.original_text}
                </pre>
              </details>
            ) : null}

            <LegalAiDisclaimer className="mt-10" />
          </article>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function FlagBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="font-bold text-slate-900">{title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
        {items.map((item) => (
          <li key={item.slice(0, 48)}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
