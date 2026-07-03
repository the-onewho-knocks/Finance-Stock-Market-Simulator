import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { formatCurrency } from '../../../lib/formatCurrency'
import { formatDate } from '../../../lib/formatDate'
import type { PlannedExpense } from '../types'

interface PlanCardProps {
  plan: PlannedExpense
  onDelete?: () => void
}

export function PlanCard({ plan, onDelete }: PlanCardProps) {
  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge>{plan.category}</Badge>
            {plan.is_recurring && <Badge variant="info">Recurring</Badge>}
          </div>
          <p className="mt-2 text-sm text-gray-200">{plan.description}</p>
          <p className="mt-1 text-xs text-gray-500">Target: {formatDate(plan.target_date)}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-yellow-400">{formatCurrency(plan.amount)}</p>
          {onDelete && (
            <button onClick={onDelete} className="mt-1 text-xs text-red-400 hover:text-red-300 cursor-pointer">Delete</button>
          )}
        </div>
      </div>
    </Card>
  )
}
