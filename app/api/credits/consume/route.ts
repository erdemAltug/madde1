import { NextResponse } from "next/server";
import { tryConsumeCredit } from "@/lib/credits/wallet-server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const deviceId = req.headers.get("x-device-id");
  if (!deviceId?.trim()) {
    return NextResponse.json(
      { error: "x-device-id gerekli" },
      { status: 400 },
    );
  }

  const result = await tryConsumeCredit(deviceId);
  if (result === "no_backend") {
    return NextResponse.json({ ok: true, clientOnly: true });
  }
  if (result === "no_credit") {
    return NextResponse.json(
      { error: "Yetersiz kredi", code: "NO_CREDIT" },
      { status: 402 },
    );
  }
  return NextResponse.json({ ok: true });
}
