import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { dashboardApi } from '../../features/dashboard/api/dashboardApi'
import { DashboardSummary } from '../../features/dashboard/components/DashboardSummary'
import { PortfolioCard } from '../../features/dashboard/components/PortfolioCard'
import { NetWorthCard } from '../../features/dashboard/components/NetWorthCard'
import { ExpenseCard } from '../../features/dashboard/components/ExpenseCard'
import { MarketOverviewCard } from '../../features/dashboard/components/MarketOverview'
import { RecentActivity } from '../../features/dashboard/components/RecentActivity'
import { Loader } from '../../components/ui/Loader'
import { Card } from '../../components/ui/Card'

export default function DashboardPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [data, setData] = useState<Awaited<ReturnType<typeof dashboardApi.getDashboard>> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) { setLoading(false); return }
    dashboardApi.getDashboard(user.id)
      .then(setData)
      .catch(() => setError('Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return <Loader />
  if (error) return <Card variant="glass" className="border-red-500/50"><p className="text-sm text-red-400">{error}</p></Card>
  if (!data) return <p className="text-sm text-gray-500">No dashboard data available.</p>

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-lg font-semibold text-gray-100">Dashboard</h1>
      <DashboardSummary
        networth={data.total_networth}
        portfolio={data.portfolio_value}
        cash={data.cash_balance}
        expenses={data.total_expenses}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PortfolioCard holdings={data.top_holdings} totalValue={data.portfolio_value} totalPnl={0} />
        <NetWorthCard history={data.networth_history} />
        <ExpenseCard total={data.total_expenses} topCategory="" />
        <MarketOverviewCard prices={data.market_prices} />
      </div>
      <RecentActivity transactions={data.recent_transactions} />
    </div>
  )
}
