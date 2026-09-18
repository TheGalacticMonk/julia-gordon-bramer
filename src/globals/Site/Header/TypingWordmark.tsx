import React from 'react'

import { cn } from '@/utilities/ui'

import styles from './typing.module.css'

const TEXT = 'Julia Gordon-Bramer'

interface Props {
  className?: string
}

// Header-only typewriter wordmark. Ported from a reference "terminal card" component's exact
// CSS typing effect (content: attr() + a steps()-based width reveal, plus a blinking-caret
// pseudo-element) — see typing.module.css for the full mechanism and its one known tradeoff on
// this proportional (non-monospace) font. No JS: the previous version drove the reveal from a
// setTimeout chain in this file; this one is pure CSS, so the component is just markup + data.
export const TypingWordmark: React.FC<Props> = ({ className }) => (
  <span className={cn(styles.wrapper, className)} aria-label={TEXT}>
    <span className={styles.cmd} data-cmd={TEXT} aria-hidden="true" />
  </span>
)
