"use client";

import { ArrowRight, CheckCircle2, FileText, Scale, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RedesignedHeroProps {
  onOpenAnalyzer: () => void;
}

export function RedesignedHero({ onOpenAnalyzer }: RedesignedHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 32V0h32" fill="none" stroke="#1E3A5F" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-700/[0.03] to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Main Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mint-50 border border-mint-200 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-mint-500 animate-pulse" />
              <span className="text-sm font-semibold text-navy-700">
                Yargıtay Veritabanı Entegre
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-navy-800 leading-[1.1]">
                Hukuki analizde
                <span className="text-navy-700"> belirsizliği </span>
                ortadan kaldırın
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Yapay zeka destekli analiz ile vakanıza uygun kanun maddelerini ve 
                emsal kararları saniyeler içinde keşfedin.
              </p>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg font-bold bg-navy-700 hover:bg-navy-800 text-mint-100 shadow-xl shadow-navy-700/25 rounded-xl"
                onClick={onOpenAnalyzer}
              >
                <Zap className="w-5 h-5 mr-2" />
                Analizi Başlat
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-lg font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-xl"
                asChild
              >
                <Link href="#nasil-calisir">
                  Nasıl Çalışır?
                </Link>
              </Button>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-slate-100">
              <div>
                <p className="text-3xl font-bold text-navy-800">10K+</p>
                <p className="text-sm text-slate-500 font-medium">Kanun Maddesi</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-navy-800">50K+</p>
                <p className="text-sm text-slate-500 font-medium">Emsal Karar</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-navy-800">{"<30s"}</p>
                <p className="text-sm text-slate-500 font-medium">Analiz Süresi</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Demo */}
          <div className="relative hidden lg:block">
            {/* Main Card */}
            <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/10 overflow-hidden">
              {/* Card Header */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-slate-600">Örnek Analiz</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-mint-100 text-mint-700 rounded-full font-semibold">
                    ✓ Tamamlandı
                  </span>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 space-y-6">
                {/* Query */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Sorgu
                  </p>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-100">
                    &ldquo;Kiracı çıkarmak istiyorum, yasal süreç nedir?&rdquo;
                  </p>
                </div>

                {/* Results */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Tespit Edilen Hukuki Alanlar
                  </p>
                  
                  <div className="space-y-2">
                    {/* Law Article */}
                    <div className="flex items-center justify-between p-3 bg-navy-50/50 border border-navy-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700">
                          <Scale className="h-4 w-4 text-mint-300" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-800">TBK Madde 347</p>
                          <p className="text-xs text-slate-500">Kira Sözleşmesi</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-mint-600">%94</span>
                    </div>

                    {/* Case Law */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200">
                          <FileText className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">Yargıtay 6. HD</p>
                          <p className="text-xs text-slate-500">2018/1234 E. 2019/5678 K.</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-600">%78</span>
                    </div>
                  </div>
                </div>

                {/* Risk Level */}
                <div className="flex items-center justify-between p-4 bg-mint-50 border border-mint-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-mint-600" />
                    <div>
                      <p className="text-sm font-semibold text-navy-800">Risk Değerlendirmesi</p>
                      <p className="text-xs text-slate-500">Tespit edilen riskler</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-mint-600">Düşük Risk</span>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg border border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-100">
                <CheckCircle2 className="h-5 w-5 text-mint-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy-800">3.2 sn</p>
                <p className="text-xs text-slate-500">Ortalama süre</p>
              </div>
            </div>

            {/* Floating Security Badge */}
            <div className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 bg-navy-800 text-mint-100 rounded-lg shadow-lg">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-semibold">KVKK Uyumlu</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators - Bottom */}
        <div className="mt-20 pt-8 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-mint-500" />
              <span className="text-sm font-medium">Ücretsiz deneyin</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-mint-500" />
              <span className="text-sm font-medium">Kayıt gerekmez</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-mint-500" />
              <span className="text-sm font-medium">Anında sonuç</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-mint-500" />
              <span className="text-sm font-medium">Verileriniz güvende</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
