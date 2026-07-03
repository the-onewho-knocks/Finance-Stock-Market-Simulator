import { Card, CardTitle } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'

interface ExpenseCardProps {
  total: number
  topCategory: string
}

export function ExpenseCard({ total, topCategory }: ExpenseCardProps) {
  return (
    <Card>
      <CardTitle>Expenses</CardTitle>
      <p className="mt-2 text-2xl font-bold text-red-400">{formatCurrency(total)}</p>
      <p className="mt-1 text-xs text-gray-500">Top category: {topCategory || '\u2014'}</p>
    </Card>
  )
}
