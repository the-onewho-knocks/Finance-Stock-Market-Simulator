import { cn } from '../../lib/helpers'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse rounded bg-[#1a1a1a]',
        className,
      )}
    />
  )
}
