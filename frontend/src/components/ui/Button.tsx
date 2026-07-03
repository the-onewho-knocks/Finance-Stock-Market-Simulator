import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/helpers'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-800/50 disabled:text-blue-300',
  secondary: 'bg-[#1f1f1f] text-gray-200 hover:bg-[#262626] active:bg-[#3d4250] disabled:opacity-50',
  ghost: 'bg-transparent text-gray-400 hover:bg-[#1f1f1f] hover:text-gray-200 active:bg-[#262626] disabled:opacity-50',
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
        'inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer select-none',
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
