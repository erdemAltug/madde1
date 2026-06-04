# İletişim formları — nereye düşer?

Form gönderildiğinde **üç kanal** devreye girer (mail zorunlu değil).

## Akış

```
Kullanıcı "Gönder"
    → POST /api/contact
        → (opsiyonel) Supabase contact_inquiries
        → (opsiyonel) Resend → tryclauseai@gmail.com
        → PostHog sunucu (her zaman dener)  ← Brave engeli yok
        → Sentry "📩 YENİ İLETİŞİM TALEBİ"
    → Tarayıcı (başarılıysa)
        → PostHog Contact_Form_Submitted + identify(email)
```

## PostHog

| Ne | Değer |
|----|--------|
| **Event adı** | `Contact_Form_Submitted` |
| **Hata event** | `Contact_Form_Error` |
| **distinct_id** | Gönderen e-posta (küçük harf) |
| **Özellikler** | `source`, `contact_name`, `contact_email`, `message_preview`, `message_length`, `lead_channel` (`client` / `server`), `is_lead: true` |

### PostHog’da nerede bakılır?

1. **Activity → Live events** → filtre: `Contact_Form_Submitted`
2. **Persons** → e-posta ile ara (identify sonrası)
3. İki kayıt görebilirsiniz: biri `lead_channel: server`, biri `client` — aynı gönderim, normal

### Env

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

Brave / reklam engeli **istemciyi** keser; **sunucu capture** yine çalışır.

## Sentry

| Ne | Değer |
|----|--------|
| Mesaj | `📩 YENİ İLETİŞİM TALEBİ` |
| Tag | `event: contact_inquiry`, `source: …` |
| Context | `contact` → ad, e-posta, mesaj, önizleme |

**Alert önerisi:** Issue → `contact_inquiry` veya mesaj içeriği `YENİ İLETİŞİM` → e-posta/Slack.

## Kaynak (`source`)

| source | Nereden |
|--------|---------|
| `enterprise` | Kurumsal iletişim dialog (varsayılan) |
| `pricing_modal_business` | Fiyatlandırma → İletişime Geç |
| `seo_persona` | Ana sayfa SEO metni linki |

## E-posta

Yalnızca `RESEND_API_KEY` varsa. Yoksa PostHog + Sentry yeterli.

## Test

1. Production’da formu doldurup gönder
2. PostHog Live → `Contact_Form_Submitted` (1–2 dk gecikme olabilir)
3. Sentry → `📩 YENİ İLETİŞİM TALEBİ`
4. Brave’de test: Sentry + PostHog **server** yine görünmeli; client event eksik olabilir
