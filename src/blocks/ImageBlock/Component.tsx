import React from 'react'

import type { ImageBlock as ImageBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = ImageBlockProps & {
  className?: string
  enableGutter?: boolean
}

export const ImageBlock: React.FC<Props> = (props) => {
  const { layout, image, imageTwo, caption, className, enableGutter = true } = props

  return (
    <div className={cn({ container: enableGutter }, className)}>
      <div className={cn('grid gap-4', layout === 'pair' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1')}>
        {image && typeof image === 'object' && (
          <Media
            imgClassName="w-full rounded-[0.4rem] border border-border"
            resource={image}
            size={layout === 'pair' ? '(max-width: 639px) 100vw, 50vw' : '100vw'}
          />
        )}
        {layout === 'pair' && imageTwo && typeof imageTwo === 'object' && (
          <Media
            imgClassName="w-full rounded-[0.4rem] border border-border"
            resource={imageTwo}
            size="(max-width: 639px) 100vw, 50vw"
          />
        )}
      </div>
      {caption && (
        <div className="mt-4 text-sm text-muted-foreground">
          <RichText data={caption} enableGutter={false} enableProse={false} />
        </div>
      )}
    </div>
  )
}
