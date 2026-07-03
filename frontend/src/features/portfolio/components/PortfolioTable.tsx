import { formatCurrency } from '../../../lib/formatCurrency'
import type { Holding } from '../types'

interface PortfolioTableProps {
  holdings: Holding[]
}

export function PortfolioTable({ holdings }: PortfolioTableProps) {
  if (!holdings.length) return <p className="text-sm text-gray-500">No holdings</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-gray-500">
            <th className="pb-2 pr-4 font-medium">Symbol</th>
            <th className="pb-2 pr-4 font-medium">Qty</th>
            <th className="pb-2 pr-4 font-medium">Avg Price</th>
            <th className="pb-2 pr-4 font-medium">Current</th>
            <th className="pb-2 pr-4 font-medium">Value</th>
            <th className="pb-2 font-medium">P&amp;L</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => (
            <tr key={h.symbol} className="border-b border-border/50 text-gray-300">
              <td className="py-2.5 pr-4 font-medium text-gray-100">{h.symbol}</td>
              <td className="py-2.5 pr-4">{h.quantity}</td>
              <td className="py-2.5 pr-4">${h.avg_price.toFixed(2)}</td>
              <td className="py-2.5 pr-4">${h.current_price.toFixed(2)}</td>
              <td className="py-2.5 pr-4">{formatCurrency(h.total_value)}</td>
              <td className={h.gain_loss >= 0 ? 'py-2.5 text-green-400' : 'py-2.5 text-red-400'}>
                {h.gain_loss >= 0 ? '+' : ''}{h.gain_loss_percent.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
