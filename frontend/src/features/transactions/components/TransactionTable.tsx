import { formatDate } from '../../../lib/formatDate'
import { formatCurrency } from '../../../lib/formatCurrency'
import { Badge } from '../../../components/ui/Badge'
import type { Transaction } from '../types'

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (!transactions.length) return <p className="text-sm text-gray-500">No transactions</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[#1f1f1f] text-left text-xs text-gray-500">
            <th className="pb-2 pr-4 font-medium">Date</th>
            <th className="pb-2 pr-4 font-medium">Type</th>
            <th className="pb-2 pr-4 font-medium">Symbol</th>
            <th className="pb-2 pr-4 font-medium">Qty</th>
            <th className="pb-2 pr-4 font-medium">Price</th>
            <th className="pb-2 font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b border-[#1f1f1f]/50 text-gray-300">
              <td className="py-2.5 pr-4 text-xs text-gray-500">{formatDate(t.timestamp, 'MMM dd, HH:mm')}</td>
              <td className="py-2.5 pr-4">
                <Badge variant={t.type === 'buy' ? 'success' : 'danger'}>{t.type}</Badge>
              </td>
              <td className="py-2.5 pr-4 font-medium text-gray-100">{t.symbol}</td>
              <td className="py-2.5 pr-4">{t.quantity}</td>
              <td className="py-2.5 pr-4">${t.price.toFixed(2)}</td>
              <td className="py-2.5 font-semibold text-gray-100">{formatCurrency(t.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
