'use client'

import { tarotDefaults } from '@/globals/PageText/defaults'
import { LivePageText } from '@/globals/PageText/LivePageText'

import { TarotView } from './TarotView'

export const TarotLive = ({ initial }: { initial: unknown }) => (
  <LivePageText initial={initial} defaults={tarotDefaults}>
    {(t) => <TarotView t={t} />}
  </LivePageText>
)
