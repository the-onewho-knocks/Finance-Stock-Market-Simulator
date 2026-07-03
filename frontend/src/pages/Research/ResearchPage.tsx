import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResearchReport, ResearchReportSkeleton } from '../../features/research/components/ResearchReport'
import { useResearch } from '../../features/research/hooks/useResearch'

const FINNHUB_BASE = 'https://finnhub.io/api/v1'
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'd8lbm01r01qtamgttvjgd8lbm01r01qtamgttvk0'
const DEFAULT_SYMBOL = 'AAPL'

export default function ResearchPage() {
  const { run, loading, result, error } = useResearch()
  const [inputSymbol, setInputSymbol] = useState('')
  const [defaultInfo, setDefaultInfo] = useState<any | null>(null)

  useEffect(() => {
    axios.get(`${FINNHUB_BASE}/stock/profile2`, {
      params: { symbol: DEFAULT_SYMBOL, token: FINNHUB_KEY },
    }).then(({ data }) => setDefaultInfo(data)).catch(() => {})
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputSymbol.trim()) run(inputSymbol.trim().toUpperCase())
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-lg font-semibold text-gray-100">AI Stock Research</h1>
        <p className="text-sm text-gray-500">Deep-dive research powered by multi-agent AI</p>
      </div>

      <Card className="glass">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              label="Stock Symbol"
              placeholder="e.g. AAPL, TSLA, MSFT"
              value={inputSymbol}
              onChange={(e) => setInputSymbol(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading || !inputSymbol.trim()}>
            {loading ? 'Researching...' : 'Research'}
          </Button>
        </form>
      </Card>

      {!result && !loading && !error && defaultInfo && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <div className="flex items-start gap-5">
              {defaultInfo.logo ? (
                <img src={defaultInfo.logo} alt={defaultInfo.name} className="h-16 w-16 rounded-xl bg-white/5 object-contain p-2" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/5 text-lg font-bold text-gray-500">
                  {DEFAULT_SYMBOL}
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-100">{defaultInfo.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-md bg-accent/10 px-2.5 py-0.5 text-accent-light font-medium">{DEFAULT_SYMBOL}</span>
                  <span className="text-gray-500">{defaultInfo.exchange}</span>
                  <span className="text-gray-500">&middot;</span>
                  <span className="text-gray-500">{defaultInfo.finnhubIndustry || 'Technology'}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Market Cap</p>
                    <p className="text-sm font-semibold text-gray-200">
                      {defaultInfo.marketCapitalization ? `$${(defaultInfo.marketCapitalization / 1e9).toFixed(1)}B` : '\u2014'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">IPO Date</p>
                    <p className="text-sm font-semibold text-gray-200">{defaultInfo.ipo || '\u2014'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Shares Outstanding</p>
                    <p className="text-sm font-semibold text-gray-200">
                      {defaultInfo.shareOutstanding ? `${(defaultInfo.shareOutstanding / 1e9).toFixed(2)}B` : '\u2014'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Country</p>
                    <p className="text-sm font-semibold text-gray-200">{defaultInfo.country || 'US'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-gray-500">
              Enter any stock symbol (e.g., <span className="text-accent-light">TSLA</span>, <span className="text-accent-light">MSFT</span>, <span className="text-accent-light">NVDA</span>) above and click <span className="text-accent-light">Research</span> for a comprehensive AI-powered analysis.
            </p>
          </div>
        </div>
      )}

      {loading && <ResearchReportSkeleton />}
      {error && !loading && (
        <Card className="border-red-500/50 glass">
          <p className="text-sm text-red-400">{error}</p>
        </Card>
      )}
      {result && !loading && <ResearchReport result={result} />}
    </div>
  )
}
