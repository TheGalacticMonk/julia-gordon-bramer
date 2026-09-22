import type { Metadata } from 'next'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import React, { cache } from 'react'
import configPromise from '@payload-config'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { AboutCard } from '@/components/AboutCard/Component'
import { HeroIntroCard } from '@/components/Hero/HeroIntroCard'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'

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
// the site/seoDefaults globals (R2-backed, behind a tag), instead of hitting D1 on every single
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

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  // Independent fetches — one from D1 (queryHome), one from the R2-backed global cache
  // (getCachedGlobal) — that were previously awaited one after another for no reason,
  // serializing their latency instead of overlapping it.
  const [home, siteData] = await Promise.all([queryHome(draft), getCachedGlobal('site', 1)()])
  const {
    heroHeading,
    heroSubheading,
    heroRichText,
    heroImage,
    links,
    modules,
    aboutImage,
    aboutRichText,
  } = home

  return (
    // No pb-24 when AboutCard renders (aboutRichText set): that card's own band already ends in
    // matching --paper-raised padding right before the footer, and pb-24 here — on the plain
    // page background — would reopen the mismatched-color gap this file's earlier history had
    // (see AboutCard/Component.tsx's CurvedDivider comment). Kept as a fallback for the
    // no-About-content case, where nothing else provides closing space before the footer.
    <article className={aboutRichText ? undefined : 'pb-24'}>
      {draft && <LivePreviewListener />}

      <HeroIntroCard
        heroHeading={heroHeading}
        heroSubheading={heroSubheading}
        heroRichText={heroRichText}
        heroImage={heroImage}
        links={links}
        socials={siteData?.socials}
      />

      <RenderBlocks blocks={modules as never} />

      <AboutCard
        heroHeading={heroHeading}
        heroSubheading={heroSubheading}
        heroImage={heroImage}
        aboutImage={aboutImage}
        aboutRichText={aboutRichText}
      />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const home = await queryHome(draft)
  return generateMeta({ doc: { meta: home.meta, slug: '' } })
}
