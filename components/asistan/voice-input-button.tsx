"use client";

import * as React from "react";
import { Mic, MicOff } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

/* Web Speech API tipleri TS lib'inde yok; ihtiyacımız olan kadarı. */
type SpeechResultEvent = {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: SpeechResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

type Props = {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  className?: string;
};

/**
 * Sesli soru: tarayıcının konuşma tanıması (tr-TR). Ses sunucuya gitmez;
 * desteklenmeyen tarayıcıda buton hiç görünmez.
 */
export function VoiceInputButton({ onTranscript, disabled, className }: Props) {
  const [supported, setSupported] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [hint, setHint] = React.useState<string | null>(null);
  const recRef = React.useRef<SpeechRecognitionLike | null>(null);

  React.useEffect(() => {
    setSupported(getRecognitionCtor() !== null);
    return () => recRef.current?.stop();
  }, []);

  if (!supported) return null;

  const toggle = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "tr-TR";
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r?.isFinal) text += r[0].transcript;
      }
      if (text.trim()) onTranscript(text.trim());
    };
    rec.onerror = (e) => {
      setHint(
        e.error === "not-allowed"
          ? "Mikrofon izni verilmedi."
          : "Sesinizi duyamadık. Tekrar dener misiniz?",
      );
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    setHint(null);
    setListening(true);
    captureEvent(AnalyticsEvents.ASISTAN_VOICE_STARTED);
    rec.start();
  };

  return (
    <div className="relative flex">
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-pressed={listening}
        aria-label={listening ? "Dinlemeyi durdur" : "Sesle sor"}
        title={listening ? "Dinlemeyi durdur" : "Sesle sor"}
        className={cn(
          "flex w-12 items-center justify-center rounded-xl border transition-colors disabled:opacity-50",
          listening
            ? "border-red-300 bg-red-50 text-red-600 motion-safe:animate-pulse"
            : "border-slate-200 bg-white text-slate-600 hover:border-[#005BEA]/50 hover:text-[#005BEA] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
          className,
        )}
      >
        {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </button>
      {hint ? (
        <span
          role="status"
          className="absolute bottom-full right-0 mb-2 w-48 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-white shadow"
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}
