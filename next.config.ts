import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

// process.env.VERCEL_PROJECT_PRODUCTION_URL never applies here (not Vercel). Must resolve
// to the real deployed origin at build time, since it seeds images.remotePatterns below —
// wrangler.jsonc's vars.NEXT_PUBLIC_SERVER_URL is what Workers Builds injects into the build
// environment (see DEPLOYMENT.md's build-variables table).
const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const nextConfig: NextConfig = {
  // Required by @opennextjs/cloudflare: it expects `.next/standalone` output.
  output: 'standalone',
  experimental: {
    // D1's platform-proxy session throws "database is locked" (SQLITE_BUSY) when
    // multiple static-generation workers query it concurrently during build. D1
    // handles one build worker's sequential queries fine, so cap it at 1.
    cpus: 1,
  },
  images: {
    // Local dev's origin (http://localhost:3000) resolves to a loopback address; Next 16
    // blocks fetches to private/local IPs by default even when remotePatterns matches.
    // getMediaUrl() always builds absolute URLs now (required for Cloudflare, see its
    // comment), so this is needed for images to load in local dev too.
    dangerouslyAllowLocalIP: true,
    qualities: [100],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  turbopack: {
    root: path.resolve(dirname),
    // Production builds only: dev still needs the real drizzle-kit for automatic schema push.
    resolveAlias:
      process.env.NODE_ENV === 'production'
        ? { 'drizzle-kit/api': './src/utilities/stubs/drizzle-kit-api.ts' }
        : {},
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
