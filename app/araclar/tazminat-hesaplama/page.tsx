import { permanentRedirect } from "next/navigation";
import { KIDEM_IHBAR_TOOL_PATH } from "@/lib/seo/free-tools-routes";

/** Eski hub → kıdem-ihbar kazanan URL */
export default function TazminatHesaplamaRedirectPage() {
  permanentRedirect(KIDEM_IHBAR_TOOL_PATH);
}
