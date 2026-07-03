import { Card } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'

interface DashboardSummaryProps {
  networth: number
  portfolio: number
  cash: number
  expenses: number
}

export function DashboardSummary({ networth, portfolio, cash, expenses }: DashboardSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <p className="text-xs text-gray-500">Net Worth</p>
        <p className="mt-1 text-xl font-bold text-gray-100">{formatCurrency(networth)}</p>
      </Card>
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <p className="text-xs text-gray-500">Portfolio</p>
        <p className="mt-1 text-xl font-bold text-blue-400">{formatCurrency(portfolio)}</p>
      </Card>
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <p className="text-xs text-gray-500">Cash Balance</p>
        <p className="mt-1 text-xl font-bold text-green-400">{formatCurrency(cash)}</p>
      </Card>
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <p className="text-xs text-gray-500">Expenses</p>
        <p className="mt-1 text-xl font-bold text-red-400">{formatCurrency(expenses)}</p>
      </Card>
    </div>
  )
}
