import { formatCurrency } from '../../../lib/formatCurrency'
import { formatDate } from '../../../lib/formatDate'
import { Badge } from '../../../components/ui/Badge'
import type { PlannedExpense } from '../types'

interface PlannedExpenseTableProps {
  plans: PlannedExpense[]
  onDelete?: (id: string) => void
}

export function PlannedExpenseTable({ plans, onDelete }: PlannedExpenseTableProps) {
  if (!plans.length) return <p className="text-sm text-gray-500">No planned expenses</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-gray-500">
            <th className="pb-2 pr-4 font-medium">Category</th>
            <th className="pb-2 pr-4 font-medium">Description</th>
            <th className="pb-2 pr-4 font-medium">Target Date</th>
            <th className="pb-2 pr-4 font-medium">Recurring</th>
            <th className="pb-2 font-medium">Amount</th>
            {onDelete && <th className="pb-2 font-medium"></th>}
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p.id} className="border-b border-border/50 text-gray-300">
              <td className="py-2.5 pr-4"><Badge>{p.category}</Badge></td>
              <td className="py-2.5 pr-4">{p.description}</td>
              <td className="py-2.5 pr-4 text-xs text-gray-500">{formatDate(p.target_date)}</td>
              <td className="py-2.5 pr-4">{p.is_recurring ? 'Yes' : 'No'}</td>
              <td className="py-2.5 font-medium text-yellow-400">{formatCurrency(p.amount)}</td>
              {onDelete && (
                <td className="py-2.5">
                  <button onClick={() => onDelete(p.id)} className="text-xs text-red-400 hover:text-red-300 cursor-pointer">Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
