import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeToggle/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    function themeIsValid(theme) {
      return theme === 'light' || theme === 'dark'
    }

    var preference = window.localStorage.getItem('${themeLocalStorageKey}')
    var themeToSet = themeIsValid(preference) ? preference : '${defaultTheme}'

    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
