import { PieChart } from '../../../components/charts/PieChart'

interface AllocationChartProps {
  data: { symbol: string; allocation: number }[]
}

export function AllocationChart({ data }: AllocationChartProps) {
  if (!data.length) return <p className="text-sm text-gray-500">No data</p>
  return <PieChart data={data.map((d) => ({ name: d.symbol, value: d.allocation }))} />
}
