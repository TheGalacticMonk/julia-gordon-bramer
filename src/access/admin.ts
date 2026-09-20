import type { PayloadRequest } from 'payload'

// Takes just `req` so it fits both collection-level `Access` and field-level `FieldAccess`.
type IsAdmin = (args: { req: PayloadRequest }) => boolean

/** Only the admin/developer role — not the editor role Julia uses day to day. */
export const admin: IsAdmin = ({ req: { user } }) => {
  return Boolean(user && user.role === 'admin')
}
