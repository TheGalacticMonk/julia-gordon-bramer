import React from 'react'

const SPARKLES = [
  { top: '3%', left: '5%', size: 10, delay: '-0.4s', duration: '2.8s' },
  { top: '6%', left: '25%', size: 7, delay: '-2.2s', duration: '3.2s' },
  { top: '9%', left: '47%', size: 8, delay: '-1.7s', duration: '2.4s' },
  { top: '5%', left: '72%', size: 12, delay: '-2.6s', duration: '3.5s' },
  { top: '13%', left: '90%', size: 14, delay: '-0.9s', duration: '3.1s' },
  { top: '18%', left: '11%', size: 8, delay: '-1.4s', duration: '2.6s' },
  { top: '21%', left: '35%', size: 13, delay: '-2.8s', duration: '3.6s' },
  { top: '19%', left: '61%', size: 7, delay: '-0.3s', duration: '2.5s' },
  { top: '25%', left: '82%', size: 10, delay: '-1.9s', duration: '3s' },
  { top: '31%', left: '3%', size: 12, delay: '-2.3s', duration: '3.4s' },
  { top: '34%', left: '22%', size: 7, delay: '-0.6s', duration: '2.7s' },
  { top: '30%', left: '49%', size: 11, delay: '-1.5s', duration: '3.2s' },
  { top: '35%', left: '73%', size: 8, delay: '-2.7s', duration: '2.9s' },
  { top: '39%', left: '96%', size: 9, delay: '-0.2s', duration: '2.5s' },
  { top: '45%', left: '8%', size: 14, delay: '-1.9s', duration: '3s' },
  { top: '47%', left: '31%', size: 8, delay: '-2.5s', duration: '3.5s' },
  { top: '43%', left: '58%', size: 12, delay: '-0.8s', duration: '2.8s' },
  { top: '50%', left: '84%', size: 7, delay: '-1.3s', duration: '2.6s' },
  { top: '57%', left: '2%', size: 8, delay: '-2.1s', duration: '3.1s' },
  { top: '55%', left: '20%', size: 11, delay: '-0.7s', duration: '2.6s' },
  { top: '61%', left: '43%', size: 7, delay: '-1.8s', duration: '2.9s' },
  { top: '58%', left: '67%', size: 13, delay: '-2.4s', duration: '3.4s' },
  { top: '64%', left: '92%', size: 9, delay: '-0.5s', duration: '2.7s' },
  { top: '70%', left: '12%', size: 10, delay: '-1.1s', duration: '2.9s' },
  { top: '73%', left: '34%', size: 7, delay: '-2.5s', duration: '3.3s' },
  { top: '69%', left: '58%', size: 14, delay: '-0.2s', duration: '3.2s' },
  { top: '76%', left: '79%', size: 8, delay: '-1.6s', duration: '2.6s' },
  { top: '82%', left: '4%', size: 13, delay: '-2.9s', duration: '3.5s' },
  { top: '85%', left: '24%', size: 8, delay: '-0.9s', duration: '2.8s' },
  { top: '81%', left: '49%', size: 11, delay: '-2.2s', duration: '3.1s' },
  { top: '87%', left: '70%', size: 7, delay: '-1.2s', duration: '2.5s' },
  { top: '84%', left: '94%', size: 12, delay: '-2.6s', duration: '3.3s' },
  { top: '94%', left: '14%', size: 9, delay: '-0.5s', duration: '3.1s' },
  { top: '96%', left: '39%', size: 13, delay: '-1.8s', duration: '3.4s' },
  { top: '93%', left: '65%', size: 8, delay: '-2.3s', duration: '2.7s' },
  { top: '97%', left: '88%', size: 11, delay: '-1s', duration: '3s' },
] as const

const STAR_PATH =
  'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z'

export const MagicSparkles: React.FC = () => (
  <div className="magic-sparkles" aria-hidden="true">
    {SPARKLES.map((sparkle, index) => (
      <span
        className="magic-sparkle"
        key={index}
        style={{
          top: sparkle.top,
          left: sparkle.left,
          width: sparkle.size,
          height: sparkle.size,
          animationDelay: sparkle.delay,
          animationDuration: sparkle.duration,
        }}
      >
        <svg className="magic-sparkle-star" fill="none" viewBox="0 0 68 68">
          <path d={STAR_PATH} fill="currentColor" />
        </svg>
      </span>
    ))}
  </div>
)
