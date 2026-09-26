import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { JsonLd } from '@/components/JsonLd'
import { Media } from '@/components/Media'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'

import { formatDateTime } from '@/utilities/formatDateTime'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { blogPostingSchema } from '@/utilities/schemaOrg'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PencilIcon } from '@/components/icons/PencilIcon'
import styles from './essay.module.css'
import { scholarshipEssays } from '../essays'

// Essays are Posts filtered to the "Scholarship" category, living at their own URL namespace
// (see src/utilities/collectionPath.ts). This is deliberately NOT the /blog/[slug] template:
// each essay's source image is a different, often small or odd, aspect ratio (a newspaper
// clipping, a magazine cover, a political cartoon...), so a full-bleed cropped banner (what
// PostHero does, and what /blog/[slug] still uses for general posts) mangles most of them. Here
// the image renders at its own natural size — capped, not cropped — inside the normal page
// shell, so the header and background stay consistent with every other page on the site.
const queryScholarshipCategoryId = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { slug: { equals: 'scholarship' } },
  })
  return docs[0]?.id
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const categoryId = await queryScholarshipCategoryId()
  if (!categoryId) return []

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
    where: { categories: { in: [categoryId] } },
  })

  return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const getStaticEssayFallback = (slug: string): Post | null => {
  const essay = scholarshipEssays.find(
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

  if (!post) return <PayloadRedirects url={url} />

  const seoDefaults = await getCachedGlobal('seoDefaults', 0)()
  const heroImage = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null

  return (
    <article className="section-base">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}
      <JsonLd
        data={blogPostingSchema(post, seoDefaults?.organizationName || 'Julia Gordon-Bramer')}
      />

      <div className="container py-16 md:py-24">
        <div className={styles.card}>
          <Link href="/decoding-sylvia-plath" className={styles.backLink}>
            ← Decoding Sylvia Plath
          </Link>

          <div className={styles.eyebrowRow}>
            <PencilIcon className={styles.eyebrowIcon} aria-hidden="true" />
            <span className={styles.eyebrow}>Decoding Sylvia Plath</span>
            <span className={styles.eyebrowRule} />
          </div>

          <h1 className={styles.title}>{post.title}</h1>

          {post.publishedAt && (
            <div className={styles.metaRow}>
              <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>
            </div>
          )}

          {heroImage && (
            <figure className={styles.imageFigure}>
              <div className={styles.imageFrame}>
                <Media resource={heroImage} size="(max-width: 640px) calc(100vw - 5rem), 48rem" />
              </div>
              {heroImage.alt && (
                <figcaption className={styles.imageCaption}>{heroImage.alt}</figcaption>
              )}
            </figure>
          )}

          <div className={`${styles.body} payload-richtext`}>
            <RichText data={post.content} enableGutter={false} enableProse={false} />
          </div>

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12"
              docs={post.relatedPosts.filter((related) => typeof related === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post =
    (await queryEssayBySlug({ slug: decodedSlug })) || getStaticEssayFallback(decodedSlug)

  const archiveEssay = scholarshipEssays.find((essay) => essay.slug === decodedSlug)
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
  const categoryId = await queryScholarshipCategoryId()
  if (!categoryId) return null

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [{ slug: { equals: slug } }, { categories: { in: [categoryId] } }],
    },
  })

  return (result.docs?.[0] as Post) || null
})
