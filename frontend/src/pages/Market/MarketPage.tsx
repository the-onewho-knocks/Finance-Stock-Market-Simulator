import { useState, useEffect } from 'react'
import { Card, CardTitle } from '../../components/ui/Card'
import { SearchStock } from '../../features/market/components/SearchStock'
import { QuoteViewer } from '../../features/market/components/QuoteViewer'
import { MarketStats } from '../../features/market/components/MarketStats'
import { marketApi } from '../../features/market/api/marketApi'
import { Loader } from '../../components/ui/Loader'
import { STOCK_SYMBOLS } from '../../lib/constants'
import { usePriceStream } from '../../features/market/hooks/usePriceStream'
import { CandlestickChart } from '../../components/charts/CandlestickChart'
import { SplitPanel } from '../../components/shared/SplitPanel'

export default function MarketPage() {
  const [prices, setPrices] = useState<any[]>([])
  const [quote, setQuote] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const { prices: livePrices } = usePriceStream(STOCK_SYMBOLS)

  useEffect(() => {
    marketApi.getPrices(STOCK_SYMBOLS)
      .then(setPrices)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSearch = async (symbol: string) => {
    try {
      const q = await marketApi.getQuote(symbol)
      setQuote(q)
    } catch {
      setQuote(null)
    }
  }

  const displayPrices = livePrices.length ? livePrices : prices

  const mockCandles = Array.from({ length: 100 }, (_, i) => {
    const base = 150 + Math.random() * 50
    const close = base + (Math.random() - 0.5) * 10
    return {
      time: `2024-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String((i % 30) + 1).padStart(2, '0')}`,
      open: base - 2 + Math.random() * 4,
      high: Math.max(base, close) + Math.random() * 5,
      low: Math.min(base, close) - Math.random() * 5,
      close,
    }
  })

  const leftPanel = (
    <div className="space-y-4 pr-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Market</h1>
        <SearchStock onSelect={handleSearch} />
      </div>
      {quote && (
        <Card variant="elevated">
          <CardTitle>Quote</CardTitle>
          <QuoteViewer quote={quote} />
        </Card>
      )}
      {loading ? <Loader /> : <MarketStats prices={displayPrices} onSelectSymbol={handleSearch} />}
    </div>
  )

  const rightPanel = (
    <div className="space-y-4 pl-3">
      <Card variant="elevated">
        <CardTitle>AAPL Chart</CardTitle>
        <CandlestickChart data={mockCandles} height={350} />
      </Card>
      <Card variant="bordered" padding="sm">
        <p className="text-xs text-gray-500">
          Live prices: {displayPrices.filter(p => p.change !== undefined).length} active symbols
        </p>
      </Card>
    </div>
  )

  return (
    <SplitPanel
      left={leftPanel}
      right={rightPanel}
      defaultLeftWidth={45}
      className="h-full"
    />
  )
}
