import { NextResponse } from "next/server";

// Bu API şimdilik client-side wallet kullanıyor
// Backend entegrasyonu sonra eklenecek

export const dynamic = "force-dynamic";

export async function POST() {
  // Backend bağlantısı olmadan client-side wallet kullan
  return NextResponse.json({ 
    ok: true, 
    clientOnly: true,
    message: "Client-side wallet mode" 
  });
}
