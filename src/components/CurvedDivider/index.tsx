import React from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  /** Retained for the existing section-seam call sites. */
  fillClassName: string
  /** Retained for the existing section-seam call sites. */
  nextFillClassName: string
  /** Retained for the existing section-seam call sites. */
  flip?: boolean
}

// Full-bleed Squarespace-style seam. Both section tones live in the divider itself, so the color
// transition follows the arc instead of switching on a straight horizontal box edge.
export const CurvedDivider: React.FC<Props> = ({ fillClassName, nextFillClassName }) => (
  <div
    className={cn(
      'section-divider',
      fillClassName === 'fill-section-raised' ? 'divider-from-raised' : 'divider-from-base',
      nextFillClassName === 'fill-section-raised' ? 'divider-to-raised' : 'divider-to-base',
    )}
    aria-hidden="true"
  />
)
