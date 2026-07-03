import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/helpers'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info'
}

const badgeVariants = {
  default: 'bg-border text-gray-300',
  success: 'bg-green-900/40 text-green-400 border border-green-800/30',
  danger: 'bg-red-900/40 text-red-400 border border-red-800/30',
  warning: 'bg-yellow-900/40 text-yellow-400 border border-yellow-800/30',
  info: 'bg-accent-dark/40 text-accent-light border border-accent-dark/30',
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', badgeVariants[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
}
