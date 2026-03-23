import { NextResponse } from "next/server";
import {
  CREDIT_PACKAGES,
  type CreditPackageId,
} from "@/lib/credits/packages";

// Bu API şimdilik client-side wallet kullanıyor
// Backend entegrasyonu sonra eklenecek

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const packageId = body.packageId as CreditPackageId;
  if (!packageId || !CREDIT_PACKAGES[packageId]) {
    return NextResponse.json({ error: "Geçersiz paket" }, { status: 400 });
  }

  const pack = CREDIT_PACKAGES[packageId];

  // Client-side wallet modu
  return NextResponse.json({
    ok: true,
    simulated: true,
    clientOnly: true,
    creditsAdded: pack.unlimitedDays ? 0 : pack.credits,
    unlimitedDays: pack.unlimitedDays ?? 0,
    message: "Client-side wallet mode - purchase simulated",
  });
}
