import { Loader } from '../../../components/ui/Loader'
import type { StockPrice } from '../types'
import { PriceTicker } from './PriceTicker'

interface MarketStatsProps {
  prices: StockPrice[]
  loading?: boolean
  onSelectSymbol?: (symbol: string) => void
}

export function MarketStats({ prices, loading, onSelectSymbol }: MarketStatsProps) {
  if (loading) return <Loader />
  if (!prices.length) return <p className="text-sm text-gray-500">No prices available</p>

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {prices.map((p) => (
        <PriceTicker key={p.symbol} price={p} onClick={() => onSelectSymbol?.(p.symbol)} />
      ))}
    </div>
  )
}
