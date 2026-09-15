import type { CollectionConfig } from 'payload'

import { admin } from '../access/admin'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Venues: CollectionConfig = {
  slug: 'venues',
  labels: {
    singular: 'Venue',
    plural: 'Venues',
  },
  access: {
    create: authenticated,
    delete: admin,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'region'],
    group: 'Tour',
    description: 'Bookstores, fairs, conference centers — reusable so you pick one instead of retyping the address every time.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Venue name',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'region',
          type: 'text',
          label: 'State / region',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Street address (optional)',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Venue website',
    },
  ],
}
