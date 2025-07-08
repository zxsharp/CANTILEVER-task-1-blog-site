import { useTheme } from './ThemeProvider'

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner = ({ message = "Loading..." }: LoadingSpinnerProps) => {
  const { themeClasses } = useTheme()

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className={`text-lg ${themeClasses.text.secondary}`}>{message}</div>
    </div>
  )
}
