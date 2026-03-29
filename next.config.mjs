import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for faster builds
  experimental: {
    // Optimize server components
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-dialog', 
      '@radix-ui/react-tabs',
      '@radix-ui/react-slot'
    ],
  },
  
  // Disable sourcemaps in development for faster builds
  devIndicators: {
    buildActivity: false,
  },
  
  // Disable react strict mode in dev for faster performance
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Enable compression
  compress: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Reduce bundle size by excluding source maps in production
  productionBrowserSourceMaps: false,
  
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
