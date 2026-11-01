import { ImageResponse } from "next/og";

export const runtime = "edge";

const ALLOWED = new Set([96, 192, 512]);

/** PWA ikonları (manifest + push). maskable için kenarlarda güvenli boşluk bırakılır. */
export function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const requested = Number(params.get("size"));
  const size = ALLOWED.has(requested) ? requested : 192;
  const maskable = params.get("maskable") === "1";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#005BEA",
          borderRadius: maskable ? 0 : size * 0.22,
          color: "#ffffff",
          fontSize: size * (maskable ? 0.45 : 0.6),
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        C
      </div>
    ),
    {
      width: size,
      height: size,
      headers: { "Cache-Control": "public, max-age=604800, immutable" },
    },
  );
}
