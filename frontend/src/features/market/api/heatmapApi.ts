import axios from 'axios'

const FINNHUB_BASE = 'https://finnhub.io/api/v1'
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'd8lbm01r01qtamgttvjgd8lbm01r01qtamgttvk0'

export interface HeatmapItem {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  sector: string
}

const STOCKS: { symbol: string; name: string; sector: string }[] = [
  // Technology
  { symbol: 'AAPL', name: 'Apple Inc', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms', sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', sector: 'Technology' },
  { symbol: 'AMD', name: 'AMD Inc', sector: 'Technology' },
  { symbol: 'CRM', name: 'Salesforce Inc', sector: 'Technology' },
  { symbol: 'ADBE', name: 'Adobe Inc', sector: 'Technology' },
  { symbol: 'INTC', name: 'Intel Corp', sector: 'Technology' },
  { symbol: 'ORCL', name: 'Oracle Corp', sector: 'Technology' },
  // Consumer Cyclical
  { symbol: 'AMZN', name: 'Amazon.com Inc', sector: 'Consumer Cyclical' },
  { symbol: 'TSLA', name: 'Tesla Inc', sector: 'Consumer Cyclical' },
  { symbol: 'NKE', name: 'Nike Inc', sector: 'Consumer Cyclical' },
  { symbol: 'HD', name: 'Home Depot Inc', sector: 'Consumer Cyclical' },
  { symbol: 'MCD', name: "McDonald's Corp", sector: 'Consumer Cyclical' },
  { symbol: 'SBUX', name: 'Starbucks Corp', sector: 'Consumer Cyclical' },
  { symbol: 'DIS', name: 'Walt Disney Co', sector: 'Consumer Cyclical' },
  // Financial
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financial' },
  { symbol: 'V', name: 'Visa Inc', sector: 'Financial' },
  { symbol: 'MA', name: 'Mastercard Inc', sector: 'Financial' },
  { symbol: 'BAC', name: 'Bank of America', sector: 'Financial' },
  { symbol: 'GS', name: 'Goldman Sachs', sector: 'Financial' },
  { symbol: 'BLK', name: 'BlackRock Inc', sector: 'Financial' },
  // Healthcare
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare' },
  { symbol: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare' },
  { symbol: 'PFE', name: 'Pfizer Inc', sector: 'Healthcare' },
  { symbol: 'ABBV', name: 'AbbVie Inc', sector: 'Healthcare' },
  // Communication
  { symbol: 'NFLX', name: 'Netflix Inc', sector: 'Communication' },
  { symbol: 'CMCSA', name: 'Comcast Corp', sector: 'Communication' },
  { symbol: 'T', name: 'AT&T Inc', sector: 'Communication' },
  // Consumer Defensive
  { symbol: 'WMT', name: 'Walmart Inc', sector: 'Consumer Defensive' },
  { symbol: 'PG', name: 'Procter & Gamble', sector: 'Consumer Defensive' },
  { symbol: 'KO', name: 'Coca-Cola Co', sector: 'Consumer Defensive' },
  { symbol: 'PEP', name: 'PepsiCo Inc', sector: 'Consumer Defensive' },
  // Energy
  { symbol: 'XOM', name: 'Exxon Mobil Corp', sector: 'Energy' },
  { symbol: 'CVX', name: 'Chevron Corp', sector: 'Energy' },
  // Industrials
  { symbol: 'CAT', name: 'Caterpillar Inc', sector: 'Industrials' },
  { symbol: 'BA', name: 'Boeing Co', sector: 'Industrials' },
  { symbol: 'GE', name: 'General Electric', sector: 'Industrials' },
]

const SECTORS = Array.from(new Set(STOCKS.map((s) => s.sector)))

export const heatmapApi = {
  async getHeatmap(): Promise<HeatmapItem[]> {
    const results: HeatmapItem[] = []

    const batchSize = 5
    for (let i = 0; i < STOCKS.length; i += batchSize) {
      const batch = STOCKS.slice(i, i + batchSize)
      const quotes = await Promise.all(
        batch.map(async (stock) => {
          try {
            const { data } = await axios.get(`${FINNHUB_BASE}/quote`, {
              params: { symbol: stock.symbol, token: FINNHUB_KEY },
            })
            return {
              symbol: stock.symbol,
              name: stock.name,
              sector: stock.sector,
              price: data.c ?? 0,
              change: data.d ?? 0,
              changePercent: data.dp ?? 0,
            }
          } catch {
            return null
          }
        }),
      )
      for (const q of quotes) {
        if (q && q.price > 0) results.push(q)
      }
    }

    return results
  },

  getSectors(): string[] {
    return SECTORS
  },
}
