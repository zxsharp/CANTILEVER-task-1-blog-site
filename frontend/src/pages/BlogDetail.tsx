import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { BookOpen, User, Calendar, Moon, Sun, ArrowLeft, Edit, Trash2, Save, X, Bookmark, BookmarkCheck } from 'lucide-react'
import axios from 'axios'
import { Navigation } from '../components/Navigation'
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

interface CurrentUser {
    id: string
    username: string
}

export default function BlogDetail() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const [isDarkMode] = useState(true)
    const [blog, setBlog] = useState<Blog | null>(null)
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [editForm, setEditForm] = useState({
        title: '',
        content: ''
    })
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isBookmarking, setIsBookmarking] = useState(false)

    // Memoize theme classes
    const themeClasses = useMemo(() => ({
        container: isDarkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-sky-50',
        nav: isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200',
        card: isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
        text: {
            primary: isDarkMode ? 'text-white' : 'text-gray-900',
            secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
            muted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
        },
        button: isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
        link: isDarkMode ? 'hover:text-sky-400' : 'hover:text-sky-700',
        input: isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900',
        textarea: isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900',
    }), [isDarkMode])

    // Memoize icons
    const icons = useMemo(() => ({
        BookOpen: <BookOpen className="h-8 w-8 text-sky-600" />,
        Sun: <Sun className="h-5 w-5" />,
        Moon: <Moon className="h-5 w-5" />,
        User: <User className="h-4 w-4" />,
        Calendar: <Calendar className="h-4 w-4" />,
        ArrowLeft: <ArrowLeft className="h-5 w-5" />,
        Edit: <Edit className="h-4 w-4" />,
        Trash2: <Trash2 className="h-4 w-4" />,
        Save: <Save className="h-4 w-4" />,
        X: <X className="h-4 w-4" />,
        Bookmark: <Bookmark className="h-4 w-4" />,
        BookmarkCheck: <BookmarkCheck className="h-4 w-4" />
    }), [])

    // Fetch current user
    const fetchCurrentUser = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                withCredentials: true,
            })
            setCurrentUser(response.data)
        } catch (err) {
            // User not logged in or error occurred
            setCurrentUser(null)
        }
    }, [])

    // Fetch blog
    const fetchBlog = useCallback(async () => {
        if (!id) return

        try {
            setIsLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
                withCredentials: true,
            })

            setBlog(response.data)
            setEditForm({
                title: response.data.title,
                content: response.data.content
            })
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch blog')
        } finally {
            setIsLoading(false)
        }
    }, [id])

    // Check if blog is bookmarked
    const checkBookmarkStatus = useCallback(async () => {
        if (!id || !currentUser) return

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookmarks`, {
                withCredentials: true,
            })
            const bookmarkedBlogs = response.data
            setIsBookmarked(bookmarkedBlogs.some((bookmark: any) => bookmark.blog._id === id))
        } catch (err) {
            // User might not be logged in
        }
    }, [id, currentUser])

    // Handle bookmark toggle
    const handleBookmarkToggle = useCallback(async () => {
        if (!id || !currentUser) return

        try {
            setIsBookmarking(true)
            if (isBookmarked) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookmarks/${id}`, {
                    withCredentials: true,
                })
                setIsBookmarked(false)
                
                // If we're on a bookmarked blog and removing bookmark, 
                // we might want to redirect back to bookmarks page
                const currentPath = window.location.pathname
                if (currentPath.includes('/blog/') && document.referrer.includes('/bookmarks')) {
                    // Add a small delay to show the change, then redirect
                    setTimeout(() => {
                        navigate('/bookmarks')
                    }, 1000)
                }
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/bookmarks/${id}`, {}, {
                    withCredentials: true,
                })
                setIsBookmarked(true)
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to toggle bookmark')
        } finally {
            setIsBookmarking(false)
        }
    }, [id, currentUser, isBookmarked, navigate])

    useEffect(() => {
        fetchCurrentUser()
        fetchBlog()
    }, [fetchCurrentUser, fetchBlog])

    useEffect(() => {
        checkBookmarkStatus()
    }, [checkBookmarkStatus])

    // Check if current user is the author
    const isAuthor = useMemo(() => {
        return currentUser && blog && currentUser.id === blog.author._id
    }, [currentUser, blog])

    // Handle update
    const handleUpdate = useCallback(async () => {
        if (!blog || !id) return

        try {
            setIsUpdating(true)
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, editForm, {
                withCredentials: true,
            })

            setBlog(response.data)
            setIsEditing(false)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update blog')
        } finally {
            setIsUpdating(false)
        }
    }, [blog, id, editForm])

    // Handle delete
    const handleDelete = useCallback(async () => {
        if (!blog || !id) return

        if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
            return
        }

        try {
            setIsDeleting(true)
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
                withCredentials: true,
            })

            navigate('/feed')
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete blog')
            setIsDeleting(false)
        }
    }, [blog, id, navigate])

    const formatDate = useCallback((dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }, [])

    const handleEditChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }, [])

    // Memoize navigation elements
    const backLink = useMemo(() => (
        <Link 
            to="/feed" 
            className={`flex items-center gap-2 ${themeClasses.text.secondary} ${themeClasses.link} transition-colors`}
        >
            {icons.ArrowLeft}
            Back to Feed
        </Link>
    ), [icons.ArrowLeft, themeClasses.text.secondary, themeClasses.link])

    if (isLoading) {
        return (
            <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
                <Navigation 
                    showCreateBlog={true}
                    showBookmarks={true}
                    showMyBlogs={true}
                    backLink={{ to: "/feed", label: "Back to Feed" }}
                    onCreateBlog={() => navigate('/create-blog')}
                />
                <LoadingSpinner message="Loading blog..." />
            </div>
        )
    }

    if (error || !blog) {
        return (
            <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
                <Navigation 
                    showCreateBlog={true}
                    showBookmarks={true}
                    showMyBlogs={true}
                    backLink={{ to: "/feed", label: "Back to Feed" }}
                    onCreateBlog={() => navigate('/create-blog')}
                />
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className={`text-center py-12 ${themeClasses.card} rounded-xl border`}>
                        <h3 className={`text-lg font-medium ${themeClasses.text.primary} mb-2`}>Blog not found</h3>
                        <p className={`${themeClasses.text.secondary} mb-4`}>{error || 'The blog you are looking for does not exist.'}</p>
                        {backLink}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
            {/* Header */}
            <Navigation 
                showCreateBlog={true}
                showBookmarks={true}
                showMyBlogs={true}
                backLink={{ to: "/feed", label: "Back to Feed" }}
                onCreateBlog={() => navigate('/create-blog')}
            />

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <article className={`p-8 rounded-xl border transition-all duration-300 ${themeClasses.card} animate-in fade-in slide-in-from-bottom duration-700`}>
                    {/* Action Buttons */}
                    <div className="flex justify-between items-start mb-6">
                        {/* Bookmark Button */}
                        {currentUser && (
                            <button
                                onClick={handleBookmarkToggle}
                                disabled={isBookmarking}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                                    isBookmarked 
                                        ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
                                        : `${themeClasses.text.secondary} hover:${themeClasses.text.primary} ${themeClasses.button}`
                                }`}
                            >
                                {isBookmarked ? icons.BookmarkCheck : icons.Bookmark}
                                {isBookmarking ? 'Loading...' : (isBookmarked ? 'Bookmarked' : 'Bookmark')}
                            </button>
                        )}

                        {/* Author Actions */}
                        {isAuthor && !isEditing && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-3 py-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-md transition-colors"
                                >
                                    {icons.Edit}
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                                >
                                    {icons.Trash2}
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Edit Form */}
                    {isEditing ? (
                        <div className="space-y-6">
                            <div>
                                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleEditChange}
                                    className={`w-full px-4 py-3 rounded-md border transition-colors ${themeClasses.input} focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                                    Content
                                </label>
                                <textarea
                                    name="content"
                                    value={editForm.content}
                                    onChange={handleEditChange}
                                    rows={12}
                                    className={`w-full px-4 py-3 rounded-md border transition-colors resize-none ${themeClasses.textarea} focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleUpdate}
                                    disabled={isUpdating}
                                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors disabled:opacity-50"
                                >
                                    {icons.Save}
                                    {isUpdating ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false)
                                        setEditForm({
                                            title: blog.title,
                                            content: blog.content
                                        })
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-colors ${themeClasses.text.secondary} hover:${themeClasses.text.primary} ${isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}`}
                                >
                                    {icons.X}
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Blog Header */}
                            <header className="mb-8">
                                <h1 className={`text-3xl md:text-4xl font-bold ${themeClasses.text.primary} mb-4 leading-tight`}>
                                    {blog.title}
                                </h1>
                                
                                <div className={`flex flex-wrap items-center gap-4 text-sm ${themeClasses.text.muted} pb-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className="flex items-center gap-1">
                                        {icons.User}
                                        <span>{blog.author.username}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {icons.Calendar}
                                        <span>Published {formatDate(blog.createdAt)}</span>
                                    </div>
                                    {blog.updatedAt !== blog.createdAt && (
                                        <div className="flex items-center gap-1">
                                            {icons.Edit}
                                            <span>Updated {formatDate(blog.updatedAt)}</span>
                                        </div>
                                    )}
                                </div>
                            </header>

                            {/* Blog Content */}
                            <div className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                                <div className={`${themeClasses.text.secondary} leading-relaxed whitespace-pre-wrap`}>
                                    {blog.content}
                                </div>
                            </div>
                        </>
                    )}
                </article>
            </div>
        </div>
    )
}
                                