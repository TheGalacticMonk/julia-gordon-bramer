import React from 'react'
import { getPayload } from 'payload'

import type { PressQuote, PressStripBlock as PressStripBlockProps } from '@/payload-types'

import config from '@payload-config'
import { cn } from '@/utilities/ui'

type Props = PressStripBlockProps & {
  className?: string
}

export const PressStripBlock: React.FC<Props> = async ({ heading, quotes: selectedQuotes, className }) => {
  let quotes = (selectedQuotes || []).filter(
    (quote): quote is PressQuote => typeof quote === 'object',
  )

  if (quotes.length === 0) {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'press-quotes',
      depth: 0,
      limit: 6,
      where: { featured: { equals: true } },
    })
    quotes = result.docs
  }

  if (quotes.length === 0) return null

  return (
    <div className={cn('container', className)}>
      {heading && <h2 className="mb-6 text-2xl font-semibold">{heading}</h2>}
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {quotes.map((quote) => (
          <li key={quote.id} className="press-strip-item border-t border-border pt-4">
            <blockquote className="text-balance text-sm">&ldquo;{quote.quote}&rdquo;</blockquote>
            <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
              {quote.source}
              {quote.context ? ` — ${quote.context}` : ''}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
