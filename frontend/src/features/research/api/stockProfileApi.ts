import axios from 'axios'

const FINNHUB_BASE = 'https://finnhub.io/api/v1'
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'd8lbm01r01qtamgttvjgd8lbm01r01qtamgttvk0'

interface FinnhubProfile {
  logo: string
  name: string
  ticker: string
  exchange: string
  marketCapitalization: number
  shareOutstanding: number
  ipo: string
  finnhubIndustry: string
}

export const stockProfileApi = {
  async getProfile(symbol: string): Promise<{ logo: string; name: string } | null> {
    try {
      const { data } = await axios.get<FinnhubProfile>(`${FINNHUB_BASE}/stock/profile2`, {
        params: { symbol, token: FINNHUB_KEY },
      })
      if (data?.logo) {
        return { logo: data.logo, name: data.name }
      }
      return null
    } catch {
      return null
    }
  },
}
