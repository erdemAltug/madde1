/** Her capture'a eklenebilecek tarayıcı / oturum bağlamı */

export function getDeviceContext(): Record<string, string | number | boolean> {
  if (typeof window === "undefined") return {};

  const nav = navigator;
  const screen = window.screen;

  const ctx: Record<string, string | number | boolean> = {
    pathname: window.location.pathname,
    page_url: window.location.href,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    screen_width: screen?.width ?? 0,
    screen_height: screen?.height ?? 0,
    device_pixel_ratio: window.devicePixelRatio ?? 1,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: nav.language,
    languages: nav.languages?.slice(0, 3).join(",") || nav.language,
    platform: nav.platform,
    user_agent: nav.userAgent,
    online: nav.onLine,
  };

  if (window.location.search) ctx.search = window.location.search;
  if (document.referrer) ctx.referrer = document.referrer;

  return ctx;
}
