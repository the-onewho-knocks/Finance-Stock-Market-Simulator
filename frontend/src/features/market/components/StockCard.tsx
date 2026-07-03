import { Card, CardTitle } from '../../../components/ui/Card'
import { formatCompactCurrency } from '../../../lib/formatCurrency'
import type { StockQuote } from '../types'

interface StockCardProps {
  quote: StockQuote
}

export function StockCard({ quote }: StockCardProps) {
  const isUp = quote.change >= 0

  return (
    <Card>
      <CardTitle>{quote.name}</CardTitle>
      <div className="mt-2 text-2xl font-bold text-gray-100">${quote.price.toFixed(2)}</div>
      <div className={isUp ? 'text-green-400' : 'text-red-400'}>
        {isUp ? '+' : ''}{quote.change.toFixed(2)} ({quote.change_percent.toFixed(2)}%)
      </div>
      <div className="mt-3 space-y-1 text-xs text-gray-500">
        <div className="flex justify-between"><span>Market Cap</span><span>{quote.market_cap ? formatCompactCurrency(quote.market_cap) : '\u2014'}</span></div>
        <div className="flex justify-between"><span>P/E</span><span>{quote.pe_ratio?.toFixed(2) || '\u2014'}</span></div>
        <div className="flex justify-between"><span>Div Yield</span><span>{quote.dividend_yield ? `${(quote.dividend_yield * 100).toFixed(2)}%` : '\u2014'}</span></div>
      </div>
    </Card>
  )
}
