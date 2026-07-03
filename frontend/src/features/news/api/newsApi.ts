import axios from 'axios'

const FINNHUB_BASE = 'https://finnhub.io/api/v1'
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'd8lbm01r01qtamgttvjgd8lbm01r01qtamgttvk0'

export interface FinnhubNewsItem {
  category: string
  datetime: number
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

export const newsApi = {
  getMarketNews: async (category: string = 'general'): Promise<FinnhubNewsItem[]> => {
    const { data } = await axios.get(`${FINNHUB_BASE}/news`, {
      params: { category, token: FINNHUB_KEY },
    })
    return data
  },

  getCompanyNews: async (symbol: string, from: string, to: string): Promise<FinnhubNewsItem[]> => {
    const { data } = await axios.get(`${FINNHUB_BASE}/company-news`, {
      params: { symbol, from, to, token: FINNHUB_KEY },
    })
    return data
  },
}
