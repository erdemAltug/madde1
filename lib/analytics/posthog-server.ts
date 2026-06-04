/**
 * Tarayıcı engellense bile (Brave vb.) iletişim lead’leri PostHog’a düşer.
 * NEXT_PUBLIC_POSTHOG_KEY sunucuda capture için kullanılır (zaten public key).
 */

function posthogHost(): string {
  return (
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com"
  ).replace(/\/$/, "");
}

export async function capturePostHogServer(
  distinctId: string,
  event: string,
  properties: Record<string, string | number | boolean>,
  person?: Record<string, string>,
): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!apiKey) return;

  try {
    const body: Record<string, unknown> = {
      api_key: apiKey,
      event,
      distinct_id: distinctId,
      properties: {
        ...properties,
        $lib: "clause-server",
      },
    };

    if (person && Object.keys(person).length > 0) {
      (body.properties as Record<string, unknown>).$set = person;
    }

    await fetch(`${posthogHost()}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    /* ignore */
  }
}
