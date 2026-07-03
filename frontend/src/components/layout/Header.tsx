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
    <header className="sticky top-0 z-30 bg-[#0d0d0d]">
      <div className="flex h-12 items-center justify-between border-b border-[#1f1f1f] px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="rounded p-1 text-gray-400 hover:bg-[#1f1f1f] hover:text-gray-200 transition-colors cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-sm font-medium text-gray-200">Finance Simulation</h1>
          {isGuest && (
            <span className="rounded border border-[#1f1f1f] px-1.5 py-0.5 text-[10px] font-medium text-gray-500">Guest</span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-400 hover:bg-[#1f1f1f] transition-colors cursor-pointer"
          >
            <User className="h-4 w-4" />
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-40 rounded-lg border border-[#1f1f1f] bg-[#0d0d0d] py-1 shadow-lg">
              <button
                onClick={() => { navigate('/profile'); setOpen(false) }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#1f1f1f] cursor-pointer"
              >
                <User className="h-4 w-4" /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-[#1f1f1f] cursor-pointer"
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
