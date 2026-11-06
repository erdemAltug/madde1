"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "@/components/landing/reveal";
import { PLANS, type Plan, type PaidPlanId } from "@/lib/pricing";
import { cn } from "@/lib/utils";

async function sendInterest(body: Record<string, string | undefined>) {
  const res = await fetch("/api/plan-interest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const d = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(d.error ?? "Gönderilemedi, lütfen tekrar deneyin.");
  }
}

export function PricingSection() {
  const [picked, setPicked] = React.useState<Plan | null>(null);

  const choose = (plan: Plan) => {
    setPicked(plan);
    // Tıklamanın kendisi de bir talep: e-posta bırakmasa da haberimiz olsun
    void sendInterest({ plan: plan.id, page: window.location.pathname }).catch(() => {});
  };

  return (
    <section className="py-16 sm:py-24" id="fiyatlandirma" aria-labelledby="paketler-baslik">
      <Reveal>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="paketler-baslik" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            İhtiyacınız kadar
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tek bir sorun için de, her gün için de, şirketiniz için de bir paket var.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.id} delay={0.04 * i}>
            <PlanCard plan={plan} onChoose={choose} />
          </Reveal>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl px-4 text-center text-xs text-slate-500">
        Ücretli paketler kısa süre içinde açılıyor. Adil kullanım politikası geçerlidir.
      </p>

      <InterestDialog plan={picked} onClose={() => setPicked(null)} />
    </section>
  );
}

function PlanCard({ plan, onChoose }: { plan: Plan; onChoose: (p: Plan) => void }) {
  const hl = plan.highlighted;
  const btn = cn(
    "mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition",
    hl ? "bg-[#005BEA] text-white hover:bg-[#004BC4]" : "bg-slate-900 text-white hover:bg-slate-800",
  );

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl bg-white p-6",
        hl ? "border-2 border-[#005BEA] shadow-xl shadow-[#005BEA]/10" : "border border-slate-200 shadow-sm",
      )}
    >
      {hl ? (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-[#005BEA] px-3 py-0.5 text-xs font-semibold text-white">
          <Sparkles className="h-3 w-3" aria-hidden />
          Önerilen
        </span>
      ) : null}
      <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{plan.audience}</p>
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="text-4xl font-bold tracking-tight text-slate-900">{plan.price}</span>
        <span className="text-sm text-slate-500">{plan.period}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#005BEA]" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      {plan.id === "free" ? (
        <Link href="/giris?kayit=1&next=/panel" className={cn(btn, "bg-white text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50")}>
          {plan.cta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      ) : (
        <button type="button" onClick={() => onChoose(plan)} className={btn}>
          {plan.cta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

function InterestDialog({ plan, onClose }: { plan: Plan | null; onClose: () => void }) {
  const [email, setEmail] = React.useState("");
  const [note, setNote] = React.useState("");
  const [state, setState] = React.useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (plan) {
      setState("idle");
      setError(null);
    }
  }, [plan]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!plan) return;
    setState("sending");
    setError(null);
    try {
      const company = (new FormData(e.currentTarget).get("company") as string) || undefined;
      await sendInterest({
        plan: plan.id as PaidPlanId,
        email,
        note: note || undefined,
        page: window.location.pathname,
        company,
      });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gönderilemedi.");
      setState("idle");
    }
  };

  return (
    <Dialog open={Boolean(plan)} onOpenChange={(o) => (!o ? onClose() : undefined)}>
      <DialogContent className="sm:max-w-md">
        {state === "done" ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" aria-hidden />
            <DialogTitle className="mt-3 text-lg">Listedesiniz</DialogTitle>
            <DialogDescription className="mt-2">
              {plan?.name} paketi açıldığında ilk size haber vereceğiz. O zamana kadar ücretsiz planı dilediğiniz gibi
              kullanabilirsiniz.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{plan?.name} paketi çok yakında</DialogTitle>
              <DialogDescription>
                Paketleri ilk kullanıcılarımızla birlikte açıyoruz. E-postanızı bırakın, açıldığı gün size ulaşalım.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="mt-2 space-y-3">
              <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <label className="block">
                <span className="text-sm font-medium text-slate-700">E-posta</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@eposta.com"
                  className="mt-1 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-[#005BEA] focus:ring-2 focus:ring-[#005BEA]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Ne için kullanmak istersiniz? <span className="font-normal text-slate-400">(isteğe bağlı)</span>
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  placeholder="Örn. ev sahibimle kira artışı konusunda anlaşmazlık var"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#005BEA] focus:ring-2 focus:ring-[#005BEA]/20"
                />
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={state === "sending"}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
              >
                {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                Açılınca haber ver
              </button>
              <p className="text-center text-xs text-slate-500">
                E-postanızı yalnızca bu paketle ilgili bilgilendirme için kullanırız.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
