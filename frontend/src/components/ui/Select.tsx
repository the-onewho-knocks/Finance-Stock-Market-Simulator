import { type SelectHTMLAttributes, useId } from 'react'
import { cn } from '../../lib/helpers'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
  placeholder?: string
  label?: string
}

export function Select({ className, options, placeholder, label, id: externalId, ...props }: SelectProps) {
  const autoId = useId()
  const selectId = externalId || autoId

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-xs font-medium text-gray-400">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full rounded-md border border-border bg-black px-3 py-2 text-sm text-gray-200 transition-all duration-150',
          'focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%239ca3af%27 stroke-width=%272%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8',
          className,
        )}
        {...props}
      >
        {placeholder && <option value="" className="bg-surface">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
