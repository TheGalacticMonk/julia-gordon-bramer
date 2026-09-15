import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type IsAdmin = (args: AccessArgs<User>) => boolean

/** Only the admin/developer role — not the editor role Julia uses day to day. */
export const admin: IsAdmin = ({ req: { user } }) => {
  return Boolean(user && user.role === 'admin')
}
