import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { portfolioApi } from '../../features/portfolio/api/portfolioApi'
import { PortfolioMetricsView } from '../../features/portfolio/components/PortfolioMetrics'
import { HoldingsCard } from '../../features/portfolio/components/HoldingsCard'
import { PortfolioTable } from '../../features/portfolio/components/PortfolioTable'
import { AllocationChart } from '../../features/portfolio/components/AllocationChart'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Loader } from '../../components/ui/Loader'

export default function PortfolioPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [portfolio, setPortfolio] = useState<any | null>(null)
  const [metrics, setMetrics] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

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
    } catch {
      toast.error('Failed to load portfolio')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [userId])

  if (loading) return <Loader />

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Portfolio</h1>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary">Buy</Button>
          <Button size="sm" variant="secondary">Sell</Button>
        </div>
      </div>

      {metrics && <PortfolioMetricsView metrics={metrics} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-200">Holdings</h3>
            </div>
            {portfolio?.holdings && portfolio.holdings.length > 0 ? (
              <PortfolioTable holdings={portfolio.holdings} />
            ) : (
              <p className="text-sm text-gray-500">No holdings yet.</p>
            )}
          </Card>
        </div>
        <div className="space-y-4">
          <AllocationChart metrics={metrics} />
          <HoldingsCard
            holdings={portfolio?.holdings || []}
            totalValue={portfolio?.total_value || 0}
            totalPnl={portfolio?.total_gain_loss || 0}
          />
        </div>
      </div>
    </div>
  )
}
