import { Reveal } from "@/components/landing/reveal";

export function LandingTrustBand() {
  return (
    <Reveal>
      <div className="border-b border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 py-4 text-center">
        <p className="text-sm font-semibold text-madde-ink sm:text-base">
          <span className="text-madde-blue">100+</span> avukat ve işletme{" "}
          <span className="text-[#00E676]">güvenle</span> kullanıyor
        </p>
      </div>
    </Reveal>
  );
}
