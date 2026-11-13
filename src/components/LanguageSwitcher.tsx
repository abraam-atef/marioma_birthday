import { motion } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'
import type { Lang } from '../i18n/translations'

const OPTIONS: { code: Lang; short: string; name: string }[] = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'ar', short: 'عربي', name: 'العربية' },
]

/** Minimal EN | عربي pill. Kept LTR internally so the sliding highlight behaves the same in both languages. */
export default function LanguageSwitcher() {
  const { lang, setLang, t } = useTranslation()
  return (
    <div
      role="group"
      aria-label={t.languageLabel}
      dir="ltr"
      className="relative flex h-10 items-center rounded-full border border-rose-200 bg-white/70 p-1 shadow-lg shadow-rose-200/50 backdrop-blur-md dark:border-pink-400/30 dark:bg-white/10 dark:shadow-pink-900/40"
    >
      {OPTIONS.map((o) => {
        const active = lang === o.code
        return (
          <button
            key={o.code}
            type="button"
            lang={o.code}
            aria-label={o.name}
            aria-pressed={active}
            onClick={() => setLang(o.code)}
            className="relative z-10 flex h-8 min-w-[2.75rem] items-center justify-center rounded-full px-3 text-base font-semibold leading-none"
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-md"
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              />
            )}
            <span className={active ? 'text-white' : 'text-rose-700 dark:text-pink-100'}>{o.short}</span>
          </button>
        )
      })}
    </div>
  )
}
