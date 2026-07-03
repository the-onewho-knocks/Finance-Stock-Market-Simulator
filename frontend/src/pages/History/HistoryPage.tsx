import { useState } from 'react'
import { Card, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { AreaChart } from '../../components/charts/AreaChart'
import api from '../../services/axios'

export default function HistoryPage() {
  const [symbol, setSymbol] = useState('')
  const [history, setHistory] = useState<any[]>([])

  const fetchHistory = async () => {
    if (!symbol.trim()) return
    try {
      const { data } = await api.get(`/history/${symbol.trim().toUpperCase()}`)
      setHistory(Array.isArray(data) ? data : [])
    } catch { setHistory([]) }
  }

  const chartData = history.map((h: any) => ({
    time: h.date || h.timestamp,
    value: h.close || h.price,
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-100">Price History</h1>
      <div className="flex gap-3">
        <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Symbol (e.g. AAPL)" className="max-w-xs" />
        <Button onClick={fetchHistory}>Fetch</Button>
      </div>
      {chartData.length > 0 && (
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <CardTitle>{symbol.toUpperCase()} History</CardTitle>
          <AreaChart data={chartData} color="#7F00FF" height={350} />
        </Card>
      )}
    </div>
  )
}
