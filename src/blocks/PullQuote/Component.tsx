import React from 'react'

import type { PullQuoteBlock as PullQuoteBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = PullQuoteBlockProps & {
  className?: string
}

export const PullQuote: React.FC<Props> = ({ quote, attribution, className }) => {
  return (
    <figure className={cn('pull-quote container', className)}>
      <blockquote>&ldquo;{quote}&rdquo;</blockquote>
      {attribution && <figcaption>{attribution}</figcaption>}
    </figure>
  )
}
