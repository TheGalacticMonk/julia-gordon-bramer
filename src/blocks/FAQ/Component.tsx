import React from 'react'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = FAQBlockProps & {
  className?: string
}

// Native <details>/<summary> — accessible and keyboard-operable with zero JS.
export const FAQBlock: React.FC<Props> = ({ heading, items, className }) => {
  if (!items || items.length === 0) return null

  return (
    <div className={cn('container', className)}>
      {heading && <h2 className="mb-6 text-2xl font-semibold">{heading}</h2>}
      <div className="divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.id} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:content-none">
              {item.question}
              <span aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="mt-3 text-muted-foreground">
              <RichText data={item.answer} enableGutter={false} enableProse={false} />
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
