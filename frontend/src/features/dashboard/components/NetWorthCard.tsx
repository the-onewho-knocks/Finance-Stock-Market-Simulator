import { Card, CardTitle } from '../../../components/ui/Card'
import { AreaChart } from '../../../components/charts/AreaChart'

interface NetWorthCardProps {
  history: { date: string; value: number }[]
}

export function NetWorthCard({ history }: NetWorthCardProps) {
  const chartData = history.map(h => ({ time: h.date, value: h.value }))
  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <CardTitle>Net Worth History</CardTitle>
      <div className="mt-3">
        <AreaChart data={chartData} color="#10b981" height={200} />
      </div>
    </Card>
  )
}
