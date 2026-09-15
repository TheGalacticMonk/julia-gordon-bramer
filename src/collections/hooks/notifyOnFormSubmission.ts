import type { CollectionAfterChangeHook } from 'payload'

import type { FormSubmission } from '../../payload-types'

const reasonLabels: Record<string, string> = {
  reading: 'Book a reading',
  invite: 'Invite Julia to speak / teach',
  press: 'Press / media',
  general: 'General question',
}

export const notifyOnFormSubmission: CollectionAfterChangeHook<FormSubmission> = async ({
  doc,
  operation,
  req: { payload },
}) => {
  if (operation !== 'create') return doc

  const notifyTo = process.env.CONTACT_NOTIFY_TO
  if (!notifyTo) {
    payload.logger.warn('CONTACT_NOTIFY_TO is not set — skipping contact-form email notification')
    return doc
  }

  try {
    await payload.sendEmail({
      to: notifyTo,
      replyTo: doc.email,
      subject: `New contact form message: ${reasonLabels[doc.reason] || doc.reason}`,
      text: `From: ${doc.name} <${doc.email}>\nReason: ${reasonLabels[doc.reason] || doc.reason}\n\n${doc.message}`,
    })
  } catch (error) {
    payload.logger.error({ err: error, message: 'Failed to send contact-form notification email' })
  }

  return doc
}
