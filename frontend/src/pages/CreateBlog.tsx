import { useState, useCallback, useMemo } from 'react'
import { useNavigate} from 'react-router-dom'
import { BookOpen, PenTool, Type, Moon, Sun, ArrowLeft } from 'lucide-react'
import axios from 'axios'
import { Navigation } from '../components/Navigation'

export default function CreateBlog() {
    const navigate = useNavigate()
    const [isDarkMode] = useState(true)
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Memoize theme classes to avoid recalculation on every render
    const themeClasses = useMemo(() => ({
        container: isDarkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-slate-50 to-sky-50',
        nav: isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200',
        card: isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
        text: {
            primary: isDarkMode ? 'text-white' : 'text-gray-900',
            secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
            icon: isDarkMode ? 'text-gray-300' : 'text-gray-600',
        },
        input: isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900',
        button: isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
        textarea: isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900',
    }), [isDarkMode])

    // Memoize icons to prevent re-renders
    const icons = useMemo(() => ({
        Type: <Type className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${themeClasses.text.icon}`} />,
        PenTool: <PenTool className={`absolute left-3 top-4 h-5 w-5 ${themeClasses.text.icon}`} />,
        Sun: <Sun className="h-5 w-5" />,
        Moon: <Moon className="h-5 w-5" />,
        BookOpen: <BookOpen className="h-8 w-8 text-sky-600" />,
        ArrowLeft: <ArrowLeft className="h-5 w-5" />
    }), [themeClasses.text.icon])

    // Memoize handlers
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess('')

        try {
            
            await axios.post('http://localhost:5000/api/blogs', formData, {
                withCredentials: true,
            })

            setSuccess('Blog created successfully! Redirecting...')
            setTimeout(() => navigate('/feed'), 2000)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create blog')
        } finally {
            setIsLoading(false)
        }
    }, [formData, navigate])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }, [])

    // Memoize form validation state
    const isFormValid = useMemo(() => {
        return formData.title.trim() !== '' && formData.content.trim() !== ''
    }, [formData])

    // Memoize links
    
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
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className={`p-8 rounded-xl shadow-lg transition-colors ${themeClasses.card} border animate-in fade-in slide-in-from-bottom duration-700`}>
                    <div className="mb-8">
                        <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>Create New Blog</h1>
                        <p className={themeClasses.text.secondary}>Share your thoughts and ideas with the world</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-md bg-red-100 border border-red-300 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 rounded-md bg-green-100 border border-green-300 text-green-700 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                                Blog Title
                            </label>
                            <div className="relative">
                                {icons.Type}
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className={`w-full pl-10 pr-4 py-3 rounded-md border transition-colors ${themeClasses.input} focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                                    placeholder="Enter your blog title"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="content" className={`block text-sm font-medium ${themeClasses.text.primary} mb-2`}>
                                Content
                            </label>
                            <div className="relative">
                                {icons.PenTool}
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    rows={12}
                                    className={`w-full pl-10 pr-4 py-3 rounded-md border transition-colors resize-none ${themeClasses.textarea} focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                                    placeholder="Write your blog content here..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isLoading || !isFormValid}
                                className="flex-1 py-3 px-4 bg-sky-600 text-white font-medium rounded-md hover:bg-sky-700 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Publishing...' : 'Publish Blog'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/feed')}
                                className={`px-6 py-3 border-2 rounded-md font-medium transition-colors ${isDarkMode ? 'border-gray-600 text-gray-300 hover:border-sky-600 hover:text-sky-400' : 'border-gray-300 text-gray-700 hover:border-sky-600 hover:text-sky-600'}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
