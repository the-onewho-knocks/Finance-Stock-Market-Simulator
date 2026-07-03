import type { HTMLAttributes, TableHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '../../lib/helpers'

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  compact?: boolean
}

export function Table({ className, compact, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className={cn('w-full text-sm', compact && 'text-xs', className)} {...props} />
    </div>
  )
}

export function THead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('bg-black', className)} {...props} />
}

export function TBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('divide-y divide-[#1f1f1f]/60', className)} {...props} />
}

export function Th({ className, scope, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope={scope || 'col'}
      className={cn('px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500', className)}
      {...props}
    />
  )
}

export function Td({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-4 py-3 text-sm text-gray-300', className)} {...props} />
}

export function Tr({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('hover:bg-border/40 transition-colors', className)} {...props} />
}
