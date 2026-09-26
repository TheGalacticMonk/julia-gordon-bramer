import type { Metadata } from 'next'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import React, { cache } from 'react'
import configPromise from '@payload-config'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { HomeLive } from './HomeLive'
import { HomeView } from './HomeView'

// Draft/live-preview requests need fresh, unpublished content every time — never cached, since a
// cached copy could otherwise leak a draft edit to public visitors or hand an editor stale data.
// Kept in React's per-request cache() only, same as before.
const queryDraftHome = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug: 'home',
    depth: 2,
    draft: true,
    overrideAccess: true,
  })
})

// Published requests — the overwhelming majority of traffic — are now cached the same way as
// the site global (R2-backed, behind a tag), instead of hitting D1 on every single
// page view. Invalidated by src/globals/Home/hooks/revalidateHome.ts on publish.
const queryPublishedHome = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    return payload.findGlobal({ slug: 'home', depth: 2 })
  },
  ['home'],
  { tags: ['global_home'] },
)

const queryHome = (draft: boolean) => (draft ? queryDraftHome() : queryPublishedHome())

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams
  const { isEnabled: draft } = await draftMode()
  // Independent fetches — one from D1 (queryHome), one from the R2-backed global cache
  // (getCachedGlobal) — that were previously awaited one after another for no reason,
  // serializing their latency instead of overlapping it.
  const [home, siteData] = await Promise.all([queryHome(draft), getCachedGlobal('site', 1)()])

  // The modules (events, books, press quotes…) come from other parts of the CMS, so they're
  // rendered here on the server and handed to the live-updating page as a slot.
  const modules = <RenderBlocks blocks={home.modules as never} />
  const props = { socials: siteData?.socials, bookingUrl: siteData?.bookingUrl }

  if (!draft) {
    return (
      <HomeView home={home} {...props}>
        {modules}
      </HomeView>
    )
  }

  return (
    <>
      {/* The press-quotes preview shows this page; those forms aren't part of the home page's own
          draft, so the page reloads when one is saved. Only then — reloading on every autosave of
          the home page would make its own preview flicker. */}
      {preview === 'quotes' && <LivePreviewListener />}
      <HomeLive initialHome={home} {...props}>
        {modules}
      </HomeLive>
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const home = await queryHome(draft)
  return generateMeta({ doc: { meta: home.meta, slug: '' } })
}
