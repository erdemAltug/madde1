"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StreamingMarkdown } from "@/components/analysis/streaming-markdown";
import { cn } from "@/lib/utils";
import type { ContractTemplateId } from "@/lib/prompts";
// MVP: Ödeme askıya alındı
// import { PricingModal } from "@/components/b2c/pricing-modal";
import { maskSensitiveText } from "@/lib/security/mask-sensitive";

const TEMPLATES: {
  id: ContractTemplateId;
  title: string;
  blurb: string;
}[] = [
  {
    id: "freelance",
    title: "Freelance iş",
    blurb: "Proje, teslim ve ödeme planı için taslak.",
  },
  {
    id: "rental",
    title: "Ev kirası",
    blurb: "Konut kira sözleşmesi iskeleti.",
  },
  {
    id: "consulting",
    title: "Danışmanlık",
    blurb: "Ücret, kapsam ve gizlilik çerçevesi.",
  },
];

const STORAGE_PDF = "clause-generator-markdown";

type Props = {
  compact?: boolean;
};

export function ContractGenerator({ compact }: Props) {
  const [step, setStep] = React.useState(0);
  const [template, setTemplate] = React.useState<ContractTemplateId | null>(
    null,
  );
  const [partyA, setPartyA] = React.useState("");
  const [partyB, setPartyB] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [specialClauses, setSpecialClauses] = React.useState("");
  const [md, setMd] = React.useState("");
  const [genBusy, setGenBusy] = React.useState(false);

  const generate = async () => {
    if (!template) return;
    setGenBusy(true);
    setMd("");
    try {
      const r = await fetch("/api/contracts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template,
          partyA: maskSensitiveText(partyA).text,
          partyB: maskSensitiveText(partyB).text,
          amount: maskSensitiveText(amount).text,
          currency: "TRY",
          deadline: maskSensitiveText(deadline).text,
          specialClauses: maskSensitiveText(specialClauses).text,
        }),
      });
      const j = (await r.json()) as { markdown?: string; error?: string };
      if (!r.ok) throw new Error(j.error || "Üretim hatası");
      setMd(j.markdown || "");
      setStep(2);
    } catch (e) {
      console.error(e);
      setMd("Taslak üretilemedi. Bağlantıyı ve API anahtarını kontrol edin.");
      setStep(2);
    } finally {
      setGenBusy(false);
    }
  };

  const pushPrint = () => {
    try {
      sessionStorage.setItem(STORAGE_PDF, md);
    } catch {
      return;
    }
    window.open("/baski", "_blank", "noopener,noreferrer");
  };

  const openPdf = async () => {
    if (!md.trim()) return;
    pushPrint();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span
          className={cn(step >= 0 && "font-semibold text-blue-800")}
        >
          1. Şablon
        </span>
        <span>→</span>
        <span
          className={cn(step >= 1 && "font-semibold text-blue-800")}
        >
          2. Bilgiler
        </span>
        <span>→</span>
        <span className={cn(step >= 2 && "font-semibold text-blue-800")}>
          3. Taslak
        </span>
      </div>

      {step === 0 ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTemplate(t.id);
                setStep(1);
              }}
              className={cn(
                "rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-300",
                template === t.id && "ring-2 ring-blue-700",
              )}
            >
              <p className="font-bold text-slate-900">{t.title}</p>
              <p className="mt-1 text-xs text-slate-600">{t.blurb}</p>
            </button>
          ))}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pA">Taraf A (isim / unvan)</Label>
              <Input
                id="pA"
                value={partyA}
                onChange={(e) => setPartyA(e.target.value)}
                placeholder="Örn: Ahmet Yılmaz"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pB">Taraf B (isim / unvan)</Label>
              <Input
                id="pB"
                value={partyB}
                onChange={(e) => setPartyB(e.target.value)}
                placeholder="Örn: XYZ Ltd."
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amt">Bedel / ücret (TL veya açıklama)</Label>
              <Input
                id="amt"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Örn: 40.000 TL aylık"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dl">Süre / teslim / başlangıç</Label>
              <Input
                id="dl"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Örn: 12 ay / 01.04.2025"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sp">Özel maddeler (isteğe bağlı)</Label>
            <Textarea
              id="sp"
              value={specialClauses}
              onChange={(e) => setSpecialClauses(e.target.value)}
              placeholder="Eklemek istediğin şartlar…"
              className={compact ? "min-h-[100px]" : "min-h-[120px]"}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(0)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Geri
            </Button>
            <Button
              type="button"
              className="bg-blue-700 font-semibold hover:bg-blue-800"
              disabled={
                genBusy || !partyA.trim() || !partyB.trim() || !amount.trim()
              }
              onClick={() => void generate()}
            >
              {genBusy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Taslağı oluştur
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Taslağı aşağıda okuyabilirsin. PDF / yazdırmak için 1 kredi kullanılır.
          </p>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <StreamingMarkdown content={md} variant="light" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Bilgileri düzenle
            </Button>
            <Button
              type="button"
              className="font-bold"
              onClick={() => void openPdf()}
            >
              <FileDown className="mr-2 h-4 w-4" />
              PDF indir (kredi)
            </Button>
          </div>
        </div>
      ) : null}

      {/* MVP: Ödeme askıya alındı - PDF indirme ücretsiz */}
      {/*
      <PricingModal
        open={pricingOpen}
        onOpenChange={setPricingOpen}
        purchase={wallet?.purchase}
        emphasize="starter"
        title="PDF için token al"
        description="Ödeme adımı atlanır; paket tanımlandıktan sonra bir PDF indirimi kullanılır."
        onPurchaseComplete={() => afterPurchase()}
      />
      */}
    </div>
  );
}
