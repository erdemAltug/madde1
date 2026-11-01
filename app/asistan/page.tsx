import type { Metadata } from "next";
import { AsistanWorkspace } from "@/components/asistan/asistan-workspace";
import { TrackToolOpen } from "@/components/analytics/track-tool-open";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Hukuk Asistanı | Clause",
  description:
    "Üyelere özel hukuk sohbeti. Sohbetleriniz hesabınızda saklanır.",
  robots: { index: false, follow: false },
  alternates: { canonical: absoluteUrl("/asistan") },
};

type Props = { searchParams?: { soru?: string } };

export default function AsistanPage({ searchParams }: Props) {
  const initialQuestion = searchParams?.soru?.slice(0, 500);
  return (
    <>
      <TrackToolOpen tool="asistan" />
      <AsistanWorkspace initialQuestion={initialQuestion} />
    </>
  );
}
