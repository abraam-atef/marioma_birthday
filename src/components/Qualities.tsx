import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Brain, Gem, Heart, ShieldCheck, Smile, Sparkles, type LucideIcon } from 'lucide-react'
import StackedCards from './StackedCards'
import { useTranslation } from '../i18n/useTranslation'
import type { Quality, QualityIcon } from '../i18n/translations'

const ICONS: Record<QualityIcon, LucideIcon> = {
  sparkles: Sparkles,
  heart: Heart,
  brain: Brain,
  shield: ShieldCheck,
  smile: Smile,
  gem: Gem,
}

export default function Qualities() {
  const { t: c, formatNumber } = useTranslation()
  // Stable renderer so the carousel doesn't re-render cards needlessly
  const renderCard = useCallback((q: Quality, i: number) => {
    const Icon = ICONS[q.icon]
    return (
      <div className="flex h-full flex-col px-7 pb-7 pt-12 sm:px-9 sm:pt-14">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-md shadow-rose-900/30">
          <Icon aria-hidden size={28} />
        </span>
        <h3 className="font-script text-5xl leading-tight text-[var(--accent)]">{q.title}</h3>
        <p className="mt-2 text-xl leading-relaxed sm:text-[1.35rem]">{q.description}</p>
        <p className="mt-auto pt-4 font-hand text-xl text-[var(--accent)]">
          {c.qualitiesCardNote.replace('{n}', formatNumber(i + 1))}
        </p>
      </div>
    )
  }, [c.qualitiesCardNote, formatNumber])

  return (
    <section id="special" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-12 max-w-xl text-center"
      >
        <h2 className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text font-script text-5xl leading-[1.3] text-transparent sm:text-7xl dark:from-pink-300 dark:to-rose-300">
          {c.qualitiesTitle}
        </h2>
        <p className="mt-2 text-xl text-rose-900/75 dark:text-rose-100/75">{c.qualitiesIntro}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
      >
        <StackedCards
          items={c.qualities}
          renderCard={renderCard}
          nextLabel={c.qualitiesNextLabel}
          hint={c.qualitiesHint}
          announce={(q) => `${q.title}. ${q.description}`}
        />
      </motion.div>
    </section>
  )
}
