import Link from "next/link";
import { BellRing, CalendarClock, FolderOpen, Reply } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

/** Örnek takvim satırları — ürünün "taramadan sonra da yanınızda" vaadini gösterir */
const SAMPLE = [
  { title: "Kira artış dönemi", hint: "Yasal tavanı birlikte hesaplayalım", left: "23 gün kaldı", tone: "amber" },
  { title: "Taşınacaksanız bildirim için son gün", hint: "TBK m.347 · 15 gün önce yazılı bildirim", left: "62 gün kaldı", tone: "slate" },
  { title: "Deneme süresinin sonu", hint: "İş sözleşmesi · İş K. m.15", left: "5 gün kaldı", tone: "red" },
] as const;

const TONE: Record<(typeof SAMPLE)[number]["tone"], string> = {
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  slate: "border-slate-200 bg-white text-slate-600",
  red: "border-red-200 bg-red-50 text-red-700",
};

const PROMISES = [
  {
    icon: BellRing,
    title: "Tarihleri biz hatırlarız",
    text: "Sözleşmeden kira artışı, yenileme, bildirim ve deneme süresi tarihlerini çıkarır; 30, 7 ve 1 gün kala haber veririz.",
  },
  {
    icon: FolderOpen,
    title: "Sözleşmeleriniz tek yerde",
    text: "Kira, iş, hizmet ve abonelik sözleşmeleriniz risk durumlarıyla birlikte cüzdanınızda durur.",
  },
  {
    icon: Reply,
    title: "Ne diyeceğinizi yazarız",
    text: "Ev sahibine, işverene ya da müşteriye kanuna dayanan, gönderilmeye hazır bir cevap taslağı.",
  },
] as const;

export function LandingFollowUp() {
  return (
    <section className="border-b border-slate-200/70 bg-white py-16 sm:py-20" aria-labelledby="takip-baslik">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold text-[#005BEA]">Taradıktan sonra da yanınızda</p>
          <h2 id="takip-baslik" className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Hukuki takviminizi sizin yerinize tutalım
          </h2>
          <ul className="mt-8 space-y-6">
            {PROMISES.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#005BEA]/10 text-[#005BEA]">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-base font-bold text-slate-900">{p.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-slate-600">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/panel"
            className="mt-8 inline-flex h-11 items-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Panelimi oluştur — ücretsiz
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-3xl border border-slate-200 bg-[#FAFAF7] p-4 shadow-sm sm:p-6" aria-label="Örnek hukuki takvim">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Yaklaşan tarihler</span>
              <span className="text-xs font-medium text-slate-500">Örnek</span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {SAMPLE.map((s) => (
                <li key={s.title} className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-slate-900">{s.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{s.hint}</span>
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${TONE[s.tone]}`}
                  >
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                    {s.left}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-white p-3 text-xs leading-relaxed text-slate-500">
              <strong className="font-semibold text-slate-700">E-posta, 30 gün önce:</strong> &ldquo;Kira artış dönemine 30 gün
              kaldı. Bu yılki yasal tavan ve ev sahibinize gönderebileceğiniz cevap hazır.&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
