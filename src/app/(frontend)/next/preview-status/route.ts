import { draftMode } from 'next/headers'

export async function GET(): Promise<Response> {
  const { isEnabled } = await draftMode()

  return Response.json(
    { isEnabled },
    {
      headers: {
        'Cache-Control': 'private, no-store',
      },
    },
  )
}
