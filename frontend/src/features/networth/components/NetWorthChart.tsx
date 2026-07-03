import { Card, CardTitle } from '../../../components/ui/Card'
import { AreaChart } from '../../../components/charts/AreaChart'

interface NetWorthChartProps {
  history: { date: string; value: number }[]
}

export function NetWorthChart({ history }: NetWorthChartProps) {
  const chartData = history.map(h => ({ time: h.date, value: h.value }))
  return (
    <Card>
      <CardTitle>Net Worth History</CardTitle>
      <AreaChart data={chartData} color="#10b981" height={300} />
    </Card>
  )
}
