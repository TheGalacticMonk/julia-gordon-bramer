import type { ReactNode } from 'react'

import type { eventsDefaults } from '@/globals/PageText/defaults'

export const EventsView = ({ t, children }: { t: typeof eventsDefaults; children: ReactNode }) => (
  <div className="pb-24">
    <div className="section-base">
      <div className="container pt-16 pb-12 max-w-2xl">
        <h1 className="text-4xl">{t.heading}</h1>
        <p className="mt-4 text-pretty text-ink-muted">{t.intro}</p>
      </div>
    </div>
    {children}
  </div>
)
