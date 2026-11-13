import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { DIRECTION, translations, type Dir, type Lang, type Translations } from './translations'

const KEY = 'birthday-lang'
const FADE_MS = 200
const SECTION_IDS = ['hero', 'special', 'letters', 'ending']

export interface LanguageContextValue {
  lang: Lang
  dir: Dir
  t: Translations
  setLang: (lang: Lang) => void
  /** True while the page content is fading out/in around a language change */
  fading: boolean
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'ar') return saved
  } catch { /* ignore */ }
  return 'en' // first-time visitors get English
}

/** Remember which section is on screen so the page doesn't jump when text lengths change. */
function captureAnchor() {
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().bottom > 80) return { id, top: el.getBoundingClientRect().top }
  }
  return null
}
function restoreAnchor(anchor: ReturnType<typeof captureAnchor>) {
  if (!anchor) return
  const el = document.getElementById(anchor.id)
  if (!el) return
  window.scrollBy({ top: el.getBoundingClientRect().top - anchor.top, behavior: 'instant' as ScrollBehavior })
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [fading, setFading] = useState(false)
  const langRef = useRef(lang)
  const timer = useRef<number>()

  const setLang = useCallback(
    (next: Lang) => {
      if (next === langRef.current) return
      window.clearTimeout(timer.current)
      const apply = () => {
        const anchor = captureAnchor()
        langRef.current = next
        setLangState(next)
        setFading(false)
        requestAnimationFrame(() => requestAnimationFrame(() => restoreAnchor(anchor)))
      }
      if (reduce) return apply()
      setFading(true) // fade out → swap language → fade in
      timer.current = window.setTimeout(apply, FADE_MS)
    },
    [reduce],
  )

  const t = translations[lang]
  const dir = DIRECTION[lang]

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    document.title = t.pageTitle
    try { localStorage.setItem(KEY, lang) } catch { /* ignore */ }
  }, [lang, dir, t.pageTitle])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const value = useMemo(() => ({ lang, dir, t, setLang, fading }), [lang, dir, t, setLang, fading])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
