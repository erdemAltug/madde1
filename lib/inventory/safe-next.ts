const FALLBACK = "/hesabim";

/** Open-redirect yok: yalnızca site-içi path. */
export function safeInternalNext(raw: string | null | undefined): string {
  if (!raw) return FALLBACK;
  const decoded = (() => {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  })();
  if (!decoded.startsWith("/") || decoded.startsWith("//") || decoded.includes("://")) {
    return FALLBACK;
  }
  if (decoded.startsWith("/giris") || decoded.startsWith("/kayit")) {
    return FALLBACK;
  }
  return decoded;
}
