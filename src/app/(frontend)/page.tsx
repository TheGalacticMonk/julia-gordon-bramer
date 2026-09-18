import type { Metadata } from 'next'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import configPromise from '@payload-config'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HeroIntroCard } from '@/components/Hero/HeroIntroCard'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'

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
  const { heroHeading, heroSubheading, heroRichText, heroImage, links, modules } = home

  return (
    <article className="pb-24">
      {draft && <LivePreviewListener />}

      <div className="container flex justify-center pt-8 pb-6 md:pt-12">
        <HeroIntroCard
          heroHeading={heroHeading}
          heroSubheading={heroSubheading}
          heroRichText={heroRichText}
          heroImage={heroImage}
          links={links}
        />
      </div>

      <RenderBlocks blocks={modules as never} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const home = await queryHome()
  return generateMeta({ doc: { meta: home.meta, slug: '' } })
}
