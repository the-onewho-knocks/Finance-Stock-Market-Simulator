import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { networthApi } from '../../features/networth/api/networthApi'
import { NetWorthSummary } from '../../features/networth/components/NetWorthSummary'
import { NetWorthChart } from '../../features/networth/components/NetWorthChart'
import { NetWorthHistoryTable } from '../../features/networth/components/NetWorthHistory'
import { BreakdownCard } from '../../features/networth/components/BreakdownCard'
import { RecalculateButton } from '../../features/networth/components/RecalculateButton'
import { Loader } from '../../components/ui/Loader'

export default function NetWorthPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [latest, setLatest] = useState<number>(0)
  const [history, setHistory] = useState<any[]>([])
  const [breakdown, setBreakdown] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    if (!user) return
    setLoading(true)
    try {
      const [l, h, b] = await Promise.all([
        networthApi.getLatest(user.id),
        networthApi.getHistory(user.id),
        networthApi.getBreakdown(user.id),
      ])
      setLatest(l.networth)
      setHistory(h)
      setBreakdown(b)
    } catch { toast.error('Failed to load net worth') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [user])

  const handleRecalculate = async () => {
    if (!user) return
    try {
      await networthApi.recalculate(user.id)
      toast.success('Recalculated')
      load()
    } catch { toast.error('Recalculation failed') }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Net Worth</h1>
        <RecalculateButton onClick={handleRecalculate} />
      </div>
      <NetWorthSummary latest={latest} />
      <NetWorthChart history={history} />
      {breakdown && <BreakdownCard breakdown={breakdown} />}
      <div className="rounded-lg border border-[#1f1f1f] bg-[#0d0d0d] p-4">
        <h3 className="mb-3 text-sm font-medium text-gray-300">History</h3>
        <NetWorthHistoryTable history={history} />
      </div>
    </div>
  )
}
