import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { plannedExpenseApi } from '../../features/plannedExpenses/api/plannedExpenseApi'
import { PlannedExpenseTable } from '../../features/plannedExpenses/components/PlannedExpenseTable'
import { AddPlanModal } from '../../features/plannedExpenses/components/AddPlanModal'
import { DeletePlanDialog } from '../../features/plannedExpenses/components/DeletePlanDialog'
import { Button } from '../../components/ui/Button'
import { Loader } from '../../components/ui/Loader'

export default function PlannedExpensesPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const load = async () => {
    if (!user) return
    setLoading(true)
    try {
      const data = await plannedExpenseApi.list(user.id)
      setPlans(data)
    } catch { toast.error('Failed to load plans') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [user])

  const handleCreate = async (data: { category: string; amount: number; description: string; target_date: string; is_recurring: boolean }) => {
    if (!user) return
    try {
      await plannedExpenseApi.create(user.id, data)
      toast.success('Plan created')
      load()
    } catch { toast.error('Failed to create plan') }
  }

  const handleDelete = async () => {
    if (!user || !deleteTarget) return
    try {
      await plannedExpenseApi.remove(user.id, deleteTarget)
      toast.success('Plan deleted')
      setDeleteTarget(null)
      load()
    } catch { toast.error('Failed to delete plan') }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Planned Expenses</h1>
        <Button onClick={() => setAddOpen(true)}>Add Plan</Button>
      </div>
      <div className="rounded-lg border border-[#1f1f1f] bg-[#0d0d0d] p-4">
        <PlannedExpenseTable plans={plans} onDelete={(id) => setDeleteTarget(id)} />
      </div>
      <AddPlanModal open={addOpen} onClose={() => setAddOpen(false)} onCreate={handleCreate} />
      <DeletePlanDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </div>
  )
}
