import { bearerFromRequest, getSupabaseAuthed } from "@/lib/supabase/authed";

type Body = {
  endpoint?: string;
  keys?: { p256dh?: string; auth?: string };
};

async function authed(req: Request) {
  const token = bearerFromRequest(req);
  if (!token) return null;
  const sb = getSupabaseAuthed(token);
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data.user ? { sb, user: data.user } : null;
}

/** Tarayıcının push aboneliğini kullanıcıya bağlar (RLS: yalnız kendi satırı). */
export async function POST(req: Request) {
  const ctx = await authed(req);
  if (!ctx) return Response.json({ error: "Giriş gerekli" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as Body;
  const endpoint = body.endpoint?.trim();
  const p256dh = body.keys?.p256dh?.trim();
  const auth = body.keys?.auth?.trim();
  if (!endpoint || !p256dh || !auth || !/^https:\/\//.test(endpoint)) {
    return Response.json({ error: "Geçersiz abonelik" }, { status: 400 });
  }

  // Aynı cihaz yeniden abone olursa eski satırı kaldır
  await ctx.sb.from("push_subscriptions").delete().eq("endpoint", endpoint);
  const { error } = await ctx.sb.from("push_subscriptions").insert({
    user_id: ctx.user.id,
    endpoint,
    p256dh,
    auth,
    user_agent: req.headers.get("user-agent")?.slice(0, 200) ?? null,
  });
  if (error) {
    console.error("[push/subscribe]", error.message);
    return Response.json({ error: "Kaydedilemedi" }, { status: 500 });
  }
  return Response.json({ ok: true });
}

export async function DELETE(req: Request) {
  const ctx = await authed(req);
  if (!ctx) return Response.json({ error: "Giriş gerekli" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as Body;
  if (body.endpoint) {
    await ctx.sb.from("push_subscriptions").delete().eq("endpoint", body.endpoint);
  }
  return Response.json({ ok: true });
}
