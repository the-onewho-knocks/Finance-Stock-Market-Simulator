import api from '../../../services/axios'
import type { DashboardData } from '../types'

const MOCK: DashboardData = {
  total_networth: 124532.80,
  portfolio_value: 105872.45,
  cash_balance: 18660.35,
  total_expenses: 3241.12,
  recent_transactions: [
    { id: '1', user_id: 'demo', symbol: 'AAPL', type: 'buy', quantity: 10, price: 178.50, total: 1785.00, timestamp: new Date().toISOString() },
    { id: '2', user_id: 'demo', symbol: 'MSFT', type: 'buy', quantity: 5, price: 332.20, total: 1661.00, timestamp: new Date().toISOString() },
    { id: '3', user_id: 'demo', symbol: 'TSLA', type: 'sell', quantity: 3, price: 245.80, total: 737.40, timestamp: new Date().toISOString() },
  ],
  top_holdings: [
    { id: 'h1', user_id: 'demo', symbol: 'AAPL', quantity: 50, avg_price: 170.00, current_price: 178.50, total_value: 8925.00, total_cost: 8500.00, gain_loss: 425.00, gain_loss_percent: 5.00, updated_at: new Date().toISOString() },
    { id: 'h2', user_id: 'demo', symbol: 'MSFT', quantity: 20, avg_price: 320.00, current_price: 332.20, total_value: 6644.00, total_cost: 6400.00, gain_loss: 244.00, gain_loss_percent: 3.81, updated_at: new Date().toISOString() },
    { id: 'h3', user_id: 'demo', symbol: 'GOOGL', quantity: 15, avg_price: 140.00, current_price: 138.20, total_value: 2073.00, total_cost: 2100.00, gain_loss: -27.00, gain_loss_percent: -1.29, updated_at: new Date().toISOString() },
    { id: 'h4', user_id: 'demo', symbol: 'NVDA', quantity: 10, avg_price: 450.00, current_price: 498.30, total_value: 4983.00, total_cost: 4500.00, gain_loss: 483.00, gain_loss_percent: 10.73, updated_at: new Date().toISOString() },
    { id: 'h5', user_id: 'demo', symbol: 'AMZN', quantity: 8, avg_price: 145.00, current_price: 151.40, total_value: 1211.20, total_cost: 1160.00, gain_loss: 51.20, gain_loss_percent: 4.41, updated_at: new Date().toISOString() },
  ],
  market_prices: [
    { symbol: 'AAPL', price: 178.50, change: 2.30, change_percent: 1.31, volume: 52400000, high: 179.80, low: 176.20, open: 177.00, previous_close: 176.20, timestamp: new Date().toISOString() },
    { symbol: 'MSFT', price: 332.20, change: 4.10, change_percent: 1.25, volume: 18200000, high: 333.50, low: 328.10, open: 329.00, previous_close: 328.10, timestamp: new Date().toISOString() },
    { symbol: 'GOOGL', price: 138.20, change: -1.80, change_percent: -1.29, volume: 21500000, high: 141.00, low: 137.50, open: 140.00, previous_close: 140.00, timestamp: new Date().toISOString() },
    { symbol: 'AMZN', price: 151.40, change: 2.60, change_percent: 1.75, volume: 35800000, high: 152.30, low: 148.70, open: 149.00, previous_close: 148.80, timestamp: new Date().toISOString() },
    { symbol: 'TSLA', price: 245.80, change: -5.20, change_percent: -2.07, volume: 89200000, high: 254.00, low: 243.50, open: 251.00, previous_close: 251.00, timestamp: new Date().toISOString() },
    { symbol: 'META', price: 358.60, change: 6.40, change_percent: 1.82, volume: 16400000, high: 360.10, low: 352.30, open: 354.00, previous_close: 352.20, timestamp: new Date().toISOString() },
    { symbol: 'NVDA', price: 498.30, change: 12.50, change_percent: 2.57, volume: 43500000, high: 502.00, low: 486.80, open: 489.00, previous_close: 485.80, timestamp: new Date().toISOString() },
    { symbol: 'JPM', price: 162.80, change: 0.90, change_percent: 0.56, volume: 9800000, high: 163.50, low: 161.20, open: 162.00, previous_close: 161.90, timestamp: new Date().toISOString() },
    { symbol: 'V', price: 249.40, change: 1.10, change_percent: 0.44, volume: 7600000, high: 250.30, low: 248.10, open: 248.50, previous_close: 248.30, timestamp: new Date().toISOString() },
    { symbol: 'WMT', price: 165.20, change: 0.40, change_percent: 0.24, volume: 6500000, high: 165.90, low: 164.50, open: 164.80, previous_close: 164.80, timestamp: new Date().toISOString() },
  ],
  networth_history: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10),
    value: 115000 + Math.random() * 15000 + i * 150,
  })),
}

export const dashboardApi = {
  getDashboard: async (userId: string): Promise<DashboardData> => {
    try {
      const { data } = await api.get(`/dashboard/${userId}`)
      return data
    } catch {
      return MOCK
    }
  },
}
