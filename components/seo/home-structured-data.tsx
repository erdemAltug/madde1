import { SITE_NAME, SITE_TAGLINE, SITE_URL, absoluteUrl } from "@/lib/seo/site";

const sameAsRaw = process.env.NEXT_PUBLIC_ORGANIZATION_SAME_AS ?? "";
const sameAs = sameAsRaw
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const faq = [
  {
    question: "Yapay zeka sözleşme analizi güvenli mi?",
    answer:
      "Clause metninizi sunucuda işler; hukuki danışmanlık veya mahkeme sonucu vaat etmez. Kesin hukuki sonuç ve dava stratejisi için mutlaka bir avukata danışın.",
  },
  {
    question: "Legal AI assistant (hukuk asistanı AI) nedir?",
    answer:
      "Legal AI assistant, sözleşme ve hukuki metinleri dil modelleriyle ön taramadan geçiren, riskleri özetleyen ve kullanıcıyı profesyonel hukuki yardıma yönlendiren bir yazılım katmanıdır. Clause bu kapsamda çalışır; karar yerine geçmez.",
  },
  {
    question: "Clause nasıl çalışır?",
    answer:
      "Sözleşme metnini yapıştırırsınız; yapay zeka TBK, İş Kanunu ve KVKK gibi başlıklarla ön tarama üretir. Ücretsiz özet ve güven skorundan sonra detaylı riskler ve düzeltme önerileri kredi ile açılır.",
  },
  {
    question: "Kira sözleşmesi kontrolü ücretsiz mi?",
    answer:
      "Ön tarama ve güven skoru ücretsizdir. Madde madde risk açıklamaları ve iyileştirilmiş metin üretimi ücretli kredi ile sunulur; fiyatlar sitede şeffaftır.",
  },
  {
    question: "Sözleşme üretimi yapabilir miyim?",
    answer:
      "Evet; Clause içinde sözleşme taslağı oluşturma akışı ile freelance, kira ve danışmanlık şablonlarından çıkış alabilirsiniz. Çıktılar taslaktır, imzalamadan önce avukat onayı önerilir.",
  },
  {
    question: "Kurumsal ekipler Clause kullanabilir mi?",
    answer:
      "Evet. KOBİ ve hukuk ekipleri standart sözleşmeleri toplu ön taramadan geçirmek, risk skorlarını hizalamak ve iç süreçlerde LegalTech verimliliği sağlamak için Clause analiz sayfalarını kullanabilir.",
  },
];

export function HomeStructuredData() {
  const logoUrl = absoluteUrl("/apple-icon");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Clause.ai",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      contentUrl: logoUrl,
    },
    description: SITE_TAGLINE,
    areaServed: "TR",
    ...(sameAs.length ? { sameAs } : {}),
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} — sözleşme analizi`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "4.99",
      priceCurrency: "TRY",
      description: "Tek seferlik detaylı analiz erişimi",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "284",
    },
    description: `${SITE_TAGLINE} Legal AI assistant ile kira ve ticari sözleşme risk ön taraması.`,
    url: SITE_URL,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "tr-TR",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const payload = [organization, software, website, faqPage];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
