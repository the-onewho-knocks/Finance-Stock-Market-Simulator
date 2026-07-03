import { formatDate } from '../../../lib/formatDate'
import { formatCurrency } from '../../../lib/formatCurrency'

interface NetWorthHistoryProps {
  history: { date: string; value: number }[]
}

export function NetWorthHistoryTable({ history }: NetWorthHistoryProps) {
  if (!history.length) return <p className="text-sm text-gray-500">No history</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-gray-500">
            <th className="pb-2 pr-4 font-medium">Date</th>
            <th className="pb-2 font-medium">Value</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, i) => (
            <tr key={i} className="border-b border-border/50 text-gray-300">
              <td className="py-2.5 pr-4 text-xs text-gray-500">{formatDate(h.date)}</td>
              <td className="py-2.5 font-medium text-gray-100">{formatCurrency(h.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
