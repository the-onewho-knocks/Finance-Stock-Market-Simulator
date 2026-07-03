import type { Transaction } from '../transactions/types'
import type { Holding } from '../portfolio/types'
import type { StockPrice } from '../market/types'

export interface DashboardData {
  total_networth: number
  portfolio_value: number
  cash_balance: number
  total_expenses: number
  recent_transactions: Transaction[]
  top_holdings: Holding[]
  market_prices: StockPrice[]
  networth_history: { date: string; value: number }[]
}
