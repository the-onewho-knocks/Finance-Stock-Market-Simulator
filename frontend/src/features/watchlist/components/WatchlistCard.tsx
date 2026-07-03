import type { WatchlistItem } from '../types'

interface WatchlistCardProps {
  item: WatchlistItem
  onRemove: (symbol: string) => void
  onClick: (symbol: string) => void
}

export function WatchlistCard({ item, onRemove, onClick }: WatchlistCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#1f1f1f] bg-[#0d0d0d] px-4 py-3">
      <button onClick={() => onClick(item.symbol)} className="text-sm font-semibold text-gray-100 hover:text-blue-400 cursor-pointer">
        {item.symbol}
      </button>
      <button onClick={() => onRemove(item.symbol)} className="text-xs text-gray-500 hover:text-red-400 cursor-pointer">
        Remove
      </button>
    </div>
  )
}
