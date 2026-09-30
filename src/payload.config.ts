import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { resendAdapter } from '@payloadcms/email-resend'
import { r2Storage } from '@payloadcms/storage-r2'
import fs from 'fs'
import path from 'path'
import { buildConfig, PayloadLogger } from 'payload'
import { fileURLToPath } from 'url'
import type { GetPlatformProxyOptions } from 'wrangler'

import { adminFavicon } from './admin/favicon'
import { adminTranslations } from './admin/translations'
import { Books } from './collections/Books'
import { Events } from './collections/Events'
import { FormSubmissions } from './collections/FormSubmissions'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { PressQuotes } from './collections/PressQuotes'
import { Users } from './collections/Users'
import { Home } from './globals/Home/config'
import { Site } from './globals/Site/config'
import {
  BooksPage,
  ContactPage,
  DecodingPage,
  EventsPage,
  TarotPage,
} from './globals/PageText/configs'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

// CLI commands and Next's production build run outside the Worker. Use local Wrangler
// bindings there; remote bindings are selected explicitly for production migrations.
const isCLI = process.argv.some((value) => {
  const resolved = realpath(value)
  return (
    resolved?.endsWith(path.join('payload', 'bin.js')) ||
    resolved?.endsWith(path.join('next', 'dist', 'bin', 'next'))
  )
})
const isProduction = process.env.NODE_ENV === 'production'
const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

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
  isCLI || isBuild || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/admin/Logo',
        Icon: '/admin/Icon',
      },
      // Loads the site's display font for the wordmark and headings.
      providers: ['/admin/BrandFonts'],
      afterNavLinks: ['/admin/ViewSiteLink'],
      views: {
        // Task cards for everyone; Payload's full section grid is added for admins only.
        dashboard: { Component: '/admin/Dashboard' },
      },
    },
    meta: {
      titleSuffix: ' · Julia Gordon-Bramer',
      robots: 'noindex, nofollow',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: adminFavicon }],
    },
    // Light only: calm for long form-filling, and the one palette checked for contrast.
    theme: 'light',
    // Plain avatar: no Gravatar request.
    avatar: 'default',
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
  i18n: {
    // Plainer button and message wording (see src/admin/translations.ts).
    translations: adminTranslations,
  },
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
  collections: [Posts, Books, Events, PressQuotes, Media, FormSubmissions, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Home, TarotPage, DecodingPage, BooksPage, EventsPage, ContactPage, Site],
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
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.PAYLOAD_REMOTE_BINDINGS === '1' ? 'remote' : process.env.CLOUDFLARE_ENV,
        remoteBindings: process.env.PAYLOAD_REMOTE_BINDINGS === '1',
      } satisfies GetPlatformProxyOptions),
  )
}
