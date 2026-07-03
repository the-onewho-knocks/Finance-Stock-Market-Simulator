import { useState } from 'react'
import { Card, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export default function IndicatorsPage() {
  const [symbol, setSymbol] = useState('')
  const [sma, setSma] = useState<any | null>(null)
  const [rsi, setRsi] = useState<any | null>(null)

  const fallbackSMA = { symbol: symbol || 'AAPL', period: 20, values: [145.2, 146.8, 147.5, 148.1, 149.3, 150.2, 151.0, 152.4, 153.1, 154.0] }
  const fallbackRSI = { symbol: symbol || 'AAPL', period: 14, value: 58.4, signal: 'neutral' }

  const fetchIndicators = async () => {
    if (!symbol.trim()) return
    setSma(fallbackSMA)
    setRsi(fallbackRSI)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-lg font-semibold text-gray-100">Technical Indicators</h1>
      <div className="flex gap-3">
        <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Symbol (e.g. AAPL)" className="max-w-xs" />
        <Button onClick={fetchIndicators}>Fetch</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>SMA ({sma?.period || 20})</CardTitle>
          {sma ? (
            <div className="mt-2 space-y-1">
              {sma.values.map((v: number, i: number) => (
                <div key={i} className="flex justify-between text-xs text-gray-400">
                  <span>Period {i + 1}</span>
                  <span className="text-gray-300">${v.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-500">Enter a symbol and fetch</p>
          )}
        </Card>
        <Card>
          <CardTitle>RSI ({rsi?.period || 14})</CardTitle>
          {rsi ? (
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Value</span>
                <span className={`text-sm font-semibold ${rsi.value >= 70 ? 'text-red-400' : rsi.value <= 30 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {rsi.value.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Signal</span>
                <span className="text-xs text-gray-300 uppercase">{rsi.signal}</span>
              </div>
              <div className="h-2 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${rsi.value}%`,
                    background: rsi.value >= 70 ? '#ef4444' : rsi.value <= 30 ? '#22c55e' : '#eab308',
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-500">Enter a symbol and fetch</p>
          )}
        </Card>
      </div>
    </div>
  )
}
