export type NavLink = { type: 'custom'; url: string; label: string }

// The site menu. It lives in code, not the CMS, so the menu can't drift away from the routes.
export const headerNavItems: Array<{ link: NavLink }> = [
  { link: { type: 'custom', url: '/', label: 'HOME' } },
  { link: { type: 'custom', url: '/tarot', label: 'TAROT' } },
  { link: { type: 'custom', url: '/books', label: 'BOOKS' } },
  { link: { type: 'custom', url: '/decoding-sylvia-plath', label: 'DECODING SYLVIA PLATH' } },
  { link: { type: 'custom', url: '/contact', label: 'CONTACT' } },
]

export const resolveHref = (link: NavLink): string => link.url
