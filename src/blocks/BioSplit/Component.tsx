import React from 'react'

import type { BioSplitBlock as BioSplitBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type Props = BioSplitBlockProps & {
  className?: string
}

export const BioSplitBlock: React.FC<Props> = ({
  image,
  imagePosition = 'left',
  richText,
  links,
  className,
}) => {
  return (
    <div className={cn('container', className)}>
      <div
        className={cn(
          'grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12',
          imagePosition === 'right' && 'md:[&>*:first-child]:order-2',
        )}
      >
        {image && typeof image === 'object' && (
          <Media resource={image} imgClassName="w-full rounded-sm border border-border" />
        )}
        <div>
          {richText && <RichText data={richText} enableGutter={false} />}
          {links && links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <CMSLink key={i} {...link} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
