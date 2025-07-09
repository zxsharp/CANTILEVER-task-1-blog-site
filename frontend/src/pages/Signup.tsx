import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import axios from 'axios'
import { useTheme } from '../components/ThemeProvider'
import { Navigation } from '../components/Navigation'
import { FormInput } from '../components/FormInput'
import { Alert } from '../components/Alert'

export default function Signup() {
    const navigate = useNavigate()
    const { themeClasses } = useTheme()
    const [formData, setFormData] = useState({
        username: '',
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
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData, {
                withCredentials: true,
            })

            setSuccess('Registration successful! Redirecting to login...')
            setTimeout(() => navigate('/login'), 2000)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed')
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
        User: <User className="h-5 w-5" />,
        Mail: <Mail className="h-5 w-5" />,
        Lock: <Lock className="h-5 w-5" />,
        Eye: <Eye className="h-5 w-5" />,
        EyeOff: <EyeOff className="h-5 w-5" />
    }), [])

    const loginLink = useMemo(() => (
        <Link to="/login" className={`text-sky-600 ${themeClasses.link} font-medium`}>
            Log in
        </Link>
    ), [themeClasses.link])

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses.container}`}>
            <Navigation showAuthButtons={true} />

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
                <div className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors ${themeClasses.card} border animate-in fade-in slide-in-from-bottom duration-700`}>
                    <div className="text-center mb-8">
                        <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>Create an Account</h1>
                        <p className={themeClasses.text.secondary}>Sign up to start your journey with BlogHub</p>
                    </div>

                    {error && <Alert message={error} type="error" />}
                    {success && <Alert message={success} type="success" />}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormInput
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            label="Username"
                            icon={icons.User}
                            required
                        />

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
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className={themeClasses.text.secondary}>
                            Already have an account?{' '}
                            {loginLink}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}