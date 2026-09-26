import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import type { Config } from '@/payload-types'

import {
  booksDefaults,
  contactDefaults,
  decodingDefaults,
  eventsDefaults,
  tarotDefaults,
} from './defaults'
import { mergeText } from './mergeText'

export { mergeText }

type PageSlug = 'tarotPage' | 'decodingPage' | 'booksPage' | 'eventsPage' | 'contactPage'
type Global = keyof Config['globals']

const readPublished = (slug: Global) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })
      return payload.findGlobal({ slug, depth: 0 })
    },
    [slug],
    { tags: [`global_${slug}`] },
  )()

const readDraft = async (slug: Global) => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug, depth: 0, draft: true, overrideAccess: true })
}

export type PageTextResult<T> = {
  /** The copy to show: what was saved in the CMS, with built-in text for anything left empty. */
  text: T
  /** In the CMS preview (draft mode) the raw saved form is handed to the live-updating client. */
  draft: boolean
  raw: unknown
}

// If a form's table doesn't exist yet (code deployed before its database migration) or a read
// fails for any reason, the page still renders with the defaults instead of erroring.
async function load<T>(slug: PageSlug, defaults: T): Promise<PageTextResult<T>> {
  const draft = (await draftMode()).isEnabled
  try {
    const raw = draft ? await readDraft(slug) : await readPublished(slug)
    return { text: mergeText(defaults, raw), draft, raw }
  } catch {
    return { text: defaults, draft, raw: null }
  }
}

export const getTarotText = () => load('tarotPage', tarotDefaults)
export const getDecodingText = () => load('decodingPage', decodingDefaults)
export const getBooksText = () => load('booksPage', booksDefaults)
export const getEventsText = () => load('eventsPage', eventsDefaults)
export const getContactText = () => load('contactPage', contactDefaults)
