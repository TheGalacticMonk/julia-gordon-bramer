'use client'

import { contactDefaults } from '@/globals/PageText/defaults'
import { LivePageText } from '@/globals/PageText/LivePageText'

import { ContactView, type ContactSite } from './ContactView'

export const ContactLive = ({
  initial,
  site,
  status,
}: {
  initial: unknown
  site: ContactSite
  status?: string
}) => (
  <LivePageText initial={initial} defaults={contactDefaults}>
    {(t) => <ContactView t={t} site={site} status={status} />}
  </LivePageText>
)
