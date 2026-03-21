import { NextResponse } from "next/server";
import { ensureWallet } from "@/lib/credits/wallet-server";
import { getSupabaseService } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const deviceId = req.headers.get("x-device-id");
  if (!deviceId?.trim()) {
    return NextResponse.json(
      { error: "x-device-id gerekli" },
      { status: 400 },
    );
  }

  if (getSupabaseService()) {
    const row = await ensureWallet(deviceId);
    return NextResponse.json({
      backend: true,
      credits: row.credits,
      unlimitedUntil: row.unlimited_until,
    });
  }

  return NextResponse.json({
    backend: false,
    credits: 0,
    unlimitedUntil: null,
  });
}
