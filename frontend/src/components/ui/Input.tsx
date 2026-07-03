import { type InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '../../lib/helpers'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id: externalId, ...props }, ref) => {
    const autoId = useId()
    const inputId = externalId || autoId

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-gray-400">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            'w-full rounded-md border border-border bg-black px-3 py-2 text-sm text-gray-200 placeholder-gray-500 transition-all duration-200',
            'focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
