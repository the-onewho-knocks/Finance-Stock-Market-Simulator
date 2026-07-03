import { useState } from 'react'
import { Card, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { AreaChart } from '../../components/charts/AreaChart'
import api from '../../services/axios'

export default function HistoryPage() {
  const [symbol, setSymbol] = useState('')
  const [history, setHistory] = useState<any[]>([])
  const [error, setError] = useState('')

  const fetchHistory = async () => {
    if (!symbol.trim()) return
    setError('')
    try {
      const { data } = await api.get(`/history/${symbol.trim().toUpperCase()}`)
      setHistory(Array.isArray(data) ? data : [])
      if (!Array.isArray(data) || data.length === 0) setError('No history found for this symbol')
    } catch { setError('Failed to load history'); setHistory([]) }
  }

  const chartData = history.map((h: any) => ({
    time: h.date || h.timestamp,
    value: h.close || h.price,
  }))

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-lg font-semibold text-gray-100">Price History</h1>
      <div className="flex gap-3">
        <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Symbol (e.g. AAPL)" className="max-w-xs" />
        <Button onClick={fetchHistory}>Fetch</Button>
      </div>
      {error && <Card variant="glass" className="border-red-500/50"><p className="text-sm text-red-400">{error}</p></Card>}
      {chartData.length > 0 && (
        <Card>
          <CardTitle>{symbol.toUpperCase()} History</CardTitle>
          <AreaChart data={chartData} color="#7F00FF" height={350} />
        </Card>
      )}
      {!error && chartData.length === 0 && history.length === 0 && (
        <p className="text-sm text-gray-500">Enter a symbol and click Fetch to view price history.</p>
      )}
    </div>
  )
}
