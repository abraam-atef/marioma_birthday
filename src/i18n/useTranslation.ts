import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'

/** Access the active language's strings, plus small locale helpers. */
export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used inside <LanguageProvider>')
  const { t, lang } = ctx
  return {
    ...ctx,
    /** Replaces "{name}" with her name in the current language */
    fill: (text: string) => text.replace(/\{name\}/g, t.herName),
    /** Locale-aware digits (Arabic-Indic in Arabic) */
    formatNumber: (n: number) => n.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US'),
  }
}
