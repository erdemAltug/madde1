import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  House,
  Scale,
  ShoppingBag,
} from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";
import {
  defaultOgAlt,
  openGraphArticleImages,
  twitterSummaryLargeImage,
} from "@/lib/seo/og";

const title = "Günlük hukuk rehberi 2026 — haklarınızı ücretsiz öğrenin";
const description =
  "Kira, işten çıkarılma, tazminat, tüketici iadesi ve sözleşmeler için sade hukuk rehberleri, ücretsiz hesaplayıcılar ve yapay zeka ön analizi.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "günlük hukuk",
    "haklarım neler",
    "ücretsiz hukuk rehberi",
    "kiracı hakları 2026",
    "işçi hakları 2026",
    "tüketici hakları",
    "ücretsiz sözleşme analizi",
  ],
  alternates: { canonical: absoluteUrl("/gunluk-hukuk") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/gunluk-hukuk"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

const clusters = [
  {
    title: "Kira ve ev",
    description:
      "Kira artışı, depozito, tahliye, aidat ve ev sahibinin yetkileri.",
    icon: House,
            links: [
              { href: "/rehber/kiraci-haklari", label: "Kiracı hakları 2026" },
              {
                href: "/rehber/kira-kontrat-kontrol-listesi-2026",
                label: "Kira kontrat kontrol listesi",
              },
              { href: "/rehber/depozito-iadesi", label: "Depozito iadesi" },
              {
                href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
                label: "Kira artışını hesapla",
              },
            ],
  },
  {
    title: "İş ve tazminat",
    description:
      "İşten çıkarılma, kıdem, ihbar, fazla mesai ve ücret sorunları.",
    icon: BriefcaseBusiness,
            links: [
              {
                href: "/araclar/brut-net-maas-hesaplama",
                label: "Brüt net maaş hesapla",
              },
              {
                href: "/araclar/issizlik-maasi-hesaplama",
                label: "İşsizlik maaşı hesapla",
              },
              {
                href: "/rehber/isten-cikarilinca-ne-yapilir",
                label: "İşten çıkarılınca ne yapılır?",
              },
              {
                href: "/rehber/kidem-tazminati-adim-adim",
                label: "Kıdem tazminatı adım adım",
              },
              {
                href: "/araclar/kidem-tazminati-hesaplama",
                label: "Kıdem tazminatı hesapla",
              },
              {
                href: "/araclar/fazla-mesai-ucreti-hesaplama",
                label: "Fazla mesai ücreti hesapla",
              },
              {
                href: "/araclar/yillik-izin-hesaplama",
                label: "Yıllık izin hesapla",
              },
            ],
  },
  {
    title: "Tüketici ve alışveriş",
    description:
      "Cayma, iade, garanti, abonelik ve hakem heyeti başvuruları.",
    icon: ShoppingBag,
            links: [
              { href: "/rehber/tuketici-haklari", label: "Tüketici hakları" },
              {
                href: "/rehber/internetten-alinan-urun-iade-edilmezse",
                label: "İnternetten alınan ürün iade edilmezse",
              },
              {
                href: "/rehber/ayipli-mal-para-iadesi-hakki",
                label: "Ayıplı mal ve para iadesi",
              },
              {
                href: "/rehber/tuketici-sikayet-hatti-rehber",
                label: "Tüketici şikayet yolları",
              },
            ],
  },
  {
    title: "Sözleşme ve yapay zeka",
    description:
      "İmzadan önce riskleri anlayın; sözleşmenizi ücretsiz ön tarayın.",
    icon: Scale,
    links: [
      {
        href: "/rehber/sozlesme-imzalamadan-once",
        label: "İmzadan önce kontrol listesi",
      },
      {
        href: "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
        label: "Yapay zeka sözleşme analizi",
      },
      {
        href: "/rehber/yapay-zeka-hukuk-guvenilir-mi",
        label: "Hukuki yapay zeka güvenilir mi?",
      },
      { href: "/#dene", label: "Ücretsiz sözleşme ön analizi" },
    ],
  },
];

const faqs = [
  {
    question: "Clause hukuki danışmanlık verir mi?",
    answer:
      "Hayır. Clause, günlük hukuk konularında genel bilgi ve sözleşmeler için yapay zeka destekli ön analiz sunar. Somut uyuşmazlık, dava, icra veya süreye bağlı işlem için avukattan görüş alınmalıdır.",
  },
  {
    question: "Günlük hukuk araçlarını ücretsiz kullanabilir miyim?",
    answer:
      "Kira artışı, kıdem ve ihbar gibi hesaplayıcılar ücretsiz tahmin üretir. Sonuçlar girilen verilere ve güncel mevzuata bağlı olduğundan resmi işlem öncesinde doğrulanmalıdır.",
  },
  {
    question: "Hangi sözleşmeleri analiz edebilirim?",
    answer:
      "Kira, iş, hizmet, freelance, tüketici ve çeşitli ticari sözleşmeler ön analiz için kullanılabilir. Araç riskli veya belirsiz ifadeleri anlamaya yardımcı olur; kesin hukuki görüş oluşturmaz.",
  },
  {
    question: "Hukuki bir sorun yaşadığımda ilk ne yapmalıyım?",
    answer:
      "Sözleşme, fatura, yazışma, bordro veya teslim tutanağı gibi belgeleri koruyun; tarihleri not edin ve ilgili rehberden genel yol haritasını inceleyin. Hak kaybı riski veya devam eden süre varsa gecikmeden uzman desteği alın.",
  },
];

export default function GunlukHukukPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[{ name: "Günlük hukuk", href: "/gunluk-hukuk" }]}
        />

        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Herkes için sade hukuk
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-5xl">
            Günlük hukuk sorunlarında ilk adımı bilinçli atın
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Ev sahibi kirayı artırdı, işveren sözleşmenizi feshetti veya satın
            aldığınız ürün iade edilmedi: önce hakkınızı ve seçeneklerinizi
            anlayın. Clause; sade rehberleri, ücretsiz hesaplayıcıları ve
            sözleşme ön analizini tek yerde toplar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/#dene"
              className="inline-flex items-center gap-2 rounded-lg bg-[#005BEA] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0049c4]"
            >
              Sözleşmeni ücretsiz analiz et
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/haklarim"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Senaryoya göre haklarım
            </Link>
          </div>
        </header>

        <section className="mt-14" aria-labelledby="konular">
          <h2
            id="konular"
            className="text-2xl font-bold tracking-tight text-madde-ink"
          >
            Bugün hangi konuda yardıma ihtiyacınız var?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {clusters.map((cluster) => {
              const Icon = cluster.icon;
              return (
                <article
                  key={cluster.title}
                  className="rounded-2xl border border-slate-200 p-6"
                >
                  <Icon className="h-6 w-6 text-[#005BEA]" aria-hidden />
                  <h3 className="mt-3 text-xl font-bold text-madde-ink">
                    {cluster.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {cluster.description}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {cluster.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#005BEA] hover:underline"
                        >
                          {link.label}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-madde-ink">
            Rehberden işleme: üç adımlı yol
          </h2>
          <div className="prose prose-slate mt-5 max-w-none prose-p:text-[15px] prose-p:leading-relaxed">
            <p>
              Önce sorununuzu doğru kategoriye yerleştirin. Kira, iş ve tüketici
              uyuşmazlıklarının başvuru yolları ve süreleri birbirinden farklı
              olabilir. İlgili rehber size genel çerçeveyi ve hangi belgelerin
              önemli olduğunu gösterir.
            </p>
            <p>
              Ardından elinizdeki sözleşme veya belgedeki kritik ifadeleri
              inceleyin. Fesih, cezai şart, otomatik yenileme, depozito ve
              sorumluluk gibi maddeler somut durumun yönünü değiştirebilir.
              Clause ön analiz sunar; sonucu resmi kaynaklar ve gerektiğinde
              uzman görüşüyle doğrulayın.
            </p>
            <p>
              Son olarak tarihleri ve delilleri koruyun. Yazışmalar, ödeme
              belgeleri, bordrolar, fotoğraflar ve teslim tutanakları sonraki
              başvuruda önemli olabilir. Süreye bağlı haklarda yalnızca internet
              içeriğine dayanarak beklemeyin.
            </p>
          </div>
        </section>

        <div className="max-w-3xl">
          <FaqSection faqs={faqs} />
          <LegalAiDisclaimer className="mt-10" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
