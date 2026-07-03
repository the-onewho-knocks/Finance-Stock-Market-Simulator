import { PieChart } from '../../../components/charts/PieChart'

interface ExpenseChartProps {
  byCategory: { category: string; total: number; count: number }[]
}

export function ExpenseChart({ byCategory }: ExpenseChartProps) {
  if (!byCategory.length) return <p className="text-sm text-gray-500">No data</p>
  return <PieChart data={byCategory.map((c) => ({ name: c.category, value: c.total }))} />
}
