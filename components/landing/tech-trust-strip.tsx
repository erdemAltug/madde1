import { ModelProviderLogos } from "@/components/landing/model-provider-logos";

/** Kompakt model şeridi — çalışma alanı / SEO sayfaları için */
export function TechTrustStrip() {
  return (
    <div className="border-t border-slate-200/80 bg-gradient-to-b from-slate-50/80 to-white py-8">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-slate-500">
          Model altyapısı
        </p>
        <ModelProviderLogos className="mt-5" />
        <p className="mt-4 text-[11px] font-medium text-slate-500">
          Kullanılan model, yük ve yapılandırmaya göre değişebilir.
        </p>
      </div>
    </div>
  );
}
