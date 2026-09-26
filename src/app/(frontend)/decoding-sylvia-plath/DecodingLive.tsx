'use client'

import type { ReactNode } from 'react'

import { decodingDefaults } from '@/globals/PageText/defaults'
import { LivePageText } from '@/globals/PageText/LivePageText'

import { DecodingView } from './DecodingView'

export const DecodingLive = ({
  initial,
  count,
  children,
}: {
  initial: unknown
  count: number
  children: ReactNode
}) => (
  <LivePageText initial={initial} defaults={decodingDefaults}>
    {(t) => (
      <DecodingView t={t} count={count}>
        {children}
      </DecodingView>
    )}
  </LivePageText>
)
