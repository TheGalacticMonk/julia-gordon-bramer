import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // The old juliagordonbramer.com pages, so links to them keep working.
  const legacyPages = [
    { source: '/tarot.html', destination: '/tarot' },
    { source: '/books.html', destination: '/books' },
    { source: '/decoding-sylvia-plath.html', destination: '/decoding-sylvia-plath' },
  ].map((redirect) => ({ ...redirect, permanent: true }))

  return [internetExplorerRedirect, ...legacyPages]
}
