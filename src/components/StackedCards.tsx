import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type Ref } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

/* ---------- stack geometry ---------- */
interface Slot { x: number; y: number; r: number; s: number; o: number }

// Resting pose of each position in the pile (0 = front). Positions >= 4 are tucked away.
const SLOTS: Slot[] = [
  { x: 0, y: 0, r: 0, s: 1, o: 1 },
  { x: 10, y: 16, r: 4, s: 0.95, o: 1 },
  { x: -12, y: 30, r: -5, s: 0.9, o: 1 },
  { x: 8, y: 42, r: 6, s: 0.85, o: 0.9 },
  { x: 0, y: 48, r: -3, s: 0.8, o: 0 },
]
// Where the front card flies to before it slips behind the pile.
const LIFT: Slot = { x: 56, y: -64, r: 12, s: 1.03, o: 1 }

const LIFT_MS = 300 // lift-and-turn phase
const SETTLE_MS = 450 // time the others need to settle before the next tap

// Card paper styles. Text colour + --accent are set per palette so content stays readable.
const PALETTES = [
  'from-[#fffdf8] to-[#ffe9ec] text-rose-950 border-rose-100 [--accent:#e11d48] dark:from-[#3a1730] dark:to-[#26101f] dark:text-rose-50 dark:border-pink-400/20 dark:[--accent:#f9a8d4]',
  'from-[#ffe4ec] to-[#fbb6ce] text-rose-950 border-pink-200 [--accent:#be123c] dark:from-[#4a1838] dark:to-[#2e0f26] dark:text-rose-50 dark:border-pink-400/20 dark:[--accent:#f9a8d4]',
  'from-[#8b1e3f] to-[#5c0f2b] text-rose-50 border-rose-900/40 [--accent:#fecdd3] dark:from-[#6a1533] dark:to-[#3a0b1f] dark:border-pink-400/20',
]

const PUFFS = [-70, -35, 0, 35, 70, 100]

/* ---------- a single card ---------- */
interface CardProps {
  index: number
  pos: number
  lifting: boolean
  content: ReactNode
  label: string
  onAdvance: () => void
  btnRef: Ref<HTMLButtonElement>
}

const Card = memo(function Card({ index, pos, lifting, content, label, onAdvance, btnRef }: CardProps) {
  const dir = index % 2 === 0 ? 1 : -1 // alternate tilt direction so the pile looks casual
  const slot = SLOTS[Math.min(pos, SLOTS.length - 1)]
  const target = lifting ? LIFT : slot
  const front = pos === 0
  const shell =
    'absolute inset-x-0 top-0 h-[360px] overflow-hidden rounded-[1.6rem] border bg-gradient-to-br shadow-[0_14px_30px_-10px_rgba(159,18,57,0.45)] dark:shadow-[0_14px_34px_-8px_rgba(0,0,0,0.75)] sm:h-[400px] ' +
    PALETTES[index % PALETTES.length]

  return (
    <motion.div
      className={shell + (front ? '' : ' pointer-events-none')}
      style={{ zIndex: lifting ? 50 : 10 - pos }}
      initial={false}
      animate={{
        x: target.x * dir,
        y: target.y,
        rotate: target.r * dir,
        scale: target.s,
        opacity: target.o,
      }}
      transition={
        lifting
          ? { duration: LIFT_MS / 1000, ease: 'easeOut' }
          : { type: 'spring', stiffness: 150, damping: 20, mass: 0.9 }
      }
      whileHover={front && !lifting ? { y: -8, rotate: -1 } : undefined}
      aria-hidden={!front}
    >
      {/* paper details */}
      <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[1.2rem] border border-dashed border-current opacity-20" />
      <Heart
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -end-5 text-[var(--accent)] opacity-[0.12]"
        size={120}
        fill="currentColor"
        strokeWidth={0}
      />
      <Heart
        aria-hidden
        className="pointer-events-none absolute start-5 top-5 text-[var(--accent)] opacity-60"
        size={14}
        fill="currentColor"
        strokeWidth={0}
      />

      {front ? (
        <button
          ref={btnRef}
          type="button"
          onClick={onAdvance}
          aria-label={label}
          className="relative block h-full w-full cursor-pointer text-start"
        >
          {content}
        </button>
      ) : (
        <div className="relative h-full w-full">{content}</div>
      )}
    </motion.div>
  )
})

/* ---------- the carousel ---------- */
interface StackedCardsProps<T> {
  items: T[]
  /** Renders the inside of one card. Keep it stable (useCallback / module scope). */
  renderCard: (item: T, index: number) => ReactNode
  /** Screen-reader label for the front card button */
  nextLabel: string
  /** Optional hint shown until the first interaction */
  hint?: string
  /** Screen-reader text announcing the current card */
  announce?: (item: T) => string
}

export default function StackedCards<T>({ items, renderCard, nextLabel, hint, announce }: StackedCardsProps<T>) {
  const reduce = useReducedMotion()
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i)) // order[0] = front card
  const [lifting, setLifting] = useState<number | null>(null)
  const [touched, setTouched] = useState(false)
  const [puff, setPuff] = useState(0)

  const orderRef = useRef(order)
  const busy = useRef(false)
  const refocus = useRef(false)
  const frontBtn = useRef<HTMLButtonElement>(null)
  const timers = useRef<number[]>([])

  const contents = useMemo(() => items.map((it, i) => renderCard(it, i)), [items, renderCard])

  const advance = useCallback(() => {
    if (busy.current || orderRef.current.length < 2) return
    busy.current = true
    refocus.current = document.activeElement === frontBtn.current
    const front = orderRef.current[0]
    setTouched(true)
    setLifting(front) // phase 1: lift + turn
    if (!reduce) setPuff((k) => k + 1)

    timers.current.push(
      window.setTimeout(
        () => {
          // phase 2: the same card goes to the back; everything else moves forward
          const next = [...orderRef.current.slice(1), front]
          orderRef.current = next
          setOrder(next)
          setLifting(null)
          timers.current.push(window.setTimeout(() => (busy.current = false), reduce ? 0 : SETTLE_MS))
        },
        reduce ? 0 : LIFT_MS,
      ),
    )
  }, [reduce])

  // keep keyboard focus on the (new) front card
  useEffect(() => {
    if (refocus.current) frontBtn.current?.focus()
  }, [order])
  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[430px] w-full max-w-[320px] sm:h-[470px] sm:max-w-[400px]">
        {items.map((_, i) => {
          const pos = order.indexOf(i)
          return (
            <Card
              key={i}
              index={i}
              pos={pos}
              lifting={lifting === i}
              content={contents[i]}
              label={nextLabel}
              onAdvance={advance}
              btnRef={pos === 0 ? frontBtn : null}
            />
          )
        })}

        {/* heart + sparkle feedback when a card moves */}
        {puff > 0 && (
          <div key={puff} aria-hidden className="pointer-events-none absolute left-1/2 top-[30%] z-[60]">
            {PUFFS.map((dx, i) => (
              <motion.span
                key={i}
                className="absolute text-rose-400 dark:text-pink-300"
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
                animate={{ opacity: 0, x: dx, y: -70 - (i % 3) * 22, scale: 1.1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: i * 0.03 }}
              >
                {i % 2 ? <Sparkles size={16} /> : <Heart size={16} fill="currentColor" strokeWidth={0} />}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* announces the current card to screen readers */}
      {announce && (
        <p className="sr-only" aria-live="polite">
          {announce(items[order[0]])}
        </p>
      )}

      <div className="mt-2 min-h-[2.5rem] text-center">
        <AnimatePresence>
          {hint && !touched && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.6 }}
              className="font-hand text-2xl text-rose-600 dark:text-pink-200"
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
