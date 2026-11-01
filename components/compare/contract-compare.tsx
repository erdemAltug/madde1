"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, GitCompare, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/legal/trust-strip";
import { compareContracts, type ClauseChange } from "@/lib/compare/clause-diff";
import { maskSensitiveText } from "@/lib/security/mask-sensitive";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const FIELD =
  "min-h-[220px] w-full resize-y rounded-xl border border-slate-300 bg-white p-3 text-base leading-relaxed text-slate-900 outline-none focus:border-[#005BEA] focus:ring-2 focus:ring-[#005BEA]/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:text-sm";

export function ContractCompare() {
  const [oldText, setOldText] = React.useState("");
  const [newText, setNewText] = React.useState("");
  const [result, setResult] = React.useState<ClauseChange[] | null>(null);
  const [showSame, setShowSame] = React.useState(false);

  const run = () => {
    // Karşılaştırma tarayıcıda yapılır; yine de ekranda kişisel veri görünmesin
    const a = maskSensitiveText(oldText).text;
    const b = maskSensitiveText(newText).text;
    const changes = compareContracts(a, b);
    setResult(changes);
    captureEvent(AnalyticsEvents.CONTRACT_COMPARE_RUN, {
      changed: changes.filter((c) => c.kind !== "same").length,
    });
  };

  const diffs = result?.filter((c) => c.kind !== "same") ?? [];
  const risky = diffs.filter((c) => "risk" in c && c.risk.length > 0).length;
  const sameCount = (result?.length ?? 0) - diffs.length;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="eski" className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Eski sürüm (imzaladığınız)
          </label>
          <textarea id="eski" data-ph-mask value={oldText} onChange={(e) => setOldText(e.target.value)} className={FIELD} placeholder="Eski sözleşme metnini yapıştırın…" />
        </div>
        <div>
          <label htmlFor="yeni" className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Yeni sürüm (size gönderilen)
          </label>
          <textarea id="yeni" data-ph-mask value={newText} onChange={(e) => setNewText(e.target.value)} className={FIELD} placeholder="Yeni gelen metni yapıştırın…" />
        </div>
      </div>
      <Button
        type="button"
        onClick={run}
        disabled={oldText.trim().length < 40 || newText.trim().length < 40}
        className="mt-4 h-12 w-full rounded-xl bg-[#005BEA] text-base font-semibold sm:w-auto sm:px-8"
      >
        <GitCompare className="mr-2 h-4 w-4" />
        Değişen maddeleri göster
      </Button>

      {result ? (
        <section className="mt-10" aria-live="polite">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {diffs.length === 0
              ? "İki sürüm arasında madde farkı bulamadık."
              : `${diffs.length} madde değişmiş${risky ? `; ${risky} tanesine dikkat edin` : ""}.`}
          </h2>
          {sameCount > 0 ? (
            <button
              type="button"
              onClick={() => setShowSame((v) => !v)}
              className="mt-2 text-sm font-medium text-[#005BEA] hover:underline"
            >
              {showSame ? "Değişmeyen maddeleri gizle" : `${sameCount} değişmeyen maddeyi de göster`}
            </button>
          ) : null}

          <ol className="mt-6 space-y-4">
            {result.map((c, idx) =>
              c.kind === "same" && !showSame ? null : <ChangeCard key={idx} change={c} />,
            )}
          </ol>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/?open=1"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-[#005BEA]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              Yeni sürümü baştan sona tarat <ArrowRight className="h-4 w-4 text-[#005BEA]" />
            </Link>
            <Link
              href="/cevap-taslagi"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-[#005BEA]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              Karşı tarafa itiraz yaz <ArrowRight className="h-4 w-4 text-[#005BEA]" />
            </Link>
          </div>
          <TrustStrip className="mt-6" />
        </section>
      ) : null}
    </div>
  );
}

function ChangeCard({ change }: { change: ClauseChange }) {
  const meta =
    change.kind === "added"
      ? { label: "Yeni eklenen madde", icon: Plus, bar: "border-l-amber-500" }
      : change.kind === "removed"
        ? { label: "Çıkarılan madde", icon: Minus, bar: "border-l-slate-400" }
        : change.kind === "changed"
          ? { label: "Değişen madde", icon: GitCompare, bar: "border-l-[#005BEA]" }
          : { label: "Değişmedi", icon: GitCompare, bar: "border-l-slate-200" };
  const title =
    change.kind === "changed" ? change.after.title : change.clause.title;
  const risk = change.kind === "same" ? [] : change.risk;
  const Icon = meta.icon;

  return (
    <li className={cn("rounded-xl border border-l-4 border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900", meta.bar)}>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <Icon className="h-3.5 w-3.5" aria-hidden /> {meta.label}
      </p>
      <h3 className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{title}</h3>

      {risk.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {risk.map((r) => (
            <li key={r.label} className="flex items-start gap-1.5 text-sm text-amber-800 dark:text-amber-300">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>
                <strong>{r.label}:</strong> {r.hint}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-3 whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-slate-800 dark:text-slate-200">
        {change.kind === "changed"
          ? change.ops.map((o, i) =>
              o.type === "same" ? (
                <span key={i}>{o.text}</span>
              ) : o.type === "add" ? (
                <ins key={i} className="rounded bg-emerald-100 px-0.5 text-emerald-900 no-underline dark:bg-emerald-900/40 dark:text-emerald-200">
                  {o.text}
                </ins>
              ) : (
                <del key={i} className="rounded bg-red-100 px-0.5 text-red-900 dark:bg-red-900/40 dark:text-red-200">
                  {o.text}
                </del>
              ),
            )
          : change.clause.body}
      </p>
    </li>
  );
}
