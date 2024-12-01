import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full 
        bg-white/90 dark:bg-charcoal/90 backdrop-blur-sm
        text-charcoal dark:text-white 
        hover:scale-110 
        transition-all duration-200
        border border-stone-200 dark:border-stone-700"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? 
        <Sun className="w-5 h-5" /> : 
        <Moon className="w-5 h-5" />
      }
    </button>
  )
}

export default ThemeToggle