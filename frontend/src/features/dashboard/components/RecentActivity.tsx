import { Card, CardTitle } from '../../../components/ui/Card'
import { timeAgo } from '../../../lib/formatDate'
import { formatCurrency } from '../../../lib/formatCurrency'
import type { Transaction } from '../../transactions/types'

interface RecentActivityProps {
  transactions: Transaction[]
}

export function RecentActivity({ transactions }: RecentActivityProps) {
  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <CardTitle>Recent Activity</CardTitle>
      <div className="mt-3 space-y-2">
        {transactions.slice(0, 5).map((t) => (
          <div key={t.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className={t.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                {t.type === 'buy' ? 'Bought' : 'Sold'}
              </span>
              <span className="text-gray-200">{t.symbol}</span>
              <span className="text-gray-500">{t.quantity} shares</span>
            </div>
            <div className="text-right">
              <span className="text-gray-300">{formatCurrency(t.total)}</span>
              <span className="ml-2 text-xs text-gray-600">{timeAgo(t.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
