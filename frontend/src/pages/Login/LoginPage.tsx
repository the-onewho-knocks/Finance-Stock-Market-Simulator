import { useNavigate } from 'react-router-dom'
import { GoogleLoginButton } from '../../features/auth/components/GoogleLoginButton'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleGuest = () => {
    localStorage.setItem('guest_mode', 'true')
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#000000] p-4"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%),
          radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)
        `,
        backgroundSize: '100% 100%, 40px 40px',
      }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg"
            style={{ boxShadow: '0 8px 32px rgba(59,130,246,0.3)' }}
          >
            <span className="text-2xl font-bold text-white">FS</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Finance Simulation</h1>
          <p className="mt-1 text-sm text-gray-400">Sign in to your dashboard</p>
        </div>

        <div className="rounded-xl border border-[#363a45] bg-[#0d0d0d] p-8"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
        >
          <GoogleLoginButton />
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1f1f1f]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0d0d0d] px-2 text-gray-600">or</span>
            </div>
          </div>
          <button
            onClick={handleGuest}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-[#1f1f1f] bg-transparent px-4 py-2.5 text-sm text-gray-400 hover:bg-[#1f1f1f] hover:text-gray-200 transition-colors cursor-pointer"
          >
            Continue as Guest
          </button>
          <p className="mt-5 text-center text-xs text-gray-600">
            By signing in, you agree to our Terms of Service
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-700">
          Go + React + Python microservices
        </p>
      </div>
    </div>
  )
}
