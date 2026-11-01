import { ImageResponse } from "next/og";
import { CARD_KINDS, parseRiskCard, riskVerdict } from "@/lib/share/risk-card";
import { SITE_HOST } from "@/lib/seo/site";

export const runtime = "edge";

const TONE = {
  risk: { bar: "#DC2626", soft: "#FEE2E2", text: "#991B1B" },
  warn: { bar: "#D97706", soft: "#FEF3C7", text: "#92400E" },
  good: { bar: "#059669", soft: "#D1FAE5", text: "#065F46" },
} as const;

export function GET(req: Request) {
  const d = parseRiskCard(new URL(req.url).searchParams);
  const v = riskVerdict(d);
  const tone = TONE[v.tone];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FAFAF7",
          padding: 56,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            background: "#ffffff",
            borderRadius: 32,
            borderLeft: `16px solid ${tone.bar}`,
            padding: "48px 56px",
            boxShadow: "0 8px 32px rgba(15,23,42,0.08)",
          }}
        >
          <div style={{ fontSize: 30, color: "#475569", fontWeight: 600 }}>
            {`${CARD_KINDS[d.kind]} ön kontrolü`}
          </div>
          <div style={{ marginTop: 16, fontSize: 60, fontWeight: 800, color: "#0F172A", letterSpacing: -1.5, lineHeight: 1.1 }}>
            {v.label}
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 40 }}>
            {[
              { k: "Güven skoru", val: `${d.score}/100` },
              { k: "Kritik madde", val: String(d.critical) },
              { k: "Eksik madde", val: String(d.missing) },
            ].map((x) => (
              <div
                key={x.k}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: tone.soft,
                  borderRadius: 20,
                  padding: "20px 28px",
                }}
              >
                <div style={{ fontSize: 24, color: tone.text }}>{x.k}</div>
                <div style={{ fontSize: 48, fontWeight: 800, color: "#0F172A" }}>{x.val}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", fontSize: 26, color: "#64748B" }}>
            <span>{"İmzalamadan önce Clause'a göster"}</span>
            <span style={{ color: "#005BEA", fontWeight: 700 }}>{SITE_HOST}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    },
  );
}
