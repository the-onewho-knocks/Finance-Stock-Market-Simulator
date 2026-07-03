import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/helpers'
import {
  LayoutDashboard, TrendingUp, Wallet, ArrowLeftRight,
  BarChart3, Newspaper, Star, Search, BrainCircuit,
  Receipt, CalendarRange, WalletCards, User, Info,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/market', icon: TrendingUp, label: 'Heatmap' },
  { to: '/portfolio', icon: Wallet, label: 'Portfolio' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/research', icon: Search, label: 'Research' },
  { to: '/news', icon: Newspaper, label: 'News' },
  { to: '/watchlist', icon: Star, label: 'Watchlist' },
  { to: '/ai-insights', icon: BrainCircuit, label: 'AI Insights' },
  { to: '/expenses', icon: Receipt, label: 'Expenses' },
  { to: '/planned-expenses', icon: CalendarRange, label: 'Planned' },
  { to: '/networth', icon: WalletCards, label: 'Net Worth' },
  { to: '/indicators', icon: BarChart3, label: 'Indicators' },
  { to: '/about', icon: Info, label: 'About' },
  { to: '/profile', icon: User, label: 'Profile' },
]

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen w-56 border-r border-[#1f1f1f] bg-[#0d0d0d] overflow-y-auto transition-transform duration-300',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#1f1f1f] px-4 py-4">
        <div className="h-7 w-7 rounded bg-accent flex items-center justify-center text-xs font-bold text-white">FS</div>
        <span className="text-sm font-semibold text-gray-100">Finance Sim</span>
      </div>
      <nav className="space-y-0.5 p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent/20 text-accent-light'
                  : 'text-gray-400 hover:bg-[#1f1f1f] hover:text-gray-200',
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
