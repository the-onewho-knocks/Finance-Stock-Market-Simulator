import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/helpers'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover active:bg-accent-dark disabled:bg-accent-dark/50 disabled:text-accent-light/60',
  secondary: 'bg-border text-gray-200 hover:bg-[#262626] active:bg-[#3d4250] disabled:opacity-50',
  ghost: 'bg-transparent text-gray-400 hover:bg-border hover:text-gray-200 active:bg-[#262626] disabled:opacity-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-800/50 disabled:text-red-300',
}

const sizes: Record<Size, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer select-none',
        variants[variant],
        sizes[size],
        disabled && 'cursor-not-allowed',
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
