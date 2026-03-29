import { NextRequest, NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase/service";
import * as Sentry from "@sentry/nextjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, userType } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "E-posta, şifre ve ad gereklidir." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseService();
    
    if (!supabase) {
      return NextResponse.json(
        { error: "Sunucu yapılandırma hatası." },
        { status: 500 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kayıtlı." },
        { status: 400 }
      );
    }

    // Create the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          user_type: userType || "bireysel",
        },
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Success - Send Sentry alert for new registration
    Sentry.captureMessage("🆕 YENİ KAYIT!", {
      level: "info",
      tags: {
        event: "new_registration",
      },
      extra: {
        email: email,
        name: name,
        userType: userType || "bireysel",
        userId: data.user?.id,
        timestamp: new Date().toISOString(),
      },
    });

    // Also send to console for easy monitoring
    console.log("🆕 YENİ KAYIT!");
    console.log("Email:", email);
    console.log("İsim:", name);
    console.log("Tip:", userType || "bireysel");
    console.log("User ID:", data.user?.id);

    return NextResponse.json({
      success: true,
      message: "Kayıt başarılı! E-postanızı kontrol edin.",
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    
    // Capture error in Sentry
    Sentry.captureException(error, {
      tags: { event: "signup_error" },
    });

    return NextResponse.json(
      { error: "Kayıt sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
