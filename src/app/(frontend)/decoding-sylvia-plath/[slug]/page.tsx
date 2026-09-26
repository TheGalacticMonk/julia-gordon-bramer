import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import { EssayContent, EssayPreview } from './EssayPreview'

import type { Post } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { decodingEssays } from '../essays'

// Every post is a Decoding Sylvia Plath essay (the site has no blog), living at
// /decoding-sylvia-plath/<slug> (see src/utilities/collectionPath.ts). Each essay's source image
// is a different, often small or odd, aspect ratio (a newspaper clipping, a magazine cover, a
// political cartoon...), so the image renders at its own natural size — capped, not cropped —
// inside the normal page shell rather than as a full-bleed banner.
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const getStaticEssayFallback = (slug: string): Post | null => {
  const essay = decodingEssays.find(
    (candidate) => candidate.slug === slug && (candidate.migrated || Boolean(candidate.paragraphs)),
  )
  if (!essay) return null
  const paragraphs = [
    ...(essay.paragraphs || [{ text: essay.excerpt }]),
    ...(essay.tags ? [{ text: `Topics: ${essay.tags.join(', ')}`, italic: true }] : []),
  ]

  return {
    id: 0,
    title: essay.title,
    slug: essay.slug,
    meta: {
      title: essay.title,
      description: essay.excerpt,
    },
    content: {
      root: {
        type: 'root',
        children: [
          ...paragraphs.map((paragraph) => ({
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: paragraph.text,
                format: paragraph.italic ? 2 : 0,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
          })),
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    heroImage: {
      id: 0,
      alt: 'The New Yorker’s celebrated editor, William Shawn',
      url: essay.image,
      width: 400,
      height: 550,
      updatedAt: 'static',
      createdAt: 'static',
    } as MediaType,
    publishedAt: '2022-01-20T00:00:00.000Z',
    updatedAt: 'static',
    createdAt: 'static',
    _status: 'published',
  }
}

export default async function EssayPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/decoding-sylvia-plath/' + decodedSlug
  const post =
    (await queryEssayBySlug({ slug: decodedSlug })) || getStaticEssayFallback(decodedSlug)

  if (!post) notFound()

  return (
    <article className="section-base">
      {draft ? <EssayPreview initialData={post} /> : <EssayContent post={post} />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post =
    (await queryEssayBySlug({ slug: decodedSlug })) || getStaticEssayFallback(decodedSlug)

  const archiveEssay = decodingEssays.find((essay) => essay.slug === decodedSlug)
  const postWithDescription = post
    ? {
        ...post,
        meta: {
          ...post.meta,
          description: post.meta?.description || archiveEssay?.excerpt,
        },
      }
    : null

  return generateMeta({ doc: postWithDescription, path: `/decoding-sylvia-plath/${decodedSlug}` })
}

const queryEssayBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return (result.docs?.[0] as Post) || null
})
