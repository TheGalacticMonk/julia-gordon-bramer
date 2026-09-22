import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { socialIcons, socialLabels } from '@/utilities/socialMeta'

export async function Footer() {
  const siteData = await getCachedGlobal('site', 1)()

  const navItems = siteData?.footerNavItems || []
  const socials = siteData?.socials || []

  return (
    <footer className="section-raised mt-auto text-ink">
      <hr className="ink-rule" />
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo className="font-bold text-metal" />
        </Link>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          <nav className="flex flex-col gap-4 md:flex-row">
            {navItems.map(({ link }, i) => (
              <CMSLink
                className="nav-link-glow text-ink hover:text-metal"
                key={i}
                {...link}
              />
            ))}
          </nav>
          {socials.length > 0 && (
            <nav className="flex items-center gap-4">
              {socials.map((social, i) => {
                const Icon = socialIcons[social.platform]
                const label = socialLabels[social.platform] || social.platform

                return (
                  <a
                    key={i}
                    className="text-ink transition-colors hover:text-metal"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    {Icon ? <Icon className="size-5" aria-hidden="true" /> : label}
                  </a>
                )
              })}
            </nav>
          )}
        </div>
      </div>
      <div className="container flex flex-col gap-2 pb-8 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Julia Gordon-Bramer. All rights reserved.</p>
        {siteData?.contactEmail && (
          <a
            href={`mailto:${siteData.contactEmail}`}
            className="nav-link-glow text-ink hover:text-metal"
          >
            {siteData.contactEmail}
          </a>
        )}
      </div>
    </footer>
  )
}
