import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateSite } from './hooks/revalidateSite'

// Everything about the site's frame: nav, footer, socials, booking link, contact info,
// and the homepage announcement banner. One global so Julia has one place to look for
// "stuff that's on every page," instead of hunting across separate Header/Footer globals.
export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              label: 'Main menu',
              type: 'array',
              fields: [link({ appearances: false })],
              maxRows: 8,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/globals/Site/Header/RowLabel#RowLabel',
                },
              },
            },
            {
              name: 'footerNavItems',
              label: 'Footer menu',
              type: 'array',
              fields: [link({ appearances: false })],
              maxRows: 8,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/globals/Site/Footer/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
        {
          label: 'Booking & contact',
          fields: [
            {
              name: 'bookingUrl',
              label: 'Booking link',
              type: 'text',
              admin: {
                description:
                  'Where "Book a reading" points. Use /contact to route through the form, or paste an external scheduler link.',
              },
            },
            {
              name: 'contactEmail',
              label: 'Contact email',
              type: 'email',
            },
            {
              name: 'contactPhone',
              label: 'Contact phone',
              type: 'text',
            },
            {
              name: 'socials',
              label: 'Social links',
              type: 'array',
              maxRows: 6,
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'X / Twitter', value: 'x' },
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'TikTok', value: 'tiktok' },
                      ],
                      admin: { width: '50%' },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Homepage banner',
          fields: [
            {
              name: 'announcementEnabled',
              label: 'Show the homepage banner',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'announcementMessage',
              label: 'Message',
              type: 'text',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.announcementEnabled),
              },
            },
            {
              name: 'announcementLinkUrl',
              label: 'Link (optional)',
              type: 'text',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.announcementEnabled),
              },
            },
            {
              name: 'announcementLinkLabel',
              label: 'Link label',
              type: 'text',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.announcementEnabled),
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
  versions: false,
}
