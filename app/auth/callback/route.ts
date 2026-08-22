import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { safeInternalNext } from "@/lib/inventory/safe-next";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeInternalNext(searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(`${origin}/giris`);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.redirect(`${origin}/giris?error=auth_config`);
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/giris?error=oauth`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
