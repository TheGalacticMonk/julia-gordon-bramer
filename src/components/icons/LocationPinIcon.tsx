import React from 'react'

// From galacticmonk.com/about's location indicator (see AboutCard, "Copy the location pin icon
// animation" — the pin itself, paired there with a separate absolutely-positioned pulse ring).
export const LocationPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 21s7-7.5 7-12A7 7 0 0 0 5 9c0 4.5 7 12 7 12Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)
