'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'
import { useTheme } from '..'
import styles from './toggle.module.css'
import { themeLocalStorageKey } from './types'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { setTheme } = useTheme()
  // Defaults to light (checked) so first paint matches the site's light default; the real
  // stored preference (if any) is only known client-side, so it's read in an effect below.
  const [checked, setChecked] = useState(true)

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    // Read the browser-only preference after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecked(preference !== 'dark')
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    setTheme(e.target.checked ? 'light' : 'dark')
  }

  return (
    <label className={cn(styles.switch, className)}>
      <input
        aria-label="Toggle light or dark theme"
        checked={checked}
        onChange={onChange}
        type="checkbox"
      />
      <span className={styles.slider}>
        <div className={cn(styles.star, styles.star_1)} />
        <div className={cn(styles.star, styles.star_2)} />
        <div className={cn(styles.star, styles.star_3)} />
        <svg viewBox="0 0 16 16" className={cn(styles.cloud_1, styles.cloud)}>
          <path
            transform="matrix(.77976 0 0 .78395-299.99-418.63)"
            fill="#fff"
            d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
          />
        </svg>
      </span>
    </label>
  )
}
