import { MotionConfig, motion } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import { useTranslation } from './i18n/useTranslation'
import FloatingHearts from './components/FloatingHearts'
import Header from './components/Header'
import SideNav from './components/SideNav'
import Hero from './components/Hero'
import Qualities from './components/Qualities'
import Letters from './components/Letters'
import Ending from './components/Ending'

export default function App() {
  const { theme, toggle } = useTheme()
  const { fading } = useTranslation()

  return (
    // reducedMotion="user" makes Framer Motion respect prefers-reduced-motion
    <MotionConfig reducedMotion="user">
      {/* Cross-fading backgrounds give a smooth animated theme transition */}
      <div aria-hidden className="fixed inset-0 -z-20 bg-gradient-to-b from-rose-50 via-pink-100 to-rose-100" />
      <div
        aria-hidden
        className={`fixed inset-0 -z-20 bg-gradient-to-b from-[#1a0b16] via-[#2a0f24] to-[#14081a] transition-opacity duration-700 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <FloatingHearts className="fixed inset-0 -z-10" />

      <Header theme={theme} onToggleTheme={toggle} />
      <SideNav />

      {/* content fades briefly while the language swaps */}
      <motion.main className="relative" animate={{ opacity: fading ? 0 : 1 }} transition={{ duration: 0.2 }}>
        <Hero />
        <Qualities />
        <Letters />
        <Ending />
      </motion.main>
    </MotionConfig>
  )
}
