import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react'

interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
  setTheme: (theme: 'dark' | 'light' | 'system') => void
  themeClasses: {
    container: string
    nav: string
    card: string
    text: {
      primary: string
      secondary: string
      muted: string
    }
    button: string
    link: string
    input: string
    textarea: string
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Initialize theme from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    
    // Fall back to system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    // Default to dark mode
    return true
  })

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev
      // Persist to localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light')
      return newMode
    })
  }, [])

  // Set specific theme or follow system
  const setTheme = useCallback((theme: 'dark' | 'light' | 'system') => {
    if (theme === 'system') {
      localStorage.removeItem('theme')
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(systemPrefersDark)
    } else {
      localStorage.setItem('theme', theme)
      setIsDarkMode(theme === 'dark')
    }
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no user preference is saved
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply theme to document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
  }, [isDarkMode])

const themeClasses = useMemo(() => ({
  container: isDarkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-sky-50',
  nav: isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200',
  card: isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
  text: {
    primary: isDarkMode ? 'text-white' : 'text-gray-900',
    secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    muted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
  },
  button: isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
  link: isDarkMode ? 'hover:text-sky-400' : 'hover:text-sky-700',
  input: isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900',
  textarea: isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900',
}), [isDarkMode])

const value = useMemo(() => ({
  isDarkMode,
  toggleDarkMode,
  setTheme,
  themeClasses
}), [isDarkMode, toggleDarkMode, setTheme, themeClasses])

return (
  <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>
)
}
