import { useState } from 'react'
import { Card, CardTitle } from '../../../components/ui/Card'
import { TransactionTable } from './TransactionTable'
import { TransactionFiltersView } from './TransactionFilters'
import { Pagination } from '../../../components/shared/Pagination'
import type { Transaction, TransactionFilters } from '../types'
import { usePagination } from '../../../hooks/usePagination'

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [filters, setFilters] = useState<TransactionFilters>({})

  const filtered = transactions.filter((t) => {
    if (filters.type && t.type !== filters.type) return false
    if (filters.symbol && !t.symbol.toLowerCase().includes(filters.symbol.toLowerCase())) return false
    return true
  })

  const { page, setPage, totalPages, paginatedItems } = usePagination(filtered, 10)

  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <div className="flex items-center justify-between mb-4">
        <CardTitle>Transaction History</CardTitle>
        <TransactionFiltersView filters={filters} onChange={setFilters} />
      </div>
      <TransactionTable transactions={paginatedItems} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} className="mt-4" />
    </Card>
  )
}
