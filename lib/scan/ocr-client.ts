"use client";

const MAX_EDGE = 2000;

/** Telefon fotoğrafları 4-12 MB olabilir; okunurluğu bozmadan küçültüp JPEG'e çevirir. */
async function downscaleImage(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/heic" || file.type === "image/heif") {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 2_500_000) {
      bitmap.close();
      return file;
    }
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.85),
    );
    return blob ?? file;
  } catch {
    return file;
  }
}

export function isOcrFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return (
    file.type.startsWith("image/") ||
    file.type === "application/pdf" ||
    /\.(png|jpe?g|webp|heic|pdf)$/.test(name)
  );
}

export async function extractTextFromFile(file: File): Promise<string> {
  const blob = await downscaleImage(file);
  const form = new FormData();
  const name = blob === file ? file.name : file.name.replace(/\.\w+$/, ".jpg");
  form.append("file", new File([blob], name, { type: blob.type || file.type }));

  const res = await fetch("/api/ocr", { method: "POST", body: form });
  const data = (await res.json().catch(() => ({}))) as { text?: string; error?: string };
  if (!res.ok || !data.text) {
    throw new Error(data.error || "Bu belgeyi okuyamadık. Daha net bir fotoğraf dener misiniz?");
  }
  return data.text;
}
