import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/helpers'
import {
  LayoutDashboard, TrendingUp, Wallet, ArrowLeftRight,
  BarChart3, Newspaper, Star, Search,
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
        'fixed left-0 top-0 z-40 h-screen w-56 border-r border-white/5 bg-black/60 backdrop-blur-xl overflow-y-auto transition-transform duration-300',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-white/5 px-4 py-4">
        <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
          <span className="text-xs font-bold text-accent-light">HF</span>
        </div>
        <span className="text-sm font-semibold text-gray-200">HexaFinance</span>
      </div>
      <nav className="space-y-0.5 p-2.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200',
                isActive
                  ? 'bg-accent/15 text-accent-light shadow-sm shadow-accent/5'
                  : 'text-gray-500 hover:bg-white/5 hover:text-gray-200',
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
