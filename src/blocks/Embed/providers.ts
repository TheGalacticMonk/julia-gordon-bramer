// Single source of truth for which embed providers are allowed on the site.
// Extend this list deliberately — every entry is a third-party iframe we trust with layout and scripting.
export const EMBED_PROVIDERS = {
  youtube: {
    label: 'YouTube',
    hosts: ['youtube.com', 'www.youtube.com', 'youtu.be'],
    toEmbedUrl: (url: URL) => {
      const id = url.hostname.includes('youtu.be')
        ? url.pathname.slice(1)
        : url.searchParams.get('v') || url.pathname.split('/').pop()
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    },
  },
  vimeo: {
    label: 'Vimeo',
    hosts: ['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'],
    toEmbedUrl: (url: URL) => {
      const id = url.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : null
    },
  },
  spotify: {
    label: 'Spotify',
    hosts: ['open.spotify.com'],
    toEmbedUrl: (url: URL) => {
      return `https://open.spotify.com/embed${url.pathname}`
    },
  },
} as const

export type EmbedProvider = keyof typeof EMBED_PROVIDERS

export const embedProviderOptions = Object.entries(EMBED_PROVIDERS).map(([value, { label }]) => ({
  label,
  value,
}))

export const resolveEmbedUrl = (provider: string, rawUrl: string): string | null => {
  const config = EMBED_PROVIDERS[provider as EmbedProvider]
  if (!config) return null

  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return null
  }

  if (!config.hosts.includes(url.hostname)) return null

  return config.toEmbedUrl(url)
}
