"use client";

import * as React from "react";
import { CheckSquare, Copy, Laptop } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolContractScanCta } from "@/components/growth/tool-contract-scan-cta";
import { ToolResultSignupBar } from "@/components/growth/tool-result-signup-bar";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const CHECKS = [
  {
    id: "ip",
    label: "Kaynak kod / tasarım fikri mülkiyeti kime ait net yazıyor",
    risk: "Belirsiz IP maddesi iş bitince ihtilaf doğurur.",
  },
  {
    id: "scope",
    label: "Kapsam, teslimatlar ve kabul kriterleri sayılıyor",
    risk: "Kapsam kayması ücretsiz ekstra işe dönüşür.",
  },
  {
    id: "revisions",
    label: "Revizyon hakkı sayı ve süre ile sınırlı",
    risk: "Sınırsız revizyon = sınırsız emek.",
  },
  {
    id: "payment",
    label: "Ödeme takvimi, gecikme faizi / askıya alma hakkı var",
    risk: "Ödemesiz teslim riskini artırır.",
  },
  {
    id: "nda",
    label: "NDA / gizlilik karşılıklı ve makul süreli",
    risk: "Tek taraflı ağır NDA müzakere gücünü kırar.",
  },
  {
    id: "sla",
    label: "SLA / destek süresi ve cezai şart orantılı",
    risk: "Orantısız ceza TBK açısından tartışmalı olabilir.",
  },
  {
    id: "termination",
    label: "Fesih ve erken çıkışta ödeme / IP durumu net",
    risk: "Yarım işte hem para hem hak kaybı.",
  },
  {
    id: "portfolio",
    label: "Portföy / referans kullanım hakkı açıkça tanınıyor",
    risk: "Referans yasağı pazarlamayı engeller.",
  },
] as const;

function buildSummary(missing: typeof CHECKS[number][]): string {
  if (!missing.length) {
    return `Freelance sözleşme kontrol listesi — tüm kritik maddeler işaretli görünüyor. Yine de metni Clause ile taratın; gizli cezai şart veya tek taraflı fesih kaçabilir.

Bu özet bilgilendirme amaçlıdır; avukatlık yerine geçmez.`;
  }
  return `Freelance sözleşme ön kontrol özeti

Eksik / zayıf görünen maddeler:
${missing.map((m) => `- ${m.label}: ${m.risk}`).join("\n")}

Öneri: Sözleşme metnini Clause freelance tarayıcısına yapıştırın; IP, revizyon ve ödeme maddelerini AI ile kontrol edin.

Bu özet bilgilendirme amaçlıdır; avukatlık yerine geçmez.`;
}

export function FreelanceChecklistWidget({
  embedded,
}: {
  embedded?: boolean;
} = {}) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [copied, setCopied] = React.useState(false);
  const [barDismissed, setBarDismissed] = React.useState(false);
  const usedRef = React.useRef(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (!usedRef.current) {
      usedRef.current = true;
      captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
        tool: "freelance_checklist_page",
        surface: embedded ? "embed" : "tool_page",
      });
    }
  };

  const missing = CHECKS.filter((c) => !selected.has(c.id));
  const summary = buildSummary(missing);
  const score = Math.round((selected.size / CHECKS.length) * 100);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Laptop className="h-5 w-5 text-[#005BEA]" />
            Freelance sözleşme kontrol listesi
          </CardTitle>
          <p className="text-xs leading-relaxed text-slate-500">
            Sözleşmenizde olan maddeleri işaretleyin; skor ve özet notu alın.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={cn(
              "rounded-xl border-2 px-4 py-3",
              score >= 75
                ? "border-emerald-200 bg-emerald-50/80"
                : score >= 40
                  ? "border-amber-200 bg-amber-50/80"
                  : "border-red-200 bg-red-50/80",
            )}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Hazırlık skoru
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-madde-ink">
              %{score}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {selected.size}/{CHECKS.length} kritik madde işaretli
            </p>
          </div>

          <ul className="space-y-2">
            {CHECKS.map((c) => {
              const on = selected.has(c.id);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => toggle(c.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                      on
                        ? "border-[#005BEA]/40 bg-[#005BEA]/[0.06]"
                        : "border-slate-200 bg-white hover:bg-slate-50",
                    )}
                  >
                    <CheckSquare
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        on ? "text-[#005BEA]" : "text-slate-300",
                      )}
                    />
                    <span>
                      <span className="text-sm font-semibold text-slate-800">
                        {c.label}
                      </span>
                      {!on ? (
                        <span className="mt-0.5 block text-[11px] text-slate-500">
                          {c.risk}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-slate-800">Özet notu</p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 rounded-lg text-xs font-semibold"
                onClick={() => void copy()}
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Kopyalandı" : "Kopyala"}
              </Button>
            </div>
            <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-700">
              {summary}
            </pre>
          </div>

          {!embedded ? (
            <ToolContractScanCta
              source="/araclar/freelance-sozlesme-kontrol-listesi"
              href="/sozlesme-analizi/freelance-yazilim-kontrati"
              title="Fikri mülkiyet veya revizyon maddesi gizli tuzak mı?"
              body="Sözleşmeni yapıştır, 15 saniyede AI ile tarayalım."
              ctaLabel="Freelance kontrati tara"
            />
          ) : null}
        </CardContent>
      </Card>

      {!embedded ? (
        <ToolResultSignupBar
          source="/araclar/freelance-sozlesme-kontrol-listesi"
          visible={selected.size > 0 && !barDismissed}
          onDismiss={() => setBarDismissed(true)}
        />
      ) : null}
    </>
  );
}
