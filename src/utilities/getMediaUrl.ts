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

  // Payload stores an absolute `url` on each media doc, built from whatever server URL was
  // active when it was written (staging host, localhost, or — once — a stray space after the
  // host). Trusting it means images break whenever data moves between environments, so only
  // the `/api/...` path is kept and the host always comes from the current environment.
  const apiIndex = url.indexOf('/api/')
  const path = apiIndex > 0 ? url.slice(apiIndex).trim() : url.trim()

  const baseUrl = getServerSideURL().trim()
  const absoluteUrl = path.startsWith('http') ? path : `${baseUrl}${path}`

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${absoluteUrl}?${cacheTag}` : absoluteUrl
}
