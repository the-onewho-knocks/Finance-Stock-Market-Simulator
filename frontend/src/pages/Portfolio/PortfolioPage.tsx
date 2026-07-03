import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { portfolioApi } from '../../features/portfolio/api/portfolioApi'
import { PortfolioMetricsView } from '../../features/portfolio/components/PortfolioMetrics'
import { HoldingsCard } from '../../features/portfolio/components/HoldingsCard'
import { PortfolioTable } from '../../features/portfolio/components/PortfolioTable'
import { AllocationChart } from '../../features/portfolio/components/AllocationChart'
import { Card, CardTitle } from '../../components/ui/Card'
import { LineChart } from '../../components/charts/LineChart'
import { BarChart } from '../../components/charts/BarChart'
import { Loader } from '../../components/ui/Loader'

const MOCK_HISTORY = [
  { time: '2024-01-01', value: 95000 },
  { time: '2024-02-01', value: 102000 },
  { time: '2024-03-01', value: 98000 },
  { time: '2024-04-01', value: 105000 },
  { time: '2024-05-01', value: 112000 },
  { time: '2024-06-01', value: 118500 },
  { time: '2024-07-01', value: 115000 },
  { time: '2024-08-01', value: 122000 },
  { time: '2024-09-01', value: 119500 },
  { time: '2024-10-01', value: 126000 },
  { time: '2024-11-01', value: 131000 },
  { time: '2024-12-01', value: 124532 },
]

const MOCK_SECTORS = [
  { label: 'Technology', value: 58 },
  { label: 'Financial', value: 15 },
  { label: 'Healthcare', value: 10 },
  { label: 'Consumer', value: 12 },
  { label: 'Energy', value: 5 },
]

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
    } catch { toast.error('Failed to load portfolio') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [userId])

  if (loading) return <Loader />

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Portfolio</h1>
      </div>

      {metrics && <PortfolioMetricsView metrics={metrics} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Portfolio Value Over Time</CardTitle>
          <div className="mt-3">
            <LineChart data={MOCK_HISTORY} color="#7F00FF" height={280} />
          </div>
        </Card>
        <Card>
          <CardTitle>Sector Allocation</CardTitle>
          <div className="mt-3">
            <BarChart data={MOCK_SECTORS} color="#7F00FF" height={280} />
          </div>
        </Card>
      </div>

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
    </div>
  )
}
