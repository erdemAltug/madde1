import type { Metadata } from "next";
import { AsistanWorkspace } from "@/components/asistan/asistan-workspace";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Hukuk Asistanı — kalıcı mevzuat sohbeti | Clause",
  description:
    "Üyelere özel Türk hukuku asistanı. Sohbetleriniz hesabınızda saklanır; mümkünse mevzuat dayanaklı yanıt.",
  robots: { index: false, follow: false },
  alternates: { canonical: absoluteUrl("/asistan") },
};

export default function AsistanPage() {
  return <AsistanWorkspace />;
}
