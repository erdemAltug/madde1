import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

export const runtime = "edge";

export const alt = `${SITE_NAME} — yapay zeka sözleşme analizi`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function Image() {
  const host = SITE_URL.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background:
            "linear-gradient(125deg, #005BEA 0%, #0046B8 42%, #00E676 100%)",
          color: "#ffffff",
          padding: 64,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            fontWeight: 600,
            maxWidth: 900,
            opacity: 0.95,
            lineHeight: 1.25,
          }}
        >
          AI sözleşme analizi · TBK · Kira, iş ve ticari sözleşmeler
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 22,
            opacity: 0.88,
          }}
        >
          {host}
        </div>
      </div>
    ),
    { ...size },
  );
}
