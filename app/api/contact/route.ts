import { NextRequest, NextResponse } from "next/server";
import { contactInquirySchema } from "@/lib/contact/schema";
import { submitContactInquiry } from "@/lib/contact/submit-inquiry";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactInquirySchema.safeParse(body);

    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Geçersiz form";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    if (parsed.data.company) {
      return NextResponse.json({ success: true });
    }

    const result = await submitContactInquiry(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
    });
  } catch {
    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
