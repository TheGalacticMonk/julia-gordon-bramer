import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
}

// Text wordmark, not an image — no real logo file exists yet (see agency/open-questions.md,
// "Brand"). Swap this for a <Media> render once Julia supplies one; the surrounding <Link href="/">
// in Header/Footer won't need to change.
//
// No default text color here on purpose: Header sits on a background that can flip
// independently of the page (see HeaderTheme), and Footer's background is the inverse of the
// page's ink/paper pairing — each caller passes the color that's actually correct for its own
// background via `className`. Tailwind utility classes don't reliably override by JSX source
// order (same specificity, resolved by declaration order in the compiled stylesheet instead),
// so baking in a default here and trying to override it from a caller would be fragile.
export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span className={clsx('font-display text-xl leading-none', className)}>
      Julia Gordon-Bramer
    </span>
  )
}
