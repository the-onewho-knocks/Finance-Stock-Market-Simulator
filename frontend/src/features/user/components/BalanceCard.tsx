import { Card } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'

interface BalanceCardProps {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <p className="text-xs text-gray-500">Fake Balance</p>
      <p className="mt-1 text-2xl font-bold text-green-400">{formatCurrency(balance)}</p>
    </Card>
  )
}
