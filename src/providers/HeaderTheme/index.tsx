'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, use, useState } from 'react'

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Deliberately NOT seeded from `document.documentElement`'s data-theme attribute: that
  // attribute reflects the site's ambient light/dark color-scheme preference (set by
  // InitTheme, before hydration, from the user's OS setting) — a completely different concept
  // from this context's actual purpose, which is "does a hero image sit directly behind the
  // header, so it needs forced-contrast text?" Seeding from the DOM meant the header briefly
  // rendered correctly (theme null, no overlay) on first paint, then flipped into overlay
  // styling the instant React hydrated and read back the user's ambient dark-mode preference —
  // on every page, including ones with no hero image at all. Only explicit setHeaderTheme(...)
  // calls from hero components (HighImpact, PostHero) should ever populate this.
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(undefined)

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
