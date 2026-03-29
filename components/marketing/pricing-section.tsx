"use client";

import * as React from "react";
import { Check, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/reveal";
import { EnterpriseContactDialog } from "@/components/b2c/enterprise-contact-dialog";
import { useRouter } from "next/navigation";

export function PricingSection() {
  const router = useRouter();
  const [enterpriseOpen, setEnterpriseOpen] = React.useState(false);

  const handleFreeStart = () => {
    router.push("/giris");
  };

  return (
    <section className="space-y-8 py-16 sm:py-20" id="fiyatlandirma">
      <EnterpriseContactDialog
        open={enterpriseOpen}
        onOpenChange={setEnterpriseOpen}
      />

      <Reveal>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-deep-navy sm:text-3xl">
            Hukuki Güvenceniz Artık Cebinizde
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-medium">
            Tek bir avukat danışmanlık ücretinin çok altına, sınırsız hukuki zeka desteğine sahip olun.
          </p>
        </div>
      </Reveal>
      

      {/* Two columns: Free + Corporate */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8 items-stretch">
        {/* Free - Beta (Left) */}
        <Reveal delay={0.06}>
          <Card className="h-full flex flex-col border-2 border-emerald-200 bg-emerald-50/50 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-semibold text-deep-navy">
                Ücretsiz
              </CardTitle>
              <p className="text-4xl font-bold text-emerald-600 mt-2">
                0₺<span className="text-sm font-medium text-slate-500">/ay</span>
              </p>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                3 Analiz Kredisi (Hediye)
              </p>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-2 flex flex-col">
              <ul className="space-y-3 flex-1">
                {[
                  "3 analiz kredisi",
                  "Temel risk özeti",
                  "Hızlı sözleşme kontrolü",
                  "PDF / yazdır",
                  "TBK + güncel mevzuat özeti",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={handleFreeStart}
                className="w-full mt-6 rounded-xl py-4 font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/25"
              >
                Hemen Ücretsiz Başla
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        {/* Corporate - Kurumsal (Right) - Dark Theme */}
        <Reveal delay={0.1}>
          <Card className="h-full flex flex-col bg-slate-900 border border-slate-800 shadow-sm hover:shadow-md transition-shadow text-white">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-400" />
                <CardTitle className="text-lg font-semibold text-white">
                  Kurumsal
                </CardTitle>
              </div>
              <p className="text-lg font-semibold text-white mt-2">
                Teklif Alın
              </p>
              <p className="text-sm text-slate-400 mt-1 font-medium">
                Sınırsız Analiz + Özel Çözümler
              </p>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-2 flex flex-col">
              <ul className="space-y-3 flex-1">
                {[
                  "Sınırsız analiz kredisi",
                  "Çoklu Kullanıcı Paneli",
                  "API Erişimi",
                  "Kurumsal Raporlama",
                  "Özel entegrasyon desteği",
                  "Gelişmiş İçtihat Filtreleme",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                    <Check className="h-4 w-4 shrink-0 text-indigo-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setEnterpriseOpen(true)}
                className="w-full mt-6 rounded-xl py-4 font-semibold bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 hover:border-indigo-500"
              >
                İletişime Geçin
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>
      
      {/* Footer Note */}
      <div className="text-center mt-8">
        <p className="text-xs text-slate-400 font-medium">
          İstediğiniz zaman iptal edebilirsiniz. Gizli ücret yoktur.
        </p>
      </div>
    </section>
  );
}
