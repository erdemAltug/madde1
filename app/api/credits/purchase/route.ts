import { NextResponse } from "next/server";
import { applyCredits, ensureWallet } from "@/lib/credits/wallet-server";
import { getSupabaseService } from "@/lib/supabase/service";
import {
  CREDIT_PACKAGES,
  type CreditPackageId,
} from "@/lib/credits/packages";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const deviceId = req.headers.get("x-device-id");
  if (!deviceId?.trim()) {
    return NextResponse.json(
      { error: "x-device-id gerekli" },
      { status: 400 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const packageId = body.packageId as CreditPackageId;
  if (!packageId || !CREDIT_PACKAGES[packageId]) {
    return NextResponse.json({ error: "Geçersiz paket" }, { status: 400 });
  }

  const pack = CREDIT_PACKAGES[packageId];

  // Simülasyon: gerçek ödeme yok; Iyzico/Stripe entegrasyonu buraya bağlanır.
  if (getSupabaseService()) {
    if (pack.unlimitedDays) {
      await applyCredits(deviceId, 0, pack.unlimitedDays);
    } else {
      await applyCredits(deviceId, pack.credits, undefined);
    }
    const row = await ensureWallet(deviceId);
    return NextResponse.json({
      ok: true,
      simulated: true,
      credits: row.credits,
      unlimitedUntil: row.unlimited_until,
      creditsAdded: pack.unlimitedDays ? 0 : pack.credits,
    });
  }

  return NextResponse.json({
    ok: true,
    simulated: true,
    clientOnly: true,
    creditsAdded: pack.unlimitedDays ? 0 : pack.credits,
    unlimitedDays: pack.unlimitedDays ?? 0,
  });
}
