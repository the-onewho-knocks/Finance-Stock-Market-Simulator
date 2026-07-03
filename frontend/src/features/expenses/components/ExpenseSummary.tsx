import { Card } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'
import { BarChart } from '../../../components/charts/BarChart'

interface ExpenseSummaryViewProps {
  byCategory: { category: string; total: number; count: number }[]
  total: number
}

export function ExpenseSummaryView({ byCategory, total }: ExpenseSummaryViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <p className="text-sm text-gray-400">Total Expenses</p>
        <p className="text-2xl font-bold text-red-400">{formatCurrency(total)}</p>
      </Card>
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <BarChart data={byCategory.map((c) => ({ label: c.category, value: c.total }))} color="#ef4444" />
      </Card>
    </div>
  )
}
