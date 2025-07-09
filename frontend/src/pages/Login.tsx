import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import axios from 'axios'
import { useTheme } from '../components/ThemeProvider'
import { useAuth } from '../components/AuthProvider'
import { Navigation } from '../components/Navigation'
import { FormInput } from '../components/FormInput'
import { Alert } from '../components/Alert'

export default function Login() {
    const navigate = useNavigate()
    const { themeClasses } = useTheme()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess('')

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData, {
                withCredentials: true,
            })

            // Get user data after successful login
            const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                withCredentials: true,
            })

            login(userResponse.data)
            setSuccess('Login successful! Redirecting...')
            setTimeout(() => navigate('/feed'), 2000)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Memoize icons to prevent re-renders when typing
    const icons = useMemo(() => ({
        Mail: <Mail className="h-5 w-5" />,
        Lock: <Lock className="h-5 w-5" />,
        Eye: <Eye className="h-5 w-5" />,
        EyeOff: <EyeOff className="h-5 w-5" />
    }), [])

    const signupLink = useMemo(() => (
        <Link to="/signup" className={`text-sky-600 ${themeClasses.link} font-medium`}>
            Sign up
        </Link>
    ), [themeClasses.link])

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
            <Navigation showAuthButtons={true} />

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
                <div className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors ${themeClasses.card} border animate-in fade-in slide-in-from-bottom duration-700`}>
                    <div className="text-center mb-8">
                        <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>Welcome Back</h1>
                        <p className={themeClasses.text.secondary}>Sign in to your BlogHub account</p>
                    </div>

                    {error && <Alert message={error} type="error" />}
                    {success && <Alert message={success} type="success" />}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormInput
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            label="Email"
                            icon={icons.Mail}
                            required
                        />

                        <FormInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            label="Password"
                            icon={icons.Lock}
                            rightIcon={showPassword ? icons.EyeOff : icons.Eye}
                            onRightIconClick={() => setShowPassword(!showPassword)}
                            required
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-sky-600 text-white font-medium rounded-md hover:bg-sky-700 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className={themeClasses.text.secondary}>
                            Don't have an account?{' '}
                            {signupLink}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}