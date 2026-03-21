import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/analiz/kira",
        destination: "/analiz/kira-sozlesmesi",
        permanent: true,
      },
      {
        source: "/araclar/kira-artis-hesaplama",
        destination: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
        permanent: true,
      },
      {
        source: "/araclar/tahliye-taahhutnamesi-kontrolu",
        destination: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT ?? "clause",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  telemetry: false,
});
