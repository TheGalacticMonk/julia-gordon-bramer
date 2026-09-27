import type { Metadata } from 'next'

import { getContactText } from '@/globals/PageText/getPageText'
import { generateMeta } from '@/utilities/generateMeta'

import { ContactLive } from './ContactLive'
import { ContactView } from './ContactView'

type Props = {
  searchParams: Promise<{ status?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const { status } = await searchParams
  const { text, draft, raw } = await getContactText()

  if (!draft) return <ContactView t={text} status={status} />

  return <ContactLive initial={raw} status={status} />
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: {
      meta: {
        title: 'Contact',
        description: 'Book a reading, invite Julia to speak, or reach out for press.',
      },
      slug: 'contact',
    },
  })
}
