"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Copy, Mail, MessageCircle, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  REPLY_SCENARIOS,
  getScenario,
  type ReplyChannel,
  type ReplyTone,
} from "@/lib/assistant/reply-templates";
import { captureEvent } from "@/lib/analytics/capture";
import { cn } from "@/lib/utils";

function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
            value === o.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ReplyComposer({ initialScenario }: { initialScenario?: string }) {
  const [scenarioId, setScenarioId] = React.useState(() => getScenario(initialScenario).id);
  const scenario = getScenario(scenarioId);
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [tone, setTone] = React.useState<ReplyTone>("kibar");
  const [channel, setChannel] = React.useState<ReplyChannel>("mesaj");
  const [text, setText] = React.useState("");
  const [edited, setEdited] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const generated = React.useMemo(() => scenario.build(values, tone, channel), [scenario, values, tone, channel]);

  // Kullanıcı metni elle düzenlemediyse taslak girdilerle birlikte güncellenir
  React.useEffect(() => {
    if (!edited) setText(generated);
  }, [generated, edited]);

  const pickScenario = (id: string) => {
    setScenarioId(id);
    setValues({});
    setEdited(false);
    captureEvent("reply_scenario_selected", { scenario: id });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if ("vibrate" in navigator) navigator.vibrate?.(15);
      window.setTimeout(() => setCopied(false), 1800);
      captureEvent("reply_copied", { scenario: scenario.id, tone, channel });
    } catch {
      /* pano izni yok */
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(text)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(scenario.title)}&body=${encodeURIComponent(text)}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="space-y-6">
        <fieldset>
          <legend className="text-sm font-bold text-slate-900">Ne oldu?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {REPLY_SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => pickScenario(s.id)}
                aria-pressed={s.id === scenario.id}
                className={cn(
                  "rounded-xl border p-3 text-left transition",
                  s.id === scenario.id
                    ? "border-[#005BEA] bg-[#005BEA]/[0.05] ring-1 ring-[#005BEA]/30"
                    : "border-slate-200 bg-white hover:border-slate-300",
                )}
              >
                <span className="block text-xs font-semibold text-slate-500">{s.recipient}</span>
                <span className="mt-0.5 block text-sm font-bold text-slate-900">{s.title}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{s.summary}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-bold text-slate-900">Bilgiler</legend>
          {scenario.fields.map((f) => (
            <label key={f.id} className="block">
              <span className="text-xs font-semibold text-slate-600">
                {f.label}
                {f.optional ? <span className="font-normal text-slate-400"> · isteğe bağlı</span> : null}
              </span>
              <span className="relative mt-1 block">
                <input
                  type={f.type === "date" ? "date" : "text"}
                  inputMode={f.type === "number" ? "decimal" : undefined}
                  value={values[f.id] ?? ""}
                  placeholder={f.placeholder}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, [f.id]: e.target.value }));
                    setEdited(false);
                  }}
                  className={cn(
                    "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base outline-none focus:border-[#005BEA] focus:ring-2 focus:ring-[#005BEA]/20 sm:text-sm",
                    f.suffix ? "pr-10" : "",
                  )}
                />
                {f.suffix ? (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-slate-400">
                    {f.suffix}
                  </span>
                ) : null}
              </span>
            </label>
          ))}
          {scenario.id === "kira-zammi" ? (
            <p className="text-xs text-slate-500">
              Yasal tavanı bilmiyor musunuz?{" "}
              <Link href="/araclar/kira-sozlesmesi-artis-orani-hesaplama" className="font-semibold text-[#005BEA] hover:underline">
                Kira artış oranı aracından
              </Link>{" "}
              bakabilirsiniz.
            </p>
          ) : null}
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-3">
            <Segmented
              label="Ton"
              value={tone}
              onChange={(v) => {
                setTone(v);
                setEdited(false);
              }}
              options={[
                { value: "kibar", label: "Kibar" },
                { value: "kararli", label: "Kararlı" },
              ]}
            />
            <Segmented
              label="Biçim"
              value={channel}
              onChange={(v) => {
                setChannel(v);
                setEdited(false);
              }}
              options={[
                { value: "mesaj", label: "Mesaj" },
                { value: "resmi", label: "Resmi yazı" },
              ]}
            />
          </div>
          <label className="block p-3">
            <span className="sr-only">Cevap taslağı</span>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setEdited(true);
              }}
              rows={channel === "resmi" ? 16 : 11}
              className="w-full resize-y rounded-xl border-0 bg-[#FAFAF7] p-3 font-serif text-[15px] leading-relaxed text-slate-800 outline-none focus:ring-2 focus:ring-[#005BEA]/20"
            />
          </label>
          <div className="grid grid-cols-3 gap-2 border-t border-slate-100 p-3">
            <Button type="button" onClick={() => void copy()} className="h-11 rounded-xl bg-[#005BEA] font-semibold text-white hover:bg-[#004BC4]">
              {copied ? <Check className="mr-1.5 h-4 w-4" aria-hidden /> : <Copy className="mr-1.5 h-4 w-4" aria-hidden />}
              {copied ? "Kopyalandı" : "Kopyala"}
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl font-semibold">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => captureEvent("reply_shared", { scenario: scenario.id, via: "whatsapp" })}
              >
                <MessageCircle className="mr-1.5 h-4 w-4" aria-hidden />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl font-semibold">
              <a href={mailHref} onClick={() => captureEvent("reply_shared", { scenario: scenario.id, via: "email" })}>
                <Mail className="mr-1.5 h-4 w-4" aria-hidden />
                E-posta
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-4 flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <Scale className="mt-0.5 h-5 w-5 shrink-0 text-[#005BEA]" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-slate-900">Dayanak</p>
            <p className="mt-0.5 text-sm text-slate-600">{scenario.legalNote}</p>
            <p className="mt-2 text-xs text-slate-500">
              Taslak bilgilendirme amaçlıdır. Uyuşmazlık büyürse veya resmi ihtarname göndermeniz gerekirse bir avukata
              danışın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
