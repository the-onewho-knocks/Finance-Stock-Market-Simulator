import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { portfolioApi } from '../../features/portfolio/api/portfolioApi'
import { PortfolioMetricsView } from '../../features/portfolio/components/PortfolioMetrics'
import { HoldingsCard } from '../../features/portfolio/components/HoldingsCard'
import { PortfolioTable } from '../../features/portfolio/components/PortfolioTable'
import { AllocationChart } from '../../features/portfolio/components/AllocationChart'
import { BuyStockModal } from '../../features/portfolio/components/BuyStockModal'
import { SellStockModal } from '../../features/portfolio/components/SellStockModal'
import { Card, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Loader } from '../../components/ui/Loader'

export default function PortfolioPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [portfolio, setPortfolio] = useState<any | null>(null)
  const [metrics, setMetrics] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [buyOpen, setBuyOpen] = useState(false)
  const [sellOpen, setSellOpen] = useState(false)

  const userId = user?.id || 'demo'

  const load = async () => {
    setLoading(true)
    try {
      const [p, m] = await Promise.all([
        portfolioApi.getPortfolio(userId),
        portfolioApi.getMetrics(userId),
      ])
      setPortfolio(p)
      setMetrics(m)
    } catch { toast.error('Failed to load portfolio') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [userId])

  const handleBuy = async (symbol: string, quantity: number) => {
    try {
      await portfolioApi.buy({ user_id: userId, symbol, quantity })
      toast.success(`Bought ${quantity} ${symbol}`)
      load()
    } catch { toast.error('Buy failed') }
  }

  const handleSell = async (symbol: string, quantity: number) => {
    try {
      await portfolioApi.sell({ user_id: userId, symbol, quantity })
      toast.success(`Sold ${quantity} ${symbol}`)
      load()
    } catch { toast.error('Sell failed') }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Portfolio</h1>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setBuyOpen(true)}>Buy</Button>
          <Button size="sm" variant="secondary" onClick={() => setSellOpen(true)}>Sell</Button>
        </div>
      </div>

      {metrics && <PortfolioMetricsView metrics={metrics} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardTitle>Holdings</CardTitle>
            <div className="mt-3">
              {portfolio?.holdings && portfolio.holdings.length > 0 ? (
                <PortfolioTable holdings={portfolio.holdings} />
              ) : (
                <p className="text-sm text-gray-500">No holdings yet.</p>
              )}
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <AllocationChart data={metrics?.diversification || []} />
          <HoldingsCard holdings={portfolio?.holdings || []} />
        </div>
      </div>

      <BuyStockModal open={buyOpen} onClose={() => setBuyOpen(false)} onBuy={handleBuy} />
      <SellStockModal open={sellOpen} onClose={() => setSellOpen(false)} onSell={handleSell} />
    </div>
  )
}
