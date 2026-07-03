import { useState } from 'react'
import { Card, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import api from '../../services/axios'

export default function IndicatorsPage() {
  const [symbol, setSymbol] = useState('')
  const [sma, setSma] = useState<any | null>(null)
  const [rsi, setRsi] = useState<any | null>(null)

  const fetchIndicators = async () => {
    if (!symbol.trim()) return
    const sym = symbol.trim().toUpperCase()
    try {
      const [smaRes, rsiRes] = await Promise.all([
        api.get(`/indicators/sma/${sym}`),
        api.get(`/indicators/rsi/${sym}`),
      ])
      setSma(smaRes.data)
      setRsi(rsiRes.data)
    } catch { /* ignore */ }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-100">Technical Indicators</h1>
      <div className="flex gap-3">
        <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Symbol (e.g. AAPL)" className="max-w-xs" />
        <Button onClick={fetchIndicators}>Fetch</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <CardTitle>SMA</CardTitle>
          {sma ? <pre className="mt-2 text-xs text-gray-400">{JSON.stringify(sma, null, 2)}</pre> : <p className="mt-2 text-sm text-gray-500">No data</p>}
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <CardTitle>RSI</CardTitle>
          {rsi ? <pre className="mt-2 text-xs text-gray-400">{JSON.stringify(rsi, null, 2)}</pre> : <p className="mt-2 text-sm text-gray-500">No data</p>}
        </Card>
      </div>
    </div>
  )
}
