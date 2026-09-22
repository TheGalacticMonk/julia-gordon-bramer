import React from 'react'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { PressQuote, PressStripBlock as PressStripBlockProps } from '@/payload-types'

import config from '@payload-config'
import { SectionHeading } from '@/components/SectionHeading'
import { cn } from '@/utilities/ui'

type Props = PressStripBlockProps & {
  className?: string
}

// Cached like the site/seoDefaults/home globals instead of hitting D1 on every homepage view.
// Purely content-driven (no time-relative filter like EventList's "upcoming" cutoff), so the
// 'press-quotes' tag alone is enough — invalidated by PressQuotes' own afterChange/afterDelete
// hooks (src/collections/PressQuotes.ts).
const queryFeaturedQuotes = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'press-quotes',
      depth: 0,
      limit: 6,
      where: { featured: { equals: true } },
    })
    return result.docs
  },
  ['homepage-featured-press-quotes'],
  { tags: ['press-quotes'] },
)

export const PressStripBlock: React.FC<Props> = async ({ heading, quotes: selectedQuotes, className }) => {
  let quotes = (selectedQuotes || []).filter(
    (quote): quote is PressQuote => typeof quote === 'object',
  )

  if (quotes.length === 0) {
    quotes = await queryFeaturedQuotes()
  }

  if (quotes.length === 0) return null

  return (
    <div className={cn('container', className)}>
      {heading && <SectionHeading>{heading}</SectionHeading>}
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {quotes.map((quote) => (
          <li key={quote.id} className="pt-4">
            <hr className="ink-rule mb-4" />
            <blockquote className="text-balance font-display text-lg text-ink">
              &ldquo;{quote.quote}&rdquo;
            </blockquote>
            <p className="mt-2 font-sans text-xs uppercase tracking-wide text-ink-muted">
              {quote.source}
              {quote.context ? ` — ${quote.context}` : ''}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
