"use client";

import * as React from "react";
import { Check, Building2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/reveal";
import { PricingModal } from "@/components/b2c/pricing-modal";
import { EnterpriseContactDialog } from "@/components/b2c/enterprise-contact-dialog";
import { useWallet } from "@/hooks/use-wallet";
import { FAIR_USE_DISCLAIMER } from "@/lib/credits/packages";
import type { CreditPackageId } from "@/lib/credits/packages";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const ACCENT = "#005BEA";

export function PricingSection() {
  const wallet = useWallet();
  const [pricingOpen, setPricingOpen] = React.useState(false);
  const [emphasize, setEmphasize] = React.useState<CreditPackageId>("single");
  const [enterpriseOpen, setEnterpriseOpen] = React.useState(false);

  const openSingle = () => {
    captureEvent(AnalyticsEvents.PAYMENT_INITIATED, {
      funnel_step: "open_checkout_modal",
      source: "pricing_section",
      intent: "single",
      package_id: "single",
    });
    setEmphasize("single");
    setPricingOpen(true);
  };

  const openMonthly = () => {
    captureEvent(AnalyticsEvents.PAYMENT_INITIATED, {
      funnel_step: "open_checkout_modal",
      source: "pricing_section",
      intent: "monthly",
      package_id: "monthly",
    });
    setEmphasize("monthly");
    setPricingOpen(true);
  };

  return (
    <section className="space-y-10 py-16 sm:py-20" id="fiyatlandirma">
      <PricingModal
        open={pricingOpen}
        onOpenChange={setPricingOpen}
        purchase={wallet.purchase}
        emphasize={emphasize}
        title={emphasize === "monthly" ? "Aylık Standart — 99 TL" : "Tek analiz — 4,99 TL"}
        description={
          emphasize === "monthly"
            ? "Ay boyunca kesintisiz analiz ve iyileştirme (adil kullanım). Ödeme adımı atlanır; haklar anında tanımlanır."
            : "Tek seferlik tam detay ve düzeltme önerileri. Ödeme adımı atlanır; erişim hemen açılır."
        }
        footerNote={
          emphasize === "monthly"
            ? "Aylık planda dönem içi sınırsız tur; adil kullanım uygulanır."
            : "4,99 TL — tek tam analiz erişimi."
        }
        onPurchaseComplete={async () => {
          await wallet.refresh();
        }}
      />
      <EnterpriseContactDialog
        open={enterpriseOpen}
        onOpenChange={setEnterpriseOpen}
      />

      <Reveal>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-madde-ink sm:text-4xl">
            Şeffaf fiyat — güven satar
          </h2>
          <p className="mt-3 font-semibold text-slate-600">
            Önce ücretsiz özet; detay{" "}
            <span className="font-bold" style={{ color: ACCENT }}>
              4,99 TL
            </span>{" "}
            veya{" "}
            <span className="font-bold text-madde-blue">99 TL</span> aylık ile.
            Gizli ücret yok.
          </p>
        </div>
      </Reveal>
      <div className="mx-auto grid max-w-6xl items-end gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <Reveal delay={0.06} className="md:col-span-1">
          <div className="relative pt-4">
            <div
              className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2"
              aria-hidden
            >
              <span
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white shadow-lg"
                style={{
                  backgroundColor: ACCENT,
                  boxShadow: "0 8px 24px -4px rgba(0, 91, 234, 0.55)",
                }}
              >
                <Sparkles className="h-3 w-3" aria-hidden />
                MOST POPULAR
              </span>
            </div>
            <Card
              className={cn(
                "relative h-full overflow-visible border-2 bg-white pb-2 pt-2",
                "shadow-2xl shadow-[#005BEA]/25",
                "md:min-h-[calc(100%+10px)] md:-translate-y-2",
              )}
              style={{ borderColor: ACCENT }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.12]"
                style={{
                  background: `linear-gradient(165deg, ${ACCENT} 0%, transparent 55%)`,
                }}
                aria-hidden
              />
              <CardHeader className="relative">
                <CardTitle className="text-lg font-extrabold tracking-tight text-madde-ink">
                  Tek seferlik analiz
                </CardTitle>
                <p
                  className="text-3xl font-extrabold tracking-tight tabular-nums"
                  style={{ color: ACCENT }}
                >
                  4,99 TL
                </p>
                <p className="text-sm font-bold text-slate-800">
                  Sadece 4,99 TL / tek seferlik
                </p>
                <p className="text-sm font-medium text-slate-600">
                  Bir sözleşme için detaylı risk + düzeltme önerileri.
                </p>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <ul className="space-y-2 text-sm font-medium text-slate-700">
                  {[
                    "1 tam analiz kredisi",
                    "PDF / yazdır",
                    "TBK + güncel mevzuat özeti",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-[#00E676]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="cta"
                  className="w-full rounded-lg py-6 text-base"
                  type="button"
                  onClick={openSingle}
                >
                  Analyze Now (4.99 TL)
                </Button>
              </CardContent>
            </Card>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="h-full border border-slate-200/90 bg-white shadow-md shadow-slate-900/[0.06]">
            <CardHeader>
              <CardTitle className="text-lg font-extrabold tracking-tight text-madde-ink">
                Aylık Standart
              </CardTitle>
              <p className="text-3xl font-extrabold tracking-tight text-madde-ink">
                99 TL
              </p>
              <p className="text-sm font-medium text-slate-600">
                Ay boyunca kesintisiz analiz &amp; iyileştirme.
              </p>
              <p className="text-xs font-semibold text-slate-500">
                Adil kullanım politikası geçerlidir.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm font-medium text-slate-700">
                {[
                  "30 gün sınırsız tur",
                  "İyileştirme dahil",
                  "Yoğun kullanıcılar için",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-[#00E676]" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] leading-relaxed text-slate-500">
                {FAIR_USE_DISCLAIMER}
              </p>
              <Button
                variant="cta"
                className="w-full rounded-lg font-bold"
                type="button"
                onClick={openMonthly}
              >
                Aylığa geç
              </Button>
            </CardContent>
          </Card>
        </Reveal>
        <Reveal delay={0.14}>
          <Card className="h-full border border-slate-200/90 bg-white shadow-md shadow-slate-900/[0.06]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-madde-blue" aria-hidden />
                <CardTitle className="text-lg font-extrabold tracking-tight text-madde-ink">
                  Kurumsal çözümler
                </CardTitle>
              </div>
              <p className="text-lg font-bold text-slate-800">Teklif üzerine</p>
              <p className="text-sm font-medium text-slate-600">
                Sınırsız analiz, ekip yönetimi ve özel API erişimi.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm font-medium text-slate-700">
                {[
                  "Roller ve kota yönetimi",
                  "SSO / entegrasyon (yol haritası)",
                  "Özel fiyatlandırma",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-[#00E676]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full rounded-lg border-2 border-[#005BEA]/30 font-bold text-madde-ink hover:scale-[1.02] hover:border-[#005BEA]/50 hover:bg-[#005BEA]/[0.06] active:scale-[0.99]"
                variant="outline"
                type="button"
                onClick={() => setEnterpriseOpen(true)}
              >
                Bizimle iletişime geçin
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
