'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import Link from 'next/link'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { Media } from '@/components/Media'
import { PencilIcon } from '@/components/icons/PencilIcon'
import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { siteSeo } from '@/utilities/siteSeo'
import { useOrigin } from '@/components/LivePreviewListener/useOrigin'
import { blogPostingSchema } from '@/utilities/schemaOrg'

import styles from './essay.module.css'

const EssayContent: React.FC<{ post: Post }> = ({ post }) => {
  const heroImage = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null

  return (
    <>
      <JsonLd data={blogPostingSchema(post, siteSeo.organizationName)} />

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
        </div>
      </div>
    </>
  )
}

export const EssayPreview: React.FC<{
  initialData: Post
}> = ({ initialData }) => {
  const origin = useOrigin()
  // The live-preview hook sends a one-time "ready" message on mount; before the real origin is
  // known that would target an empty string, throw, and never be retried — so wait for it.
  if (!origin) return <EssayContent post={initialData} />
  return <EssaySynced origin={origin} initialData={initialData} />
}

const EssaySynced: React.FC<{
  origin: string
  initialData: Post
}> = ({ origin, initialData }) => {
  const { data } = useLivePreview<Post>({
    initialData,
    depth: 2,
    serverURL: origin,
  })

  return <EssayContent post={data} />
}

export { EssayContent }
