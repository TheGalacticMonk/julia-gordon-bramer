import React from 'react'

const SWIRLS = [
  { top: '2%', left: '4%', size: 86, delay: '-1s', duration: '11s', color: 'var(--name-pink)' },
  { top: '2%', left: '30%', size: 72, delay: '-4s', duration: '13s', color: 'var(--name-indigo)' },
  { top: '2%', left: '56%', size: 98, delay: '-7s', duration: '12s', color: 'var(--metal)' },
  { top: '2%', left: '82%', size: 78, delay: '-10s', duration: '14s', color: 'var(--accent)' },
  { top: '28%', left: '4%', size: 72, delay: '-5s', duration: '13s', color: 'var(--sparkle)' },
  { top: '28%', left: '30%', size: 104, delay: '-8s', duration: '11s', color: 'var(--name-pink)' },
  { top: '28%', left: '56%', size: 78, delay: '-11s', duration: '14s', color: 'var(--name-indigo)' },
  { top: '28%', left: '82%', size: 94, delay: '-2s', duration: '12s', color: 'var(--metal)' },
  { top: '54%', left: '4%', size: 96, delay: '-9s', duration: '12s', color: 'var(--accent)' },
  { top: '54%', left: '30%', size: 76, delay: '-12s', duration: '14s', color: 'var(--sparkle)' },
  { top: '54%', left: '56%', size: 102, delay: '-3s', duration: '11s', color: 'var(--name-pink)' },
  { top: '54%', left: '82%', size: 72, delay: '-6s', duration: '13s', color: 'var(--name-indigo)' },
  { top: '80%', left: '4%', size: 78, delay: '-13s', duration: '14s', color: 'var(--metal)' },
  { top: '80%', left: '30%', size: 98, delay: '-2s', duration: '12s', color: 'var(--accent)' },
  { top: '80%', left: '56%', size: 74, delay: '-10s', duration: '13s', color: 'var(--sparkle)' },
  { top: '80%', left: '82%', size: 104, delay: '-5s', duration: '11s', color: 'var(--name-pink)' },
] as const

const SWIRL_PATH =
  'M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.3 75.7 18 58 18C44.3 18 33 29.3 33 43C33 53.5 41.5 62 52 62C59.7 62 66 55.7 66 48'

export const SwirlPattern: React.FC = () => (
  <div className="swirl-pattern" aria-hidden="true">
    {SWIRLS.map((swirl, index) => (
      <span
        className="swirl-pattern-item"
        key={index}
        style={
          {
            top: swirl.top,
            left: swirl.left,
            width: swirl.size,
            height: swirl.size,
            animationDelay: swirl.delay,
            animationDuration: swirl.duration,
            color: swirl.color,
          } as React.CSSProperties
        }
      >
        <svg viewBox="0 0 100 100" fill="none">
          <path d={SWIRL_PATH} />
        </svg>
      </span>
    ))}
  </div>
)
