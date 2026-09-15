import type { CollectionConfig } from 'payload'

import { admin } from '../../access/admin'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: admin,
    delete: admin,
    read: authenticated,
    // Anyone signed in can update their own profile; only admins can edit other users or roles.
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    group: 'Settings',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Editor (Julia)', value: 'editor' },
        { label: 'Admin / developer', value: 'admin' },
      ],
      access: {
        // Only an admin can promote/demote a user's role.
        update: admin,
      },
      admin: {
        description: 'Editors can publish everything but cannot manage other users or redirects.',
      },
    },
  ],
  timestamps: true,
  versions: false,
}
