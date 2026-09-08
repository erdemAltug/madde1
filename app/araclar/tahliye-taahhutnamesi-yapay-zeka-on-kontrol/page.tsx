import { permanentRedirect } from "next/navigation";
import { TAHLIYE_TOOL_PATH } from "@/lib/seo/free-tools-routes";

/** Eski AI ön kontrol URL → geçerlilik kontrolü kazananı */
export default function TahliyeAiLegacyRedirectPage() {
  permanentRedirect(TAHLIYE_TOOL_PATH);
}
