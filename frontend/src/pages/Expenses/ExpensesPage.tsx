import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { expenseApi } from '../../features/expenses/api/expenseApi'
import { ExpenseSummaryView } from '../../features/expenses/components/ExpenseSummary'
import { ExpenseTable } from '../../features/expenses/components/ExpenseTable'
import { AddExpenseModal } from '../../features/expenses/components/AddExpenseModal'
import { DeleteExpenseDialog } from '../../features/expenses/components/DeleteExpenseDialog'
import { Button } from '../../components/ui/Button'
import { Loader } from '../../components/ui/Loader'

export default function ExpensesPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const load = async () => {
    if (!user) return
    setLoading(true)
    try {
      const data = await expenseApi.list(user.id)
      setExpenses(data)
    } catch { toast.error('Failed to load expenses') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [user])

  const handleAdd = async (data: { category: string; amount: number; description: string; date: string }) => {
    if (!user) return
    try {
      await expenseApi.add(user.id, data)
      toast.success('Expense added')
      load()
    } catch { toast.error('Failed to add expense') }
  }

  const handleDelete = async () => {
    if (!user || !deleteTarget) return
    try {
      await expenseApi.remove(user.id, deleteTarget)
      toast.success('Expense deleted')
      setDeleteTarget(null)
      load()
    } catch { toast.error('Failed to delete expense') }
  }

  if (loading) return <Loader />

  const byCategory: { category: string; total: number; count: number }[] = Object.values(
    expenses.reduce((acc: Record<string, { category: string; total: number; count: number }>, e: any) => {
      if (!acc[e.category]) acc[e.category] = { category: e.category, total: 0, count: 0 }
      acc[e.category].total += e.amount
      acc[e.category].count++
      return acc
    }, {}),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Expenses</h1>
        <Button onClick={() => setAddOpen(true)}>Add Expense</Button>
      </div>
      <ExpenseSummaryView byCategory={byCategory} total={expenses.reduce((s: number, e: any) => s + e.amount, 0)} />
      <div className="rounded-lg border border-[#1f1f1f] bg-[#0d0d0d] p-4">
        <ExpenseTable expenses={expenses} />
      </div>
      <AddExpenseModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <DeleteExpenseDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </div>
  )
}
