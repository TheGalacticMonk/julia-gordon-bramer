import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  // Trimmed (and trailing slash dropped): a stray space/newline pasted into the env var ends up
  // in every URL built by concatenation (image src, og:image, ...) and breaks them.
  const configured = process.env.NEXT_PUBLIC_SERVER_URL?.trim().replace(/\/+$/, '')

  return configured || 'http://localhost:3000'
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
