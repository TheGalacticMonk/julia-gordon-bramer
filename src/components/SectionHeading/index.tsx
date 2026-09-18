import React from 'react'

import { PencilIcon } from '@/components/icons/PencilIcon'
import { cn } from '@/utilities/ui'

type Props = {
  children: React.ReactNode
  className?: string
}

// Same pencil-as-bullet treatment the header nav uses for the active page and EventList uses
// per event title — reused here as a section-level marker so the mark reads consistently
// wherever it shows up on the page, not just in the nav.
export const SectionHeading: React.FC<Props> = ({ children, className }) => (
  <h2 className={cn('mb-6 flex items-center gap-2 text-2xl', className)}>
    <PencilIcon className="size-6 shrink-0 text-metal" aria-hidden="true" />
    {children}
  </h2>
)
