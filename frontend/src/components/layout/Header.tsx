import { useState } from 'react'
import { LogOut, User, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface HeaderProps {
  onToggleSidebar: () => void
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const isGuest = localStorage.getItem('guest_mode') === 'true'

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('guest_mode')
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-all duration-200 cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-xs font-bold text-accent-light">HF</span>
            </div>
            <span className="text-sm font-medium text-gray-200">HexaFinance</span>
          </div>
          {isGuest && (
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-gray-500 backdrop-blur-sm">Guest</span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            <User className="h-4 w-4" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl py-1.5 shadow-2xl shadow-black/40">
              <button
                onClick={() => { navigate('/profile'); setOpen(false) }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <User className="h-4 w-4" /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
