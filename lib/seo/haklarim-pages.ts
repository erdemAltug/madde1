import { createRehberPage } from "@/lib/seo/rehber-factory";
import type { RehberPageConfig } from "@/lib/seo/rehber-types";

/** /haklarim/[senaryo] — yüksek niyetli “haklarım” aramaları */
const PAGES: RehberPageConfig[] = [
  createRehberPage({
    slug: "isten-atildim-haklarim",
    h1: "İşten atıldım — haklarım neler?",
    metaTitle: "İşten atıldım haklarım ne? — tazminat rehberi 2026",
    metaDescription:
      "Haksız işten çıkarılma durumunda kıdem, ihbar ve diğer alacaklarınız. Ücretsiz tazminat hesaplama ve iş sözleşmesi AI analizi.",
    keywords: ["işten atıldım haklarım", "işten çıkarıldım ne yapmalıyım", "haksız fesih hakları"],
    intro:
      "İşten çıkarıldıysanız önce fesih bildirimini ve gerekçeyi yazılı olarak inceleyin. Haksız fesih iddiası güçlüyse kıdem, ihbar ve diğer alacaklar gündeme gelir.",
    sections: [
      {
        title: "İlk 48 saat",
        paragraphs: [
          "Fesih belgesinin bir kopyasını alın. İmzalamadan önce feragat maddesi var mı bakın.",
          "İşe giriş bildirgesi ve bordro kayıtlarını toplayın.",
        ],
      },
      {
        title: "Tazminat türleri",
        paragraphs: [
          "Kıdem tazminatı: belirli şartlarda her tam yıl için 30 günlük brüt ücret.",
          "İhbar tazminatı: bildirim süresine uyulmadıysa.",
          "Kullanılmayan izin, fazla mesai ve prim alacakları ayrıca hesaplanır.",
        ],
      },
    ],
    faqs: [
      {
        question: "İşten atıldım kıdem alır mıyım?",
        answer: "Kıdem şartları (süre, fesih türü) sağlanıyorsa talep edilebilir; hesaplayıcımızla tahmin alın.",
      },
    ],
    ctaHref: "/araclar/kidem-tazminati-hesaplama",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "kiraci-haklarim",
    h1: "Kiracıyım — haklarım neler?",
    metaTitle: "Kiracı haklarım — kira, depozito, tahliye 2026",
    metaDescription:
      "Kiracı olarak kira artışı, depozito iadesi ve tahliye haklarınız. Ücretsiz kira sözleşmesi analizi.",
    keywords: ["kiracı haklarım", "kiracı hakları", "ev kiracısı hakları"],
    intro: "Kiracı koruma ilkesi TBK'da güçlüdür. Sözleşme kanuna aykırı olsa bile kiracı lehine hükümler geçerli olabilir.",
    sections: [
      {
        title: "Temel haklar",
        paragraphs: [
          "Yasal artış tavanına uygun zam talebi.",
          "Depozitonun makul sürede iadesi.",
          "Usulsüz tahliye girişimine itiraz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ev sahibi beni çıkarabilir mi?",
        answer: "Yasal sebep ve usul olmadan hayır; zorla çıkarma yasaktır.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "tuketici-haklarim",
    h1: "Tüketici olarak haklarım — cayma, iade, garanti",
    metaTitle: "Tüketici haklarım neler? — 2026 rehber",
    metaDescription:
      "14 gün cayma, garanti, ayıplı mal ve pazaryeri şikayet hakları. Ücretsiz tüketici rehberleri.",
    keywords: ["tüketici haklarım", "tüketici hakları", "cayma hakkı"],
    intro: "Tüketici mevzuatı mesafeli satış, garanti ve ayıplı malda koruma sağlar.",
    sections: [
      {
        title: "En sık kullanılan haklar",
        paragraphs: [
          "14 gün cayma (istisnalar hariç).",
          "Ayıplı malde seçimlik haklar.",
          "Hakem heyeti başvurusu (tutar sınırı içinde).",
        ],
      },
    ],
    faqs: [
      {
        question: "Online alışverişte iade hakkım var mı?",
        answer: "Genel olarak 14 gün cayma vardır; kişiye özel ürün istisnaları hariç.",
      },
    ],
    ctaHref: "/rehber/tuketici-haklari",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "depozito-haklarim",
    h1: "Depozito iade hakkım — kiracı rehberi",
    metaTitle: "Depozito iade hakkım ne? — anlaşmazlık rehberi",
    metaDescription:
      "Kira depozitosu ne zaman iade edilir? Kesinti ve yazılı ihtar hakları. Ücretsiz AI kira analizi.",
    keywords: ["depozito iade hakkım", "depozito iadesi", "kira depozitosu hakları"],
    intro: "Depozito teminattır; keyfi kesinti ve gecikme uyuşmazlık doğurur.",
    sections: [
      {
        title: "Haklarınız",
        paragraphs: [
          "Kesinti kalemlerinin yazılı listesini isteme.",
          "Olağan yıpranma dışında kesintiye itiraz.",
          "Gecikmede yazılı ihtar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Depozito faizi ister miyim?",
        answer: "Sözleşme ve talep şekline bağlıdır.",
      },
    ],
    ctaHref: "/hukuki-analiz/depozito-anlasmazligi",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "kira-artisi-haklarim",
    h1: "Kira artışı hakkım — oran ve itiraz",
    metaTitle: "Kira artış hakkım — yasal tavan ve itiraz 2026",
    metaDescription:
      "Kira zam bildirimi geldi, haklarım ne? Hesaplama ve sözleşme kontrolü. Ücretsiz kira artış hesaplayıcı.",
    keywords: ["kira artış hakkım", "kira zammı itiraz", "kira artışı hakları"],
    intro: "Artış oranı yasal tavan ve sözleşme maddesine uygun olmalıdır.",
    sections: [
      {
        title: "Kontrol adımları",
        paragraphs: [
          "Bildirimdeki oranı hesaplayıcı ile doğrulayın.",
          "Sözleşmedeki artış formülünü okuyun.",
          "Hukuka aykırıysa yazılı itiraz kaydı tutun.",
        ],
      },
    ],
    faqs: [
      {
        question: "Artışı kabul etmek zorunda mıyım?",
        answer: "Hukuka aykırı artışa itiraz edilebilir; uzman desteği önerilir.",
      },
    ],
    ctaHref: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "freelance-haklarim",
    h1: "Freelancer haklarım — sözleşme ve ödeme",
    metaTitle: "Freelance haklarım — sözleşme ve alacak rehberi",
    metaDescription:
      "Serbest çalışan olarak telif, ödeme vadesi ve sözleşme hakları. Ücretsiz freelance kontrat analizi.",
    keywords: ["freelance haklarım", "serbest çalışan hakları", "freelance sözleşme"],
    intro: "Freelance ilişkide yazılı sözleşme ve fatura en güçlü korumanızdır.",
    sections: [
      {
        title: "Korunma",
        paragraphs: [
          "İş tanımı, teslim ve ödeme vadesi yazılı olsun.",
          "Telif devri ve revizyon sınırı netleştirilsin.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ödeme gecikirse ne yaparım?",
        answer: "Yazılı ihtar ve alacak davası yolları değerlendirilir.",
      },
    ],
    ctaHref: "/sozlesme-analizi/freelance-yazilim-kontrati",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "is-sozlesmesi-haklarim",
    h1: "İş sözleşmemdeki haklarım — çalışan rehberi",
    metaTitle: "İş sözleşmesi haklarım — ücret, fesih, mesai 2026",
    metaDescription:
      "İş sözleşmesinde çalışan hakları: ücret, fazla mesai, fesih. Ücretsiz iş kontratı AI analizi.",
    keywords: ["iş sözleşmesi haklarım", "çalışan hakları", "iş kontratı hakları"],
    intro: "İş Kanunu asgari hakları korur; sözleşmede daha kötü şart geçersiz olabilir.",
    sections: [
      {
        title: "Sık konular",
        paragraphs: [
          "Ücret ve kesinti sınırları.",
          "Fazla mesai ve izin.",
          "Fesih ve ihbar süreleri.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözleşmede yazan her şey bağlayıcı mı?",
        answer: "Kanuna aykırı maddeler geçersiz sayılabilir.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    updatedAt: "2026-07-11",
  }),
  createRehberPage({
    slug: "evden-cikarilma-haklarim",
    h1: "Evden çıkarılma — kiracı haklarım",
    metaTitle: "Evden çıkarılma haklarım — tahliye ve itiraz 2026",
    metaDescription:
      "Kiracıyı evden çıkarma usulü, tahliye taahhütnamesi ve haklarınız. Ücretsiz tahliye AI ön kontrolü.",
    keywords: ["evden çıkarılma haklarım", "tahliye hakları", "kiracı tahliye"],
    intro: "Zorla tahliye yasaktır. Yasal yollar dışındaki baskı hukuka aykırıdır.",
    sections: [
      {
        title: "Bilmeniz gerekenler",
        paragraphs: [
          "Tahliye taahhütnamesi ayrı değerlendirilir.",
          "İhtar ve dava süreçleri usule tabidir.",
          "Tutanak ve yazışma delil niteliğindedir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kapı kilidi değiştirilirse?",
        answer: "Hukuka aykırı müdahale sayılabilir; acil hukuki destek alın.",
      },
    ],
    ctaHref: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    updatedAt: "2026-07-11",
  }),
];

export const HAKLARIM_PAGES: Record<string, RehberPageConfig> = Object.fromEntries(
  PAGES.map((p) => [p.slug, p]),
);

export const HAKLARIM_SLUGS = PAGES.map((p) => p.slug);

export function getHaklarimConfig(slug: string): RehberPageConfig | undefined {
  return HAKLARIM_PAGES[slug];
}
