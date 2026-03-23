import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "Dosya bulunamadı" },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = ["application/pdf", "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain"];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Sadece PDF, Word veya TXT dosyaları yüklenebilir" },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Dosya boyutu maksimum 10MB olabilir" },
        { status: 400 }
      );
    }

    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let textContent = "";
    
    // For now, we'll handle text files directly
    // For PDF/DOCX, we would need additional libraries like pdf-parse or mammoth
    if (file.type === "text/plain") {
      textContent = new TextDecoder().decode(buffer);
    } else if (file.type === "application/pdf") {
      // Basic PDF text extraction - in production use pdf-parse or similar
      // For now, return a message that PDF processing needs server-side setup
      return NextResponse.json({
        error: "PDF dosyaları için sunucu tarafı entegrasyonu gerekiyor. Lütfen metin (.txt) dosyası yükleyin veya PDF'in metnini kopyalayıp soru alanına yapıştırın.",
        requiresTextExtraction: true,
        fileName: file.name,
        fileSize: file.size
      });
    } else {
      // For DOCX files
      return NextResponse.json({
        error: "Word (.docx) dosyaları için sunucu tarafı entegrasyonu gerekiyor.",
        requiresTextExtraction: true,
        fileName: file.name,
        fileSize: file.size
      });
    }

    // If we have text content, return it
    if (textContent) {
      return NextResponse.json({
        success: true,
        fileName: file.name,
        fileSize: file.size,
        content: textContent.substring(0, 10000), // Limit content length
        contentLength: textContent.length
      });
    }

    return NextResponse.json({
      error: "Dosya içeriği okunamadı",
      fileName: file.name,
      fileSize: file.size
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
