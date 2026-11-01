import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { clientIp, rateLimit } from "@/lib/security/rate-limit";

export const maxDuration = 60;

const MAX_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/heic", "image/heif"]);
const PDF_TYPE = "application/pdf";
const OCR_MODEL = process.env.OPENAI_OCR_MODEL?.trim() || "gpt-4o-mini";

const OCR_PROMPT = `Bu bir sözleşme ya da resmi belge görüntüsü. Görünen metni olduğu gibi, Türkçe karakterleri koruyarak düz metin olarak çıkar.
- Madde numaralarını ve başlıkları koru, her maddeyi yeni satıra yaz.
- Yorum, özet ya da açıklama ekleme; yalnızca metni ver.
- Okunamayan kısımlara [okunamadı] yaz.
- Görüntüde sözleşme ya da belge yoksa yalnızca BELGE_YOK yaz.`;

/**
 * Fotoğraftan / PDF'ten tarama: belge görüntüsünü metne çevirir.
 * Metin istemcide maskeleme adımından geçer; burada saklanmaz ve loglanmaz.
 */
export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY?.trim()) {
    return Response.json(
      { error: "Fotoğraftan okuma şu an kullanılamıyor. Metni yapıştırarak devam edebilirsiniz." },
      { status: 503 },
    );
  }

  const limit = rateLimit(`ocr:${clientIp(req)}`, 12, 60 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { error: "Kısa sürede çok fazla belge yüklendi. Biraz sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Dosya 10 MB'tan büyük. Daha küçük bir fotoğraf dener misiniz?" }, { status: 413 });
  }

  const type = file.type.toLowerCase();
  const isImage = IMAGE_TYPES.has(type);
  const isPdf = type === PDF_TYPE;
  if (!isImage && !isPdf) {
    return Response.json({ error: "Yalnızca fotoğraf (JPG, PNG) veya PDF okunabilir." }, { status: 415 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  try {
    const result = await generateText({
      model: openai(OCR_MODEL),
      temperature: 0,
      maxOutputTokens: 6000,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: OCR_PROMPT },
            isImage
              ? { type: "image", image: bytes, mediaType: type }
              : { type: "file", data: bytes, mediaType: PDF_TYPE, filename: "sozlesme.pdf" },
          ],
        },
      ],
    });

    const text = (result.text || "").trim();
    if (!text || text === "BELGE_YOK") {
      return Response.json(
        { error: "Bu görüntüde okunabilir bir belge bulamadık. Daha net, düz ve aydınlık bir fotoğraf dener misiniz?" },
        { status: 422 },
      );
    }
    return Response.json({ text });
  } catch (err) {
    console.error("[ocr]", err instanceof Error ? err.message.slice(0, 200) : "unknown");
    return Response.json(
      { error: "Bu belgeyi okuyamadık. Daha net bir fotoğraf dener misiniz?" },
      { status: 502 },
    );
  }
}
