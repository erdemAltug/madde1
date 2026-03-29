"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight, Sparkles, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FreemiumPaywallProps {
  title?: string;
  subtitle?: string;
  featureCount?: number;
  showBlur?: boolean;
  blurIntensity?: number;
  variant?: "inline" | "modal" | "page";
}

export function FreemiumPaywall({
  title = "Detaylı Analiz İçin Giriş Yapın",
  subtitle = "Risk değerlendirmesi, detaylı açıklamalar ve kişiselleştirilmiş öneriler için ücretsiz hesap oluşturun.",
  featureCount = 3,
  showBlur = true,
  blurIntensity = 8,
  variant = "inline",
}: FreemiumPaywallProps) {
  const features = [
    "Tam kapsamlı risk analizi",
    "Detaylı kanun maddesi açıklamaları",
    "Kişiselleştirilmiş hukuki öneriler",
    "Yargıtay emsal karar bağlantıları",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative rounded-2xl bg-white border border-slate-200 shadow-lg overflow-hidden",
        variant === "page" && "max-w-md mx-auto",
        variant === "modal" && "mx-4"
      )}
    >
      {/* Blur Overlay */}
      {showBlur && (
        <div
          className="absolute inset-0 backdrop-blur-sm z-10 pointer-events-none"
          style={{ backdropFilter: `blur(${blurIntensity}px)` }}
        />
      )}

      {/* Content */}
      <div className={cn("relative", showBlur && "blur-sm")}>
        <div className="p-6 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-700 to-navy-800 flex items-center justify-center shadow-lg shadow-navy-700/30">
              <Lock className="w-8 h-8 text-mint-300" />
            </div>
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-navy-800">
              {title}
            </h3>
            <p className="text-sm text-slate-600">
              {subtitle}
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-2">
            {features.slice(0, featureCount).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-mint-500 flex-shrink-0" />
                <span className="text-slate-600">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              className="w-full h-12 bg-navy-700 hover:bg-navy-800 text-mint-100 font-bold shadow-lg shadow-navy-700/20 group"
              asChild
            >
              <Link href="/kayit">
                <Sparkles className="w-4 h-4 mr-2" />
                Ücretsiz Hesap Oluştur
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-slate-500">Zaten hesabınız var mı?</span>
              <Link
                href="/giris"
                className="font-semibold text-navy-700 hover:text-navy-800 underline-offset-2 hover:underline"
              >
                Giriş Yap
              </Link>
            </div>
          </div>

          {/* Trust */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-mint-500" />
              <span>KVKK Uyumlu</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Lock className="w-3.5 h-3.5 text-mint-500" />
              <span>Güvenli Veri</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient fade at bottom when blur is active */}
      {showBlur && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
      )}
    </motion.div>
  );
}

// Paywall variant for results that are partially visible
export function PaywallBlurredResults({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="filter blur-[8px] opacity-50 pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <FreemiumPaywall
          variant="inline"
          title="Sonucu Görmek için Giriş Yapın"
          subtitle="Bu analizin tamamını görmek için ücretsiz hesap oluşturun."
          featureCount={2}
        />
      </div>
    </div>
  );
}

// Standalone paywall page
export function PaywallPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <FreemiumPaywall
          variant="page"
          title="Premium Analiz İçin Yükseltin"
          subtitle="Tüm özelliklere erişim için hesabınızı yükseltin."
          featureCount={4}
          showBlur={false}
        />
      </div>
    </div>
  );
}
