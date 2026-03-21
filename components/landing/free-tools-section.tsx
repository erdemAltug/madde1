"use client";

import * as React from "react";
import Link from "next/link";
import { FileWarning, Stamp, TrendingUp } from "lucide-react";
import { RentIncreaseCalculator } from "@/components/growth/rent-increase-calculator";
import { StampTaxCalculator } from "@/components/growth/stamp-tax-calculator";
import { TahliyeCheckWidget } from "@/components/growth/tahliye-check-widget";
import { Reveal } from "@/components/landing/reveal";
import { Button } from "@/components/ui/button";
import {
  BENTO_SEO_COMING_SOON,
  BENTO_SEO_DAMGA,
  BENTO_SEO_KIRA_ARTIS,
  BENTO_SEO_TAHLIYE,
} from "@/lib/seo/bento-tool-seo-copy";
import {
  DAMGA_VERGISI_TOOL_PATH,
  KIRA_ARTIS_TOOL_PATH,
  TAHLIYE_TOOL_PATH,
} from "@/lib/seo/free-tools-routes";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const iconWrap =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#005BEA] to-[#0046B8] text-white shadow-lg shadow-[#005BEA]/35 ring-4 ring-[#005BEA]/10";

function ToolShell({
  id,
  title,
  description,
  icon,
  children,
  onTry,
  showTryButton = true,
  className,
  indexPageHref,
  indexPageLabel,
  accentTint,
  srSeoText,
  /** İçerik alanını uzatma — bento kira kartı gibi kompakt düzenler için */
  compact = false,
}: {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onTry: () => void;
  showTryButton?: boolean;
  className?: string;
  indexPageHref?: string;
  indexPageLabel?: string;
  accentTint?: string;
  /** Arama motorları / ekran okuyucu için uzun açıklama (görünmez) */
  srSeoText?: string;
  compact?: boolean;
}) {
  const [pulse, setPulse] = React.useState(false);

  return (
    <div
      id={id}
      className={cn(
        "tool-bento-card tool-bento-inner relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#005BEA]/[0.12] bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#005BEA]/25 hover:shadow-xl hover:shadow-[#005BEA]/12 sm:p-6",
        pulse && "ring-2 ring-[#005BEA]/40 ring-offset-2 ring-offset-white",
        className,
      )}
      style={
        accentTint
          ? ({
              background: `linear-gradient(145deg, ${accentTint} 0%, #ffffff 42%)`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className="flex gap-4">
        <div className={iconWrap}>{icon}</div>
        <div className="min-w-0 flex-1">
          {srSeoText ? (
            <p id={`${id}-seo`} className="sr-only">
              {srSeoText}
            </p>
          ) : null}
          <h3 className="text-lg font-extrabold tracking-tight text-madde-ink">
            {title}
          </h3>
          <p className="mt-1 text-sm font-semibold leading-snug text-slate-600">
            {description}
          </p>
        </div>
      </div>
      <div
        className={cn(
          compact ? "mt-4 flex-none" : "mt-5 min-h-0 flex-1",
        )}
      >
        {children}
      </div>
      {showTryButton ? (
        <Button
          type="button"
          variant="outline"
          className="mt-5 w-full rounded-xl border-2 border-[#005BEA]/25 font-bold text-madde-ink shadow-sm transition-all hover:scale-[1.02] hover:border-[#005BEA] hover:bg-[#005BEA]/[0.07] active:scale-[0.99] sm:w-auto"
          onClick={() => {
            onTry();
            setPulse(true);
            window.setTimeout(() => setPulse(false), 900);
          }}
        >
          Hemen dene
        </Button>
      ) : null}
      {indexPageHref ? (
        <Link
          href={indexPageHref}
          className="mt-3 inline-block text-sm font-bold text-[#005BEA] underline-offset-4 hover:underline"
        >
          {indexPageLabel ?? "Tam rehber ve SEO sayfası"}
        </Link>
      ) : null}
    </div>
  );
}

export function FreeToolsSection() {
  const kiraRef = React.useRef<HTMLDivElement>(null);
  const damgaRef = React.useRef<HTMLDivElement>(null);

  const focusIn = (ref: React.RefObject<HTMLDivElement | null>) => {
    const el = ref.current?.querySelector(
      "input, textarea",
    ) as HTMLElement | null;
    el?.focus();
  };

  return (
    <section
      id="ucretsiz-araclar"
      className="relative overflow-hidden border-y border-[#005BEA]/[0.08] bg-gradient-to-b from-slate-50/90 via-white to-[#005BEA]/[0.03] py-20 sm:py-24"
    >
      <div
        className="page-blob -left-[25%] top-[10%] h-[min(520px,80vw)] w-[min(520px,80vw)] bg-[#005BEA]/[0.11]"
        aria-hidden
      />
      <div
        className="page-blob right-[-20%] bottom-[5%] h-[min(440px,70vw)] w-[min(440px,70vw)] bg-violet-500/[0.09]"
        aria-hidden
      />
      <div
        className="page-blob left-[35%] top-[55%] h-80 w-80 bg-[#005BEA]/[0.06]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#005BEA]">
              Ücretsiz araçlar
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-madde-ink sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
              Anında değer: bento ızgarasında{" "}
              <span className="text-[#005BEA]">hukuk + hesap</span>
            </h2>
            <p className="mt-4 text-base font-semibold text-slate-600 sm:text-lg">
              Kira, damga ve tahliye ön kontrolü — modern arayüz, net geri bildirim.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <Reveal delay={0.05} className="h-full md:col-span-2">
            <ToolShell
              id="arac-kira"
              title="Kira artış ön hesabı"
              description="Tek dönem yıllık artış; artış tutarı ve yeni kira tek bakışta. Tam rehber için linke tıklayın."
              icon={<TrendingUp className="h-5 w-5" aria-hidden />}
              onTry={() => {
                captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
                  tool: "rent_increase",
                  surface: "bento",
                });
                focusIn(kiraRef);
              }}
              className="h-full"
              compact
              srSeoText={BENTO_SEO_KIRA_ARTIS}
              indexPageHref={KIRA_ARTIS_TOOL_PATH}
              indexPageLabel="Kira sözleşmesi artış oranı — tam sayfa ve rehber"
            >
              <div ref={kiraRef}>
                <RentIncreaseCalculator
                  embedded
                  vivid
                  bentoCompact
                  cardClassName="border-0 bg-transparent shadow-none"
                />
              </div>
            </ToolShell>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <ToolShell
              id="arac-damga"
              title="Damga vergisi"
              description="Kabaca matrah ve damga — şeffaf girdiler."
              icon={<Stamp className="h-5 w-5" aria-hidden />}
              onTry={() => {
                captureEvent(AnalyticsEvents.FREE_TOOL_USED, {
                  tool: "stamp_tax",
                  surface: "bento",
                });
                focusIn(damgaRef);
              }}
              className="h-full"
              srSeoText={BENTO_SEO_DAMGA}
              indexPageHref={DAMGA_VERGISI_TOOL_PATH}
              indexPageLabel="Damga vergisi hesaplama — tam sayfa"
            >
              <div ref={damgaRef}>
                <StampTaxCalculator
                  embedded
                  vivid
                  cardClassName="border-0 bg-transparent shadow-none"
                />
              </div>
            </ToolShell>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <ToolShell
              id="arac-tahliye"
              title="Tahliye taahhütnamesi"
              description="AI ile hızlı ön kontrol — mavi vurgulu diyalog."
              icon={<FileWarning className="h-5 w-5" aria-hidden />}
              showTryButton={false}
              onTry={() => {}}
              className="h-full"
              accentTint="rgba(0, 91, 234, 0.04)"
              srSeoText={BENTO_SEO_TAHLIYE}
              indexPageHref={TAHLIYE_TOOL_PATH}
              indexPageLabel="Tahliye taahhütnamesi yapay zeka — tam sayfa"
            >
              <TahliyeCheckWidget embedded />
            </ToolShell>
          </Reveal>

          <Reveal delay={0.12} className="h-full md:col-span-2">
            <div className="tool-bento-card flex h-full min-h-[160px] flex-col justify-center rounded-3xl border-2 border-dashed border-[#005BEA]/35 bg-gradient-to-br from-[#005BEA]/[0.07] via-white to-violet-50/50 p-8 text-center sm:text-left">
              <p id="arac-yakinda-seo" className="sr-only">
                {BENTO_SEO_COMING_SOON}
              </p>
              <p className="text-base font-extrabold text-madde-ink">
                Daha fazla araç yakında
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Kıdem, KVKK özeti ve sözleşme şablonları — aynı bento
                deneyiminde.
              </p>
              <Button
                asChild
                variant="cta"
                className="mt-5 w-full rounded-xl sm:w-auto sm:self-start"
              >
                <Link href="/#fiyatlandirma">Tam analize geç</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
