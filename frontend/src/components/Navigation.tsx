import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Plus, Bookmark, LogOut, PenTool } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useAuth } from './AuthProvider'
import { ThemeToggle } from './ThemeToggle'

interface NavigationProps {
  showAuthButtons?: boolean
  showCreateBlog?: boolean
  showBookmarks?: boolean
  showMyBlogs?: boolean
  backLink?: {
    to: string
    label: string
  }
  onCreateBlog?: () => void
}

export const Navigation = ({ 
  showAuthButtons = false, 
  showCreateBlog = false, 
  showBookmarks = false,
  showMyBlogs = false,
  backLink,
  onCreateBlog 
}: NavigationProps) => {
  const { themeClasses } = useTheme()
  const { isAuthenticated, user, logout, isLoading } = useAuth()
  const navigate = useNavigate()

  const icons = useMemo(() => ({
    BookOpen: <BookOpen className="h-8 w-8 text-sky-600" />,
    Plus: <Plus className="h-5 w-5" />,
    Bookmark: <Bookmark className="h-4 w-4" />,
    LogOut: <LogOut className="h-4 w-4" />,
    PenTool: <PenTool className="h-4 w-4" />
  }), [])

  const brandLink = useMemo(() => (
    <Link to="/" className="flex items-center">
      {icons.BookOpen}
      <span className={`ml-2 text-xl font-bold transition-colors ${themeClasses.text.primary}`}>BlogHub</span>
    </Link>
  ), [icons.BookOpen, themeClasses.text.primary])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className={`border-b transition-colors duration-300 ${themeClasses.nav} backdrop-blur-sm sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {brandLink}
          
          <div className="flex items-center gap-4">
            {backLink && (
              <Link to={backLink.to} className={`${themeClasses.text.secondary} ${themeClasses.link} transition-colors`}>
                {backLink.label}
              </Link>
            )}
            
            {showMyBlogs && isAuthenticated && (
              <Link to="/my-blogs" className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${themeClasses.text.secondary} ${themeClasses.link}`}>
                {icons.PenTool}
                My Blogs
              </Link>
            )}
            
            {showBookmarks && isAuthenticated && (
              <Link to="/bookmarks" className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${themeClasses.text.secondary} ${themeClasses.link}`}>
                {icons.Bookmark}
                Bookmarks
              </Link>
            )}
            
            {showCreateBlog && isAuthenticated && (
              <button
                onClick={onCreateBlog}
                className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors"
              >
                {icons.Plus}
                Write Blog
              </button>
            )}
            
            {showAuthButtons && !isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <span className={`text-sm ${themeClasses.text.secondary}`}>
                      Welcome, {user?.username}
                    </span>
                    <button
                      onClick={handleLogout}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${themeClasses.text.secondary} ${themeClasses.link}`}
                    >
                      {icons.LogOut}
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${themeClasses.text.secondary} ${themeClasses.link}`}>
                      Login
                    </Link>
                    <Link to="/signup" className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors">
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}