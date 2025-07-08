import { type ReactNode } from 'react'
import { useTheme } from './ThemeProvider'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  actionButton?: {
    label: string
    onClick: () => void
  }
}

export const EmptyState = ({ icon, title, description, actionButton }: EmptyStateProps) => {
  const { themeClasses } = useTheme()

  return (
    <div className={`text-center py-12 ${themeClasses.card} rounded-xl border`}>
      <div className={`mx-auto h-12 w-12 ${themeClasses.text.muted} mb-4`}>
        {icon}
      </div>
      <h3 className={`text-lg font-medium ${themeClasses.text.primary} mb-2`}>{title}</h3>
      <p className={`${themeClasses.text.secondary} mb-4`}>{description}</p>
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
        >
          {actionButton.label}
        </button>
      )}
    </div>
  )
}
