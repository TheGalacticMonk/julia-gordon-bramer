'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import Link from 'next/link'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Book, Media as MediaType } from '@/payload-types'
import { bookSchema } from '@/utilities/schemaOrg'
import { siteSeo } from '@/utilities/siteSeo'
import { useOrigin } from '@/components/LivePreviewListener/useOrigin'
import { retailerPresets } from '@/collections/Books/retailerPresets'

const retailerLabel = (value: string): string =>
  retailerPresets.find((preset) => preset.value === value)?.label || value

const BookContent: React.FC<{ book: Book }> = ({ book }) => {
  const pressQuotes = (book.pressQuotes || []).filter(
    (quote): quote is Exclude<typeof quote, string | number> => typeof quote === 'object',
  )

  return (
    <>
      <JsonLd data={bookSchema(book, siteSeo.organizationName)} />

      <div className="container">
        <Link
          href="/books"
          className="mb-6 inline-block font-sans text-base text-metal hover:text-ink"
        >
          ← Back to Books
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,20rem)_1fr]">
          <div>
            {book.coverImage && typeof book.coverImage === 'object' && (
              <Media
                resource={book.coverImage as MediaType}
                imgClassName="w-full border border-rule"
              />
            )}
          </div>

          <div>
            <h1 className="text-4xl">{book.title}</h1>
            {book.subtitle && (
              <p className="mt-2 font-display text-xl text-ink-muted">{book.subtitle}</p>
            )}
            {(book.publisher || book.publishYear) && (
              <p className="mt-3 font-sans text-sm text-ink-muted">
                {book.publisher}
                {book.publisher && book.publishYear ? ', ' : ''}
                {book.publishYear}
                {book.isbn ? ` · ISBN ${book.isbn}` : ''}
              </p>
            )}

            {book.description && (
              <RichText className="mt-6 max-w-none" data={book.description} enableGutter={false} />
            )}

            {book.retailers && book.retailers.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {book.retailers.map((retailer, index) => (
                  <a
                    key={index}
                    href={retailer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm bg-primary px-5 py-2.5 font-sans text-sm font-medium text-primary-foreground motion-safe:transition-opacity hover:opacity-90"
                  >
                    Buy from{' '}
                    {retailer.retailer === 'other' && retailer.label
                      ? retailer.label
                      : retailerLabel(retailer.retailer)}
                  </a>
                ))}
              </div>
            )}

            {pressQuotes.length > 0 && (
              <div className="mt-10 flex flex-col gap-6 border-t border-rule pt-6">
                {pressQuotes.map((quote) => (
                  <figure key={quote.id} className="pull-quote">
                    <blockquote>&ldquo;{quote.quote}&rdquo;</blockquote>
                    <figcaption>
                      {quote.source}
                      {quote.context ? ` — ${quote.context}` : ''}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const BookPreview: React.FC<{
  initialData: Book
}> = ({ initialData }) => {
  const origin = useOrigin()
  // The live-preview hook sends a one-time "ready" message on mount; before the real origin is
  // known that would target an empty string, throw, and never be retried — so wait for it.
  if (!origin) return <BookContent book={initialData} />
  return <BookSynced origin={origin} initialData={initialData} />
}

const BookSynced: React.FC<{
  origin: string
  initialData: Book
}> = ({ origin, initialData }) => {
  const { data } = useLivePreview<Book>({
    initialData,
    depth: 2,
    serverURL: origin,
  })

  return <BookContent book={data} />
}

export { BookContent }
