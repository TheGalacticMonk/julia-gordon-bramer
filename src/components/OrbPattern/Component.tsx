import React from 'react'

const ORBS = [
  { top: '13%', left: '7%', size: 92, delay: '-0.3s', duration: '2.4s', a: 'var(--orb-bright)', b: 'var(--orb-deep)' },
  { top: '16%', left: '34%', size: 72, delay: '-1.1s', duration: '2.9s', a: 'var(--orb-deep)', b: 'var(--orb-bright)' },
  { top: '12%', left: '66%', size: 108, delay: '-1.8s', duration: '2.1s', a: 'var(--orb-bright)', b: 'var(--orb-deep)' },
  { top: '18%', left: '88%', size: 78, delay: '-0.8s', duration: '3.2s', a: 'var(--orb-deep)', b: 'var(--orb-bright)' },
  { top: '42%', left: '16%', size: 84, delay: '-2s', duration: '2.7s', a: 'var(--orb-bright)', b: 'var(--orb-deep)' },
  { top: '47%', left: '48%', size: 116, delay: '-1.4s', duration: '2.2s', a: 'var(--orb-deep)', b: 'var(--orb-bright)' },
  { top: '40%', left: '79%', size: 70, delay: '-0.6s', duration: '3s', a: 'var(--orb-bright)', b: 'var(--orb-deep)' },
  { top: '75%', left: '6%', size: 74, delay: '-1.7s', duration: '2.8s', a: 'var(--orb-deep)', b: 'var(--orb-bright)' },
  { top: '81%', left: '35%', size: 104, delay: '-0.9s', duration: '2.3s', a: 'var(--orb-bright)', b: 'var(--orb-deep)' },
  { top: '74%', left: '67%', size: 82, delay: '-2.4s', duration: '3.1s', a: 'var(--orb-deep)', b: 'var(--orb-bright)' },
  { top: '85%', left: '89%', size: 94, delay: '-1.2s', duration: '2.6s', a: 'var(--orb-bright)', b: 'var(--orb-deep)' },
] as const

export const OrbPattern: React.FC = () => (
  <div className="orb-pattern" aria-hidden="true">
    {ORBS.map((orb, index) => (
      <span
        className="orb-pattern-item"
        key={index}
        style={
          {
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            animationDelay: orb.delay,
            animationDuration: orb.duration,
            '--orb-a': orb.a,
            '--orb-b': orb.b,
          } as React.CSSProperties
        }
      >
        <span className="orb-pattern-core" />
      </span>
    ))}
  </div>
)
