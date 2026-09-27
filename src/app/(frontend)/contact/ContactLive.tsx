'use client'

import { contactDefaults } from '@/globals/PageText/defaults'
import { LivePageText } from '@/globals/PageText/LivePageText'

import { ContactView } from './ContactView'

export const ContactLive = ({ initial, status }: { initial: unknown; status?: string }) => (
  <LivePageText initial={initial} defaults={contactDefaults}>
    {(t) => <ContactView t={t} status={status} />}
  </LivePageText>
)
