import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { transactionsApi } from '../../features/transactions/api/transactionsApi'
import { TransactionHistory } from '../../features/transactions/components/TransactionHistory'
import { Loader } from '../../components/ui/Loader'

export default function TransactionsPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const userId = user?.id || 'demo'

  useEffect(() => {
    transactionsApi.getTransactions(userId)
      .then(setTransactions)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <Loader />

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-lg font-semibold text-gray-100">Transaction History</h1>
      {transactions.length === 0 ? (
        <p className="text-sm text-gray-500">No transactions yet.</p>
      ) : (
        <TransactionHistory transactions={transactions} />
      )}
    </div>
  )
}
