import type { Metadata } from 'next'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import configPromise from '@payload-config'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { AboutCard } from '@/components/AboutCard/Component'
import { HeroIntroCard } from '@/components/Hero/HeroIntroCard'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'

const queryHome = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug: 'home',
    depth: 2,
    draft,
    overrideAccess: draft,
  })
})

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const home = await queryHome()
  const siteData = await getCachedGlobal('site', 1)()
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
  const home = await queryHome()
  return generateMeta({ doc: { meta: home.meta, slug: '' } })
}
