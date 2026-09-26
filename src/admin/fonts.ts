import { Cormorant_Garamond } from 'next/font/google'

/**
 * The same face as the site's header wordmark, self-hosted by next/font (no request to Google at
 * runtime). Used only for the wordmark and large headings in the admin; body text stays in the
 * system sans-serif for easy reading of forms.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})
