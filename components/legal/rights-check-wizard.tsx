"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  Home,
  KeyRound,
  Share2,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/legal/trust-strip";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuthSession } from "@/hooks/use-auth-session";
import {
  RIGHTS_SCENARIOS,
  computeRights,
  formatTry,
  getRightsScenario,
  type Answers,
  type RightsScenarioId,
  type ResultLevel,
} from "@/lib/legal/rights-check";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const ICONS: Record<RightsScenarioId, typeof Home> = {
  "isten-cikarildim": Briefcase,
  "ev-sahibi-cikin-diyor": KeyRound,
  "kira-zammi": TrendingUp,
  depozito: Home,
  "maas-odenmedi": Wallet,
};

const LEVEL_STYLE: Record<ResultLevel, string> = {
  good: "border-l-emerald-500",
  warn: "border-l-amber-500",
  risk: "border-l-red-500",
};

const LEVEL_LABEL: Record<ResultLevel, string> = {
  good: "Lehinize",
  warn: "Dikkat",
  risk: "Risk",
};

type Props = { initialScenario?: string };

export function RightsCheckWizard({ initialScenario }: Props) {
  const [scenarioId, setScenarioId] = React.useState<RightsScenarioId | null>(
    getRightsScenario(initialScenario)?.id ?? null,
  );
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({});
  const [done, setDone] = React.useState(false);
  const resultRef = React.useRef<HTMLDivElement>(null);
  const [authOpen, setAuthOpen] = React.useState(false);
  const { isLoggedIn } = useAuthSession();

  const scenario = getRightsScenario(scenarioId);
  const question = scenario?.questions[step];
  const value = question ? answers[question.id] ?? "" : "";

  const pick = (id: RightsScenarioId) => {
    setScenarioId(id);
    setStep(0);
    setAnswers({});
    setDone(false);
    captureEvent(AnalyticsEvents.RIGHTS_CHECK_STARTED, { scenario: id });
  };

  const next = () => {
    if (!scenario) return;
    if (step < scenario.questions.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    setDone(true);
    captureEvent(AnalyticsEvents.RIGHTS_CHECK_COMPLETED, { scenario: scenario.id });
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const share = async () => {
    if (!scenario) return;
    // Paylaşılan bağlantı yalnızca senaryoyu taşır — kişinin tutarları ve cevapları değil.
    const url = `${window.location.origin}/haklarim/kontrol?durum=${scenario.id}`;
    const text = `"${scenario.title}" durumunda haklarını 1 dakikada öğren:`;
    captureEvent(AnalyticsEvents.RIGHTS_CHECK_SHARED, { scenario: scenario.id });
    if (navigator.share) {
      await navigator.share({ title: "Haklarım Kontrolü — Clause", text, url }).catch(() => {});
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank", "noopener");
  };

  if (!scenario) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Ne oldu?</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RIGHTS_SCENARIOS.map((s) => {
            const Icon = ICONS[s.id];
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => pick(s.id)}
                  className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-[#005BEA]/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005BEA] dark:border-slate-700 dark:bg-slate-900"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#005BEA]/10 text-[#005BEA]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-slate-900 dark:text-slate-100">{s.title}</span>
                    <span className="mt-0.5 block text-sm text-slate-600 dark:text-slate-400">{s.prompt}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (done) {
    const r = computeRights(scenario.id, answers);
    return (
      <div ref={resultRef} tabIndex={-1} className="outline-none" aria-live="polite">
        <button
          type="button"
          onClick={() => setDone(false)}
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400"
        >
          <ArrowLeft className="h-4 w-4" /> Cevapları düzenle
        </button>

        <p className="mt-4 text-sm font-semibold text-[#005BEA]">{scenario.title}</p>
        <h2 className="mt-1 text-balance text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
          {r.headline}
        </h2>

        {r.amounts.length > 0 ? (
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {r.amounts.map((m) => (
              <div key={m.label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <dt className="text-sm text-slate-600 dark:text-slate-400">{m.label}</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-50">{formatTry(m.value)}</dd>
                {m.note ? <dd className="mt-1 text-xs text-slate-500">{m.note}</dd> : null}
              </div>
            ))}
          </dl>
        ) : null}

        <h3 className="mt-8 text-lg font-semibold text-slate-900 dark:text-slate-100">Haklarınız</h3>
        <ul className="mt-3 space-y-3">
          {r.rights.map((item) => (
            <li
              key={item.title}
              className={cn(
                "rounded-xl border border-l-4 border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900",
                LEVEL_STYLE[item.level],
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{LEVEL_LABEL[item.level]}</span>
                {item.cite ? (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-serif text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {item.cite}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">{item.body}</p>
            </li>
          ))}
        </ul>

        {r.deadlines.length > 0 ? (
          <>
            <h3 className="mt-8 text-lg font-semibold text-slate-900 dark:text-slate-100">Süreler</h3>
            <ul className="mt-3 space-y-2">
              {r.deadlines.map((d) => (
                <li key={d.label} className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950/30">
                  <p className="font-semibold text-amber-900 dark:text-amber-200">{d.label}</p>
                  <p className="mt-0.5 text-[15px] text-amber-900/90 dark:text-amber-100/80">{d.body}</p>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {!isLoggedIn && r.deadlines.length > 0 ? (
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#005BEA]/30 bg-[#005BEA]/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] text-slate-800 dark:text-slate-200">
              Bu süreleri kaçırmayın: ücretsiz hesap açın, son tarihlerinizi takviminize ekleyin, zamanı gelince hatırlatalım.
            </p>
            <Button type="button" onClick={() => setAuthOpen(true)} className="h-11 shrink-0 rounded-xl bg-[#005BEA] px-5 font-semibold text-white">
              Süreleri hatırlat
            </Button>
          </div>
        ) : null}

        <h3 className="mt-8 text-lg font-semibold text-slate-900 dark:text-slate-100">Şimdi ne yapabilirsiniz?</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {r.nextSteps.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] font-medium text-slate-900 hover:border-[#005BEA]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {s.label}
                <ArrowRight className="h-4 w-4 shrink-0 text-[#005BEA]" />
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => void share()}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-[15px] font-medium text-slate-900 hover:border-[#005BEA]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              Aynı durumdaki birine gönder
              <Share2 className="h-4 w-4 shrink-0 text-[#005BEA]" />
            </button>
          </li>
        </ul>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Avukata ne zaman gitmelisiniz?</p>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{r.lawyerWhen}</p>
        </div>

        <TrustStrip className="mt-6" />
        <AuthModal open={authOpen} onOpenChange={setAuthOpen} context="rights" next="/panel#takvim" />
      </div>
    );
  }

  const total = scenario.questions.length;
  const canNext =
    question?.kind === "choice" ? Boolean(value) : question?.kind === "date" ? Boolean(value) : value.trim() !== "";

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
        <button
          type="button"
          onClick={() => (step === 0 ? setScenarioId(null) : setStep((s) => s - 1))}
          className="inline-flex items-center gap-1 font-medium hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" /> Geri
        </button>
        <span aria-live="polite">
          {step + 1} / {total}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden>
        <div
          className="h-full rounded-full bg-[#005BEA] transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      {question ? (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (canNext) next();
          }}
        >
          <label htmlFor={`q-${question.id}`} className="block text-xl font-semibold text-slate-900 dark:text-slate-50">
            {question.label}
          </label>
          {question.help ? <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{question.help}</p> : null}

          {question.kind === "choice" ? (
            <div role="radiogroup" aria-labelledby={`q-${question.id}`} className="mt-4 space-y-2" id={`q-${question.id}`}>
              {question.options.map((o) => {
                const selected = value === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAnswers((p) => ({ ...p, [question.id]: o.value }))}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-base transition",
                      selected
                        ? "border-[#005BEA] bg-[#005BEA]/5 font-semibold text-slate-900 dark:text-slate-50"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
                    )}
                  >
                    {o.label}
                    {selected ? <Check className="h-4 w-4 text-[#005BEA]" /> : null}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2">
              <input
                id={`q-${question.id}`}
                type={question.kind === "date" ? "date" : "text"}
                inputMode={question.kind === "number" ? "decimal" : undefined}
                autoFocus
                value={value}
                onChange={(e) => setAnswers((p) => ({ ...p, [question.id]: e.target.value }))}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none focus:border-[#005BEA] focus:ring-2 focus:ring-[#005BEA]/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
              />
              {question.kind === "number" && question.suffix ? (
                <span className="text-base text-slate-600 dark:text-slate-400">{question.suffix}</span>
              ) : null}
            </div>
          )}

          <Button type="submit" disabled={!canNext} className="mt-6 h-12 w-full rounded-xl bg-[#005BEA] text-base font-semibold sm:w-auto sm:px-8">
            {step === total - 1 ? "Haklarımı göster" : "Devam"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      ) : null}
    </div>
  );
}
