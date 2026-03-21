import Link from "next/link";
import { Lock, ShieldCheck, Trash2 } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

const items = [
  {
    icon: ShieldCheck,
    label: "KVKK uyumlu",
    hint: "Veri işleme ilkelerimiz",
  },
  {
    icon: Lock,
    label: "256-bit şifreleme",
    hint: "TLS ile aktarım",
  },
  {
    icon: Trash2,
    label: "Anlık veri imhası",
    hint: "Analiz sonrası metin silinir",
  },
];

export function LandingSecurityStrip() {
  return (
    <Reveal>
      <div className="border-b border-slate-200/80 bg-gradient-to-r from-[#0a1628]/[0.03] via-emerald-50/40 to-[#0a1628]/[0.03] py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 sm:px-6 lg:flex-row lg:justify-center lg:gap-10 lg:px-8">
          {items.map(({ icon: Icon, label, hint }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 text-center sm:text-left"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0a1628] text-emerald-300 shadow-sm">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold tracking-tight text-[#0a1628]">
                  {label}
                </p>
                <p className="text-[11px] font-medium text-slate-600">{hint}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] font-medium text-slate-500">
          <Link
            href="/guvenlik"
            className="font-semibold text-[#0f766e] underline-offset-2 hover:underline"
          >
            Gizlilik ve güvenlik taahhüdümüz
          </Link>{" "}
          — verileriniz bizimle değil, sizinle güvende.
        </p>
      </div>
    </Reveal>
  );
}
