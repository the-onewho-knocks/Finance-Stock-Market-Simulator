import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { expenseApi } from '../../features/expenses/api/expenseApi'
import { ExpenseSummaryView } from '../../features/expenses/components/ExpenseSummary'
import { ExpenseTable } from '../../features/expenses/components/ExpenseTable'
import { Button } from '../../components/ui/Button'
import { Loader } from '../../components/ui/Loader'
import { Card } from '../../components/ui/Card'

export default function ExpensesPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const userId = user?.id || 'demo'

  const load = async () => {
    setLoading(true); setError('')
    try {
      const data = await expenseApi.list(userId)
      setExpenses(data)
    } catch { setError('Failed to load expenses'); toast.error('Failed to load expenses') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [userId])

  if (loading) return <Loader />
  if (error) return <Card variant="glass" className="border-red-500/50"><p className="text-sm text-red-400">{error}</p></Card>

  const byCategory: { category: string; total: number; count: number }[] = Object.values(
    expenses.reduce((acc: Record<string, { category: string; total: number; count: number }>, e: any) => {
      if (!acc[e.category]) acc[e.category] = { category: e.category, total: 0, count: 0 }
      acc[e.category].total += e.amount
      acc[e.category].count++
      return acc
    }, {}),
  )

  const total = expenses.reduce((s: number, e: any) => s + e.amount, 0)

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Expenses</h1>
      </div>
      {expenses.length === 0 && !loading && !error ? (
        <p className="text-sm text-gray-500">No expenses recorded yet.</p>
      ) : (
        <>
          <ExpenseSummaryView byCategory={byCategory} total={total} />
          <Card>
            <ExpenseTable expenses={expenses} />
          </Card>
        </>
      )}
    </div>
  )
}
