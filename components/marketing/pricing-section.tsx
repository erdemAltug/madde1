"use client";

import * as React from "react";
import { Check, Building2, Crown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/reveal";
import { PricingModal } from "@/components/b2c/pricing-modal";
import { EnterpriseContactDialog } from "@/components/b2c/enterprise-contact-dialog";
import { useWallet } from "@/hooks/use-wallet";
import type { CreditPackageId } from "@/lib/credits/packages";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const ACCENT = "#7c3aed";

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
        title={emphasize === "monthly" ? "clause.ai Professional — 199 ₺" : "Tek analiz — 4,99 TL"}
        description={
          emphasize === "monthly"
            ? "Ay boyunca kesintisiz analiz ve iyileştirme (adil kullanım)."
            : "Tek seferlik tam detay ve düzeltme önerileri."
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
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            İhtiyacınıza Uygun Çözümler
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Hukuki danışmanlıkta yapay zeka destekli çözümler
          </p>
        </div>
      </Reveal>
      
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 items-stretch">
        {/* B2C - Tek Analiz (Left) */}
        <Reveal delay={0.06}>
          <Card className="h-full flex flex-col border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">
                Tek Analiz
              </CardTitle>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                4,99₺
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Tek seferlik analiz için
              </p>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-2 flex flex-col">
              <ul className="space-y-3 flex-1">
                {[
                  "1 tam analiz kredisi",
                  "PDF / yazdır",
                  "TBK + güncel mevzuat özeti",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={openSingle}
                className="w-full mt-6 rounded-xl py-4 font-semibold bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"
              >
                Tek Analiz Satın Al
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        {/* B2C - Professional (Middle - Featured) */}
        <Reveal delay={0.1}>
          <Card className="h-full flex flex-col relative border border-slate-100 bg-white shadow-[0_0_30px_rgba(139,92,246,0.08)] hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-shadow">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-indigo-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-600 shadow-sm">
                <Crown className="w-3 h-3" />
                En Popüler
              </span>
            </div>
            
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">
                clause.ai Professional
              </CardTitle>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                199₺<span className="text-sm font-medium text-slate-500">/ay</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Bireysel kullanıcılar için
              </p>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-2 flex flex-col">
              <ul className="space-y-3 flex-1">
                {[
                  "Sınırsız Hukuki Analiz",
                  "Belge (PDF) Yükleme",
                  "Otomatik Dilekçe Hazırlama",
                  "PDF Olarak İndirme",
                  "Yargıtay İçtihatları Erişimi",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={openMonthly}
                className="w-full mt-6 rounded-xl py-4 font-semibold bg-slate-900 hover:bg-indigo-600 transition-all"
              >
                Hemen Başla
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        {/* B2B - Enterprise (Right) */}
        <Reveal delay={0.14}>
          <Card className="h-full flex flex-col border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-slate-500" />
                <CardTitle className="text-lg font-semibold text-slate-900">
                  clause.ai Enterprise
                </CardTitle>
              </div>
              <p className="text-lg font-semibold text-slate-800 mt-2">
                İletişime Geçin
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Hukuk büroları ve şirketler için
              </p>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-2 flex flex-col">
              <ul className="space-y-3 flex-1">
                {[
                  "Çoklu Kullanıcı Paneli",
                  "Gelişmiş İçtihat Filtreleme",
                  "API Erişimi",
                  "Kurumsal Raporlama",
                  "Özel entegrasyon desteği",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setEnterpriseOpen(true)}
                className="w-full mt-6 rounded-xl py-4 font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600"
              >
                Satışla Görüşün
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>
      
      {/* Footer Note */}
      <div className="text-center mt-8">
        <p className="text-xs text-slate-400 opacity-60">
          İstediğiniz zaman iptal edebilirsiniz. Gizli ücret yoktur.
        </p>
      </div>
    </section>
  );
}
