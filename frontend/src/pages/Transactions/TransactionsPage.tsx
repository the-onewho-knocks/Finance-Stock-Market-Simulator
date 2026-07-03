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

  useEffect(() => {
    if (!user) return
    transactionsApi.getTransactions(user.id)
      .then(setTransactions)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-100">Transaction History</h1>
      <TransactionHistory transactions={transactions} />
    </div>
  )
}
