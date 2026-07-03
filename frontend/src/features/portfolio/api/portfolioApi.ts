import api from '../../../services/axios'
import type { Portfolio, PortfolioMetrics, BuyOrder, SellOrder } from '../types'

export const portfolioApi = {
  getPortfolio: async (userId: string): Promise<Portfolio> => {
    const { data } = await api.get(`/portfolio/${userId}`)
    return data
  },

  getMetrics: async (userId: string): Promise<PortfolioMetrics> => {
    const { data } = await api.get(`/portfolio/${userId}/metrics`)
    return data
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
