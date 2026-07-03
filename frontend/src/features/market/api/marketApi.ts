import api from '../../../services/axios'
import type { StockPrice, StockQuote } from '../types'

export const marketApi = {
  getPrice: async (symbol: string): Promise<StockPrice> => {
    const { data } = await api.get(`/market/price/${symbol}`)
    return data
  },

  getPrices: async (symbols: string[]): Promise<StockPrice[]> => {
    const { data } = await api.get('/market/prices', { params: { symbols: symbols.join(',') } })
    return data
  },

  getQuote: async (ticker: string): Promise<StockQuote> => {
    const { data } = await api.get(`/market/quote/${ticker}`)
    return data
  },
}
