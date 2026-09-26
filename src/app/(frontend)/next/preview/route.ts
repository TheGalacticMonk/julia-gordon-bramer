import type { NextRequest } from 'next/server'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

// Entry point for the CMS preview: checks the editor is signed in, switches on draft mode, then
// opens the requested page of the site.
export async function GET(req: NextRequest): Promise<Response> {
  const path = req.nextUrl.searchParams.get('path')

  // Same-site paths only ("//evil.com" and "/\evil.com" would be treated as other hosts).
  if (!path || !path.startsWith('/') || path.startsWith('//') || path.includes('\\')) {
    return new Response('Invalid path', { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return new Response('You need to be signed in to preview.', { status: 401 })

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
