import { type ReactNode } from 'react'
import { useTheme } from './ThemeProvider'

interface FormInputProps {
  id: string
  name: string
  type: 'text' | 'email' | 'password'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  label: string
  icon: ReactNode
  required?: boolean
  rightIcon?: ReactNode
  onRightIconClick?: () => void
}

export const FormInput = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  label,
  icon,
  required = false,
  rightIcon,
  onRightIconClick
}: FormInputProps) => {
  const { themeClasses } = useTheme()

  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
        {label}
      </label>
      <div className="relative">
        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.text.secondary}`}>
          {icon}
        </div>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full pl-10 ${rightIcon ? 'pr-12' : 'pr-4'} py-3 rounded-md border transition-colors ${themeClasses.input} focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
          placeholder={placeholder}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary}`}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  )
}
