import type { ReactNode } from 'react'

import { cormorant } from './fonts'

/**
 * Admin provider (admin.components.providers). Loads the site's wordmark font (Cormorant Garamond) once and
 * exposes it as --font-admin-display so custom.scss can use it on the wordmark and headings,
 * including inside modals, which render outside the provider tree.
 */
export default function BrandFonts({ children }: { children?: ReactNode }) {
  return (
    <>
      <style href="jgb-admin-fonts" precedence="default">
        {`:root{--font-admin-display:${cormorant.style.fontFamily};}`}
      </style>
      {children}
    </>
  )
}
