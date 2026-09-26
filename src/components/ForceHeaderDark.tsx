'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

// Shared by any page whose hero is a full-bleed image sitting directly behind the header (post
// pages via PostHero) — forces the header into its dark/light-on-image variant for the duration.
export const ForceHeaderDark: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])
  return <React.Fragment />
}
