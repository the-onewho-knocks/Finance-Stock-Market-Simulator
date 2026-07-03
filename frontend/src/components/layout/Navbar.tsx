import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/helpers'

const links = [
  { to: '/market', label: 'Prices' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/transactions', label: 'History' },
  { to: '/research', label: 'Research' },
]

export default function Navbar() {
  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cn(
              'px-3 py-1.5 text-xs font-medium rounded transition-colors',
              isActive ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-gray-200',
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
