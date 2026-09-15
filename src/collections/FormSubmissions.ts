import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

// Populated only by the public contact Server Action (src/app/(frontend)/contact/actions.ts).
// No one gets create access here so submissions can't be spoofed through the API/admin.
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Contact submission',
    plural: 'Contact submissions',
  },
  access: {
    create: () => false,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'reason', 'handled', 'createdAt'],
    group: 'Inbox',
    description: 'Messages from the contact form. Mark a message handled once you’ve replied.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'reason',
      type: 'select',
      required: true,
      defaultValue: 'general',
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
  timestamps: true,
}
