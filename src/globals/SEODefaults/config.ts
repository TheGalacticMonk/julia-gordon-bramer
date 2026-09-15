import type { GlobalConfig } from 'payload'

// Fallback metadata used when a page/post/book/event doesn't set its own SEO fields.
// Kept deliberately small — this is a safety net, not a place to author real copy.
export const SEODefaults: GlobalConfig = {
  slug: 'seoDefaults',
  label: 'SEO Defaults',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titleSuffix',
      type: 'text',
      defaultValue: 'Julia Gordon-Bramer',
      admin: {
        description: 'Appended to every page title that doesn’t set its own, e.g. "About | Julia Gordon-Bramer".',
      },
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      admin: {
        description: 'Used when a page has no meta description of its own.',
      },
    },
    {
      name: 'defaultOgImage',
      label: 'Default social share image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'organizationName',
      label: 'Legal / author name for structured data',
      type: 'text',
      defaultValue: 'Julia Gordon-Bramer',
    },
  ],
  versions: false,
}
