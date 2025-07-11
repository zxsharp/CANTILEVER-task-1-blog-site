import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, PenTool, Menu, X, LogOut, Bookmark } from 'lucide-react'
import axios from 'axios'
import { useTheme } from '../components/ThemeProvider'
import { useAuth } from '../components/AuthProvider'
import { ThemeToggle } from '../components/ThemeToggle'
import { BlogCard } from '../components/BlogCard'
import { Alert } from '../components/Alert'
import { EmptyState } from '../components/EmptyState'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { API_ENDPOINTS } from '../config/api'

interface Blog {
    _id: string
    title: string
    content: string
    author: {
        _id: string
        username: string
    }
    createdAt: string
    updatedAt: string
}

export default function MyBlogs() {
    const navigate = useNavigate()
    const { themeClasses } = useTheme()
    const { isAuthenticated, user, logout } = useAuth()
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = async () => {
        await logout()
        setIsMenuOpen(false)
    }

    // Fetch user's blogs
    const fetchMyBlogs = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(API_ENDPOINTS.BLOGS.MY_BLOGS, {
                withCredentials: true,
            })

            setBlogs(response.data)
        } catch (err: any) {
            if (err.response?.status === 401) {
                navigate('/login')
            } else {
                setError(err.response?.data?.message || 'Failed to fetch your blogs')
            }
        } finally {
            setIsLoading(false)
        }
    }, [navigate])

    useEffect(() => {
        if (isAuthenticated) {
            fetchMyBlogs()
        } else {
            navigate('/login')
        }
    }, [isAuthenticated, fetchMyBlogs, navigate])

    // Refresh blogs when returning to this page
    useEffect(() => {
        const handleFocus = () => {
            if (isAuthenticated) {
                fetchMyBlogs()
            }
        }

        window.addEventListener('focus', handleFocus)
        
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && isAuthenticated) {
                fetchMyBlogs()
            }
        })

        return () => {
            window.removeEventListener('focus', handleFocus)
            document.removeEventListener('visibilitychange', handleFocus)
        }
    }, [isAuthenticated, fetchMyBlogs])

    if (isLoading) {
        return (
            <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
                <nav className={`border-b sticky top-0 z-50 transition-colors duration-300 ${themeClasses.nav} backdrop-blur-sm`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <BookOpen className="h-8 w-8 text-sky-600" />
                                <span className={`ml-2 text-xl font-bold transition-colors ${themeClasses.text.primary}`}>BlogHub</span>
                            </div>
                            <div className="md:hidden">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </nav>
                <LoadingSpinner message="Loading your blogs..." />
            </div>
        )
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
            {/* Header - Same structure as Landing/Feed pages */}
            <nav className={`border-b sticky top-0 z-50 transition-colors duration-300 ${themeClasses.nav} backdrop-blur-sm`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-sky-600" />
                            <span className={`ml-2 text-xl font-bold transition-colors ${themeClasses.text.primary}`}>BlogHub</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button 
                                onClick={() => navigate('/feed')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary}`}
                            >
                                Feed
                            </button>
                            <button 
                                onClick={() => navigate('/bookmarks')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary}`}
                            >
                                <Bookmark className="h-4 w-4" />
                                Bookmarks
                            </button>
                            <button
                                onClick={() => navigate('/create-blog')}
                                className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors"
                            >
                                <PenTool className="h-4 w-4" />
                                Write Blog
                            </button>
                            <ThemeToggle />
                            <div className="flex items-center gap-4">
                                <span className={`text-sm ${themeClasses.text.secondary}`}>
                                    Welcome, {user?.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary}`}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center gap-2">
                            <ThemeToggle />
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-2 transition-colors cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary}`}
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className={`md:hidden border-t backdrop-blur-sm transition-colors ${themeClasses.nav}`}>
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <button 
                                    onClick={() => {navigate('/feed'); setIsMenuOpen(false)}}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary} ${themeClasses.button}`}
                                >
                                    Feed
                                </button>
                                <button 
                                    onClick={() => {navigate('/bookmarks'); setIsMenuOpen(false)}}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2 cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary} ${themeClasses.button}`}
                                >
                                    <Bookmark className="h-4 w-4" />
                                    Bookmarks
                                </button>
                                <button 
                                    onClick={() => {navigate('/create-blog'); setIsMenuOpen(false)}}
                                    className="block w-full text-left px-3 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-base font-medium transition-colors mt-2 cursor-pointer"
                                >
                                    Write Blog
                                </button>
                                <div className={`px-3 py-2 text-sm ${themeClasses.text.secondary}`}>
                                    Welcome, {user?.username}
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2 cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary} ${themeClasses.button}`}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2 flex items-center gap-2`}>
                        <PenTool className="h-8 w-8" />
                        My Blogs
                    </h1>
                    <p className={themeClasses.text.secondary}>Your published stories and articles</p>
                </div>

                {error && <Alert message={error} type="error" />}

                {blogs.length === 0 ? (
                    <EmptyState 
                        icon={<PenTool className="h-12 w-12" />}
                        title="No blogs yet"
                        description="Start writing your first blog post and share your thoughts with the world!"
                        actionButton={{
                            label: "Write Your First Blog",
                            onClick: () => navigate('/create-blog')
                        }}
                    />
                ) : (
                    <div className="space-y-6">
                        {blogs.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
