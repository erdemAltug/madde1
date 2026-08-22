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
      "Sözleşme metnini yapıştırırsınız; yapay zeka kira zammı, kıdem ve tuzak maddelerini ön tarar. Lansman döneminde kayıt ile detaylı risk raporu ve PDF ücretsizdir.",
  },
  {
    question: "Kira sözleşmesi kontrolü ücretsiz mi?",
    answer:
      "Ön tarama ücretsizdir. Detaylı madde madde rapor ve PDF lansman döneminde hesap oluşturunca ücretsiz açılır; abonelik sonra gelir.",
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
    name: `${SITE_NAME} — yapay zeka hukuk asistanı`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "LegalTech",
    operatingSystem: "Web",
    inLanguage: "tr-TR",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
      description: "Ücretsiz sözleşme ön tarama",
    },
    description: `${SITE_TAGLINE} Yapay zeka sözleşme analizi ve hukuki ön kontrol.`,
    url: SITE_URL,
    featureList: [
      "Yapay zeka sözleşme analizi",
      "Kira sözleşmesi risk taraması",
      "İş sözleşmesi ön kontrolü",
      "TBK uyumlu özet",
    ],
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
