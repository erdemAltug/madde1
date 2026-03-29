"use client";

import * as React from "react";
import { ContractAnalyzerModal } from "@/components/clause/contract-analyzer-modal";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingSecurityStrip } from "@/components/landing/landing-security-strip";
import { LandingTrustBand } from "@/components/landing/landing-trust-band";
import { LandingTryStrip } from "@/components/landing/landing-try-strip";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingFeaturesGrid } from "@/components/landing/landing-features-grid";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FreeToolsSection } from "@/components/landing/free-tools-section";
import { BottomCtaBand } from "@/components/landing/bottom-cta-band";
import { SiteFooter } from "@/components/landing/site-footer";
import { CommonRisksSection } from "@/components/landing/common-risks-section";
import { SeoPersonaSections } from "@/components/landing/seo-persona-sections";

export function ClauseLanding() {
  const [analyzerOpen, setAnalyzerOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8FAFC]">
      {/* Mesh gradient background */}
      <div
        className="pointer-events-none fixed inset-0 mesh-gradient opacity-60"
        aria-hidden
      />
      {/* Individual blobs for more color */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div 
          className="page-blob -left-[18%] top-[8%] h-[min(560px,90vw)] w-[min(560px,90vw)] bg-[#005BEA]/[0.04]"
        />
        <div 
          className="page-blob right-[-12%] top-[38%] h-[min(420px,75vw)] w-[min(420px,75vw)] bg-violet-500/[0.03]"
        />
        <div 
          className="page-blob left-[40%] bottom-[-5%] h-96 w-96 bg-cyan-400/[0.03]"
        />
      </div>
      <SiteNavbar />
      <main id="ana-icerik" className="relative">
        <LandingHero onOpenAnalyzer={() => setAnalyzerOpen(true)} />
        <LandingSecurityStrip />
        <LandingTrustBand />
        <LandingTryStrip onOpenAnalyzer={() => setAnalyzerOpen(true)} />
        <LandingHowItWorks />
        <LandingFeaturesGrid />
        <CommonRisksSection />
        <SeoPersonaSections />
        <FreeToolsSection />
        <div className="border-t border-slate-200/60 bg-gradient-to-b from-[#F8FAFC] via-slate-50/50 to-[#F8FAFC]">
          <PricingSection />
        </div>
        <BottomCtaBand onOpenAnalyzer={() => setAnalyzerOpen(true)} />
      </main>
      <SiteFooter />
      <ContractAnalyzerModal
        open={analyzerOpen}
        onOpenChange={setAnalyzerOpen}
        sharePath="/analiz/kira-sozlesmesi"
      />
    </div>
  );
}
