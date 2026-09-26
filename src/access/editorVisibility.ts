import type { Condition } from 'payload'

// The CMS has two roles (see collections/Users): "editor" (Julia) and "admin" (developer).
// Julia's view is deliberately stripped down to page text, Books, Essays, Events, Press quotes,
// and her inbox — everything else is developer-only. These helpers are UI-only: they hide things
// from the admin panel, they do NOT change what's stored or what the public site can read (so
// they're safe on fields the frontend renders). Access rules live with each collection.

/** `admin.hidden` for collections/globals only developers should see. */
export const hiddenFromEditors = ({ user }: { user?: object | null }): boolean =>
  (user as { role?: string } | null | undefined)?.role !== 'admin'

/** `admin.condition` for fields/tabs only developers should see. */
export const adminOnlyField: Condition = (_data, _siblingData, { user }) => user?.role === 'admin'
