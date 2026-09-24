'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import type { Site } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ThemeToggle } from '@/providers/Theme/ThemeToggle'
import { getCollectionPath } from '@/utilities/collectionPath'
import { cn } from '@/utilities/ui'
import { MobileNavMenu } from './MobileNavMenu'
import { TypingWordmark } from './TypingWordmark'

type NavLink = NonNullable<Site['navItems']>[number]['link']

const headerNavItems: Array<{ link: NavLink }> = [
  { link: { type: 'custom', url: '/', label: 'HOME' } },
  { link: { type: 'custom', url: '/tarot', label: 'TAROT' } },
  { link: { type: 'custom', url: '/books', label: 'BOOKS' } },
  {
    link: {
      type: 'custom',
      url: '/scholarship',
      label: 'DECODING SYLVIA PLATH',
    },
  },
  { link: { type: 'custom', url: '/contact', label: 'CONTACT' } },
]

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
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const theme = headerTheme ?? null

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const navItems = headerNavItems
  // Only instagram/x — the sticky sidebar (SocialSidebar) covers sm and up; below that it hides
  // entirely and these live in the hamburger dropdown instead (see MobileNavMenu).
  const mobileSocials = (data?.socials || []).filter(
    (s): s is typeof s & { platform: 'instagram' | 'x' } =>
      s.platform === 'instagram' || s.platform === 'x',
  )

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
          // Light mode keeps the cream chrome; dark mode uses a near-black charcoal that stays
          // neutral against the indigo-blue page canvas.
          : 'bg-paper-raised/92 dark:bg-[#111318]/96 backdrop-blur-md shadow-[0_16px_28px_-12px_rgba(0,0,0,0.35),0_4px_10px_-4px_rgba(0,0,0,0.18)]',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container relative z-10 flex items-center justify-between gap-4 py-4 sm:gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-ink"
        >
          <TypingWordmark />
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5 xl:gap-6">
          {/* Desktop nav links — hidden below xl, replaced there by MobileNavMenu's dropdown.
              The nav content (wordmark + 5 links incl. "Decoding Sylvia Plath" + toggle)
              needs ~1000px of unbroken room. `.container` (globals.css) is capped at a FLAT
              1024px from lg all the way to xl — it doesn't grow again until xl (1280px), where
              it steps up to 1216px. Switching the nav at lg left it stuck jumbling for that
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
                    'nav-link-glow flex items-center gap-1.5 font-sans text-[1.0625rem] leading-none font-semibold uppercase tracking-[0.08em]',
                    // CMSLink doesn't forward arbitrary props like aria-current to the rendered
                    // <Link>, so the active state has to be driven by this className directly
                    // rather than a CSS attribute-selector variant. Base (non-active/hover) text
                    // still echoes the header bar itself: light theme (cream bar) gets dark ink
                    // text, dark theme (navy bar) gets light cream text — but hover and active
                    // now land on the same --metal orchid in both themes, so "current page" and
                    // "hovering" read identically regardless of theme. text-ink, not
                    // text-metal-ink: see the wordmark Link's className comment above for why.
                    isOverlay
                      ? isActive
                        ? 'text-metal'
                        : 'text-ink hover:text-metal'
                      : isActive
                        ? 'text-metal'
                        : 'text-ink hover:text-metal',
                  )}
                />
              )
            })}
          </div>
          <ThemeToggle className="shrink-0" />
          {/* Wrapping div carries the visibility utility, not MobileNavMenu's own className:
              its .main CSS-module class sets `display: flex` with no media query, at the same
              specificity as Tailwind's `xl:hidden` — whichever one lands later in the compiled
              stylesheet wins, which isn't guaranteed to be Tailwind's. A wrapper with no
              competing display rule sidesteps the ordering fight entirely. */}
          <div className="xl:hidden">
            <MobileNavMenu
              navItems={navItems}
              resolveHref={resolveHref}
              socials={mobileSocials}
            />
          </div>
        </nav>
      </div>
    </header>
  )
}
