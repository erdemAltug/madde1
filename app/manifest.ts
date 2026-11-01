import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — kişisel hukuk asistanı`,
    short_name: SITE_NAME,
    description: SITE_TAGLINE,
    id: "/",
    start_url: "/panel?kaynak=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FAFAF7",
    theme_color: "#005BEA",
    lang: "tr",
    categories: ["productivity", "utilities"],
    icons: [
      { src: "/pwa/icon?size=192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/icon?size=512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/icon?size=512&maskable=1", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: "Sözleşme tara", url: "/?open=1", description: "Fotoğraf çek ya da metni yapıştır" },
      { name: "Takvimim", url: "/panel", description: "Yaklaşan hukuki tarihler" },
      { name: "Asistana sor", url: "/asistan" },
      { name: "Haklarım Kontrolü", url: "/haklarim/kontrol" },
    ],
  };
}
