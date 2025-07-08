import { useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { User, Calendar } from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface BlogCardProps {
  blog: {
    _id: string
    title: string
    content: string
    author: {
      _id: string
      username: string
    }
    createdAt: string
    updatedAt: string
  } | null
  maxContentLength?: number
}

export const BlogCard = ({ blog, maxContentLength = 200 }: BlogCardProps) => {
  const { themeClasses } = useTheme()

  const icons = useMemo(() => ({
    User: <User className="h-4 w-4" />,
    Calendar: <Calendar className="h-4 w-4" />
  }), [])

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }, [])

  const truncateContent = useCallback((content: string, maxLength: number) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }, [])

  // Return null or error state if blog is null/deleted
  if (!blog) {
    return (
      <div className={`p-6 rounded-xl border ${themeClasses.card} opacity-50`}>
        <div className="text-center">
          <p className={`${themeClasses.text.muted} text-sm`}>
            This blog is no longer available
          </p>
        </div>
      </div>
    )
  }

  // Additional safety checks
  if (!blog.author) {
    return (
      <div className={`p-6 rounded-xl border ${themeClasses.card} opacity-50`}>
        <div className="text-center">
          <p className={`${themeClasses.text.muted} text-sm`}>
            Blog author information is not available
          </p>
        </div>
      </div>
    )
  }

  return (
    <article className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${themeClasses.card} animate-in fade-in slide-in-from-bottom duration-700`}>
      <div className="mb-4">
        <h2 className={`text-xl font-semibold ${themeClasses.text.primary} mb-2 hover:text-sky-600 transition-colors`}>
          <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
        </h2>
        <div className={`flex items-center gap-4 text-sm ${themeClasses.text.muted}`}>
          <div className="flex items-center gap-1">
            {icons.User}
            <span>{blog.author.username}</span>
          </div>
          <div className="flex items-center gap-1">
            {icons.Calendar}
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </div>
      <p className={`${themeClasses.text.secondary} leading-relaxed`}>
        {truncateContent(blog.content, maxContentLength)}
      </p>
      <div className="mt-4">
        <Link
          to={`/blog/${blog._id}`}
          className={`text-sky-600 ${themeClasses.link} font-medium text-sm`}
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
