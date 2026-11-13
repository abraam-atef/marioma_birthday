import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import FloatingHearts from './FloatingHearts'
import { useTranslation } from '../i18n/useTranslation'

export default function Ending() {
  const { t: c } = useTranslation()
  return (
    <section
      id="ending"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <FloatingHearts count={16} sparkles={10} rise={-700} className="absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative"
      >
        <div aria-hidden className="absolute inset-0 -z-10 scale-[2.2] rounded-full bg-rose-400/40 blur-3xl dark:bg-pink-600/40" />
        <motion.div
          animate={{ scale: [1, 1.14, 1, 1.1, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="heart-glow text-rose-500 dark:text-pink-400"
        >
          <Heart aria-hidden size={110} fill="currentColor" strokeWidth={0} />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.4, delay: 0.3 }}
        className="relative mt-10 max-w-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-5xl font-bold leading-tight tracking-wide text-transparent sm:text-7xl dark:from-pink-300 dark:via-rose-300 dark:to-pink-400"
      >
        {c.finalMessage}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 }}
        className="relative mt-6 font-script text-5xl leading-snug text-rose-600 sm:text-6xl dark:text-pink-200"
      >
        {c.finalSubMessage}
      </motion.p>
    </section>
  )
}
