import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Book } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'

export const revalidate = 600

export default async function BooksPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: books } = await payload.find({
    collection: 'books',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: '-publishYear',
  })

  return (
    <div className="pt-16 pb-24">
      <div className="container mb-12 max-w-2xl">
        <h1 className="text-4xl">Books</h1>
        <p className="mt-4 text-pretty text-ink-muted">
          Five books across three publishers — a trade-press tarot guide and Plath biography,
          two chapbook-scale Plath essay collections, and the foundational academic study that
          started it all.
        </p>
      </div>

      <div className="container">
        {books.length === 0 ? (
          <p className="text-ink-muted">Books are on the way — check back soon.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {books.map((book: Book) => (
              <li key={book.id}>
                <CMSLink
                  appearance="inline"
                  className="reading-card group flex h-full flex-col gap-3 p-4"
                  type="reference"
                  reference={{ relationTo: 'books', value: book }}
                >
                  {book.coverImage && typeof book.coverImage === 'object' && (
                    <Media
                      resource={book.coverImage}
                      size="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 33vw"
                      imgClassName="w-full"
                    />
                  )}
                  <div>
                    <p className="font-display text-lg text-ink">{book.title}</p>
                    {book.subtitle && (
                      <p className="font-sans text-sm text-ink-muted">{book.subtitle}</p>
                    )}
                    {book.publisher && (
                      <p className="mt-1 font-sans text-xs text-ink-muted">
                        {book.publisher}
                        {book.publishYear ? `, ${book.publishYear}` : ''}
                      </p>
                    )}
                  </div>
                </CMSLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return generateMeta({
    doc: {
      meta: {
        title: 'Books',
        description:
          "Julia Gordon-Bramer's books on tarot, Sylvia Plath, and the Qabalah — from Destiny Books, Magi Press, and SFASU Press.",
      },
    },
    path: '/books',
  })
}
