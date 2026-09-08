"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  FileDown,
  FileWarning,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeaserData } from "@/components/b2c/risk-teaser-dashboard";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

type Props = {
  teaser: TeaserData;
  isLoggedIn?: boolean;
  onAnalyzeAgain: () => void;
  onRequestFullReport: () => void;
};

function riskPercentFromTeaser(data: TeaserData): number {
  if (typeof data.securityScore === "number" && !Number.isNaN(data.securityScore)) {
    return Math.min(100, Math.max(5, 100 - Math.round(data.securityScore)));
  }
  return Math.min(
    95,
    Math.max(35, data.criticalRiskCount * 18 + data.missingClauseCount * 10),
  );
}

function levelFromRisk(pct: number): {
  label: string;
  tone: "ok" | "mid" | "high";
} {
  if (pct >= 60) return { label: "Yüksek risk", tone: "high" };
  if (pct >= 40) return { label: "Orta risk", tone: "mid" };
  return { label: "Düşük risk", tone: "ok" };
}

function buildRevisionDraft(teaser: TeaserData): string {
  const risks =
    teaser.categoryTitles.length > 0
      ? teaser.categoryTitles
          .slice(0, 3)
          .map((t, i) => `${i + 1}. ${t}`)
          .join("\n")
      : "1. Sözleşmede aleyhe olabilecek maddeler ön incelemede işaretlendi.";

  return `Merhaba,

Sözleşme taslağını inceledim. Ön incelemede şu başlıklar dikkatimi çekti:

${risks}

Bu maddelerin yeniden düzenlenmesini veya yazılı açıklama talep ediyorum. Uygun bir metin öneriniz varsa görüşmeye açığım.

Not: Bu mesaj bilgilendirme amaçlı bir taslaktır; avukatlık hizmeti yerine geçmez.

Saygılarımla`;
}

const MISSING_FALLBACKS = [
  "Erken fesih halinde tazminat üst sınırı belirtilmemiş.",
  "Bildirim / ihtar süreleri net tanımlanmamış.",
  "Depozito iade koşulları ve süre eksik veya belirsiz.",
];

/** 4’lü actionable analiz çıktısı */
export function StepResults({
  teaser,
  isLoggedIn,
  onAnalyzeAgain,
  onRequestFullReport,
}: Props) {
  const riskPct = riskPercentFromTeaser(teaser);
  const level = levelFromRisk(riskPct);
  const [copied, setCopied] = React.useState(false);

  const criticalRisks = [
    teaser.categoryTitles[0]
      ? `Madde riski: ${teaser.categoryTitles[0]} — aleyhinize işleyebilir; mevzuat ve içtihat bağlamında kontrol edin.`
      : "Haksız cezai şart veya tek taraflı fesih benzeri madde riski tespit edildi.",
    teaser.categoryTitles[1]
      ? `Madde riski: ${teaser.categoryTitles[1]} — yazılı metinde açıkça aleyhe düzenlenmiş olabilir.`
      : "Artış, ücret veya tahliye maddelerinde dengesizlik sinyali var.",
  ].slice(0, Math.max(1, Math.min(2, teaser.criticalRiskCount || 2)));

  const missing = Array.from(
    { length: Math.max(1, Math.min(3, teaser.missingClauseCount || 1)) },
    (_, i) => MISSING_FALLBACKS[i] ?? MISSING_FALLBACKS[0],
  );

  const revision = buildRevisionDraft(teaser);

  const copyRevision = async () => {
    try {
      await navigator.clipboard.writeText(revision);
      setCopied(true);
      captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
        source: "wizard_revision_copy",
      });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const onFullReport = () => {
    captureEvent(AnalyticsEvents.DETAIL_UNLOCK_SIGNUP_CLICKED, {
      source: "wizard_full_report_pdf",
    });
    onRequestFullReport();
  };

  return (
    <div className="space-y-5">
      {/* 1. Risk skoru */}
      <div
        className={cn(
          "rounded-2xl border-2 px-4 py-4",
          level.tone === "high" && "border-red-200 bg-red-50",
          level.tone === "mid" && "border-amber-200 bg-amber-50",
          level.tone === "ok" && "border-emerald-200 bg-emerald-50",
        )}
      >
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          1 · Risk skoru
        </p>
        <div className="mt-1 flex flex-wrap items-end gap-3">
          <p className="text-3xl font-extrabold tabular-nums text-deep-navy">
            {riskPct}
          </p>
          <p className="pb-1 text-sm font-bold text-slate-800">{level.label}</p>
        </div>
        <p className="mt-1 text-xs font-medium text-slate-600">
          {teaser.criticalRiskCount} kritik risk
          {teaser.missingClauseCount > 0
            ? ` · ${teaser.missingClauseCount} eksik koruyucu madde`
            : null}
        </p>
      </div>

      {/* 2. Kritik riskler */}
      <section className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          2 · Kritik riskler (aleyhte maddeler)
        </p>
        <ul className="space-y-2">
          {criticalRisks.map((text, i) => (
            <li
              key={text}
              className="relative overflow-hidden rounded-xl border border-red-200/80 bg-red-50/60 px-3.5 py-3"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                {isLoggedIn ? (
                  <p className="text-sm font-medium leading-snug text-red-950">
                    {text}
                  </p>
                ) : (
                  <div className="min-w-0 flex-1">
                    <p className="select-none text-sm font-medium text-red-950/80 blur-[4px]">
                      [Kilitli Risk #{i + 1}]: {text}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-red-700">
                      <Lock className="h-3 w-3" />
                      Detay için ücretsiz kayıt / rapor
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Eksik maddeler */}
      <section className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          3 · Eksik koruyucu maddeler
        </p>
        <ul className="space-y-2">
          {missing.map((text) => (
            <li
              key={text}
              className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-3"
            >
              <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <p className="text-sm font-medium leading-snug text-amber-950">
                {text}
              </p>
            </li>
          ))}
          <li className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <p className="text-sm font-semibold text-emerald-950">
              Depozito / ücret gibi bazı maddeler yasal çerçevede görünebilir —
              tam metin raporda doğrulanır.
            </p>
          </li>
        </ul>
      </section>

      {/* 4. Tek tıkla çıktılar */}
      <section className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          4 · Tek tıkla çıktılar
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-slate-800">
              Karşı tarafa revizyon metni (WhatsApp / e-posta)
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 rounded-lg text-xs font-semibold"
              onClick={() => void copyRevision()}
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Kopyalandı" : "Kopyala"}
            </Button>
          </div>
          <pre className="max-h-36 overflow-y-auto whitespace-pre-wrap rounded-lg bg-white p-2.5 text-[11px] leading-relaxed text-slate-700">
            {revision}
          </pre>
        </div>

        <Button
          size="lg"
          className="h-12 w-full rounded-xl bg-[var(--cta-primary)] text-sm font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:bg-[#1d4ed8] sm:text-base"
          onClick={onFullReport}
        >
          <FileDown className="mr-1 h-4 w-4 shrink-0" aria-hidden />
          Clause Ön İnceleme Raporu (PDF)
        </Button>
      </section>

      {isLoggedIn ? (
        <Button variant="outline" className="w-full rounded-xl font-semibold" asChild>
          <Link href="/analiz">Tam analizi aç · Arşive kaydet</Link>
        </Button>
      ) : null}

      <button
        type="button"
        onClick={onAnalyzeAgain}
        className="w-full text-center text-sm font-semibold text-slate-500 hover:text-deep-navy"
      >
        Başka bir sözleşme tara
      </button>

      <p className="text-center text-[11px] leading-relaxed text-slate-400">
        Özet tahmindir; Clause avukatlık veya resmi danışmanlık vermez.
      </p>
    </div>
  );
}
