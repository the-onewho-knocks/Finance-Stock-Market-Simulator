import { Card } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'
import type { PortfolioMetrics as Metrics } from '../types'

interface PortfolioMetricsProps {
  metrics: Metrics
}

export function PortfolioMetricsView({ metrics }: PortfolioMetricsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <p className="text-xs text-gray-500">Total Value</p>
        <p className="mt-1 text-lg font-bold text-gray-100">{formatCurrency(metrics.total_value)}</p>
      </Card>
      <Card>
        <p className="text-xs text-gray-500">P&amp;L</p>
        <p className={metrics.total_gain_loss >= 0 ? 'mt-1 text-lg font-bold text-green-400' : 'mt-1 text-lg font-bold text-red-400'}>
          {metrics.total_gain_loss >= 0 ? '+' : ''}{formatCurrency(metrics.total_gain_loss)}
        </p>
      </Card>
      <Card>
        <p className="text-xs text-gray-500">Best</p>
        <p className="mt-1 text-sm font-bold text-green-400">{metrics.best_performer?.symbol || '\u2014'}</p>
      </Card>
      <Card>
        <p className="text-xs text-gray-500">Worst</p>
        <p className="mt-1 text-sm font-bold text-red-400">{metrics.worst_performer?.symbol || '\u2014'}</p>
      </Card>
    </div>
  )
}
