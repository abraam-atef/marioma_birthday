import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'
import { useTranslation } from '../i18n/useTranslation'

interface Props {
  theme: Theme
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  const { t } = useTranslation()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? t.themeLabels.toLight : t.themeLabels.toDark}
      onClick={onToggle}
      dir="ltr"
      className="relative flex h-10 w-[4.5rem] items-center rounded-full border border-rose-200 bg-white/70 p-1 shadow-lg shadow-rose-200/50 backdrop-blur-md dark:border-pink-400/30 dark:bg-white/10 dark:shadow-pink-900/40"
    >
      <Sun aria-hidden className="absolute left-2.5 h-4 w-4 text-amber-500" />
      <Moon aria-hidden className="absolute right-2.5 h-4 w-4 text-pink-200" />
      <motion.span
        className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-md"
        animate={{ x: dark ? 32 : 0, rotate: dark ? 360 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {dark ? <Moon aria-hidden className="h-4 w-4" /> : <Sun aria-hidden className="h-4 w-4" />}
      </motion.span>
    </button>
  )
}
