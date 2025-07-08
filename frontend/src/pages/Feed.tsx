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

export default function Feed() {
    const navigate = useNavigate()
    const { themeClasses } = useTheme()
    const { isAuthenticated, user, logout, isLoading: authLoading } = useAuth()
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = async () => {
        await logout()
        setIsMenuOpen(false)
    }

    // Fetch blogs
    const fetchBlogs = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await axios.get('http://localhost:5000/api/blogs', {
                withCredentials: true,
            })

            setBlogs(response.data)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch blogs')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBlogs()
    }, [fetchBlogs])

    if (isLoading) {
        return (
            <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
                {/* Header */}
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
                <LoadingSpinner message="Loading blogs..." />
            </div>
        )
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
            {/* Header */}
            <nav className={`border-b sticky top-0 z-50 transition-colors duration-300 ${themeClasses.nav} backdrop-blur-sm`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-sky-600" />
                            <span className={`ml-2 text-xl font-bold transition-colors ${themeClasses.text.primary}`}>BlogHub</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isAuthenticated && (
                                <>
                                    <button 
                                        onClick={() => navigate('/my-blogs')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary}`}
                                    >
                                        <PenTool className="h-4 w-4" />
                                        My Blogs
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
                                </>
                            )}
                            <ThemeToggle />
                            
                            {!authLoading && (
                                <>
                                    {isAuthenticated ? (
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
                                    ) : (
                                        <>
                                            <button 
                                                onClick={() => navigate('/login')}
                                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary}`}
                                            >
                                                Login
                                            </button>
                                            <button 
                                                onClick={() => navigate('/signup')}
                                                className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors cursor-pointer"
                                            >
                                                Sign Up
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
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
                                {isAuthenticated && (
                                    <>
                                        <button 
                                            onClick={() => {navigate('/my-blogs'); setIsMenuOpen(false)}}
                                            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2 cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary} ${themeClasses.button}`}
                                        >
                                            <PenTool className="h-4 w-4" />
                                            My Blogs
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
                                    </>
                                )}
                                
                                {!authLoading && (
                                    <>
                                        {isAuthenticated ? (
                                            <>
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
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    onClick={() => {navigate('/login'); setIsMenuOpen(false)}}
                                                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary} ${themeClasses.button}`}
                                                >
                                                    Login
                                                </button>
                                                <button 
                                                    onClick={() => {navigate('/signup'); setIsMenuOpen(false)}}
                                                    className="block w-full text-left px-3 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-base font-medium transition-colors mt-2 cursor-pointer"
                                                >
                                                    Sign Up
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>Latest Blogs</h1>
                    <p className={themeClasses.text.secondary}>Discover amazing stories from our community</p>
                </div>

                {error && <Alert message={error} type="error" />}

                {blogs.length === 0 ? (
                    <EmptyState 
                        icon={<PenTool className="h-12 w-12" />}
                        title="No blogs yet"
                        description="Be the first to share your story!"
                        actionButton={{
                            label: "Write Blog",
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