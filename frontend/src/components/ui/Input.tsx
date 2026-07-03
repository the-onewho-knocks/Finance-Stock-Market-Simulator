import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/helpers'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="mb-1.5 block text-xs font-medium text-gray-400">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-md border bg-[#000000] px-3 py-2 text-sm text-gray-200 placeholder-gray-500 transition-all duration-200',
          'border-[#1f1f1f] focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  ),
)
Input.displayName = 'Input'
