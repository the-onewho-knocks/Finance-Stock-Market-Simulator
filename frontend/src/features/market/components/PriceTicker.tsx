import { cn } from '../../../lib/helpers'
import type { StockPrice } from '../types'

interface PriceTickerProps {
  price: StockPrice
  onClick?: () => void
}

export function PriceTicker({ price, onClick }: PriceTickerProps) {
  const isUp = price.change >= 0

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3 transition-colors',
        onClick && 'cursor-pointer hover:bg-border',
      )}
    >
      <div>
        <div className="text-sm font-semibold text-gray-100">{price.symbol}</div>
        <div className="text-xs text-gray-500">Vol: {(price.volume / 1_000_000).toFixed(1)}M</div>
      </div>
      <div className="ml-auto text-right">
        <div className="text-sm font-semibold text-gray-100">${price.price.toFixed(2)}</div>
        <div className={cn('text-xs', isUp ? 'text-green-400' : 'text-red-400')}>
          {isUp ? '+' : ''}{price.change.toFixed(2)} ({price.change_percent.toFixed(2)}%)
        </div>
      </div>
    </div>
  )
}
