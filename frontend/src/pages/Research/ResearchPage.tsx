import { useState, useEffect } from 'react'
import { Card, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { ResearchReport, ResearchReportSkeleton, StockImages } from '../../features/research/components/ResearchReport'
import { useResearch } from '../../features/research/hooks/useResearch'
import { stockProfileApi } from '../../features/research/api/stockProfileApi'

const DEFAULT_SYMBOL = 'AAPL'

export default function ResearchPage() {
  const { run, loading, result, error } = useResearch()
  const [inputSymbol, setInputSymbol] = useState('')
  const [profile, setProfile] = useState<{ logo: string; name: string } | null>(null)

  useEffect(() => {
    stockProfileApi.getProfile(DEFAULT_SYMBOL).then(setProfile)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputSymbol.trim()) run(inputSymbol.trim().toUpperCase())
  }

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl">
      <div>
        <h1 className="text-lg font-semibold text-gray-100">AI Stock Research</h1>
        <p className="text-sm text-gray-500">Deep-dive research powered by multi-agent AI</p>
      </div>

      {/* Search form */}
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
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

      {/* Static pre-search default info */}
      {!result && !loading && !error && (
        <div className="space-y-4">
          {profile && (
            <div className="flex items-center gap-4 p-5 rounded-lg border border-[#1f1f1f] bg-[#0d0d0d]">
              {profile.logo ? (
                <img src={profile.logo} alt={profile.name} className="h-12 w-12 rounded-lg bg-[#1f1f1f] object-contain p-1" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1f1f1f] text-sm font-bold text-gray-500">
                  {DEFAULT_SYMBOL}
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-gray-100">{profile.name}</h2>
                <p className="text-sm text-gray-500">{DEFAULT_SYMBOL} &middot; Enter a stock symbol above and click Research to start</p>
              </div>
            </div>
          )}
          <div className="rounded-lg border border-[#1f1f1f] bg-[#0d0d0d] p-6 text-center">
            <p className="text-sm text-gray-500">Enter any stock symbol (e.g., TSLA, MSFT, NVDA) and hit Research for a comprehensive AI-powered analysis.</p>
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && <ResearchReportSkeleton />}

      {/* Error */}
      {error && !loading && (
        <Card className="border-red-500/50 bg-[#0d0d0d]">
          <p className="text-sm text-red-400">{error}</p>
        </Card>
      )}

      {/* Research result */}
      {result && !loading && <ResearchReport result={result} />}
    </div>
  )
}
