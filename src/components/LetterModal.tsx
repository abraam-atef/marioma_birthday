import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, Sparkles, X } from 'lucide-react'
import TypedText from './TypedText'
import { splitGraphemes, useTypewriter } from '../hooks/useTypewriter'
import { useTranslation } from '../i18n/useTranslation'
import type { LoveLetter } from '../i18n/translations'

interface Props {
  letter: LoveLetter
  onClose: () => void
}

/** The opened letter: it is written out live, then signed. */
export default function LetterModal({ letter, onClose }: Props) {
  const { t: c } = useTranslation()
  const reduce = useReducedMotion() ?? false
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const [ready, setReady] = useState(false) // true once the paper has fully arrived
  const titleId = `letter-title-${letter.id}`
  const signature = c.signature || c.myName

  // segment 0 = title, then one segment per paragraph
  const paragraphs = useMemo(() => letter.body.split('\n\n'), [letter])
  const parts = useMemo(
    () => [letter.title, ...paragraphs].map(splitGraphemes),
    [letter, paragraphs],
  )
  const { counts, current, done, signed, skip } = useTypewriter(parts, { enabled: ready, reduced: reduce })

  // dialog behaviour: scroll lock, Esc, focus trap
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button') ?? [])
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        const active = document.activeElement
        if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // if the Skip button was focused when it disappears, hand focus to Close
  useEffect(() => {
    if (done && document.activeElement === skipRef.current) closeRef.current?.focus()
  }, [done])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-rose-950/50 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-md bg-gradient-to-b from-[#fffdf8] to-[#fff1e6] px-7 pb-9 pt-12 text-rose-950 shadow-2xl shadow-rose-900/40 sm:px-10"
        initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 25 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 60, scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        style={{ transformPerspective: 1000 }}
        // typing begins only after the letter has fully settled into view
        onAnimationComplete={() => setReady(true)}
      >
        {/* sparkles */}
        {['left-4 top-6', 'right-6 top-14', 'left-8 bottom-10', 'right-5 bottom-24'].map((pos, i) => (
          <motion.span
            key={pos}
            aria-hidden
            className={`pointer-events-none absolute text-amber-400 ${pos}`}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
            transition={{ duration: 2.6, delay: i * 0.5, repeat: Infinity }}
          >
            <Sparkles size={16} />
          </motion.span>
        ))}

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={c.closeLetter}
          className="absolute end-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-rose-700 hover:bg-rose-100"
        >
          <X aria-hidden size={22} />
        </button>

        <AnimatePresence>
          {!done && (
            <motion.button
              ref={skipRef}
              type="button"
              onClick={skip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute start-3 top-3 flex h-11 items-center rounded-full px-4 text-lg italic text-rose-700/80 hover:bg-rose-100"
            >
              {c.skipLetter}
            </motion.button>
          )}
        </AnimatePresence>

        <Heart aria-hidden className="mx-auto mb-3 text-rose-500" size={26} fill="currentColor" />

        <h3
          id={titleId}
          className="text-center font-script text-4xl leading-tight text-rose-600 sm:text-5xl"
        >
          <TypedText chars={parts[0]} count={counts[0]} cursor={current === 0} />
        </h3>

        <div className="mt-6 space-y-4 text-xl leading-[1.75] text-rose-950">
          {paragraphs.map((p, i) => (
            <p key={i} className="italic">
              <TypedText chars={parts[i + 1]} count={counts[i + 1]} cursor={current === i + 1} />
            </p>
          ))}
        </div>

        {/* signature: space is reserved, then it is "signed" after the last word */}
        <motion.div
          className="mt-8 text-end"
          initial={false}
          animate={{ opacity: signed ? 1 : 0, y: signed ? 0 : 10, filter: signed ? 'blur(0px)' : 'blur(6px)' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          aria-hidden={!signed}
        >
          <p className="text-xl italic text-rose-800/80">{c.signoff}</p>
          <motion.p
            className="font-script text-5xl leading-snug text-rose-600"
            initial={false}
            animate={{ opacity: signed ? 1 : 0 }}
            transition={{ duration: 1.2, delay: signed ? 0.6 : 0 }}
          >
            {signature}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
