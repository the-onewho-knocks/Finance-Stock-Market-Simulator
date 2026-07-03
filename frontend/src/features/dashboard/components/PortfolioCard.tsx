import { Card, CardTitle } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'
import type { Holding } from '../../portfolio/types'

interface PortfolioCardProps {
  holdings: Holding[]
  totalValue: number
  totalPnl: number
}

export function PortfolioCard({ holdings, totalValue, totalPnl }: PortfolioCardProps) {
  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <CardTitle>Portfolio</CardTitle>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="text-2xl font-bold text-gray-100">{formatCurrency(totalValue)}</span>
        <span className={totalPnl >= 0 ? 'text-sm text-green-400' : 'text-sm text-red-400'}>
          {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)}
        </span>
      </div>
      <div className="mt-3 space-y-1">
        {holdings.slice(0, 5).map((h) => (
          <div key={h.symbol} className="flex justify-between text-sm">
            <span className="text-gray-400">{h.symbol}</span>
            <span className="text-gray-200">{formatCurrency(h.total_value)}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
