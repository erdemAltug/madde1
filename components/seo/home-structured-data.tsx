import { HOME_FAQ } from "@/lib/seo/home-faq";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, absoluteUrl } from "@/lib/seo/site";

const sameAsRaw = process.env.NEXT_PUBLIC_ORGANIZATION_SAME_AS ?? "";
const sameAs = sameAsRaw
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const faq = HOME_FAQ;

export function HomeStructuredData() {
  const logoUrl = absoluteUrl("/apple-icon");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
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
