import { useEffect, useState } from 'react'
import { useTranslation } from '../i18n/useTranslation'

const IDS = ['hero', 'special', 'letters', 'ending']

/** Minimal dot navigation with active-section tracking. */
export default function SideNav() {
  const { t } = useTranslation()
  const [active, setActive] = useState(IDS[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav aria-label={t.navLabel} className="fixed end-1 top-1/2 z-30 -translate-y-1/2">
      <ul className="flex flex-col items-center">
        {t.nav.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => go(id)}
              aria-label={label}
              aria-current={active === id ? 'true' : undefined}
              className="flex h-9 w-9 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active === id
                    ? 'h-3.5 w-3.5 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] dark:bg-pink-400'
                    : 'h-2 w-2 bg-rose-300 dark:bg-pink-300/40'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
