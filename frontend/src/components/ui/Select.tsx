import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/helpers'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
  placeholder?: string
  label?: string
}

export function Select({ className, options, placeholder, label, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-1.5 block text-xs font-medium text-gray-400">{label}</label>}
      <select
        className={cn(
          'w-full rounded-md border border-[#1f1f1f] bg-[#000000] px-3 py-2 text-sm text-gray-200 transition-all duration-150',
        'focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none',
        'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%239ca3af%27 stroke-width=%272%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8',
        className,
      )}
      {...props}
    >
      {placeholder && <option value="" className="bg-[#0d0d0d]">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-[#0d0d0d]">
          {opt.label}
        </option>
      ))}
    </select>
    </div>
  )
}
