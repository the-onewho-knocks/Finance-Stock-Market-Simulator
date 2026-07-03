import { Card, CardTitle } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'
import { PieChart } from '../../../components/charts/PieChart'
import type { NetWorthBreakdown } from '../types'

interface BreakdownCardProps {
  breakdown: NetWorthBreakdown
}

export function BreakdownCard({ breakdown }: BreakdownCardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <CardTitle>Breakdown</CardTitle>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Assets</span>
            <span className="text-green-400">{formatCurrency(breakdown.assets)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Liabilities</span>
            <span className="text-red-400">{formatCurrency(breakdown.liabilities)}</span>
          </div>
          <div className="flex justify-between border-t border-[#1f1f1f] pt-2 text-sm font-semibold">
            <span className="text-gray-200">Net Worth</span>
            <span className="text-gray-100">{formatCurrency(breakdown.networth)}</span>
          </div>
        </div>
      </Card>
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <CardTitle>Allocation</CardTitle>
        <PieChart data={breakdown.categories.map((c) => ({ name: c.label, value: c.value }))} />
      </Card>
    </div>
  )
}
