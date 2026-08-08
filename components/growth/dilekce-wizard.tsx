"use client";

import * as React from "react";
import { Copy, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToolResultSignupBar } from "@/components/growth/tool-result-signup-bar";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

const TEMPLATES = {
  tuketici: {
    label: "Tüketici — ayıplı mal / iade",
    build: (name: string, detail: string) =>
      `TÜKETİCİ HAKEM HEYETİ BAŞVURU DİLEKÇESİ (TASLAK)

Başvuran: ${name || "[Ad Soyad]"}
Konu: Ayıplı mal / iade talebi

Açıklamalar:
${detail || "[Ürünü ne zaman aldığınızı, ayıbı ve satıcının yanıtını yazın.]"}

Hukuki dayanak olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında ayıplı maldan doğan seçimlik haklarımı kullanmak istiyorum. İade / bedel iadesi / ayıp oranında indirim talebim saklıdır.

Bu metin bilgilendirme amaçlı taslaktır; resmi başvuru için güncel parasal sınırlar, yetkili heyet ve ek belgeler kontrol edilmelidir.

Saygılarımla
${name || "[Ad Soyad]"}`,
  },
  kira: {
    label: "Kira — fazla zam / ihtar",
    build: (name: string, detail: string) =>
      `KİRAYA VERENE YAZILI BİLDİRİM / İHTAR TASLAĞI

Gönderen: ${name || "[Ad Soyad]"}
Konu: Kira artışı talebine itiraz (TBK m. 344)

${detail || "[Mevcut kira, istenen zam ve neden itiraz ettiğinizi yazın.]"}

Türk Borçlar Kanunu m. 344 kapsamında yenilenen dönem artışının TÜFE on iki aylık ortalama değişimini aşamayacağını hatırlatır; fazla talebi kabul etmediğimi bildiririm.

Bu metin taslaktır; noter ihtarı veya dava dilekçesi yerine geçmez.

Saygılarımla
${name || "[Ad Soyad]"}`,
  },
  depozito: {
    label: "Depozito iadesi talebi",
    build: (name: string, detail: string) =>
      `DEPOZİTO İADESİ TALEBİ (TASLAK)

Gönderen: ${name || "[Ad Soyad]"}
Konu: Depozito / güvence bedeli iadesi

${detail || "[Tahliye tarihi, depozito tutarı ve kesinti gerekçesini yazın.]"}

Sözleşme ve teslim durumuna göre kesintisiz iadesini talep ederim. Makul sürede ödeme yapılmazsa yasal yollara başvuracağımı bildiririm.

Bu metin taslaktır; avukat onayı olmadan resmi ihtar olarak kullanılmamalıdır.

Saygılarımla
${name || "[Ad Soyad]"}`,
  },
} as const;

type TemplateId = keyof typeof TEMPLATES;

export function DilekceWizard() {
  const [templateId, setTemplateId] = React.useState<TemplateId>("tuketici");
  const [name, setName] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [barDismissed, setBarDismissed] = React.useState(false);
  const tracked = React.useRef(false);

  const draft = TEMPLATES[templateId].build(name, detail);

  const track = () => {
    if (tracked.current) return;
    tracked.current = true;
    captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
      tool: "dilekce_olusturucu_page",
      surface: "tool_page",
    });
  };

  return (
    <>
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
            <FileText className="h-5 w-5 text-[#005BEA]" />
            AI dilekçe &amp; ihtarname taslağı
          </CardTitle>
          <p className="text-xs leading-relaxed text-slate-500">
            Senaryoyu seçin, durumu yazın; resmi formatta taslak metin alın. PDF
            indirme için ücretsiz kayıt önerilir.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(TEMPLATES) as TemplateId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTemplateId(id);
                  track();
                }}
                className={
                  templateId === id
                    ? "rounded-full border border-[#005BEA] bg-[#005BEA] px-3 py-1.5 text-xs font-semibold text-white"
                    : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-[#005BEA] hover:text-[#005BEA]"
                }
              >
                {TEMPLATES[id].label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dilekce-name">Adınız (opsiyonel)</Label>
              <Input
                id="dilekce-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  track();
                }}
                className="h-11 rounded-xl border-2 border-slate-200"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="dilekce-detail">Durumunuzu anlatın</Label>
              <textarea
                id="dilekce-detail"
                rows={5}
                value={detail}
                onChange={(e) => {
                  setDetail(e.target.value);
                  track();
                }}
                placeholder="Tarih, tutar, karşı tarafın cevabı…"
                className="w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-[#005BEA] focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-2 flex justify-end">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 text-xs font-semibold"
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
            <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded-lg bg-white p-3 text-xs leading-relaxed text-slate-700">
              {draft}
            </pre>
          </div>
        </CardContent>
      </Card>

      <ToolResultSignupBar
        source="/dilekce-olusturucu"
        visible={!barDismissed && Boolean(detail.trim())}
        onDismiss={() => setBarDismissed(true)}
      />
    </>
  );
}
