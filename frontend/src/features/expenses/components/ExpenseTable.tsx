import { formatCurrency } from '../../../lib/formatCurrency'
import { formatDate } from '../../../lib/formatDate'
import { Badge } from '../../../components/ui/Badge'
import type { Expense } from '../types'

interface ExpenseTableProps {
  expenses: Expense[]
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  if (!expenses.length) return <p className="text-sm text-gray-500">No expenses</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[#1f1f1f] text-left text-xs text-gray-500">
            <th className="pb-2 pr-4 font-medium">Date</th>
            <th className="pb-2 pr-4 font-medium">Category</th>
            <th className="pb-2 pr-4 font-medium">Description</th>
            <th className="pb-2 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-b border-[#1f1f1f]/50 text-gray-300">
              <td className="py-2.5 pr-4 text-xs text-gray-500">{formatDate(e.date)}</td>
              <td className="py-2.5 pr-4"><Badge>{e.category}</Badge></td>
              <td className="py-2.5 pr-4">{e.description}</td>
              <td className="py-2.5 font-medium text-red-400">{formatCurrency(e.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
