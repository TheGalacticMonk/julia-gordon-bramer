import type { CheckboxField, TextField } from 'payload'

import { formatSlugHook } from './formatSlug'

type Overrides = {
  checkboxOverrides?: Partial<CheckboxField>
  slugOverrides?: Partial<TextField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

// Auto-generates a URL slug from a source field (default: title) on save, unless the
// editor has locked the slug via the adjacent `slugLock` checkbox and typed their own.
export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { checkboxOverrides, slugOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    ...checkboxOverrides,
  }

  const generatedSlugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'URL slug',
    required: true,
    unique: true,
    ...slugOverrides,
    admin: {
      position: 'sidebar',
      description: 'Auto-filled from the title. Edit it to set a custom URL.',
      ...slugOverrides?.admin,
    },
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
  }

  return [generatedSlugField, checkBoxField]
}
