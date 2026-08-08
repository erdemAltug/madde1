"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, Scale } from "lucide-react";
import {
  KidemTazminatiCalculator,
  IhbarTazminatiCalculator,
} from "@/components/growth/severance-calculators";
import { ToolResultSignupBar } from "@/components/growth/tool-result-signup-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

const MOBBING_CHECKS = [
  {
    id: "pressure",
    label: "İstifaya zorlama, hakaret veya sürekli baskı var",
  },
  {
    id: "docs",
    label: "Yazılı / kayıtlı kanıtım var (mesaj, e-posta, tanık)",
  },
  {
    id: "health",
    label: "Sağlık raporu veya psikolojik destek kaydı var",
  },
  {
    id: "pay",
    label: "Ücret, fazla mesai veya SGK bildirimi aksıyor",
  },
  {
    id: "duration",
    label: "En az 1 yıl çalıştım (kıdem için kritik eşik)",
  },
] as const;

function buildMobbingDraft(selected: Set<string>): string {
  const points = MOBBING_CHECKS.filter((c) => selected.has(c.id)).map(
    (c) => `- ${c.label}`,
  );

  return `Konu: İşyerindeki baskı / haklı nedenle fesih değerlendirme talebi (taslak)

Sayın Yetkili,

Aşağıdaki durumlar nedeniyle iş sözleşmemin devamının çekilmez hale geldiğini düşünüyorum:

${points.length ? points.join("\n") : "- (İşaretlediğiniz maddeler burada listelenir)"}

İş Kanunu çerçevesinde haklı nedenle fesih, kıdem/ihbar ve diğer alacaklarımın saklı olduğunu bildiririm. Bu metin bilgilendirme amaçlı bir taslaktır; somut olayda avukat onayı olmadan noter ihtarı veya dava dilekçesi olarak kullanılmamalıdır.

Saygılarımla`;
}

export function TazminatHub() {
  const [checks, setChecks] = React.useState<Set<string>>(new Set());
  const [copied, setCopied] = React.useState(false);
  const [barDismissed, setBarDismissed] = React.useState(false);
  const usedRef = React.useRef(false);

  const toggle = (id: string) => {
    setChecks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (!usedRef.current) {
      usedRef.current = true;
      captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
        tool: "tazminat_hub_page",
        surface: "tool_page",
      });
    }
  };

  const draft = buildMobbingDraft(checks);
  const riskScore = checks.size;

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <KidemTazminatiCalculator
          analyticsToolId="tazminat_hub_page"
          analyticsSurface="tool_page"
        />
        <IhbarTazminatiCalculator
          analyticsToolId="tazminat_hub_page"
          analyticsSurface="tool_page"
        />
      </div>

      <Card className="mt-6 border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Scale className="h-5 w-5 text-[#005BEA]" />
            İstifaya zorlanıyorum — haklı fesih kontrol listesi
          </CardTitle>
          <p className="text-xs leading-relaxed text-slate-500">
            Mobbing / baskı iddiasında hangi kanıtların güçlü olduğunu işaretleyin;
            hazır dilekçe taslağı alın. Bu bir hukuki görüş değildir.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <ul className="space-y-2">
            {MOBBING_CHECKS.map((item) => {
              const on = checks.has(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className={
                      on
                        ? "flex w-full items-start gap-3 rounded-xl border border-[#005BEA] bg-[#005BEA]/5 px-4 py-3 text-left text-sm font-medium text-slate-800"
                        : "flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-slate-300"
                    }
                  >
                    <span
                      className={
                        on
                          ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#005BEA] text-[11px] font-bold text-white"
                          : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 text-[11px] text-slate-400"
                      }
                    >
                      {on ? "✓" : ""}
                    </span>
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-950">
            {riskScore >= 3
              ? "Birden fazla işaret güçlü görünüyor: yazılı kanıtları saklayın, iş sözleşmenizi Clause ile taratın ve avukat/arabuluculuk adımını geciktirmeyin."
              : riskScore >= 1
                ? "En az bir işaret var. Kanıt toplamaya devam edin; tek başına işaret haklı fesih garantisi vermez."
                : "Henüz madde seçmediniz. Durumunuzu yansıtan kutuları işaretleyin."}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-slate-800">
                Dilekçe / ihtar taslağı
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 rounded-lg text-xs font-semibold"
                onClick={async () => {
                  await navigator.clipboard.writeText(draft);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2000);
                }}
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Kopyalandı" : "Kopyala"}
              </Button>
            </div>
            <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-700">
              {draft}
            </pre>
          </div>

          <p className="text-xs text-slate-500">
            Ayrıca:{" "}
            <Link
              href="/araclar/issizlik-maasi-hesaplama"
              className="font-semibold text-[#005BEA] hover:underline"
            >
              işsizlik maaşı
            </Link>
            ,{" "}
            <Link
              href="/sozlesme-analizi/is-sozlesmesi-riskleri"
              className="font-semibold text-[#005BEA] hover:underline"
            >
              iş sözleşmesi AI analizi
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <ToolResultSignupBar
        source="/araclar/tazminat-hesaplama"
        visible={!barDismissed && checks.size > 0}
        onDismiss={() => setBarDismissed(true)}
      />
    </>
  );
}
