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
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Loader } from '../../components/ui/Loader'

export default function PortfolioPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [portfolio, setPortfolio] = useState<any | null>(null)
  const [metrics, setMetrics] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [buyOpen, setBuyOpen] = useState(false)
  const [sellOpen, setSellOpen] = useState(false)

  const load = async () => {
    if (!user) return
    setLoading(true)
    try {
      const [p, m] = await Promise.all([
        portfolioApi.getPortfolio(user.id),
        portfolioApi.getMetrics(user.id),
      ])
      setPortfolio(p)
      setMetrics(m)
    } catch { toast.error('Failed to load portfolio') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [user])

  const handleBuy = async (symbol: string, quantity: number) => {
    if (!user) return
    try {
      await portfolioApi.buy({ user_id: user.id, symbol, quantity })
      toast.success(`Bought ${quantity} shares of ${symbol}`)
      load()
    } catch { toast.error('Buy failed') }
  }

  const handleSell = async (symbol: string, quantity: number) => {
    if (!user) return
    try {
      await portfolioApi.sell({ user_id: user.id, symbol, quantity })
      toast.success(`Sold ${quantity} shares of ${symbol}`)
      load()
    } catch { toast.error('Sell failed') }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Portfolio</h1>
        <div className="flex gap-2">
          <Button onClick={() => setBuyOpen(true)}>Buy</Button>
          <Button variant="secondary" onClick={() => setSellOpen(true)}>Sell</Button>
        </div>
      </div>
      {metrics && <PortfolioMetricsView metrics={metrics} />}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <p className="text-sm font-medium text-gray-300 mb-3">Holdings</p>
          <HoldingsCard holdings={portfolio?.holdings || []} />
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <p className="text-sm font-medium text-gray-300 mb-3">Allocation</p>
          <AllocationChart data={metrics?.diversification || []} />
        </Card>
      </div>
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <p className="text-sm font-medium text-gray-300 mb-3">All Holdings</p>
        <PortfolioTable holdings={portfolio?.holdings || []} />
      </Card>
      <BuyStockModal open={buyOpen} onClose={() => setBuyOpen(false)} onBuy={handleBuy} />
      <SellStockModal open={sellOpen} onClose={() => setSellOpen(false)} onSell={handleSell} />
    </div>
  )
}
