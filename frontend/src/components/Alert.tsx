interface AlertProps {
  message: string
  type: 'error' | 'success'
}

export const Alert = ({ message, type }: AlertProps) => {
  const baseClasses = "mb-4 p-3 rounded-md text-sm"
  const typeClasses = {
    error: "bg-red-100 border border-red-300 text-red-700",
    success: "bg-green-100 border border-green-300 text-green-700"
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {message}
    </div>
  )
}
