import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Star, Bookmark, PenTool, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../components/ThemeProvider'
import { useAuth } from '../components/AuthProvider'
import { ThemeToggle } from '../components/ThemeToggle'

export default function Landing() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isDarkMode, themeClasses } = useTheme()
    const { isAuthenticated, user, logout, isLoading } = useAuth()

    const handleLogout = async () => {
        await logout()
        setIsMenuOpen(false)
    }
    
    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
            {/* top NavBar */}
            <nav className={`border-b sticky top-0 z-50 transition-colors duration-300 ${themeClasses.nav} backdrop-blur-sm`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-sky-600" />
                            <span className={`ml-2 text-xl font-bold transition-colors ${themeClasses.text.primary}`}>BlogHub</span>
                        </div>

                        {/* Desktop Navbar*/}
                        <div className="hidden md:flex items-center space-x-4">
                            <button 
                                onClick={() => navigate('/feed')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary}`}
                            >
                                Feed
                            </button>
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
                                        My Bookmarks
                                    </button>
                                </>
                            )}
                            <ThemeToggle />
                            
                            {!isLoading && (
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

                        {/* mobile menu button */}
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

                    {/* menu on mobile */}
                    {isMenuOpen && (
                        <div className={`md:hidden border-t backdrop-blur-sm transition-colors ${themeClasses.nav}`}>
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <button 
                                    onClick={() => {navigate('/feed'); setIsMenuOpen(false)}}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${themeClasses.text.secondary} hover:${themeClasses.text.primary} ${themeClasses.button}`}
                                >
                                    Feed
                                </button>
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
                                            My Bookmarks
                                        </button>
                                    </>
                                )}
                                
                                {!isLoading && (
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

            {/* Main Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16">
                    <div className="text-center">
                        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100 leading-tight transition-colors ${themeClasses.text.primary}`}>
                            Welcome to the
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                                Hub of Blogs
                            </span>
                        </h1>
                        <p className={`text-lg sm:text-xl mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-150 px-4 transition-colors ${themeClasses.text.secondary}`}>
                            Your journey into the world of blogging starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom duration-700 delay-100 px-4">
                            <button 
                                onClick={() => navigate(isAuthenticated ? '/create-blog' : '/signup')}
                                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-base sm:text-lg font-semibold cursor-pointer"
                            >
                                Start Writing Today
                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button 
                                onClick={() => navigate('/feed')}
                                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-full transition-all duration-300 text-base sm:text-lg font-semibold cursor-pointer ${isDarkMode ? 'border-gray-600 text-gray-300 hover:border-sky-600 hover:text-sky-400' : 'border-gray-300 text-gray-700 hover:border-sky-600 hover:text-sky-600'}`}
                            >
                                Explore Stories
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors ${themeClasses.text.primary}`}>
                            Why Choose BlogHub?
                        </h2>
                        <p className={`text-xl max-w-2xl mx-auto transition-colors ${themeClasses.text.secondary}`}>
                            Everything you need to create, share, and discover amazing content
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className={`text-center p-6 rounded-xl hover:shadow-lg transition-all delay-100 group animate-in fade-in slide-in-from-bottom duration-700 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-100 ${isDarkMode ? 'bg-sky-900' : 'bg-sky-100'}`}>
                                <PenTool className="h-8 w-8 text-sky-600" />
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 transition-colors ${themeClasses.text.primary}`}>Easy Writing</h3>
                            <p className={`transition-colors ${themeClasses.text.secondary}`}>Intuitive editor with powerful formatting tools to bring your ideas to life</p>
                        </div>
                        
                        <div className={`text-center p-6 rounded-xl hover:shadow-lg transition-all delay-150 duration-300 group animate-in fade-in slide-in-from-bottom duration-700 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-100 ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                                <Users className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 transition-colors ${themeClasses.text.primary}`}>Community</h3>
                            <p className={`transition-colors ${themeClasses.text.secondary}`}>Connect with like-minded writers and readers from around the globe</p>
                        </div>
                        
                        <div className={`text-center p-6 rounded-xl hover:shadow-lg transition-all delay-150 duration-300 group animate-in fade-in slide-in-from-bottom duration-700 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-100 ${isDarkMode ? 'bg-amber-900' : 'bg-amber-100'}`}>
                                <Star className="h-8 w-8 text-amber-600" />
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 transition-colors ${themeClasses.text.primary}`}>Quality Content</h3>
                            <p className={`transition-colors ${themeClasses.text.secondary}`}>Curated stories and articles that inspire, educate, and entertain</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* cta section */}
            <section className="py-20 bg-gradient-to-r from-sky-600 to-indigo-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Blogging Journey?
                    </h2>
                    <p className="text-xl text-sky-100 mb-8">
                        Join writers who are already sharing their stories on BlogHub
                    </p>
                    <button 
                        onClick={() => navigate(isAuthenticated ? '/create-blog' : '/signup')}
                        className="bg-white text-sky-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors transform hover:scale-105 duration-300 animate-in fade-in zoom-in delay-700 cursor-pointer"
                    >
                        Get Started for Free
                    </button>
                </div>
            </section>
        </div>
    )
}