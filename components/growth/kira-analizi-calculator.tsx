"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Home,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToolResultSignupBar } from "@/components/growth/tool-result-signup-bar";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents, type FreeToolId } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

/** Kullanıcı TÜİK’ten güncelleyebilir — bilgilendirme varsayılanı */
const DEFAULT_TUFE_CEILING_PCT = 37.86;

function parseNumber(value: string): number {
  return Number(value.replace(/\./g, "").replace(",", ".")) || 0;
}

function formatTry(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPct(value: number): string {
  return `%${value.toLocaleString("tr-TR", {
    maximumFractionDigits: 2,
  })}`;
}

function monthsBetween(startIso: string, end = new Date()): number {
  if (!startIso) return 0;
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return 0;
  return Math.max(
    0,
    (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()),
  );
}

function buildTemplates(opts: {
  current: number;
  proposed: number;
  legalMax: number;
  tufePct: number;
  proposedPct: number;
  exceeded: boolean;
}) {
  const {
    current,
    proposed,
    legalMax,
    tufePct,
    proposedPct,
    exceeded,
  } = opts;

  const whatsapp = exceeded
    ? `Merhaba,

Kira artış talebinizi aldım. Mevcut kira ${formatTry(current)}; talep edilen tutar ${formatTry(proposed)} (${formatPct(proposedPct)} artış).

Türk Borçlar Kanunu m. 344 kapsamında konut kiralarında yenilenen dönem artışı, TÜFE’nin on iki aylık ortalamalarına göre değişim oranını aşamaz. Girdiğim yasal tavan oranı ${formatPct(tufePct)} olup yasal üst sınır yaklaşık ${formatTry(legalMax)}’dir.

Talebinizin bu sınırı aştığını düşünüyorum. Yasal sınır dahilinde yeni bir teklif iletebilirseniz görüşmeye açığım.

Saygılarımla`
    : `Merhaba,

Kira artış talebinizi aldım. Mevcut kira ${formatTry(current)}; talep edilen tutar ${formatTry(proposed)} (${formatPct(proposedPct)} artış).

TBK m. 344 bağlamında girdiğim TÜFE tavanı ${formatPct(tufePct)} ve yasal üst sınır yaklaşık ${formatTry(legalMax)}. Talebiniz bu varsayıma göre tavan içinde görünüyor. Yazılı sözleşmemizdeki artış maddesini de kontrol ederek teyit etmek isterim.

Saygılarımla`;

  const email = `Konu: Kira artışı talebinize ilişkin — TBK m. 344

${whatsapp}

Not: Bu metin bilgilendirme amaçlı bir taslaktır; bireysel durumunuza göre avukat kontrolü önerilir.`;

  const summary = exceeded
    ? [
        `Ev sahibinin istediği ${formatTry(proposed)} (${formatPct(proposedPct)}), girdiğiniz TÜFE tavanına göre yasal üst sınır olan ${formatTry(legalMax)}’i aşıyor.`,
        `TBK 344 çerçevesinde konut kiralarında artış, TÜFE 12 aylık ortalama değişimini aşamaz; fazla kısmı reddedilebilir görünür.`,
        `Aşağıdaki hazır WhatsApp / e-posta metnini kopyalayıp gönderin; ardından kira sözleşmenizi Clause ile taratın.`,
      ]
    : [
        `Talep edilen ${formatTry(proposed)} (${formatPct(proposedPct)}), girdiğiniz tavanla yasal üst sınır ${formatTry(legalMax)} içinde kalıyor.`,
        `Yine de sözleşmedeki artış formülünü, bildirim tarihini ve tahliye baskısı olup olmadığını kontrol edin.`,
        `Şüphe varsa hazır metni nazik bir teyit mesajı olarak kullanın ve sözleşmeyi AI ile tarayın.`,
      ];

  return { whatsapp, email, summary };
}

export function KiraAnaliziCalculator({
  analyticsToolId = "kira_analizi_page",
}: {
  analyticsToolId?: FreeToolId;
}) {
  const [currentInput, setCurrentInput] = React.useState("25.000");
  const [proposedInput, setProposedInput] = React.useState("40.000");
  const [tufeInput, setTufeInput] = React.useState(
    String(DEFAULT_TUFE_CEILING_PCT).replace(".", ","),
  );
  const [startDate, setStartDate] = React.useState("2024-09-01");
  const [copied, setCopied] = React.useState<"wa" | "mail" | null>(null);
  const [barDismissed, setBarDismissed] = React.useState(false);
  const trackedRef = React.useRef(false);

  const current = parseNumber(currentInput);
  const proposed = parseNumber(proposedInput);
  const tufePct = parseNumber(tufeInput);
  const months = monthsBetween(startDate);
  const valid = current > 0 && proposed > 0 && tufePct >= 0;

  const legalMax = valid ? current * (1 + tufePct / 100) : 0;
  const proposedPct = valid ? ((proposed - current) / current) * 100 : 0;
  const exceeded = valid && proposed > legalMax + 0.5;
  const earlyRenewal = months > 0 && months < 12;

  const templates = React.useMemo(
    () =>
      valid
        ? buildTemplates({
            current,
            proposed,
            legalMax,
            tufePct,
            proposedPct,
            exceeded,
          })
        : null,
    [valid, current, proposed, legalMax, tufePct, proposedPct, exceeded],
  );

  const track = React.useCallback(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: analyticsToolId,
      surface: "tool_page",
    });
  }, [analyticsToolId]);

  const copy = async (kind: "wa" | "mail", text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      captureEvent(AnalyticsEvents.SIGNUP_NUDGE_SHOWN, {
        source: `kira_analizi_copy_${kind}`,
      });
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Home className="h-5 w-5 text-[#005BEA]" />
            Kira zammı &amp; kiracı hakları analizi
          </CardTitle>
          <p className="text-xs leading-relaxed text-slate-500">
            Ev sahibinin istediği zammı yasal TÜFE tavanıyla karşılaştırın; tek
            tıkla cevap metni alın.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="kira-current">Mevcut aylık kira (TL)</Label>
              <Input
                id="kira-current"
                inputMode="decimal"
                value={currentInput}
                onChange={(e) => {
                  setCurrentInput(e.target.value);
                  track();
                }}
                className="h-11 rounded-xl border-2 border-slate-200 font-semibold tabular-nums focus-visible:border-[#005BEA]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kira-proposed">Ev sahibinin istediği kira (TL)</Label>
              <Input
                id="kira-proposed"
                inputMode="decimal"
                value={proposedInput}
                onChange={(e) => {
                  setProposedInput(e.target.value);
                  track();
                }}
                className="h-11 rounded-xl border-2 border-slate-200 font-semibold tabular-nums focus-visible:border-[#005BEA]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kira-tufe">
                Yasal tavan — TÜFE 12 aylık ort. (%)
              </Label>
              <Input
                id="kira-tufe"
                inputMode="decimal"
                value={tufeInput}
                onChange={(e) => {
                  setTufeInput(e.target.value);
                  track();
                }}
                className="h-11 rounded-xl border-2 border-slate-200 font-semibold tabular-nums focus-visible:border-[#005BEA]"
              />
              <p className="text-[11px] text-slate-500">
                Güncel oranı TÜİK’ten girin. Varsayılan örnek amaçlıdır.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="kira-start">Sözleşme / son artış başlangıcı</Label>
              <Input
                id="kira-start"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  track();
                }}
                className="h-11 rounded-xl border-2 border-slate-200 font-semibold focus-visible:border-[#005BEA]"
              />
              {months > 0 ? (
                <p className="text-[11px] text-slate-500">
                  Yaklaşık {months} ay geçti
                  {earlyRenewal
                    ? " — bir yıllık dönem dolmadan artış tartışmalı olabilir."
                    : "."}
                </p>
              ) : null}
            </div>
          </div>

          {valid && templates ? (
            <>
              <div
                className={cn(
                  "rounded-2xl border-2 px-4 py-4 sm:px-5",
                  exceeded
                    ? "border-red-200 bg-red-50/80"
                    : "border-emerald-200 bg-emerald-50/80",
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {exceeded ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Yasal tavan aşıldı
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Tavan içinde görünüyor
                    </span>
                  )}
                  <span className="text-xs font-semibold text-slate-600">
                    Talep {formatPct(proposedPct)} · Tavan {formatPct(tufePct)}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-white/80 px-3 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      Yasal üst sınır
                    </p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-madde-ink">
                      {formatTry(legalMax)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/80 px-3 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      Talep edilen
                    </p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-madde-ink">
                      {formatTry(proposed)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/80 px-3 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      Fark
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-lg font-bold tabular-nums",
                        exceeded ? "text-red-700" : "text-emerald-700",
                      )}
                    >
                      {formatTry(proposed - legalMax)}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {templates.summary.map((line) => (
                    <li
                      key={line}
                      className="text-sm leading-relaxed text-slate-800"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                      <MessageCircle className="h-4 w-4 text-[#005BEA]" />
                      WhatsApp cevabı
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 rounded-lg text-xs font-semibold"
                      onClick={() => copy("wa", templates.whatsapp)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied === "wa" ? "Kopyalandı" : "Kopyala"}
                    </Button>
                  </div>
                  <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-700">
                    {templates.whatsapp}
                  </pre>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                      <Mail className="h-4 w-4 text-[#005BEA]" />
                      E-posta / ihtar taslağı
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 rounded-lg text-xs font-semibold"
                      onClick={() => copy("mail", templates.email)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied === "mail" ? "Kopyalandı" : "Kopyala"}
                    </Button>
                  </div>
                  <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-700">
                    {templates.email}
                  </pre>
                </div>
              </div>
            </>
          ) : null}

          <p className="text-xs leading-relaxed text-slate-500">
            Bilgilendirme amaçlıdır; avukatlık hizmeti değildir. Konut / çatılı
            işyeri, süre, bildirim ve sözleşme maddeleri sonucu değiştirir. TÜFE
            oranını resmi kaynaktan doğrulayın.
          </p>
        </CardContent>
      </Card>

      <ToolResultSignupBar
        source="/araclar/kira-analizi"
        visible={Boolean(valid && templates && !barDismissed)}
        onDismiss={() => setBarDismissed(true)}
      />
    </>
  );
}
