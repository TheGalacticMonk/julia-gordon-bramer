import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getDecodingText } from '@/globals/PageText/getPageText'
import { DecodingLive } from './DecodingLive'
import { DecodingView } from './DecodingView'
import { generateMeta } from '@/utilities/generateMeta'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { decodingEssays } from './essays'
import styles from './decoding.module.css'

export const revalidate = 600

export default async function DecodingPage() {
  const payload = await getPayload({ config: configPromise })
  const { text, draft, raw } = await getDecodingText()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 200,
    overrideAccess: false,
    sort: '_order',
    select: { slug: true, title: true, heroImage: true },
  })

  // Essays added in the CMS appear here automatically. The older static archive entries stay in
  // the list too; any that also exist as a CMS essay link through to it.
  const postBySlug = new Map(posts.map((post) => [post.slug, post]))
  const staticSlugs = new Set(decodingEssays.map((essay) => essay.slug))
  const cards = [
    ...posts
      .filter((post) => !staticSlugs.has(post.slug ?? ''))
      .map((post) => {
        const image =
          post.heroImage && typeof post.heroImage === 'object'
            ? getMediaUrl(post.heroImage.url, post.heroImage.updatedAt)
            : ''
        return { slug: post.slug as string, title: post.title, excerpt: '', image, isLive: true }
      }),
    ...decodingEssays.map((essay) => ({
      slug: essay.slug,
      title: essay.title,
      excerpt: essay.excerpt,
      image: essay.image,
      isLive: postBySlug.has(essay.slug) || Boolean(essay.migrated || essay.paragraphs),
    })),
  ]

  const grid = (
    <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((essay) => {
        const card = (
          <>
            <div className="relative aspect-square w-full overflow-hidden bg-paper-raised">
              {essay.image && (
                <Image
                  src={essay.image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p className="font-display text-base leading-snug text-ink">{essay.title}</p>
              {essay.excerpt && (
                <p className="mt-2 text-sm leading-6 text-ink-muted">{essay.excerpt}</p>
              )}
              {essay.isLive && (
                <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-wider text-metal">
                  Read the essay →
                </p>
              )}
            </div>
          </>
        )

        return (
          <li key={essay.slug} className="reading-card flex h-full flex-col gap-3 p-4">
            {essay.isLive ? (
              <Link
                href={`/decoding-sylvia-plath/${essay.slug}`}
                className="flex h-full flex-col gap-3"
              >
                {card}
              </Link>
            ) : (
              card
            )}
          </li>
        )
      })}
    </ul>
  )

  return draft ? (
    <DecodingLive initial={raw} count={cards.length}>
      {grid}
    </DecodingLive>
  ) : (
    <DecodingView t={text} count={cards.length}>
      {grid}
    </DecodingView>
  )
}

export async function generateMetadata() {
  return generateMeta({
    doc: {
      meta: {
        title: 'Decoding Sylvia Plath',
        description:
          "Julia Gordon-Bramer's ongoing essay series decoding Sylvia Plath's early poems, one poem at a time, cross-referenced against the news and events of the day each was written.",
      },
    },
    path: '/decoding-sylvia-plath',
  })
}
