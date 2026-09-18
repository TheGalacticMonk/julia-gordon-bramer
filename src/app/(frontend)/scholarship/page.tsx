import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import { generateMeta } from '@/utilities/generateMeta'

export const revalidate = 600

export default async function ScholarshipPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: 'scholarship' } },
  })

  const scholarshipCategory = categories[0]

  const { docs: essays } = scholarshipCategory
    ? await payload.find({
        collection: 'posts',
        depth: 1,
        limit: 100,
        overrideAccess: false,
        sort: '-publishedAt',
        where: { categories: { in: [scholarshipCategory.id] } },
      })
    : { docs: [] }

  return (
    <div className="pt-16 pb-24">
      <div className="container mb-12 max-w-2xl">
        <h1 className="text-4xl">Decoding Sylvia Plath</h1>
        <p className="mt-4 text-pretty text-ink-muted">
          Julia Gordon-Bramer reads Sylvia Plath&rsquo;s <em>Ariel</em> poems through tarot and
          the Qabalah, cross-referenced against Plath&rsquo;s own calendars, letters, and
          journals — a close-reading method built poem by poem, not a gimmick laid over the
          text. It began with the academic-press book <em>Fixed Stars Govern a Life</em> and
          continues here, essay by essay.
        </p>
      </div>

      <div className="container">
        {essays.length === 0 ? (
          <p className="text-ink-muted">
            The essay series is being migrated from the previous site — check back soon, or see
            the full method in <em>Fixed Stars Govern a Life</em> and{' '}
            <em>The Occult Sylvia Plath</em> in the meantime.
          </p>
        ) : (
          <CollectionArchive posts={essays} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return generateMeta({
    doc: {
      meta: {
        title: 'Decoding Sylvia Plath',
        description:
          "Julia Gordon-Bramer's tarot-and-Qabalah reading method for Sylvia Plath's Ariel poems, plus the full essay series.",
      },
    },
    path: '/scholarship',
  })
}
