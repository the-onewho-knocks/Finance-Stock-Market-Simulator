import api from '../../../services/axios'
import type { Portfolio, PortfolioMetrics, BuyOrder, SellOrder } from '../types'

const MOCK_PORTFOLIO: Portfolio = {
  id: 'demo',
  user_id: 'demo',
  cash_balance: 18660.35,
  total_value: 105872.45,
  total_cost: 94660.00,
  total_gain_loss: 11212.45,
  total_gain_loss_percent: 11.84,
  holdings: [
    { id: 'h1', user_id: 'demo', symbol: 'AAPL', quantity: 50, avg_price: 170.00, current_price: 178.50, total_value: 8925.00, total_cost: 8500.00, gain_loss: 425.00, gain_loss_percent: 5.00, updated_at: new Date().toISOString() },
    { id: 'h2', user_id: 'demo', symbol: 'MSFT', quantity: 20, avg_price: 320.00, current_price: 332.20, total_value: 6644.00, total_cost: 6400.00, gain_loss: 244.00, gain_loss_percent: 3.81, updated_at: new Date().toISOString() },
    { id: 'h3', user_id: 'demo', symbol: 'GOOGL', quantity: 15, avg_price: 140.00, current_price: 138.20, total_value: 2073.00, total_cost: 2100.00, gain_loss: -27.00, gain_loss_percent: -1.29, updated_at: new Date().toISOString() },
    { id: 'h4', user_id: 'demo', symbol: 'NVDA', quantity: 10, avg_price: 450.00, current_price: 498.30, total_value: 4983.00, total_cost: 4500.00, gain_loss: 483.00, gain_loss_percent: 10.73, updated_at: new Date().toISOString() },
    { id: 'h5', user_id: 'demo', symbol: 'AMZN', quantity: 8, avg_price: 145.00, current_price: 151.40, total_value: 1211.20, total_cost: 1160.00, gain_loss: 51.20, gain_loss_percent: 4.41, updated_at: new Date().toISOString() },
    { id: 'h6', user_id: 'demo', symbol: 'META', quantity: 12, avg_price: 340.00, current_price: 358.60, total_value: 4303.20, total_cost: 4080.00, gain_loss: 223.20, gain_loss_percent: 5.47, updated_at: new Date().toISOString() },
    { id: 'h7', user_id: 'demo', symbol: 'TSLA', quantity: 8, avg_price: 250.00, current_price: 245.80, total_value: 1966.40, total_cost: 2000.00, gain_loss: -33.60, gain_loss_percent: -1.68, updated_at: new Date().toISOString() },
  ],
}

const MOCK_METRICS: PortfolioMetrics = {
  total_value: 105872.45,
  total_cost: 94660.00,
  total_gain_loss: 11212.45,
  total_gain_loss_percent: 11.84,
  cash_balance: 18660.35,
  allocation: [
    { sector: 'Technology', value: 42858.40, percentage: 40.5 },
    { sector: 'Consumer Cyclical', value: 19148.00, percentage: 18.1 },
    { sector: 'Financial', value: 16280.00, percentage: 15.4 },
    { sector: 'Healthcare', value: 12453.00, percentage: 11.8 },
    { sector: 'Cash', value: 18660.35, percentage: 13.2 },
  ],
}

export const portfolioApi = {
  getPortfolio: async (userId: string): Promise<Portfolio> => {
    try {
      const { data } = await api.get(`/portfolio/${userId}`)
      return data
    } catch {
      return MOCK_PORTFOLIO
    }
  },

  getMetrics: async (userId: string): Promise<PortfolioMetrics> => {
    try {
      const { data } = await api.get(`/portfolio/${userId}/metrics`)
      return data
    } catch {
      return MOCK_METRICS
    }
  },

  buy: async (order: BuyOrder) => {
    const { data } = await api.post('/portfolio/buy', order)
    return data
  },

  sell: async (order: SellOrder) => {
    const { data } = await api.post('/portfolio/sell', order)
    return data
  },
}
