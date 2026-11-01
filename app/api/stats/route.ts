import { getPublicStats, STATS_MIN_TO_SHOW } from "@/lib/growth/public-stats";

export const revalidate = 3600;

/** Landing'deki sosyal kanıt bandı için toplam sayılar (kişisel veri yok). */
export async function GET() {
  const stats = await getPublicStats().catch(() => null);
  if (!stats) return Response.json({ show: false });
  return Response.json({
    show: stats.analyses >= STATS_MIN_TO_SHOW,
    analyses: stats.analyses,
    trackedDates: stats.trackedDates >= STATS_MIN_TO_SHOW ? stats.trackedDates : null,
  });
}
