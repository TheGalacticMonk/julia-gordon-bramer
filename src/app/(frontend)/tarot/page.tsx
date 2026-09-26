import type { Metadata } from 'next'

import { getTarotText } from '@/globals/PageText/getPageText'
import { generateMeta } from '@/utilities/generateMeta'

import { TarotLive } from './TarotLive'
import { TarotView } from './TarotView'

export default async function TarotPage() {
  const { text, draft, raw } = await getTarotText()
  return draft ? <TarotLive initial={raw} /> : <TarotView t={text} />
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: {
      meta: {
        title: 'Tarot Readings',
        description:
          'Phone and video tarot readings with Julia Gordon-Bramer, available worldwide.',
      },
      slug: 'tarot',
    },
  })
}
