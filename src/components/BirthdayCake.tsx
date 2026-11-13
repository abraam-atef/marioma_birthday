import { motion, type Variants } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'

const CANDLES = [115, 150, 185]

const flame: Variants = {
  lit: {
    opacity: 1,
    scale: [1, 1.1, 0.94, 1.07, 1],
    transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
  },
  out: (i: number) => ({
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5, delay: i * 0.18 },
  }),
}

/** Pure-SVG cake. `lit` toggles the candle flames. */
export default function BirthdayCake({ lit }: { lit: boolean }) {
  const { t } = useTranslation()
  return (
    <svg viewBox="0 0 300 260" role="img" aria-label={t.cakeLabel} className="w-full drop-shadow-xl">
      <defs>
        <linearGradient id="tierB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fda4af" />
          <stop offset="1" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="tierT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbcfe8" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#fde68a" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
        <path id="mini-heart" d="M0 -3 C -8 -12 -16 0 0 10 C 16 0 8 -12 0 -3Z" />
      </defs>

      {/* plate */}
      <ellipse cx="150" cy="240" rx="128" ry="12" fill="#000" opacity="0.12" />
      <ellipse cx="150" cy="230" rx="122" ry="15" fill="#fff1f2" />
      <ellipse cx="150" cy="228" rx="104" ry="10" fill="#ffe4e6" />

      {/* bottom tier */}
      <rect x="40" y="150" width="220" height="80" rx="14" fill="url(#tierB)" />
      <path
        d="M40 156 Q54 184 68 156 T95.5 156 T123 156 T150.5 156 T178 156 T205.5 156 T233 156 T260 156 V146 H40 Z"
        fill="#fff1f2"
      />
      {[70, 110, 150, 190, 230].map((x, i) => (
        <use key={x} href="#mini-heart" transform={`translate(${x} ${200 + (i % 2) * 8}) scale(0.7)`} fill="#fff1f2" opacity="0.9" />
      ))}

      {/* top tier */}
      <rect x="75" y="100" width="150" height="56" rx="12" fill="url(#tierT)" />
      <path
        d="M75 106 Q87.5 132 100 106 T125 106 T150 106 T175 106 T200 106 T225 106 V96 H75 Z"
        fill="#fff1f2"
      />
      <use href="#mini-heart" transform="translate(150 140) scale(0.8)" fill="#fff1f2" />
      <circle cx="105" cy="98" r="5" fill="#e11d48" />
      <circle cx="195" cy="98" r="5" fill="#e11d48" />

      {/* candles */}
      {CANDLES.map((x, i) => (
        <g key={x}>
          <rect x={x - 4.5} y="68" width="9" height="34" rx="2.5" fill="#fff7ed" />
          <path d={`M${x - 4.5} 78 L${x + 4.5} 74 M${x - 4.5} 88 L${x + 4.5} 84 M${x - 4.5} 98 L${x + 4.5} 94`} stroke="#fb7185" strokeWidth="2.5" />
          <line x1={x} y1="68" x2={x} y2="62" stroke="#57534e" strokeWidth="1.5" strokeLinecap="round" />
          <g transform={`translate(${x} 56)`}>
            <motion.g
              custom={i}
              variants={flame}
              initial="lit"
              animate={lit ? 'lit' : 'out'}
              style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            >
              <circle r="20" fill="url(#glow)" />
              <path d="M0 -17 C 7 -8 8 -2 0 5 C -8 -2 -7 -8 0 -17Z" fill="#fbbf24" />
              <path d="M0 -8 C 3 -4 3.5 -1 0 3 C -3.5 -1 -3 -4 0 -8Z" fill="#fff7ed" />
            </motion.g>
          </g>
        </g>
      ))}
    </svg>
  )
}
