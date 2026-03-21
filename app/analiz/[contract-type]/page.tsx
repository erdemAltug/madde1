import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspaceDashboard } from "@/components/madde1/workspace-dashboard";
import { CONTRACT_TYPE_SLUGS } from "@/lib/constants";

type Props = {
  params: { "contract-type": string };
};

export function generateStaticParams() {
  return Object.keys(CONTRACT_TYPE_SLUGS).map((contractType) => ({
    "contract-type": contractType,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const slug = params["contract-type"];
  const cfg = CONTRACT_TYPE_SLUGS[slug];
  if (!cfg) {
    return { title: "Analiz" };
  }
  return {
    title: cfg.title,
    description: cfg.description,
    keywords: [
      ...cfg.keywords,
      "yapay zeka kira sözleşmesi analizi",
      "hukuki risk analizi AI",
      "Madde1 legaltech",
    ],
    alternates: {
      canonical: `/analiz/${slug}`,
    },
  };
}

export default function AnalizContractTypePage({ params }: Props) {
  const slug = params["contract-type"];
  const cfg = CONTRACT_TYPE_SLUGS[slug];
  if (!cfg) {
    notFound();
  }

  return (
    <WorkspaceDashboard
      sharePath={`/analiz/${slug}`}
      pageTitle={cfg.title}
    />
  );
}
