export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      600: '#0284c7',
      700: '#0369a1',
      900: '#0c4a6e',
    },
    secondary: {
      600: '#4f46e5',
      900: '#312e81',
    },
    accent: {
      amber: {
        100: '#fef3c7',
        600: '#d97706',
        900: '#78350f',
      },
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
} as const

export const getThemeClasses = (isDarkMode: boolean) => ({
  text: {
    primary: isDarkMode ? 'text-white' : 'text-gray-900',
    secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    primaryAccent: 'text-sky-600',
    ctaAccent: 'text-sky-100',
  },
  background: {
    primary: isDarkMode ? 'bg-gray-900' : 'bg-white',
    secondary: isDarkMode ? 'bg-gray-800' : 'bg-white',
    nav: isDarkMode ? 'bg-gray-900/80' : 'bg-white/80',
    navMobile: isDarkMode ? 'bg-gray-900/95' : 'bg-white/95',
    gradient: isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-sky-50',
    primaryButton: 'bg-sky-600',
    ctaBackground: 'bg-white',
    featureIcon: {
      primary: isDarkMode ? 'bg-sky-900' : 'bg-sky-100',
      secondary: isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100',
      accent: isDarkMode ? 'bg-amber-900' : 'bg-amber-100',
    },
  },
  border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
  borderSecondary: isDarkMode ? 'border-gray-600' : 'border-gray-300',
  hover: {
    text: isDarkMode ? 'hover:text-white' : 'hover:text-gray-900',
    textAccent: isDarkMode ? 'hover:text-sky-400' : 'hover:text-sky-600',
    background: isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
    backgroundSecondary: isDarkMode ? 'hover:bg-gray-700' : '',
    primaryButton: 'hover:bg-sky-700',
    border: 'hover:border-sky-600',
    ctaBackground: 'hover:bg-gray-50',
  },
  gradients: {
    primary: 'bg-gradient-to-r from-sky-600 to-indigo-600',
    textPrimary: 'bg-gradient-to-r from-sky-600 to-indigo-600',
  },
})
