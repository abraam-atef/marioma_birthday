import { useEffect, useMemo, useState } from 'react'

/* ---------- text helpers (Arabic / English / emoji safe) ---------- */
type SegmenterCtor = new (
  locale?: string,
  opts?: { granularity: 'grapheme' },
) => { segment: (s: string) => Iterable<{ segment: string }> }

const Segmenter = (Intl as unknown as { Segmenter?: SegmenterCtor }).Segmenter
const segmenter = Segmenter ? new Segmenter(undefined, { granularity: 'grapheme' }) : null

/** Split into user-perceived characters so Arabic marks and emoji are never cut in half. */
export const splitGraphemes = (text: string): string[] =>
  segmenter ? Array.from(segmenter.segment(text), (s) => s.segment) : Array.from(text)

/** True when the text contains Hebrew/Arabic-script characters. */
export const hasRtl = (text: string) => /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/.test(text)

/* ---------- rhythm ---------- */
// Extra pause after punctuation (Latin + Arabic marks), in ms
const PAUSE: Record<string, number> = {
  ',': 240, '،': 240,
  ';': 300, '؛': 300, ':': 300,
  '.': 520, '!': 520, '?': 520, '؟': 520, '…': 520, '۔': 520,
  '\n': 400,
}
const delayFor = (char: string, speed: number) =>
  speed * (0.7 + Math.random() * 0.9) * (char === ' ' ? 0.8 : 1) + (PAUSE[char] ?? 0)

interface Options {
  /** Typing starts only when this becomes true (e.g. once the letter is fully visible) */
  enabled: boolean
  reduced?: boolean
  /** Average ms per character */
  speed?: number
  startDelay?: number
  paragraphPause?: number
  signatureDelay?: number
}

/**
 * Types several text segments one after another (title, then each paragraph).
 * One timer chain, always cleaned up on unmount / skip / dependency change.
 */
export function useTypewriter(
  parts: string[][],
  { enabled, reduced = false, speed = 62, startDelay = 350, paragraphPause = 700, signatureDelay = 900 }: Options,
) {
  const [pos, setPos] = useState({ seg: 0, ch: 0 })
  const [finished, setFinished] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [signed, setSigned] = useState(false)

  const instant = reduced || skipped

  useEffect(() => {
    if (!enabled || instant) return
    setPos({ seg: 0, ch: 0 })
    setFinished(false)
    let seg = 0
    let ch = 0
    let id: number | undefined

    const step = () => {
      const chars = parts[seg]
      if (ch < chars.length) {
        ch += 1
        setPos({ seg, ch })
        id = window.setTimeout(step, delayFor(chars[ch - 1], speed))
      } else if (seg < parts.length - 1) {
        seg += 1
        ch = 0
        setPos({ seg, ch: 0 })
        id = window.setTimeout(step, paragraphPause)
      } else {
        setFinished(true)
      }
    }

    id = window.setTimeout(step, startDelay)
    return () => window.clearTimeout(id)
  }, [enabled, instant, parts, speed, startDelay, paragraphPause])

  const done = instant || finished

  // The signature is "signed" a moment after the last word
  useEffect(() => {
    if (!done) {
      setSigned(false)
      return
    }
    if (reduced) {
      setSigned(true)
      return
    }
    const id = window.setTimeout(() => setSigned(true), skipped ? 350 : signatureDelay)
    return () => window.clearTimeout(id)
  }, [done, reduced, skipped, signatureDelay])

  const counts = useMemo(
    () => parts.map((g, i) => (done || i < pos.seg ? g.length : i === pos.seg ? pos.ch : 0)),
    [parts, pos, done],
  )

  return {
    /** Characters revealed so far for each segment */
    counts,
    /** Segment currently being typed (-1 when idle or finished) */
    current: enabled && !done ? pos.seg : -1,
    done,
    signed,
    skip: () => setSkipped(true),
  }
}
