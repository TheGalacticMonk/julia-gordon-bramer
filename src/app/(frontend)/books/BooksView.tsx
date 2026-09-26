import type { ReactNode } from 'react'

import type { booksDefaults } from '@/globals/PageText/defaults'

export const BooksView = ({ t, children }: { t: typeof booksDefaults; children: ReactNode }) => (
  <div className="pt-16 pb-24">
    <div className="container mb-12 max-w-2xl">
      <h1 className="text-4xl">{t.heading}</h1>
      <p className="mt-4 text-pretty text-ink-muted">{t.intro}</p>
    </div>
    {children}
  </div>
)
