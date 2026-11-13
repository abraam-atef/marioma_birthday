import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import type { LoveLetter } from '../i18n/translations'

interface Props {
  letter: LoveLetter
  opened: boolean
  hint: string
  onOpen: (el: HTMLElement) => void
}

const FLAP_CLIP = 'polygon(0 0, 100% 0, 50% 100%)'
const FRONT_CLIP = 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)'

/** A closed/opening envelope. Flap rotates in 3D; the letter slides up out of the pocket. */
export default function Envelope({ letter, opened, hint, onOpen }: Props) {
  return (
    <motion.button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      aria-haspopup="dialog"
      aria-label={`${letter.envelopeTitle}. ${hint}`}
      whileHover={{ y: -6, rotate: -1 }}
      whileTap={{ scale: 0.97 }}
      className="group block w-full pt-10 text-center"
    >
      <div className="relative aspect-[4/3] w-full" style={{ perspective: 1000 }}>
        {/* glow */}
        <div
          aria-hidden
          className="absolute -inset-3 rounded-3xl bg-rose-300/40 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-pink-600/30"
          style={{ opacity: opened ? 1 : 0.5 }}
        />

        {/* back of envelope */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-300 to-rose-400 shadow-xl shadow-rose-300/50 dark:from-[#5b1a3d] dark:to-[#3a0f2a] dark:shadow-black/50" />

        {/* paper peeking out */}
        <motion.div
          aria-hidden
          className="absolute inset-x-[7%] bottom-[10%] top-[6%] rounded-sm bg-[#fffaf3] shadow-md dark:bg-[#f6e6dd]"
          style={{ zIndex: 10 }}
          animate={{ y: opened ? '-38%' : '0%' }}
          transition={{ duration: 0.8, delay: opened ? 0.45 : 0, ease: 'easeOut' }}
        >
          <div className="mx-auto mt-5 h-1.5 w-1/2 rounded bg-rose-200" />
          <div className="mx-auto mt-3 h-1.5 w-3/4 rounded bg-rose-100" />
          <div className="mx-auto mt-3 h-1.5 w-2/3 rounded bg-rose-100" />
        </motion.div>

        {/* front pocket */}
        <div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-200 to-rose-300 dark:from-[#7a2352] dark:to-[#4d1237]"
          style={{ clipPath: FRONT_CLIP, zIndex: 20 }}
        />
        <span
          className="absolute inset-x-0 bottom-[12%] z-30 px-3 font-script text-2xl leading-tight text-rose-700 sm:text-[1.7rem] lg:text-2xl xl:text-3xl dark:text-pink-100"
        >
          {letter.envelopeTitle}
        </span>

        {/* flap (3D) */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[55%]"
          style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
          initial={false}
          animate={{ rotateX: opened ? 180 : 0, zIndex: opened ? 5 : 30 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-rose-300 to-rose-400 dark:from-[#8a2a5c] dark:to-[#5b1a3d]"
            style={{ clipPath: FLAP_CLIP, backfaceVisibility: 'hidden' }}
          />
          <div
            className="absolute inset-0 bg-rose-100 dark:bg-[#3f1230]"
            style={{ clipPath: FLAP_CLIP, backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
          />
        </motion.div>

        {/* wax seal */}
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-[55%] z-40 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-700 text-white shadow-lg"
          animate={{ opacity: opened ? 0 : 1, scale: opened ? 0.4 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Heart size={18} fill="currentColor" />
        </motion.span>
      </div>
      <span className="mt-5 block text-lg italic text-rose-700/80 dark:text-pink-200/80">{hint}</span>
    </motion.button>
  )
}
