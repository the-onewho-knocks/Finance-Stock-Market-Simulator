import { type HTMLAttributes, useId } from 'react'
import { cn } from '../../lib/helpers'

interface TabsProps {
  tabs: { key: string; label: string }[]
  active: string
  onChange: (key: string) => void
  className?: string
  id?: string
}

export function Tabs({ tabs, active, onChange, className, id: externalId }: TabsProps) {
  const autoId = useId()
  const id = externalId || autoId

  return (
    <div className={cn('flex border-b border-border', className)} role="tablist" aria-label="Navigation tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          id={`${id}-tab-${tab.key}`}
          aria-selected={active === tab.key}
          aria-controls={`${id}-panel-${tab.key}`}
          onClick={() => onChange(tab.key)}
          className={cn(
            'px-4 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer border-b-2 -mb-px',
            active === tab.key
              ? 'border-accent text-accent-light'
              : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export function TabsContent({ id, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="tabpanel" id={id} className={cn('pt-4', className)} {...props} />
}
