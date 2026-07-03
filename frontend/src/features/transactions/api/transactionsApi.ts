import api from '../../../services/axios'
import type { Transaction } from '../types'

const MOCK: Transaction[] = [
  { id: '1', user_id: 'demo', symbol: 'AAPL', type: 'buy', quantity: 10, price: 178.50, total: 1785.00, timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: '2', user_id: 'demo', symbol: 'MSFT', type: 'buy', quantity: 5, price: 332.20, total: 1661.00, timestamp: new Date(Date.now() - 172800000).toISOString() },
  { id: '3', user_id: 'demo', symbol: 'TSLA', type: 'sell', quantity: 3, price: 245.80, total: 737.40, timestamp: new Date(Date.now() - 259200000).toISOString() },
  { id: '4', user_id: 'demo', symbol: 'NVDA', type: 'buy', quantity: 2, price: 498.30, total: 996.60, timestamp: new Date(Date.now() - 345600000).toISOString() },
  { id: '5', user_id: 'demo', symbol: 'AMZN', type: 'buy', quantity: 8, price: 151.40, total: 1211.20, timestamp: new Date(Date.now() - 432000000).toISOString() },
  { id: '6', user_id: 'demo', symbol: 'GOOGL', type: 'sell', quantity: 5, price: 138.20, total: 691.00, timestamp: new Date(Date.now() - 518400000).toISOString() },
]

export const transactionsApi = {
  getTransactions: async (userId: string, params?: { type?: string; symbol?: string; page?: number; limit?: number }): Promise<Transaction[]> => {
    try {
      const { data } = await api.get(`/transactions/${userId}`, { params })
      return data
    } catch {
      return MOCK
    }
  },
}
