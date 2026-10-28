"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ContractAnalyzerModal } from "@/components/clause/contract-analyzer-modal";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingFollowUp } from "@/components/landing/landing-follow-up";
import { LandingAsistanDemo } from "@/components/landing/landing-asistan-demo";
import { LandingWhyAssistant } from "@/components/landing/landing-why-assistant";
import { LandingSecurityStrip } from "@/components/landing/landing-security-strip";
import { LandingTryStrip } from "@/components/landing/landing-try-strip";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingCompanion } from "@/components/landing/landing-companion";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FreeToolsSection } from "@/components/landing/free-tools-section";
import { BottomCtaBand } from "@/components/landing/bottom-cta-band";
import { SiteFooter } from "@/components/landing/site-footer";
import { CommonRisksSection } from "@/components/landing/common-risks-section";
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

export function ClauseLanding() {
  const searchParams = useSearchParams();
  const initialPersona = parsePersona(searchParams.get("persona"));
  const [analyzerOpen, setAnalyzerOpen] = React.useState(false);
  const [persona, setPersona] = React.useState<PersonaId>(initialPersona);

  const openAnalyzer = React.useCallback((next?: PersonaId) => {
    if (next) setPersona(next);
    setAnalyzerOpen(true);
  }, []);

  React.useEffect(() => {
    if (searchParams.get("open") === "1" || searchParams.get("dene") === "1") {
      setAnalyzerOpen(true);
    }
  }, [searchParams]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FAFAF7]">
      <SiteNavbar />
      <main id="ana-icerik" className="relative">
        <LandingHero onOpenAnalyzer={openAnalyzer} />
        <LandingFollowUp />
        <LandingAsistanDemo />
        <LandingWhyAssistant />
        <LandingSecurityStrip />
        <LandingTryStrip onOpenAnalyzer={() => openAnalyzer()} />
        <LandingHowItWorks />
        <LandingCompanion />
        <CommonRisksSection />
        <FreeToolsSection />
        <div className="border-t border-slate-200/60 bg-gradient-to-b from-[#F8FAFC] via-slate-50/50 to-[#F8FAFC]">
          <PricingSection />
        </div>
        <BottomCtaBand onOpenAnalyzer={() => openAnalyzer()} />
      </main>
      <SiteFooter />
      <ContractAnalyzerModal
        open={analyzerOpen}
        onOpenChange={setAnalyzerOpen}
        sharePath="/analiz/kira-sozlesmesi"
        initialPersona={persona}
      />
    </div>
  );
}
