import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authApi } from '../../features/auth/api/authApi'
import { setUser, setToken, setGuest } from '../../features/auth/store/authSlice'
import { GoogleLoginButton } from '../../features/auth/components/GoogleLoginButton'
import type { AppDispatch } from '../../app/store'

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setLocalError] = useState('')

  useEffect(() => {
    if (searchParams.get('guest') === '1') {
      dispatch(setGuest())
      navigate('/dashboard')
    }
  }, [searchParams, dispatch, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setLocalError('Please fill in all fields')
      return
    }
    setLoading(true)
    setLocalError('')
    try {
      const { token, user } = await authApi.login(email, password)
      dispatch(setToken(token))
      dispatch(setUser(user))
      navigate('/dashboard')
    } catch {
      setLocalError('Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleGuest = () => {
    dispatch(setGuest())
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 animate-fadeIn"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(127,0,255,0.12) 0%, transparent 60%),
          radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)
        `,
        backgroundSize: '100% 100%, 40px 40px',
      }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-100">Welcome Back</h1>
          <p className="mt-1.5 text-sm text-gray-500">Sign in to your HexaFinance account</p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-8"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@hexafinance.app"
                className="w-full rounded-md border border-border bg-black px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter any password"
                className="w-full rounded-md border border-border bg-black px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-colors"
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50 transition-colors cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface px-2 text-gray-600">or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <GoogleLoginButton />
            <button
              onClick={handleGuest}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-gray-400 hover:bg-surface-hover hover:text-gray-200 transition-colors cursor-pointer"
            >
              Continue as Guest
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent-light hover:underline">Create one</Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-700">
          Go + React + Python microservices
        </p>
      </div>
    </div>
  )
}
