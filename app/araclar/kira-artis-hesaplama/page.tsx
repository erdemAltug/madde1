import { permanentRedirect } from "next/navigation";
import { KIRA_ARTIS_TOOL_PATH } from "@/lib/seo/free-tools-routes";

/** Kalıcı yönlendirme — kanonik uzun kuyruk URL */
export default function KiraArtisLegacyRedirect() {
  permanentRedirect(KIRA_ARTIS_TOOL_PATH);
}
