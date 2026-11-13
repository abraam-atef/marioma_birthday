import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import type { Theme } from '../hooks/useTheme'

/** Minimal floating header. `end-4` = top-right in English, top-left in Arabic. */
export default function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  return (
    <header
      className="fixed end-4 z-40 flex items-center gap-2"
      style={{ top: 'max(1rem, env(safe-area-inset-top))' }}
    >
      <LanguageSwitcher />
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}
