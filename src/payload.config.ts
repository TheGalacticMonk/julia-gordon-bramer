import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

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
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  // Sent through Resend's HTTP API (hosts like Render block outbound SMTP). With no
  // RESEND_API_KEY set (local dev), Payload logs emails to the console instead.
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
    // Render's disk is wiped on every deploy, so uploads go to an S3-compatible bucket
    // (Cloudflare R2). Without S3_BUCKET (local dev) files stay in public/media.
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      bucket: process.env.S3_BUCKET || '',
      collections: { media: true },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
        region: process.env.S3_REGION || 'auto',
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
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
