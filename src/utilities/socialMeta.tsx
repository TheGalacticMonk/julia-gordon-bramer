import React from 'react'

import { Facebook, Youtube } from 'lucide-react'

import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { TikTokIcon } from '@/components/icons/TikTokIcon'
import { XIcon } from '@/components/icons/XIcon'

// Shared between the footer's social row and the sticky social sidebar so both stay in sync —
// Instagram/X use the client-supplied brand marks (see components/icons), not lucide's generic
// outline set, which doesn't have accurate Instagram/X glyphs.
export const socialLabels: Record<string, string> = {
  instagram: 'Instagram',
  x: 'X / Twitter',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

export const socialIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  instagram: InstagramIcon,
  x: XIcon,
  facebook: Facebook,
  youtube: Youtube,
  tiktok: TikTokIcon,
}
