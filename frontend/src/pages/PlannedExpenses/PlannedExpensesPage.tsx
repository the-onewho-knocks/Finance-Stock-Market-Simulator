import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { plannedExpenseApi } from '../../features/plannedExpenses/api/plannedExpenseApi'
import { PlannedExpenseTable } from '../../features/plannedExpenses/components/PlannedExpenseTable'
import { Loader } from '../../components/ui/Loader'
import { Card } from '../../components/ui/Card'

export default function PlannedExpensesPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const userId = user?.id || 'demo'

  const load = async () => {
    setLoading(true); setError('')
    try {
      const data = await plannedExpenseApi.list(userId)
      setPlans(data)
    } catch { setError('Failed to load planned expenses'); toast.error('Failed to load plans') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [userId])

  if (loading) return <Loader />
  if (error) return <Card variant="glass" className="border-red-500/50"><p className="text-sm text-red-400">{error}</p></Card>

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Planned Expenses</h1>
      </div>
      {plans.length === 0 ? (
        <p className="text-sm text-gray-500">No planned expenses yet.</p>
      ) : (
        <Card>
          <PlannedExpenseTable plans={plans} onDelete={(_id) => {}} />
        </Card>
      )}
    </div>
  )
}
