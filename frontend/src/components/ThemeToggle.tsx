import { useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface ThemeToggleProps {
  showDropdown?: boolean
}

export const ThemeToggle = ({ showDropdown = false }: ThemeToggleProps) => {
  const { isDarkMode, toggleDarkMode, setTheme, themeClasses } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  if (!showDropdown) {
    // Simple toggle button
    return (
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-md transition-colors cursor-pointer ${themeClasses.button}`}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    )
  }

  // Dropdown with system option
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-md transition-colors cursor-pointer ${themeClasses.button}`}
      >
        {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20 ${themeClasses.card} border`}>
            <div className="py-1">
              <button
                onClick={() => {
                  setTheme('light')
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${themeClasses.text.primary} hover:${themeClasses.text.secondary} transition-colors`}
              >
                <Sun className="h-4 w-4" />
                Light
              </button>
              <button
                onClick={() => {
                  setTheme('dark')
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${themeClasses.text.primary} hover:${themeClasses.text.secondary} transition-colors`}
              >
                <Moon className="h-4 w-4" />
                Dark
              </button>
              <button
                onClick={() => {
                  setTheme('system')
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${themeClasses.text.primary} hover:${themeClasses.text.secondary} transition-colors`}
              >
                <Monitor className="h-4 w-4" />
                System
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
