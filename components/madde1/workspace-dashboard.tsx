"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Scale } from "lucide-react";
import { ContractInputPanel } from "@/components/workspace/contract-input-panel";
import { AnalysisPanel } from "@/components/workspace/analysis-panel";
import { ShinyAnalyzeButton } from "@/components/magic/shiny-analyze-button";
import { GrowthWidgets } from "@/components/growth/growth-widgets";
import { PricingSection } from "@/components/marketing/pricing-section";
import { SAMPLE_RENTAL_CONTRACT } from "@/lib/constants";
import { getAssistantText } from "@/lib/message-text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ANALIZ_LINKS = [
  { href: "/analiz/kira", label: "Kira" },
  { href: "/analiz/hizmet-sozlesmesi", label: "Hizmet" },
  { href: "/analiz/tahliye-taahhutnamesi", label: "Tahliye" },
];

type Props = {
  sharePath?: string;
  pageTitle?: string;
};

export function WorkspaceDashboard({
  sharePath = "/analiz/kira",
  pageTitle = "Madde1 çalışma alanı",
}: Props) {
  const [contract, setContract] = React.useState("");

  const { messages, sendMessage, setMessages, status, error, stop } = useChat({
    id: "madde1-main-workspace",
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { mode: "contract" },
    }),
  });

  const busy = status === "submitted" || status === "streaming";
  const md = getAssistantText(messages);

  const runAnalysis = () => {
    const t = contract.trim();
    if (!t) return;
    setMessages([]);
    window.setTimeout(() => {
      void sendMessage({ text: t });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <header className="border-b border-border/60 bg-card/30 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                Madde1
              </p>
              <p className="text-xs text-muted-foreground">{pageTitle}</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {ANALIZ_LINKS.map((l) => (
              <Button key={l.href} variant="ghost" size="sm" asChild>
                <Link href={l.href}>{l.label}</Link>
              </Button>
            ))}
            <Button variant="outline" size="sm" asChild>
              <Link href="/#fiyatlandirma">Fiyatlandırma</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:space-y-12 lg:px-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-6 lg:grid-cols-2 lg:gap-8"
        >
          <div className="flex flex-col gap-4">
            <ContractInputPanel
              value={contract}
              onChange={setContract}
              disabled={busy}
              onSample={() => setContract(SAMPLE_RENTAL_CONTRACT)}
            />
            <div className="flex flex-wrap items-center gap-3">
              <ShinyAnalyzeButton
                loading={busy}
                disabled={!contract.trim()}
                onClick={runAnalysis}
              >
                Analiz Et (TBK Uygunluk)
              </ShinyAnalyzeButton>
              {busy ? (
                <Button type="button" variant="ghost" size="sm" onClick={() => void stop()}>
                  Durdur
                </Button>
              ) : null}
            </div>
          </div>

          <AnalysisPanel
            markdown={md}
            busy={busy}
            error={error}
            sharePath={sharePath}
          />
        </motion.div>

        <Separator className="bg-border/50" />

        <GrowthWidgets />

        <Separator className="bg-border/50" />

        <PricingSection />

        <footer className="border-t border-border/60 pt-8 text-center text-xs text-muted-foreground">
          <p>
            Madde1 — yapay zeka destekli ön analiz. Hukuki danışmanlık yerine
            geçmez.
          </p>
          <p className="mt-1">
            Powered by Madde1.tr — Yapay Zeka Hukuk Asistanı
          </p>
        </footer>
      </main>
    </div>
  );
}
