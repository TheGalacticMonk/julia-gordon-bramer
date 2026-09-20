import { getServerSideURL } from './getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted absolute URL with cache tag if provided
 *
 * Must be absolute, not relative. On Cloudflare Workers, OpenNext's `/_next/image`
 * handler treats any relative (`/`-prefixed) URL as a static asset and serves it via
 * the `ASSETS` binding — which only knows files bundled at build time, not Payload's
 * dynamic `/api/media/file/[filename]` route. A relative URL there 404s. An absolute
 * URL goes through the handler's real-fetch path instead, which actually hits the
 * route. (Local dev's use of a loopback origin is allowed via `dangerouslyAllowLocalIP`
 * in next.config.ts, not by keeping this relative.)
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const baseUrl = getServerSideURL()
  const absoluteUrl = url.startsWith('http') ? url : `${baseUrl}${url}`

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${absoluteUrl}?${cacheTag}` : absoluteUrl
}
