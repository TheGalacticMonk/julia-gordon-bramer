import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { generateMeta } from '@/utilities/generateMeta'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16 max-w-2xl">
        <h1 className="text-4xl">Blog</h1>
        <p className="mt-4 text-pretty text-ink-muted">
          Tour news, essays, and the occasional dispatch from the road — alongside the
          Sylvia Plath scholarship. Looking for the essay series specifically?{' '}
          <Link className="text-metal underline" href="/decoding-sylvia-plath">
            Visit the Decoding Sylvia Plath page
          </Link>
          .
        </p>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return generateMeta({
    doc: { meta: { title: 'Blog', description: 'Tour news, essays, and Sylvia Plath scholarship from Julia Gordon-Bramer.' } },
    path: '/blog',
  })
}
