import Link from "next/link";
import { ArrowLeft, Scale, Sparkles, Users } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/site/contact";

const values = [
  {
    icon: Users,
    title: "Herkes için hukuk",
    body: "Hukuki bilgi yalnızca avukatlık bürolarına kapanmamalı. Clause, imza öncesi sözleşme risklerini sade Türkçe ile görünür kılar.",
  },
  {
    icon: Scale,
    title: "Dürüst sınırlar",
    body: "Yapay zeka avukat değildir. Ön tarama ve bilgilendirme sunarız; dava ve kritik kararlar için profesyonel destek şarttır.",
  },
  {
    icon: Sparkles,
    title: "LegalTech odaklı",
    body: "Kira, iş ve ticari sözleşmelerde TBK ve İş Kanunu bağlamında risk özeti üretiriz. Ücretsiz araçlar ve rehberlerle günlük hukuk ihtiyaçlarına yanıt veririz.",
  },
];

export function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
          <Link href="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Ana sayfa
          </Link>
        </Button>

        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Hakkımızda
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Clause — Türkiye için yapay zeka hukuk asistanı
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Clause, kira sözleşmesinden iş kontratına kadar günlük hukuki metinleri yapay zeka ile
            ön taramadan geçiren bir LegalTech ürünüdür. Amacımız insanların avukata gitmeden önce
            riskleri görmesi ve bilinçli karar vermesidir.
          </p>
        </header>

        <section className="mt-10 space-y-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
            >
              <v.icon className="h-6 w-6 text-[#005BEA]" aria-hidden />
              <h2 className="mt-3 text-lg font-bold text-madde-ink">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-[#005BEA]/20 bg-indigo-50/40 p-6">
          <h2 className="text-lg font-bold text-madde-ink">Ne sunuyoruz?</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-600">
            <li>Ücretsiz yapay zeka sözleşme ön taraması</li>
            <li>60+ hukuk rehberi ve 40+ blog yazısı</li>
            <li>Kira artışı, damga vergisi, kıdem ve ihbar hesaplayıcıları</li>
            <li>KVKK odaklı veri güvenliği taahhüdü</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/#dene">Ücretsiz dene</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/rehber">Rehberlere git</Link>
            </Button>
          </div>
        </section>

        <p className="mt-10 text-sm text-slate-500">
          İletişim:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-[#005BEA] hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
