import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

function Cursor() {
  return (
    // Plain inline (not inline-block) + absolutely positioned bar: it takes no width, never changes
    // line wrapping, and does not interrupt Arabic letter joining. `start-0` puts the bar on the
    // writing-direction side of the insertion point (right of the text in English, left in Arabic).
    <span aria-hidden className="relative">
      <motion.span
        className="absolute start-0 top-0 block h-full w-[2px] rounded-full bg-rose-500"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </span>
  )
}

interface Props {
  chars: string[]
  count: number
  cursor: boolean
}

/**
 * Shows the first `count` characters. The not-yet-typed remainder is rendered invisibly,
 * so the paper never grows or re-wraps while writing. Screen readers get the full text.
 */
const TypedText = memo(function TypedText({ chars, count, cursor }: Props) {
  const full = useMemo(() => chars.join(''), [chars])
  return (
    <>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {chars.slice(0, count).join('')}
        {cursor && <Cursor />}
        <span className="invisible">{chars.slice(count).join('')}</span>
      </span>
    </>
  )
})

export default TypedText
