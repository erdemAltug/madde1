import type { Metadata } from "next";
import { GuvenlikPage } from "@/components/landing/guvenlik-page";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";

const path = "/guvenlik";
const canonical = absoluteUrl(path);

export const metadata: Metadata = {
  title: `Clause güvenli mi? | Veri gizliliği ve KVKK — ${SITE_NAME}`,
  description:
    "Yapay zeka sözleşme analizi veri gizliliği: KVKK uyumlu hukuk asistanı, 256-bit şifreleme, otomatik maskeleme ve analiz sonrası veri imhası. Clause güven taahhüdü.",
  keywords: [
    "Clause güvenli mi",
    "yapay zeka sözleşme analizi veri gizliliği",
    "KVKK uyumlu hukuk asistanı",
    "sözleşme analizi gizlilik",
    "TLS şifreleme",
  ],
  alternates: { canonical },
  openGraph: {
    title: `Clause güvenli mi? | Veri gizliliği — ${SITE_NAME}`,
    description:
      "KVKK, maskeleme ve sıfır kalıcılık ilkeleriyle Clause güven mimarisi.",
    url: canonical,
    locale: "tr_TR",
    type: "website",
  },
};

export default function GuvenlikRoutePage() {
  return <GuvenlikPage />;
}
