import type { WatchlistItem } from '../types'

interface WatchlistCardProps {
  item: WatchlistItem
  onRemove: (symbol: string) => void
  onClick: (symbol: string) => void
}

export function WatchlistCard({ item, onRemove, onClick }: WatchlistCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
      <button onClick={() => onClick(item.symbol)} className="text-sm font-semibold text-gray-100 hover:text-accent-light cursor-pointer">
        {item.symbol}
      </button>
      <button onClick={() => onRemove(item.symbol)} className="text-xs text-gray-500 hover:text-red-400 cursor-pointer">
        Remove
      </button>
    </div>
  )
}
