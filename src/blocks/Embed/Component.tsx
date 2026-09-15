import React from 'react'

import type { EmbedBlock as EmbedBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { resolveEmbedUrl } from './providers'

type Props = EmbedBlockProps & {
  className?: string
}

// Resolves against the fixed provider allowlist in ./providers — anything that doesn't
// match a known provider/host renders nothing instead of falling back to an open iframe.
export const EmbedBlock: React.FC<Props> = ({ provider, url, caption, className }) => {
  const embedUrl = resolveEmbedUrl(provider, url)

  if (!embedUrl) return null

  return (
    <figure className={cn('container', className)}>
      <div className="aspect-video w-full overflow-hidden rounded-sm border border-border">
        <iframe
          src={embedUrl}
          title={caption || 'Embedded media'}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption && <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}
