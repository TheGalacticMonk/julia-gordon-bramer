'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Site } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { PencilIcon } from '@/components/icons/PencilIcon'
import { ThemeToggle } from '@/providers/Theme/ThemeToggle'
import { getCollectionPath } from '@/utilities/collectionPath'
import { cn } from '@/utilities/ui'
import { MobileNavMenu } from './MobileNavMenu'
import { TypingWordmark } from './TypingWordmark'

type NavLink = NonNullable<Site['navItems']>[number]['link']

// Same resolution CMSLink does internally, exposed here so the active-page check below can
// compare against the URL a given nav item actually points to.
const resolveHref = (link: NavLink): string | null => {
  if (link.type === 'reference' && typeof link.reference?.value === 'object' && link.reference.value?.slug) {
    return getCollectionPath(link.reference.relationTo, link.reference.value.slug)
  }
  return link.url || null
}

interface HeaderClientProps {
  data: Site
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const navItems = data?.navItems || []

  // 'dark' is the specific value hero components (HighImpact, PostHero) pass when a hero image
  // sits directly behind the header and needs forced light-on-image contrast; 'light' is what
  // plain pages reset to (effectively "no overlay, use the real header design"). Checking
  // specifically for 'dark' — not just any truthy value — matters: null/undefined AND 'light'
  // both mean "no overlay" here.
  const isOverlay = theme === 'dark'

  return (
    <header
      className={cn(
        'sticky top-0 z-20',
        isOverlay
          ? 'bg-transparent'
          // Squarespace-style glass divider: no hard 1-2px border line. Tried fading a
          // translucent cream layer's own opacity out over an extended tail below the header —
          // that reliably produced a visible muddy gray band wherever the fade passed through
          // ~40-60% alpha, because backdrop-blur SAMPLES what's behind it (dark navy in dark
          // mode), and alpha-blending a light color partway into a dark one always passes
          // through a gray midpoint, no matter how the fade is tuned. A soft, LARGE, low-opacity
          // shadow avoids that: shadows are dark, so they blend smoothly on both light and dark
          // pages without ever mixing hues, giving the soft "roll-off" without an artifact.
          //
          // bg-cream is the base (applies on light theme, i.e. absent the `dark:` variant) —
          // same echo the hero card uses: the light PAGE gets a cream header. dark:bg-navy
          // then flips it for dark theme, where the near-black page gets a navy header.
          : 'bg-cream/92 dark:bg-navy/92 backdrop-blur-md shadow-[0_16px_28px_-12px_rgba(0,0,0,0.35),0_4px_10px_-4px_rgba(0,0,0,0.18)]',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container relative z-10 flex items-center justify-between gap-6 py-5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <TypingWordmark
            className={cn(isOverlay ? 'text-ink' : 'text-metal-ink dark:text-cream')}
          />
        </Link>
        <nav className="flex items-center gap-4 xl:gap-6">
          {/* Desktop nav links — hidden below xl, replaced there by MobileNavMenu's dropdown.
              The nav content (wordmark + 5 links incl. "Decoding Sylvia Plath" + toggle + CTA)
              needs ~1000px of unbroken room. `.container` (globals.css) is capped at a FLAT
              1024px from lg all the way to xl — it doesn't grow again until xl (1280px), where
              it steps up to 1152px. Switching the nav at lg left it stuck jumbling for that
              entire 1024-1279px range, since the container's inner width never got wide enough
              in between; xl is where the container actually has room, so that's where the nav
              switches too. */}
          <div className="hidden items-center gap-6 xl:flex">
            {navItems.map(({ link }, i) => {
              const href = resolveHref(link)
              const isActive = href ? (href === '/' ? pathname === '/' : pathname.startsWith(href)) : false

              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className={cn(
                    'nav-link-glow flex items-center gap-1.5 font-sans text-sm font-medium uppercase tracking-wide',
                    // CMSLink doesn't forward arbitrary props like aria-current to the rendered
                    // <Link>, so the active state has to be driven by this className directly
                    // rather than a CSS attribute-selector variant. Same bg echo as the header
                    // bar itself: light theme (cream bar) gets dark/wine text, dark theme (navy
                    // bar) gets light/gold text.
                    isOverlay
                      ? isActive
                        ? 'text-metal'
                        : 'text-ink hover:text-metal'
                      : isActive
                        ? 'text-wine dark:text-metal'
                        : 'text-metal-ink hover:text-wine dark:text-cream dark:hover:text-metal',
                  )}
                >
                  {isActive && <PencilIcon className="size-5 shrink-0" aria-hidden="true" />}
                </CMSLink>
              )
            })}
          </div>
          <ThemeToggle className="shrink-0" />
          {data?.bookingUrl && (
            // Neobrutalist button: hard (non-blurred) offset shadow. In light mode it rides
            // currentColor (text-metal-ink, matching the border) since dark-on-cream is plenty
            // visible; in dark mode metal-ink is near-black and nearly disappears against the
            // navy header, so the shadow gets an explicit blush pink instead — still a palette
            // color, just one with enough contrast against navy to actually read as a shadow.
            // Hover nudges it up-left and grows the shadow; active nudges it down-right and
            // shrinks the shadow, simulating a press.
            // hidden xl:inline-flex: below xl this same CTA lives inside MobileNavMenu's
            // dropdown instead (passed via bookingUrl below), so it isn't shown twice.
            <CMSLink
              appearance="inline"
              // font-sans text-sm font-medium — the site's own UI type voice (same as the nav
              // links and every other button on the site), replacing the reference snippet's
              // 18px/900 weight, which was technically still Inter but heavy/large enough to
              // read as a completely different, off-brand font next to the rest of the header.
              className="hidden shrink-0 cursor-pointer rounded-[0.4em] border-[3px] border-metal-ink bg-metal px-[1.3em] py-[0.6em] font-sans text-sm font-medium whitespace-nowrap text-metal-ink shadow-[0.1em_0.1em] hover:-translate-x-[0.05em] hover:-translate-y-[0.05em] hover:shadow-[0.15em_0.15em] active:translate-x-[0.05em] active:translate-y-[0.05em] active:shadow-[0.05em_0.05em] dark:shadow-[0.1em_0.1em_var(--blush)] dark:hover:shadow-[0.15em_0.15em_var(--blush)] dark:active:shadow-[0.05em_0.05em_var(--blush)] xl:inline-flex"
              url={data.bookingUrl}
              label="Book a reading"
            />
          )}
          {/* Wrapping div carries the visibility utility, not MobileNavMenu's own className:
              its .main CSS-module class sets `display: flex` with no media query, at the same
              specificity as Tailwind's `xl:hidden` — whichever one lands later in the compiled
              stylesheet wins, which isn't guaranteed to be Tailwind's. A wrapper with no
              competing display rule sidesteps the ordering fight entirely. */}
          <div className="xl:hidden">
            <MobileNavMenu
              bookingUrl={data?.bookingUrl}
              isOverlay={isOverlay}
              navItems={navItems}
              resolveHref={resolveHref}
            />
          </div>
        </nav>
      </div>
    </header>
  )
}
