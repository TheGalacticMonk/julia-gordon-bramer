import type { Metadata } from 'next'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getContactText } from '@/globals/PageText/getPageText'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'

import { ContactLive } from './ContactLive'
import { ContactView } from './ContactView'

type Props = {
  searchParams: Promise<{ status?: string; preview?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const { status, preview } = await searchParams
  const [{ text, draft, raw }, siteData] = await Promise.all([
    getContactText(),
    getCachedGlobal('site', 0)(),
  ])
  const site = { contactEmail: siteData?.contactEmail, contactPhone: siteData?.contactPhone }

  if (!draft) return <ContactView t={text} site={site} status={status} />

  return (
    <>
      {/* The contact-details form has no drafts, so its preview reloads when it is saved. Only
          then — reloading on every autosave of the page text would make that preview flicker. */}
      {preview === 'site' && <LivePreviewListener />}
      <ContactLive initial={raw} site={site} status={status} />
    </>
  )
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
