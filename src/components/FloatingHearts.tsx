import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface Props {
  count?: number
  sparkles?: number
  /** How far hearts rise: a CSS length (e.g. "-115vh") or a number of px */
  rise?: number | string
  className?: string
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Soft hearts drifting upward + twinkling sparkles. Never captures pointer events. */
export default function FloatingHearts({
  count = 16,
  sparkles = 14,
  rise = '-115vh',
  className = 'fixed inset-0',
}: Props) {
  const reduce = useReducedMotion()

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: rand(2, 96),
        top: rand(5, 90),
        size: rand(10, 30),
        opacity: rand(0.18, 0.5),
        duration: rand(16, 30),
        delay: rand(0, 14),
        sway: rand(10, 28),
      })),
    [count],
  )
  const stars = useMemo(
    () =>
      Array.from({ length: sparkles }, (_, i) => ({
        id: i,
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(3, 6),
        duration: rand(2.5, 5),
        delay: rand(0, 5),
      })),
    [sparkles],
  )

  const heartClass = 'text-rose-400 dark:text-pink-400 dark:drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]'

  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-amber-200 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)] dark:bg-pink-200 dark:shadow-[0_0_8px_2px_rgba(244,114,182,0.7)]"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          initial={{ opacity: reduce ? 0.35 : 0 }}
          animate={reduce ? undefined : { opacity: [0, 0.9, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {hearts.map((h) =>
        reduce ? (
          <Heart
            key={h.id}
            className={`absolute ${heartClass}`}
            fill="currentColor"
            strokeWidth={0}
            size={h.size}
            style={{ left: `${h.left}%`, top: `${h.top}%`, opacity: h.opacity * 0.6 }}
          />
        ) : (
          <motion.div
            key={h.id}
            className="absolute"
            style={{ left: `${h.left}%`, bottom: -40 }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, rise as number], x: [0, h.sway], opacity: [0, h.opacity, h.opacity, 0] }}
            transition={{
              y: { duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' },
              x: { duration: h.duration / 3, delay: h.delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
              opacity: { duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear', times: [0, 0.1, 0.85, 1] },
            }}
          >
            <Heart className={heartClass} fill="currentColor" strokeWidth={0} size={h.size} />
          </motion.div>
        ),
      )}
    </div>
  )
}
