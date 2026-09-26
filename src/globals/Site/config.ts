import type { GlobalConfig } from 'payload'

import { adminOnlyField } from '@/access/editorVisibility'
import { livePreviewFor } from '@/utilities/livePreview'
import { revalidateSite } from './hooks/revalidateSite'

// Site-wide settings: socials, booking link, contact info, and the homepage announcement banner.
// Julia only sees her contact email and phone (shown on the Contact page); the rest is
// developer-only. The menu itself lives in code (globals/Site/Header/navItems.ts).
export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Contact details',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
    hideAPIURL: true,
    livePreview: livePreviewFor('/contact?preview=site'),
    description:
      'The email address and phone number shown on your Contact page. Leave a box empty to hide it.',
  },
  fields: [
    {
      name: 'contactEmail',
      label: 'Email address',
      type: 'email',
    },
    {
      name: 'contactPhone',
      label: 'Phone number',
      type: 'text',
    },

    // ── Developer-only from here down ─────────────────────────────────────────────────────
    {
      name: 'bookingUrl',
      label: 'Booking link',
      type: 'text',
      admin: {
        condition: adminOnlyField,
        description:
          'Where "Book a reading" points. Use /contact to route through the form, or paste an external scheduler link.',
      },
    },
    {
      name: 'socials',
      label: 'Social links',
      type: 'array',
      maxRows: 6,
      admin: { initCollapsed: true, condition: adminOnlyField },
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
    {
      name: 'announcementEnabled',
      label: 'Show the homepage banner',
      type: 'checkbox',
      defaultValue: false,
      admin: { condition: adminOnlyField },
    },
    {
      name: 'announcementMessage',
      label: 'Banner message',
      type: 'text',
      admin: {
        condition: (data, siblingData, ctx) =>
          adminOnlyField(data, siblingData, ctx) && Boolean(siblingData?.announcementEnabled),
      },
    },
    {
      name: 'announcementLinkUrl',
      label: 'Banner link (optional)',
      type: 'text',
      admin: {
        condition: (data, siblingData, ctx) =>
          adminOnlyField(data, siblingData, ctx) && Boolean(siblingData?.announcementEnabled),
      },
    },
    {
      name: 'announcementLinkLabel',
      label: 'Banner link label',
      type: 'text',
      admin: {
        condition: (data, siblingData, ctx) =>
          adminOnlyField(data, siblingData, ctx) && Boolean(siblingData?.announcementEnabled),
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
  versions: false,
}
