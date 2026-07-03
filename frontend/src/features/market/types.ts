export interface StockPrice {
  symbol: string
  price: number
  change: number
  change_percent: number
  volume: number
  high: number
  low: number
  open: number
  previous_close: number
  timestamp: string
}

export interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  change_percent: number
  market_cap: number
  pe_ratio: number
  dividend_yield: number
  timestamp: string
}

export interface SearchResult {
  symbol: string
  name: string
  exchange: string
  type: string
}

export interface MarketOverview {
  indices: { name: string; value: number; change: number; change_percent: number }[]
  gainers: StockPrice[]
  losers: StockPrice[]
}
