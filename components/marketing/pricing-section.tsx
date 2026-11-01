"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/reveal";
import { ContactLeadDialog } from "@/components/b2c/contact-lead-dialog";
import { FREE_PLAN_FEATURES, PLUS_PLAN_FEATURES, PLUS_PRICE_LABEL } from "@/lib/pricing";

function FeatureList({ items, tone }: { items: readonly string[]; tone: "blue" | "dark" }) {
  return (
    <ul className="flex-1 space-y-3">
      {items.map((f) => (
        <li
          key={f}
          className={`flex items-start gap-3 text-sm font-medium ${tone === "dark" ? "text-slate-300" : "text-slate-700"}`}
        >
          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone === "dark" ? "text-slate-400" : "text-[#005BEA]"}`} />
          {f}
        </li>
      ))}
    </ul>
  );
}

export function PricingSection() {
  const [enterpriseOpen, setEnterpriseOpen] = React.useState(false);
  const [plusOpen, setPlusOpen] = React.useState(false);

  return (
    <section className="space-y-8 py-16 sm:py-20" id="fiyatlandirma">
      <ContactLeadDialog open={enterpriseOpen} onOpenChange={setEnterpriseOpen} variant="enterprise" />
      <ContactLeadDialog open={plusOpen} onOpenChange={setPlusOpen} variant="b2c" source="pricing_plus" />

      <Reveal>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-deep-navy sm:text-3xl">
            Ücretsiz başlayın, ihtiyacınız olursa yükseltin
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Hatırlatıcılar ve takvim her zaman ücretsiz. Ödediğiniz şey derinlik: detaylı rapor ve resmi yazılar.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <Reveal delay={0.04}>
          <Card className="flex h-full flex-col border border-slate-200 bg-white shadow-sm">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-semibold text-deep-navy">Ücretsiz</CardTitle>
              <p className="mt-2 text-3xl font-bold text-deep-navy">0 ₺</p>
              <p className="mt-1 text-sm text-slate-500">Kredi kartı gerekmez</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6 pt-2">
              <FeatureList items={FREE_PLAN_FEATURES} tone="blue" />
              <Button asChild className="mt-6 w-full rounded-xl bg-[#005BEA] py-4 font-semibold text-white hover:bg-[#004BC4]">
                <Link href="/giris?kayit=1&next=/panel">
                  Ücretsiz hesap aç
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="relative flex h-full flex-col border-2 border-[#005BEA] bg-white shadow-md">
            <span className="absolute -top-3 left-6 rounded-full bg-[#005BEA] px-3 py-0.5 text-xs font-semibold text-white">
              Bireysel
            </span>
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-semibold text-deep-navy">Plus</CardTitle>
              <p className="mt-2 text-3xl font-bold text-deep-navy">{PLUS_PRICE_LABEL}</p>
              <p className="mt-1 text-sm text-slate-500">İstediğiniz zaman bırakın</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6 pt-2">
              <p className="mb-3 text-sm font-semibold text-slate-700">Ücretsiz plandaki her şey, ek olarak:</p>
              <FeatureList items={PLUS_PLAN_FEATURES} tone="blue" />
              <Button
                type="button"
                onClick={() => setPlusOpen(true)}
                className="mt-6 w-full rounded-xl bg-deep-navy py-4 font-semibold text-white hover:bg-deep-navy/90"
              >
                Plus&apos;a geç
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.12}>
          <Card className="flex h-full flex-col border border-slate-800 bg-slate-900 text-white shadow-sm">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-slate-400" />
                <CardTitle className="text-lg font-semibold text-white">Kurumsal</CardTitle>
              </div>
              <p className="mt-2 text-3xl font-bold text-white">Teklif</p>
              <p className="mt-1 text-sm text-slate-400">Ekipler ve hukuk büroları</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6 pt-2">
              <FeatureList
                items={["Sınırsız analiz", "Çoklu kullanıcı", "Kurumsal raporlama", "Özel entegrasyon desteği"]}
                tone="dark"
              />
              <Button
                onClick={() => setEnterpriseOpen(true)}
                className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 py-4 font-semibold text-white hover:bg-slate-700"
              >
                İletişime geçin
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
