"use client";

import * as React from "react";
import { AlertTriangle, CheckCircle2, Loader2, ScanSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolResultSignupBar } from "@/components/growth/tool-result-signup-bar";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

type ScanResult = {
  red: string[];
  yellow: string[];
  green: string[];
};

function BulletGroup({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "red" | "yellow" | "green";
}) {
  const styles = {
    red: "border-red-200 bg-red-50 text-red-950",
    yellow: "border-amber-200 bg-amber-50 text-amber-950",
    green: "border-emerald-200 bg-emerald-50 text-emerald-950",
  } as const;
  const dot = {
    red: "🔴",
    yellow: "🟡",
    green: "🟢",
  } as const;

  return (
    <div className={`rounded-xl border px-4 py-3 ${styles[tone]}`}>
      <p className="text-sm font-bold">
        {dot[tone]} {title}
      </p>
      {items.length ? (
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
          {items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm opacity-70">Bu kategoride bulgu yok.</p>
      )}
    </div>
  );
}

export function RedFlagScanner() {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<ScanResult | null>(null);
  const [barDismissed, setBarDismissed] = React.useState(false);

  const onFile = async (file: File | null) => {
    if (!file) return;
    if (file.type.startsWith("text/") || file.name.endsWith(".txt")) {
      setText(await file.text());
      return;
    }
    setError(
      "Şimdilik metin (.txt) veya yapıştırma destekleniyor. PDF/JPG için metni kopyalayıp yapıştırın veya tam analiz sayfasını kullanın.",
    );
  };

  const scan = async () => {
    setLoading(true);
    setError(null);
    try {
      captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
        tool: "red_flag_scanner_page",
        surface: "tool_page",
      });
      const res = await fetch("/api/tools/red-flag-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText: text }),
      });
      let data: ScanResult & { error?: string } = { red: [], yellow: [], green: [] };
      try {
        data = (await res.json()) as ScanResult & { error?: string };
      } catch {
        setError("Sunucu yanıtı okunamadı. Tekrar deneyin.");
        setResult(null);
        return;
      }
      if (!res.ok) {
        setError(data.error || "Tarama başarısız");
        setResult(null);
        return;
      }
      setResult({
        red: data.red || [],
        yellow: data.yellow || [],
        green: data.green || [],
      });
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
            <ScanSearch className="h-5 w-5 text-[#005BEA]" />
            Sözleşmedeki 3 gizli tuzak taraması
          </CardTitle>
          <p className="text-xs leading-relaxed text-slate-500">
            Metni yapıştırın; yapay zeka kırmızı / sarı / yeşil maddeleri
            listelesin. Avukatlık hizmeti değildir.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="redflag-text">Sözleşme metni</Label>
            <textarea
              id="redflag-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder="Kira veya iş sözleşmesi metnini buraya yapıştırın…"
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-sm leading-relaxed focus:border-[#005BEA] focus:outline-none focus:ring-2 focus:ring-[#005BEA]/20"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100">
              .txt yükle
              <input
                type="file"
                accept=".txt,text/plain"
                className="hidden"
                onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
              />
            </label>
            <Button
              type="button"
              disabled={loading || text.trim().length < 80}
              onClick={() => void scan()}
              className="h-10 rounded-lg bg-[#005BEA] font-semibold hover:bg-[#0047b8]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Taranıyor…
                </>
              ) : (
                "Anında tara"
              )}
            </Button>
          </div>

          {error ? (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          ) : null}

          {result ? (
            <div className="space-y-3">
              <BulletGroup
                title="Yüksek riskli maddeler (Red Flags)"
                items={result.red}
                tone="red"
              />
              <BulletGroup
                title="Dikkat edilmesi gerekenler"
                items={result.yellow}
                tone="yellow"
              />
              <BulletGroup
                title="Kullanıcı lehine olan maddeler"
                items={result.green}
                tone="green"
              />
              <p className="flex items-start gap-2 text-xs text-slate-500">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                Daha derin madde madde analiz için ana analiz ekranına geçin.
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <ToolResultSignupBar
        source="/araclar/sozlesme-tuzak-tarama"
        visible={Boolean(result && !barDismissed)}
        onDismiss={() => setBarDismissed(true)}
      />
    </>
  );
}
