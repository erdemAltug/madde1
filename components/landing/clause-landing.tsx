"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ContractAnalyzerModal } from "@/components/clause/contract-analyzer-modal";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingFollowUp } from "@/components/landing/landing-follow-up";
import { LandingDoors } from "@/components/landing/landing-doors";
import { LandingFaq } from "@/components/landing/landing-faq";
import { PricingSection } from "@/components/marketing/pricing-section";
import { BottomCtaBand } from "@/components/landing/bottom-cta-band";
import { SiteFooter } from "@/components/landing/site-footer";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import type { PersonaId } from "@/lib/personas";

function parsePersona(raw: string | null): PersonaId {
  if (
    raw === "freelancer" ||
    raw === "tenant" ||
    raw === "job_seeker" ||
    raw === "general"
  ) {
    return raw;
  }
  return "general";
}

/**
 * Ana sayfa: tek iş — ziyaretçiyi ilk taramaya, taramadan sonra ücretsiz hesaba götürmek.
 * Hero (tara) → gerçek sayılar → taramadan sonra (takvim vaadi) → giriş kapıları → SSS + fiyat → tek kapanış.
 */
export function ClauseLanding() {
  const searchParams = useSearchParams();
  const initialPersona = parsePersona(searchParams.get("persona"));
  const [analyzerOpen, setAnalyzerOpen] = React.useState(false);
  const [persona, setPersona] = React.useState<PersonaId>(initialPersona);
  const [file, setFile] = React.useState<File | null>(null);

  const openAnalyzer = React.useCallback((next?: PersonaId, nextFile?: File) => {
    if (next) setPersona(next);
    setFile(nextFile ?? null);
    setAnalyzerOpen(true);
  }, []);

  React.useEffect(() => {
    captureEvent(AnalyticsEvents.LANDING_VIEWED, {
      source: searchParams.get("utm_source") ?? undefined,
    });
    if (searchParams.get("open") === "1" || searchParams.get("dene") === "1") {
      setAnalyzerOpen(true);
    }
  }, [searchParams]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FAFAF7]">
      <SiteNavbar />
      <main id="ana-icerik" className="relative">
        <LandingHero onOpenAnalyzer={openAnalyzer} />
        <LandingStats />
        <LandingFollowUp />
        <LandingDoors />
        <LandingFaq />
        <div className="bg-[#FAFAF7]">
          <PricingSection />
        </div>
        <BottomCtaBand onOpenAnalyzer={() => openAnalyzer()} />
      </main>
      <SiteFooter />
      <ContractAnalyzerModal
        open={analyzerOpen}
        onOpenChange={(o) => {
          setAnalyzerOpen(o);
          if (!o) setFile(null);
        }}
        sharePath="/analiz/kira-sozlesmesi"
        initialPersona={persona}
        initialFile={file}
      />
    </div>
  );
}
