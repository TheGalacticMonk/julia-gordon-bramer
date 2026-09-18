import React, { Fragment } from 'react'

import type { Props } from './types'

import { cn } from '@/utilities/ui'
import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, fill, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            // `fill` positions the image absolutely and sizes it to 100% of its containing
            // block — this wrapper has to actually fill ITS OWN parent (the element the
            // caller sized explicitly, e.g. .introPhoto) for that chain to resolve to a real
            // pixel size instead of collapsing: an unstyled div's height is "auto", and auto
            // height ignores an absolutely-positioned-only child, so without this it silently
            // computes to 0 (Next.js's dev-mode "height value of 0" warning is this exact bug).
            className: cn(fill && 'relative h-full w-full', className),
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
