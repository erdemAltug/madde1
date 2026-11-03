import type { Metadata } from "next";
import { ClauseLanding } from "@/components/landing/clause-landing";
import { HomeStructuredData } from "@/components/seo/home-structured-data";
import { defaultHomeMetadata } from "@/lib/seo/site";

export const metadata: Metadata = defaultHomeMetadata;

export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <ClauseLanding />
    </>
  );
}
