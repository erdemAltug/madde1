import { NextResponse } from "next/server";

// Bu API şimdilik client-side wallet kullanıyor
// Backend entegrasyonu sonra eklenecek

export const dynamic = "force-dynamic";

export async function GET() {
  // Backend bağlantısı olmadan client-side wallet kullan
  return NextResponse.json({
    backend: false,
    credits: 0,
    unlimitedUntil: null,
    mode: "client_only",
  });
}
