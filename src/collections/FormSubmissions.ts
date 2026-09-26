import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { notifyOnFormSubmission } from './hooks/notifyOnFormSubmission'

// Populated only by the public contact Server Action (src/app/(frontend)/contact/actions.ts).
// No one gets create access here so submissions can't be spoofed through the API/admin.
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Contact message',
    plural: 'Contact messages',
  },
  access: {
    create: () => false,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'reason', 'handled', 'createdAt'],
    // Messages are stored (and emailed) but not shown in the CMS.
    hidden: true,
    description:
      'Messages people send you from the Contact page (you also get each one by email). Open a message to read it, and tick “Handled” once you’ve replied.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      admin: { readOnly: true },
    },
    {
      name: 'reason',
      type: 'select',
      required: true,
      defaultValue: 'general',
      admin: { readOnly: true },
      options: [
        { label: 'Book a reading', value: 'reading' },
        { label: 'Invite Julia to speak / teach', value: 'invite' },
        { label: 'Press / media', value: 'press' },
        { label: 'General question', value: 'general' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'handled',
      type: 'checkbox',
      label: 'Handled',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check this off once you’ve replied or resolved it.',
      },
    },
  ],
  hooks: {
    afterChange: [notifyOnFormSubmission],
  },
  timestamps: true,
}
