import { cn } from '../../lib/helpers'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = { sm: 'h-4 w-4 border-2', md: 'h-8 w-8 border-2', lg: 'h-12 w-12 border-3' }

export function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <div className={cn('flex items-center justify-center py-8', className)} role="status" aria-label="Loading">
      <div
        className={cn(
          'animate-spin rounded-full border-border border-t-accent',
          sizes[size],
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
