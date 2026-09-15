import type { Metadata } from 'next'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import configPromise from '@payload-config'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
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

      <div className="container grid grid-cols-1 items-center gap-8 pt-16 pb-8 md:grid-cols-2 md:gap-12 md:pt-24">
        <div>
          <h1 className="text-balance text-4xl font-semibold sm:text-5xl">{heroHeading}</h1>
          {heroSubheading && (
            <p className="mt-4 text-pretty text-xl text-ink-muted">{heroSubheading}</p>
          )}
          {heroRichText && (
            <div className="mt-6">
              <RichText data={heroRichText} enableGutter={false} enableProse={false} />
            </div>
          )}
          {links && links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <CMSLink key={i} {...link} />
              ))}
            </div>
          )}
        </div>
        {heroImage && typeof heroImage === 'object' && (
          <Media resource={heroImage} imgClassName="w-full rounded-sm border border-rule" priority />
        )}
      </div>

      <RenderBlocks blocks={modules as never} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const home = await queryHome()
  return generateMeta({ doc: { meta: home.meta, slug: '' } })
}
