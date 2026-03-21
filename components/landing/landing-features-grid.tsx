import {
  AlertTriangle,
  BookOpen,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

const features = [
  {
    title: "Risk analizi",
    desc: "Kritik maddeleri ve olası uyuşmazlık alanlarını işaretler.",
    icon: AlertTriangle,
  },
  {
    title: "Mevzuat kontrolü",
    desc: "TBK ve ilgili düzenlemelerle hizalı ön kontrol listesi.",
    icon: BookOpen,
  },
  {
    title: "İyileştirme önerileri",
    desc: "Somut madde önerileri ve dil netliği için yönlendirme.",
    icon: Lightbulb,
  },
  {
    title: "PDF raporlama",
    desc: "Çıktıyı yazdırılabilir görünümde paylaşın veya arşivleyin.",
    icon: FileText,
  },
];

export function LandingFeaturesGrid() {
  return (
    <section
      id="ozellikler"
      className="border-y border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Kurumsal özellikler
            </h2>
            <p className="mt-3 text-slate-600">
              Legal ekiplerin ve KOBİ’lerin ihtiyaç duyduğu netlik.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={0.05 * (i + 1)}>
              <div className="h-full rounded-xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm transition-shadow hover:shadow-md">
                <f.icon className="h-7 w-7 text-blue-700" aria-hidden />
                <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
