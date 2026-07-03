import { Card } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'

interface NetWorthSummaryProps {
  latest: number
  change?: number
}

export function NetWorthSummary({ latest, change }: NetWorthSummaryProps) {
  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <p className="text-xs text-gray-500">Current Net Worth</p>
      <p className="mt-1 text-3xl font-bold text-gray-100">{formatCurrency(latest)}</p>
      {change !== undefined && (
        <p className={change >= 0 ? 'mt-1 text-sm text-green-400' : 'mt-1 text-sm text-red-400'}>
          {change >= 0 ? '+' : ''}{formatCurrency(change)}
        </p>
      )}
    </Card>
  )
}
