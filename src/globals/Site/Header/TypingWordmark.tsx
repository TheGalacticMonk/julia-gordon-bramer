import React from 'react'

import { cn } from '@/utilities/ui'

import styles from './typing.module.css'

const FOCUS = 'Julia'
const ACCENT = 'Gordon-Bramer'
const TEXT = `${FOCUS} ${ACCENT}`

interface Props {
  className?: string
}

// Static header wordmark with separate spans for the given-name/surname typography.
export const TypingWordmark: React.FC<Props> = ({ className }) => (
  <span className={cn(styles.wrapper, className)} aria-label={TEXT}>
    <span className={styles.cmd} aria-hidden="true">
      <span className={styles.cmdReveal}>
        <span className={styles.cmdFocus}>{FOCUS}</span> <span className={styles.cmdAccent}>{ACCENT}</span>
      </span>
    </span>
  </span>
)
