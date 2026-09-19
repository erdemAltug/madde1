"use client";

import * as React from "react";
import { Check, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/reveal";
import { ContactLeadDialog } from "@/components/b2c/contact-lead-dialog";

export function PricingSection() {
  const [enterpriseOpen, setEnterpriseOpen] = React.useState(false);
  const [b2cLeadOpen, setB2cLeadOpen] = React.useState(false);

  return (
    <section className="space-y-8 py-16 sm:py-20" id="fiyatlandirma">
      <ContactLeadDialog
        open={enterpriseOpen}
        onOpenChange={setEnterpriseOpen}
        variant="enterprise"
      />
      <ContactLeadDialog
        open={b2cLeadOpen}
        onOpenChange={setB2cLeadOpen}
        variant="b2c"
        source="pricing_b2c"
      />

      <Reveal>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-deep-navy sm:text-3xl">
            Hukuki Güvenceniz Artık Cebinizde
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Tek bir avukat danışmanlık ücretinin çok altına, sınırsız hukuki
            zeka desteğine sahip olun.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-4xl grid-cols-1 items-stretch gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <Reveal delay={0.06}>
          <Card className="flex h-full flex-col border-2 border-emerald-200 bg-emerald-50/50 shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-semibold text-deep-navy">
                Bireysel
              </CardTitle>
              <p className="mt-2 text-lg font-semibold text-deep-navy">
                Teklif alın
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Günlük kullanım, paket ve asistan desteği
              </p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6 pt-2">
              <ul className="flex-1 space-y-3">
                {[
                  "Günde 10 analiz (kayıtlı)",
                  "Detaylı risk özeti",
                  "Sözleşme iyileştirme",
                  "PDF / yazdır",
                  "TBK + güncel mevzuat özeti",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm font-medium text-slate-600"
                  >
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                onClick={() => setB2cLeadOpen(true)}
                className="mt-6 w-full rounded-xl bg-emerald-600 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-700"
              >
                Teklif alın
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="flex h-full flex-col border border-slate-800 bg-slate-900 text-white shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-400" />
                <CardTitle className="text-lg font-semibold text-white">
                  Kurumsal
                </CardTitle>
              </div>
              <p className="mt-2 text-lg font-semibold text-white">Teklif Alın</p>
              <p className="mt-1 text-sm font-medium text-slate-400">
                Sınırsız Analiz + Özel Çözümler
              </p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6 pt-2">
              <ul className="flex-1 space-y-3">
                {[
                  "Sınırsız analiz kredisi",
                  "Çoklu Kullanıcı Paneli",
                  "API Erişimi",
                  "Kurumsal Raporlama",
                  "Özel entegrasyon desteği",
                  "Gelişmiş İçtihat Filtreleme",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm font-medium text-slate-300"
                  >
                    <Check className="h-4 w-4 shrink-0 text-indigo-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setEnterpriseOpen(true)}
                className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 py-4 font-semibold text-white hover:border-indigo-500 hover:bg-slate-700"
              >
                İletişime Geçin
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs font-medium text-slate-400">
          İstediğiniz zaman iptal edebilirsiniz. Gizli ücret yoktur.
        </p>
      </div>
    </section>
  );
}
