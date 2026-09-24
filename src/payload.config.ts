import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { resendAdapter } from '@payloadcms/email-resend'
import { r2Storage } from '@payloadcms/storage-r2'
import fs from 'fs'
import path from 'path'
import { buildConfig, PayloadLogger, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import type { GetPlatformProxyOptions } from 'wrangler'

import { Books } from './collections/Books'
import { Categories } from './collections/Categories'
import { Events } from './collections/Events'
import { FormSubmissions } from './collections/FormSubmissions'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { PressQuotes } from './collections/PressQuotes'
import { Users } from './collections/Users'
import { Venues } from './collections/Venues'
import { Home } from './globals/Home/config'
import { SEODefaults } from './globals/SEODefaults/config'
import { Site } from './globals/Site/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

// The Payload CLI (`payload migrate`, `generate:types`, `build`, …) runs in plain Node,
// outside the Workers runtime, so bindings have to come from wrangler's platform proxy.
const isCLI = process.argv.some((value) =>
  realpath(value)?.endsWith(path.join('payload', 'bin.js')),
)
const isProduction = process.env.NODE_ENV === 'production'

// Workers has no console-backed pino, so log structured JSON straight to the console.
const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  msgPrefix: '',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as unknown as PayloadLogger

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // TODO(cms-ux): replace with a custom dashboard (drafts, upcoming events, latest posts,
      // unread contact submissions, announcement status, quick-add) per agency/cms-ux.md.
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  // Workers can't open raw SMTP sockets, so email goes out through Resend's HTTP API.
  // With no RESEND_API_KEY set (local dev), Payload logs emails to the console instead.
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@juliagordonbramer.com',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'Julia Gordon-Bramer',
      })
    : undefined,
  collections: [
    Pages,
    Posts,
    Books,
    Events,
    Venues,
    PressQuotes,
    Categories,
    Media,
    FormSubmissions,
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Site, Home, SEODefaults],
  plugins: [
    ...plugins,
    // Media lives in R2 (the plugin also disables local disk storage on the collection).
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  logger: isProduction ? cloudflareLogger : undefined,
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
