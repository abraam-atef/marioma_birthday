import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Sparkles, Wand2 } from 'lucide-react'
import BirthdayCake from './BirthdayCake'
import { useTranslation } from '../i18n/useTranslation'

interface Piece {
  id: number
  x: number
  y: number
  rotate: number
  size: number
  color: string
  round: boolean
}

const COLORS = ['#fb7185', '#f472b6', '#fbbf24', '#ffffff', '#f43f5e', '#c084fc']

function makeBurst(): Piece[] {
  return Array.from({ length: 36 }, (_, id) => {
    const angle = (Math.PI * 2 * id) / 36 + Math.random() * 0.4
    const dist = 90 + Math.random() * 150
    return {
      id,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 40,
      rotate: Math.random() * 720 - 360,
      size: 6 + Math.random() * 8,
      color: COLORS[id % COLORS.length],
      round: id % 3 === 0,
    }
  })
}

export default function Hero() {
  const { t: c, fill } = useTranslation()
  const [lit, setLit] = useState(true)
  const [burst, setBurst] = useState<Piece[]>([])
  const [burstKey, setBurstKey] = useState(0)

  const toggleWish = () => {
    if (lit) {
      setLit(false)
      setBurst(makeBurst())
      setBurstKey((k) => k + 1)
    } else {
      setLit(true)
      setBurst([])
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-20 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 bg-clip-text font-script text-5xl leading-[1.25] text-transparent min-[400px]:text-6xl sm:text-8xl dark:from-pink-300 dark:via-rose-300 dark:to-pink-400"
      >
        {fill(c.greeting)}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-3 max-w-md text-xl text-rose-900/80 sm:text-2xl dark:text-rose-100/80"
      >
        {c.subtitle}
      </motion.p>

      {/* Cake */}
      <div className="relative mt-8 w-full max-w-[300px] min-[400px]:max-w-[320px] sm:max-w-[360px] lg:max-w-[420px]">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute inset-x-6 top-10 -z-10 h-40 rounded-full bg-rose-300/50 blur-3xl dark:bg-pink-500/30"
          />
          <BirthdayCake lit={lit} />

          {/* sparkles around the cake */}
          {[
            { l: '2%', t: '30%', d: 0 },
            { l: '90%', t: '22%', d: 0.8 },
            { l: '78%', t: '70%', d: 1.5 },
            { l: '10%', t: '75%', d: 2.1 },
          ].map((s, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute text-amber-400 dark:text-pink-200"
              style={{ left: s.l, top: s.t }}
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 0.6], rotate: [0, 45, 0] }}
              transition={{ duration: 3, delay: s.d, repeat: Infinity }}
            >
              <Sparkles size={22} />
            </motion.span>
          ))}
        </motion.div>

        {/* confetti burst */}
        <div key={burstKey} aria-hidden className="pointer-events-none absolute left-1/2 top-[22%]">
          {burst.map((p) => (
            <motion.span
              key={p.id}
              className="absolute block"
              style={{
                width: p.size,
                height: p.round ? p.size : p.size * 0.55,
                background: p.color,
                borderRadius: p.round ? '50%' : 2,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{ x: p.x, y: p.y + 120, opacity: [1, 1, 0], scale: 1, rotate: p.rotate }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex min-h-[7.5rem] flex-col items-center">
        <motion.button
          type="button"
          onClick={toggleWish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-3.5 text-xl font-semibold text-white shadow-lg shadow-rose-400/40 dark:shadow-pink-600/40"
        >
          <Wand2 aria-hidden size={20} />
          {lit ? c.wishButton : c.wishAgainButton}
        </motion.button>

        <div aria-live="polite" className="mt-4 max-w-sm">
          <AnimatePresence>
            {!lit && (
              <motion.p
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="font-hand text-2xl leading-snug text-rose-700 dark:text-pink-200"
              >
                {c.wishMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-5 text-rose-400 dark:text-pink-300"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}
