import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { limitByIp } from "@/lib/security/rate-limit";
import { submitContactInquiry } from "@/lib/contact/submit-inquiry";
import { PAID_PLAN_IDS, planById } from "@/lib/pricing";

export const dynamic = "force-dynamic";

const schema = z.object({
  plan: z.enum(PAID_PLAN_IDS),
  email: z.string().trim().email("Geçerli bir e-posta girin").max(200).optional().or(z.literal("")),
  name: z.string().trim().max(120).optional(),
  note: z.string().trim().max(1000).optional(),
  page: z.string().trim().max(200).optional(),
  /** Bot koruması — boş kalmalı */
  company: z.string().max(0).optional(),
});

/**
 * Ödeme henüz yok: ücretli pakete tıklanınca talep kaydedilir ve ekibe e-posta gider.
 * E-posta bırakılmadıysa da (sadece tıklama) bildirim gelir; kaç kişinin hangi pakete
 * ilgi duyduğunu görmek için.
 */
export async function POST(request: NextRequest) {
  const limited = limitByIp(request, "plan-interest", 10);
  if (limited) return limited;

  const parsed = schema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Geçersiz istek" }, { status: 400 });
  }
  const { plan, email, name, note, page, company } = parsed.data;
  if (company) return NextResponse.json({ ok: true });

  const p = planById(plan)!;
  const hasEmail = Boolean(email);
  const message = [
    `Paket: ${p.name} (${p.price} ${p.period})`,
    `Durum: ${hasEmail ? "E-posta bıraktı — açılınca haber bekliyor" : "Sadece butona tıkladı (iletişim bilgisi yok)"}`,
    page ? `Sayfa: ${page}` : null,
    `Zaman: ${new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}`,
    note ? `\nNot:\n${note}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const result = await submitContactInquiry({
    source: `plan_${plan}`,
    name: name && name.length >= 2 ? name : hasEmail ? "Ziyaretçi" : "Anonim ziyaretçi",
    email: email || "anonim@tryclause.local",
    message,
  });

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
