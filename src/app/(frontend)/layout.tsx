import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Barlow_Condensed, Fraunces, Inter } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { JsonLd } from '@/components/JsonLd'
// import { MagicSparkles } from '@/components/MagicSparkles/Component'
import { OrbPattern } from '@/components/OrbPattern/Component'
import { SocialSidebar } from '@/components/SocialSidebar/Component'
import { AnnouncementBar } from '@/globals/Site/AnnouncementBar/Component'
import { Footer } from '@/globals/Site/Footer/Component'
import { Header } from '@/globals/Site/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { personSchema } from '@/utilities/schemaOrg'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Match the reference site: Fraunces for expressive display typography and Barlow Condensed
// for labels and interface text. Inter remains reserved for comfortable long-form reading.
//
// display: 'optional' (not 'swap') specifically because the header wordmark reserves its box
// width by MEASURING this font (TypingWordmark.tsx's hidden sizer span) — 'swap' paints in a
// fallback font first and swaps to Fraunces once it loads, and that swap changes the measured
// width, producing a brief one-time layout jump right at load even with the reveal-width fix
// in place. 'optional' still tries to use Fraunces if it's already cached/ready within the
// browser's short block window (true almost always here, since next/font self-hosts and
// preloads it), but never swaps it in LATE — so there's nothing left to cause that jump.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'optional',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  weight: ['500', '600', '700'],
  display: 'optional',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const seoDefaults = await getCachedGlobal('seoDefaults', 0)()

  return (
    <html
      className={cn(inter.variable, fraunces.variable, barlowCondensed.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        {/* favicon.svg (the scaffold's generic "N" mark) removed in favor of a real photo
            favicon — most browsers prefer an SVG icon over .ico when both are declared, so
            leaving the placeholder svg linked would have kept showing the generic mark instead
            of her photo for most visitors. */}
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/icon.png" rel="icon" sizes="512x512" type="image/png" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
      </head>
      {/* suppressHydrationWarning: extensions like Grammarly inject data-gr-* attributes
          directly onto <body> before hydration — same extension-collision class as the head
          one above, not a real mismatch. */}
      <body suppressHydrationWarning>
        <Providers>
          {/* Star field temporarily disabled while testing the animated swirl background. */}
          <OrbPattern />
          {/*
            Rendered in body, not head: browser extensions (crypto wallets especially) inject
            their own <script> tags into <head> before React hydrates, which collides with a
            script tag here and produces a hydration mismatch. This is Next.js's own recommended
            placement for JSON-LD for that reason.
          */}
          <JsonLd data={personSchema(seoDefaults?.organizationName || 'Julia Gordon-Bramer')} />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <AnnouncementBar />
          <Header />
          <SocialSidebar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
