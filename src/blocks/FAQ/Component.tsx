import React from 'react'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { SectionHeading } from '@/components/SectionHeading'
import { cn } from '@/utilities/ui'

type Props = FAQBlockProps & {
  className?: string
}

// Native <details>/<summary> — accessible and keyboard-operable with zero JS.
export const FAQBlock: React.FC<Props> = ({ heading, items, className }) => {
  if (!items || items.length === 0) return null

  return (
    <div className={cn('container', className)}>
      {heading && <SectionHeading>{heading}</SectionHeading>}
      <hr className="ink-rule mb-2" />
      <div>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans font-medium text-ink marker:content-none">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-display text-lg motion-safe:transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="mt-3 text-ink-muted">
                <RichText data={item.answer} enableGutter={false} enableProse={false} />
              </div>
            </details>
            {index < items.length - 1 && <hr className="ink-rule" />}
          </React.Fragment>
        ))}
      </div>
      <hr className="ink-rule mt-2" />
    </div>
  )
}
