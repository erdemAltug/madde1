"use client";

import { openConsentPreferences } from "@/lib/consent/store";

/** Footer / gizlilik sayfası: çerez tercihini istediği an değiştirme (rızayı geri alma kolaylığı) */
export function ConsentPreferencesLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      Çerez tercihleri
    </button>
  );
}
