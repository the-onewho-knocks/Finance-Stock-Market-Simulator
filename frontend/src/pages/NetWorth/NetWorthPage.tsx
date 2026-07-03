import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { networthApi } from '../../features/networth/api/networthApi'
import { NetWorthSummary } from '../../features/networth/components/NetWorthSummary'
import { NetWorthChart } from '../../features/networth/components/NetWorthChart'
import { NetWorthHistoryTable } from '../../features/networth/components/NetWorthHistory'
import { BreakdownCard } from '../../features/networth/components/BreakdownCard'
import { Loader } from '../../components/ui/Loader'
import { Card } from '../../components/ui/Card'

export default function NetWorthPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [latest, setLatest] = useState<number>(0)
  const [history, setHistory] = useState<any[]>([])
  const [breakdown, setBreakdown] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const userId = user?.id || 'demo'

  const load = async () => {
    setLoading(true); setError('')
    try {
      const [l, h, b] = await Promise.all([
        networthApi.getLatest(userId),
        networthApi.getHistory(userId),
        networthApi.getBreakdown(userId),
      ])
      setLatest(l.networth)
      setHistory(h)
      setBreakdown(b)
    } catch { setError('Failed to load net worth'); toast.error('Failed to load net worth') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [userId])

  if (loading) return <Loader />
  if (error) return <Card variant="glass" className="border-red-500/50"><p className="text-sm text-red-400">{error}</p></Card>

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Net Worth</h1>
      </div>
      <NetWorthSummary latest={latest} />
      {history.length > 0 && <NetWorthChart history={history} />}
      {breakdown && <BreakdownCard breakdown={breakdown} />}
      <Card>
        <h3 className="mb-3 text-sm font-medium text-gray-300">History</h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500">No history data available.</p>
        ) : (
          <NetWorthHistoryTable history={history} />
        )}
      </Card>
    </div>
  )
}
