"use client";

import * as React from "react";
import {
  Briefcase,
  Camera,
  FileUp,
  Loader2,
  Home,
  Laptop,
  Search,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PersonaId } from "@/lib/personas";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PrivacyShieldLive } from "@/components/growth/privacy-shield-live";
import { extractTextFromFile, isOcrFile } from "@/lib/scan/ocr-client";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

const CONTEXT_BADGES: {
  id: PersonaId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "tenant", label: "Kiracı", icon: Home },
  { id: "job_seeker", label: "Çalışan", icon: Briefcase },
  { id: "freelancer", label: "Freelancer", icon: Laptop },
  { id: "general", label: "Genel", icon: Search },
];

const ACCEPT =
  ".pdf,.docx,.png,.jpg,.jpeg,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg,text/plain";

export function detectPersonaFromText(text: string): PersonaId {
  const t = text.toLocaleLowerCase("tr-TR");
  if (
    /kira|kiracı|kiraci|depozito|tahliye|ev sahibi|konut/.test(t)
  ) {
    return "tenant";
  }
  if (
    /iş sözleşme|is sozlesme|işçi|isci|maaş|maas|kıdem|kidem|ihbar|fazla mesai/.test(
      t,
    )
  ) {
    return "job_seeker";
  }
  if (
    /freelancer|serbest|fikri mülkiyet|fikri mulkiyet|teslim|proje bedeli/.test(
      t,
    )
  ) {
    return "freelancer";
  }
  return "general";
}

async function readFileAsText(file: File): Promise<string | null> {
  const name = file.name.toLowerCase();
  const isText =
    file.type.startsWith("text/") ||
    name.endsWith(".txt") ||
    name.endsWith(".md");
  if (!isText) return null;
  return file.text();
}

type Props = {
  persona: PersonaId;
  onPersonaChange: (p: PersonaId) => void;
  contractText: string;
  onContractTextChange: (v: string) => void;
  fileName: string | null;
  onFileNameChange: (name: string | null) => void;
  onStartDemo: () => void;
  onStartAnalysis: () => void;
  disabled?: boolean;
  error?: string | null;
  /** Landing'deki fotoğraf butonundan gelen dosya: açılışta bir kez okunur */
  initialFile?: File | null;
};

export function StepInput({
  persona,
  onPersonaChange,
  contractText,
  onContractTextChange,
  fileName,
  onFileNameChange,
  onStartDemo,
  onStartAnalysis,
  disabled,
  error,
  initialFile,
}: Props) {
  const [drag, setDrag] = React.useState(false);
  const [fileHint, setFileHint] = React.useState<string | null>(null);
  const [reading, setReading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const cameraRef = React.useRef<HTMLInputElement>(null);

  const applyText = (text: string) => {
    onContractTextChange(text);
    if (persona === "general") {
      onPersonaChange(detectPersonaFromText(text));
    }
  };

  const handleFile = async (file: File | undefined) => {
    if (!file || disabled || reading) return;
    setFileHint(null);
    onFileNameChange(file.name);

    const text = await readFileAsText(file);
    if (text?.trim()) {
      applyText(text);
      return;
    }

    if (isOcrFile(file)) {
      setReading(true);
      captureEvent(AnalyticsEvents.PHOTO_SCAN_STARTED, { type: file.type || "unknown" });
      try {
        const extracted = await extractTextFromFile(file);
        applyText(extracted);
        captureEvent(AnalyticsEvents.PHOTO_SCAN_COMPLETED, { chars: extracted.length });
      } catch (err) {
        setFileHint(err instanceof Error ? err.message : "Bu belgeyi okuyamadık.");
      } finally {
        setReading(false);
      }
      return;
    }

    setFileHint(
      "Word dosyalarını henüz okuyamıyoruz. Belgeyi PDF olarak kaydedin, fotoğrafını çekin ya da metni yapıştırın.",
    );
  };

  const consumedFile = React.useRef<File | null>(null);
  React.useEffect(() => {
    if (initialFile && consumedFile.current !== initialFile) {
      consumedFile.current = initialFile;
      void handleFile(initialFile);
    }
    // handleFile her render yeniden oluşur; yalnız yeni dosyada çalışsın
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFile]);

  const canAnalyze = contractText.trim().length > 40;

  return (
    <div className="space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      <PrivacyShieldLive text={contractText} />

      <button
        type="button"
        disabled={disabled || reading}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          void handleFile(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all",
          drag
            ? "border-[var(--cta-primary)] bg-[var(--cta-primary)]/[0.08] shadow-[0_0_24px_rgba(37,99,235,0.2)]"
            : "border-slate-300 bg-slate-50/80 hover:border-[var(--cta-primary)]/60 hover:bg-[var(--cta-primary)]/[0.04]",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--cta-primary)] text-white shadow-lg shadow-[rgba(37,99,235,0.35)]">
          {reading ? (
            <Loader2 className="h-7 w-7 motion-safe:animate-spin" aria-hidden />
          ) : (
            <FileUp className="h-7 w-7" aria-hidden />
          )}
        </div>
        <div aria-live="polite">
          <p className="text-base font-bold text-deep-navy">
            {reading
              ? "Belgenizi okuyoruz…"
              : "Sözleşmenizi sürükleyin veya bilgisayarınızdan seçin"}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {reading
              ? "Metin birkaç saniye içinde aşağıya gelecek; kişisel veriler sonra maskelenir."
              : "PDF, fotoğraf (JPG, PNG) veya metin · en fazla 10 MB"}
          </p>
        </div>
        {fileName ? (
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            {fileName}
          </span>
        ) : null}
      </button>

      <button
        type="button"
        disabled={disabled || reading}
        onClick={() => cameraRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-[var(--cta-primary)]/50 disabled:opacity-50 sm:hidden"
      >
        <Camera className="h-5 w-5 text-[var(--cta-primary)]" aria-hidden />
        Sözleşmenin fotoğrafını çek
      </button>

      {fileHint ? (
        <p className="text-center text-xs font-medium text-amber-700">{fileHint}</p>
      ) : null}

      <div className="flex justify-center">
        <button
          type="button"
          disabled={disabled}
          onClick={onStartDemo}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--cta-primary)]/25 bg-[var(--cta-primary)]/[0.08] px-4 py-2.5 text-sm font-bold text-[var(--cta-primary)] shadow-sm transition hover:bg-[var(--cta-primary)]/[0.14] hover:shadow-md active:scale-[0.98] disabled:opacity-50"
        >
          <Zap className="h-4 w-4" aria-hidden />
          Örnek Kira Sözleşmesi İle Anında Dene
        </button>
      </div>

      <div>
        <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Bağlam
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-2"
          role="radiogroup"
          aria-label="Analiz bağlamı"
        >
          {CONTEXT_BADGES.map((b) => {
            const Icon = b.icon;
            const selected = persona === b.id;
            return (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={disabled}
                onClick={() => onPersonaChange(b.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  selected
                    ? "border-[var(--cta-primary)] bg-[var(--cta-primary)] text-white shadow-md shadow-[rgba(37,99,235,0.25)]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                  disabled && "opacity-50",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {b.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-400">
          Varsayılan: Genel — dosya yüklenince AI otomatik algılar
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="wizard-contract-paste"
          className="text-xs font-semibold text-slate-500"
        >
          Veya metni yapıştırın
        </label>
        <Textarea
          id="wizard-contract-paste"
          data-ph-mask
          value={contractText}
          disabled={disabled}
          onChange={(e) => {
            const v = e.target.value;
            onContractTextChange(v);
            if (persona === "general" && v.trim().length > 80) {
              onPersonaChange(detectPersonaFromText(v));
            }
          }}
          placeholder="Sözleşme metnini buraya yapıştırın…"
          className="min-h-[100px] resize-none rounded-xl border-slate-200 text-sm"
        />
      </div>

      {error ? (
        <p className="text-center text-sm font-medium text-red-600">{error}</p>
      ) : null}

      <Button
        type="button"
        size="lg"
        disabled={disabled || !canAnalyze}
        onClick={onStartAnalysis}
        className="h-12 w-full rounded-xl bg-[var(--cta-primary)] text-base font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:bg-[#1d4ed8]"
      >
        Ücretsiz Analizi Başlat
      </Button>
    </div>
  );
}
