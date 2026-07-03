import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/helpers'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'elevated' | 'bordered'
}

const paddings = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-8' }
const variants = {
  default: 'bg-surface border border-border',
  elevated: 'bg-surface border border-border shadow-lg shadow-black/20 glass-hover',
  glass: 'glass glass-hover',
}

export function Card({ className, padding = 'md', variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-xl transition-all duration-300 hover:-translate-y-0.5', variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-3 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-sm font-semibold text-gray-200', className)} {...props}>
      {children}
    </h3>
  )
}
