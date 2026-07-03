import { Card } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'
import type { Holding } from '../types'

interface HoldingsCardProps {
  holdings: Holding[]
}

export function HoldingsCard({ holdings }: HoldingsCardProps) {
  if (!holdings.length) return <p className="text-sm text-gray-500">No holdings</p>

  return (
    <div className="space-y-2">
      {holdings.map((h) => (
        <Card key={h.symbol} className="flex items-center justify-between bg-[#0d0d0d] border-[#1f1f1f]">
          <div>
            <p className="text-sm font-semibold text-gray-100">{h.symbol}</p>
            <p className="text-xs text-gray-500">{h.quantity} shares @ ${h.avg_price.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-100">{formatCurrency(h.total_value)}</p>
            <p className={h.gain_loss >= 0 ? 'text-xs text-green-400' : 'text-xs text-red-400'}>
              {h.gain_loss >= 0 ? '+' : ''}{h.gain_loss_percent.toFixed(2)}%
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
