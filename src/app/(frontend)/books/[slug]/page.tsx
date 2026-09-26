import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { cache } from 'react'

import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { bookSchema } from '@/utilities/schemaOrg'
import { retailerPresets } from '@/collections/Books/retailerPresets'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs: books } = await payload.find({
    collection: 'books',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return books.map(({ slug }) => ({ slug }))
}

const retailerLabel = (value: string): string =>
  retailerPresets.find((preset) => preset.value === value)?.label || value

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function BookPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/books/' + decodedSlug
  const book = await queryBookBySlug({ slug: decodedSlug })

  if (!book) return <PayloadRedirects url={url} />

  const pressQuotes = (book.pressQuotes || []).filter(
    (quote): quote is Exclude<typeof quote, string | number> => typeof quote === 'object',
  )

  const seoDefaults = await getCachedGlobal('seoDefaults', 0)()

  return (
    <article className="pt-16 pb-24">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <JsonLd data={bookSchema(book, seoDefaults?.organizationName || 'Julia Gordon-Bramer')} />

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
              <Media resource={book.coverImage} imgClassName="w-full border border-rule" />
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
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const book = await queryBookBySlug({ slug: decodedSlug })

  return generateMeta({ doc: book, path: `/books/${decodedSlug}` })
}

const queryBookBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'books',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] || null
})
