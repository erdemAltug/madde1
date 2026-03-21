import { permanentRedirect } from "next/navigation";
import { TAHLIYE_TOOL_PATH } from "@/lib/seo/free-tools-routes";

export default function TahliyeLegacyRedirect() {
  permanentRedirect(TAHLIYE_TOOL_PATH);
}
