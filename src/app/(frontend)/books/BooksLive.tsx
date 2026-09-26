'use client'

import type { ReactNode } from 'react'

import { booksDefaults } from '@/globals/PageText/defaults'
import { LivePageText } from '@/globals/PageText/LivePageText'

import { BooksView } from './BooksView'

export const BooksLive = ({ initial, children }: { initial: unknown; children: ReactNode }) => (
  <LivePageText initial={initial} defaults={booksDefaults}>
    {(t) => <BooksView t={t}>{children}</BooksView>}
  </LivePageText>
)
