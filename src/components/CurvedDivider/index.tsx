import React from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  /** Fill class for the section above the curve. */
  fillClassName: string
  /** Fill class for the section below the curve. */
  nextFillClassName: string
  /** Mirrors the sweep horizontally so consecutive dividers don't all lean the same way. */
  flip?: boolean
}

// Full-bleed "gaia.com" style section seam: one smooth diagonal arc (tall on one side, low on
// the other), not a repeating sine wave. The path fills from the top of this strip down to a
// curved line — that region is colored as the PREVIOUS section's background (fillClassName),
// so it reads as that color sweeping down into a curve before giving way to the actual next
// section's own flat background showing through below the curve. preserveAspectRatio="none"
// stretches the curve to any width without distorting its vertical proportions oddly, since
// the wrapper's fixed height is what actually controls how tall the sweep reads.
export const CurvedDivider: React.FC<Props> = ({ fillClassName, nextFillClassName, flip }) => (
  <div className="relative h-16 overflow-hidden sm:h-24" aria-hidden="true">
    <svg
      viewBox="0 0 1600 100"
      preserveAspectRatio="none"
      className={cn('absolute inset-0 h-full w-full', flip && 'scale-x-[-1]')}
    >
      <path d="M0,0 L0,80 C350,95 650,35 1600,15 L1600,0 Z" className={fillClassName} />
      <path
        d="M0,80 C350,95 650,35 1600,15 L1600,100 L0,100 Z"
        className={nextFillClassName}
      />
    </svg>
  </div>
)
