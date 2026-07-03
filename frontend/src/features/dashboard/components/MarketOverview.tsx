import { Card, CardTitle } from '../../../components/ui/Card'
import type { StockPrice } from '../../market/types'

interface MarketOverviewProps {
  prices: StockPrice[]
}

export function MarketOverviewCard({ prices }: MarketOverviewProps) {
  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <CardTitle>Market Prices</CardTitle>
      <div className="mt-3 space-y-2">
        {prices.slice(0, 6).map((p) => (
          <div key={p.symbol} className="flex justify-between text-sm">
            <span className="text-gray-400">{p.symbol}</span>
            <span className="text-gray-200">${p.price.toFixed(2)}</span>
            <span className={p.change >= 0 ? 'text-green-400' : 'text-red-400'}>
              {p.change >= 0 ? '+' : ''}{p.change_percent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
