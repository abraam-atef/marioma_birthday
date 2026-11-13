import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Envelope from './Envelope'
import LetterModal from './LetterModal'
import { useTranslation } from '../i18n/useTranslation'

export default function Letters() {
  const { t: c } = useTranslation()
  const reduce = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null) // envelope animation state
  const [readId, setReadId] = useState<string | null>(null) // letter modal state
  const timer = useRef<number>()
  const trigger = useRef<HTMLElement | null>(null)

  const open = (id: string, el: HTMLElement) => {
    trigger.current = el
    setOpenId(id)
    window.clearTimeout(timer.current)
    // let the flap open and the paper slide out before the letter appears
    timer.current = window.setTimeout(() => setReadId(id), reduce ? 0 : 1100)
  }

  const close = useCallback(() => {
    window.clearTimeout(timer.current)
    setReadId(null)
    setOpenId(null)
    trigger.current?.focus()
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const letter = c.letters.find((l) => l.id === readId)

  return (
    <section id="letters" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-6 max-w-xl text-center"
      >
        <h2 className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text font-script text-5xl leading-[1.3] text-transparent sm:text-7xl dark:from-pink-300 dark:to-rose-300">
          {c.lettersTitle}
        </h2>
        <p className="mt-2 text-xl text-rose-900/75 dark:text-rose-100/75">{c.lettersIntro}</p>
      </motion.div>

      <ul className="mx-auto grid max-w-sm gap-6 lg:max-w-none lg:grid-cols-3 lg:gap-8 xl:gap-10">
        {c.letters.slice(0, 3).map((l, i) => (
          <motion.li
            key={l.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
          >
            <Envelope
              letter={l}
              opened={openId === l.id}
              hint={c.lettersHint}
              onOpen={(el) => open(l.id, el)}
            />
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>{letter && <LetterModal key={letter.id} letter={letter} onClose={close} />}</AnimatePresence>
    </section>
  )
}
