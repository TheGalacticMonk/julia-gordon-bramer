// Production-build stand-in for `drizzle-kit/api` (see next.config.ts).
//
// Payload's D1 adapter only touches drizzle-kit for dev-time schema push and for generating
// migrations — both happen in Node (`next dev`, `payload migrate:create`), never on Workers,
// where the schema is applied ahead of time by `payload migrate`. Turbopack would otherwise
// emit a hashed external for the package that the OpenNext/esbuild bundle step can't resolve.
const unavailable = () => {
  throw new Error('drizzle-kit is not available in the Cloudflare Workers runtime')
}

export const generateSQLiteDrizzleJson = unavailable
export const generateSQLiteMigration = unavailable
export const pushSQLiteSchema = unavailable
