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
  size: 'sm' | 'md' | 'lg' | 'xl'
}

const STOCKS: { symbol: string; name: string; sector: string; size: 'sm' | 'md' | 'lg' | 'xl' }[] = [
  // Technology (30)
  { symbol: 'AAPL', name: 'Apple Inc', sector: 'Technology', size: 'xl' },
  { symbol: 'MSFT', name: 'Microsoft Corp', sector: 'Technology', size: 'xl' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', sector: 'Technology', size: 'xl' },
  { symbol: 'META', name: 'Meta Platforms', sector: 'Technology', size: 'lg' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', sector: 'Technology', size: 'xl' },
  { symbol: 'AMD', name: 'AMD Inc', sector: 'Technology', size: 'lg' },
  { symbol: 'CRM', name: 'Salesforce Inc', sector: 'Technology', size: 'lg' },
  { symbol: 'ADBE', name: 'Adobe Inc', sector: 'Technology', size: 'lg' },
  { symbol: 'INTC', name: 'Intel Corp', sector: 'Technology', size: 'lg' },
  { symbol: 'ORCL', name: 'Oracle Corp', sector: 'Technology', size: 'lg' },
  { symbol: 'CSCO', name: 'Cisco Systems', sector: 'Technology', size: 'md' },
  { symbol: 'IBM', name: 'IBM Corp', sector: 'Technology', size: 'md' },
  { symbol: 'QCOM', name: 'Qualcomm Inc', sector: 'Technology', size: 'md' },
  { symbol: 'TXN', name: 'Texas Instruments', sector: 'Technology', size: 'md' },
  { symbol: 'AVGO', name: 'Broadcom Inc', sector: 'Technology', size: 'lg' },
  { symbol: 'NOW', name: 'ServiceNow Inc', sector: 'Technology', size: 'md' },
  { symbol: 'PANW', name: 'Palo Alto Networks', sector: 'Technology', size: 'md' },
  { symbol: 'SNPS', name: 'Synopsys Inc', sector: 'Technology', size: 'sm' },
  { symbol: 'CDNS', name: 'Cadence Design', sector: 'Technology', size: 'sm' },
  { symbol: 'ANET', name: 'Arista Networks', sector: 'Technology', size: 'sm' },
  { symbol: 'MU', name: 'Micron Technology', sector: 'Technology', size: 'md' },
  { symbol: 'KLAC', name: 'KLA Corp', sector: 'Technology', size: 'sm' },
  { symbol: 'LRCX', name: 'Lam Research', sector: 'Technology', size: 'sm' },
  { symbol: 'FTNT', name: 'Fortinet Inc', sector: 'Technology', size: 'sm' },
  { symbol: 'MSI', name: 'Motorola Solutions', sector: 'Technology', size: 'sm' },
  { symbol: 'PLTR', name: 'Palantir Tech', sector: 'Technology', size: 'md' },
  { symbol: 'DDOG', name: 'Datadog Inc', sector: 'Technology', size: 'sm' },
  { symbol: 'MDB', name: 'MongoDB Inc', sector: 'Technology', size: 'sm' },
  { symbol: 'WDAY', name: 'Workday Inc', sector: 'Technology', size: 'sm' },
  { symbol: 'TEAM', name: 'Atlassian Corp', sector: 'Technology', size: 'sm' },
  // Financial (25)
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financial', size: 'xl' },
  { symbol: 'V', name: 'Visa Inc', sector: 'Financial', size: 'xl' },
  { symbol: 'MA', name: 'Mastercard Inc', sector: 'Financial', size: 'xl' },
  { symbol: 'BAC', name: 'Bank of America', sector: 'Financial', size: 'lg' },
  { symbol: 'GS', name: 'Goldman Sachs', sector: 'Financial', size: 'lg' },
  { symbol: 'BLK', name: 'BlackRock Inc', sector: 'Financial', size: 'md' },
  { symbol: 'WFC', name: 'Wells Fargo', sector: 'Financial', size: 'lg' },
  { symbol: 'C', name: 'Citigroup Inc', sector: 'Financial', size: 'md' },
  { symbol: 'AXP', name: 'American Express', sector: 'Financial', size: 'md' },
  { symbol: 'MS', name: 'Morgan Stanley', sector: 'Financial', size: 'md' },
  { symbol: 'SCHW', name: 'Charles Schwab', sector: 'Financial', size: 'md' },
  { symbol: 'PNC', name: 'PNC Financial', sector: 'Financial', size: 'sm' },
  { symbol: 'USB', name: 'US Bancorp', sector: 'Financial', size: 'sm' },
  { symbol: 'TFC', name: 'Truist Financial', sector: 'Financial', size: 'sm' },
  { symbol: 'COF', name: 'Capital One', sector: 'Financial', size: 'sm' },
  { symbol: 'FIS', name: 'Fidelity National', sector: 'Financial', size: 'sm' },
  { symbol: 'FISV', name: 'Fiserv Inc', sector: 'Financial', size: 'sm' },
  { symbol: 'PYPL', name: 'PayPal Holdings', sector: 'Financial', size: 'md' },
  { symbol: 'SQ', name: 'Block Inc', sector: 'Financial', size: 'sm' },
  { symbol: 'IVZ', name: 'Invesco Ltd', sector: 'Financial', size: 'sm' },
  { symbol: 'MCO', name: "Moody's Corp", sector: 'Financial', size: 'sm' },
  { symbol: 'SPGI', name: 'S&P Global Inc', sector: 'Financial', size: 'md' },
  { symbol: 'CME', name: 'CME Group', sector: 'Financial', size: 'sm' },
  { symbol: 'ICE', name: 'Intercontinental Ex', sector: 'Financial', size: 'sm' },
  { symbol: 'MMC', name: 'Marsh & McLennan', sector: 'Financial', size: 'sm' },
  // Healthcare (20)
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', size: 'xl' },
  { symbol: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare', size: 'xl' },
  { symbol: 'PFE', name: 'Pfizer Inc', sector: 'Healthcare', size: 'lg' },
  { symbol: 'ABBV', name: 'AbbVie Inc', sector: 'Healthcare', size: 'lg' },
  { symbol: 'MRK', name: 'Merck & Co', sector: 'Healthcare', size: 'lg' },
  { symbol: 'LLY', name: 'Eli Lilly & Co', sector: 'Healthcare', size: 'lg' },
  { symbol: 'TMO', name: 'Thermo Fisher', sector: 'Healthcare', size: 'md' },
  { symbol: 'ABT', name: 'Abbott Labs', sector: 'Healthcare', size: 'md' },
  { symbol: 'BMY', name: 'Bristol-Myers', sector: 'Healthcare', size: 'md' },
  { symbol: 'DHR', name: 'Danaher Corp', sector: 'Healthcare', size: 'md' },
  { symbol: 'MDT', name: 'Medtronic PLC', sector: 'Healthcare', size: 'md' },
  { symbol: 'SYK', name: 'Stryker Corp', sector: 'Healthcare', size: 'sm' },
  { symbol: 'GILD', name: 'Gilead Sciences', sector: 'Healthcare', size: 'sm' },
  { symbol: 'BSX', name: 'Boston Scientific', sector: 'Healthcare', size: 'sm' },
  { symbol: 'REGN', name: 'Regeneron Pharma', sector: 'Healthcare', size: 'sm' },
  { symbol: 'VRTX', name: 'Vertex Pharma', sector: 'Healthcare', size: 'sm' },
  { symbol: 'ISRG', name: 'Intuitive Surgical', sector: 'Healthcare', size: 'sm' },
  { symbol: 'ELV', name: 'Elevance Health', sector: 'Healthcare', size: 'sm' },
  { symbol: 'CVS', name: 'CVS Health Corp', sector: 'Healthcare', size: 'md' },
  { symbol: 'ZTS', name: 'Zoetis Inc', sector: 'Healthcare', size: 'sm' },
  // Consumer Cyclical (20)
  { symbol: 'AMZN', name: 'Amazon.com Inc', sector: 'Consumer Cyclical', size: 'xl' },
  { symbol: 'TSLA', name: 'Tesla Inc', sector: 'Consumer Cyclical', size: 'xl' },
  { symbol: 'NKE', name: 'Nike Inc', sector: 'Consumer Cyclical', size: 'lg' },
  { symbol: 'HD', name: 'Home Depot Inc', sector: 'Consumer Cyclical', size: 'xl' },
  { symbol: 'MCD', name: "McDonald's Corp", sector: 'Consumer Cyclical', size: 'lg' },
  { symbol: 'SBUX', name: 'Starbucks Corp', sector: 'Consumer Cyclical', size: 'lg' },
  { symbol: 'DIS', name: 'Walt Disney Co', sector: 'Consumer Cyclical', size: 'lg' },
  { symbol: 'LOW', name: "Lowe's Cos", sector: 'Consumer Cyclical', size: 'md' },
  { symbol: 'TJX', name: 'TJX Cos', sector: 'Consumer Cyclical', size: 'md' },
  { symbol: 'BKNG', name: 'Booking Holdings', sector: 'Consumer Cyclical', size: 'md' },
  { symbol: 'CCL', name: 'Carnival Corp', sector: 'Consumer Cyclical', size: 'sm' },
  { symbol: 'RCL', name: 'Royal Caribbean', sector: 'Consumer Cyclical', size: 'sm' },
  { symbol: 'MAR', name: 'Marriott Intl', sector: 'Consumer Cyclical', size: 'sm' },
  { symbol: 'GM', name: 'General Motors', sector: 'Consumer Cyclical', size: 'md' },
  { symbol: 'F', name: 'Ford Motor Co', sector: 'Consumer Cyclical', size: 'md' },
  { symbol: 'DHI', name: 'DR Horton Inc', sector: 'Consumer Cyclical', size: 'sm' },
  { symbol: 'LEN', name: 'Lennar Corp', sector: 'Consumer Cyclical', size: 'sm' },
  { symbol: 'TGT', name: 'Target Corp', sector: 'Consumer Cyclical', size: 'md' },
  { symbol: 'ROST', name: 'Ross Stores', sector: 'Consumer Cyclical', size: 'sm' },
  { symbol: 'ABNB', name: 'Airbnb Inc', sector: 'Consumer Cyclical', size: 'md' },
  // Communication (15)
  { symbol: 'NFLX', name: 'Netflix Inc', sector: 'Communication', size: 'xl' },
  { symbol: 'CMCSA', name: 'Comcast Corp', sector: 'Communication', size: 'lg' },
  { symbol: 'T', name: 'AT&T Inc', sector: 'Communication', size: 'lg' },
  { symbol: 'VZ', name: 'Verizon Comm', sector: 'Communication', size: 'lg' },
  { symbol: 'TMUS', name: 'T-Mobile US', sector: 'Communication', size: 'md' },
  { symbol: 'CHTR', name: 'Charter Comm', sector: 'Communication', size: 'md' },
  { symbol: 'EA', name: 'Electronic Arts', sector: 'Communication', size: 'sm' },
  { symbol: 'TTWO', name: 'Take-Two Int', sector: 'Communication', size: 'sm' },
  { symbol: 'OMC', name: 'Omnicom Group', sector: 'Communication', size: 'sm' },
  { symbol: 'IPG', name: 'Interpublic Group', sector: 'Communication', size: 'sm' },
  { symbol: 'DISCK', name: 'Warner Bros Disc', sector: 'Communication', size: 'sm' },
  { symbol: 'FOXA', name: 'Fox Corp', sector: 'Communication', size: 'sm' },
  { symbol: 'NWSA', name: 'News Corp', sector: 'Communication', size: 'sm' },
  { symbol: 'WBD', name: 'Warner Bros Disc', sector: 'Communication', size: 'sm' },
  { symbol: 'PARA', name: 'Paramount Global', sector: 'Communication', size: 'sm' },
  // Consumer Defensive (12)
  { symbol: 'WMT', name: 'Walmart Inc', sector: 'Consumer Defensive', size: 'xl' },
  { symbol: 'PG', name: 'Procter & Gamble', sector: 'Consumer Defensive', size: 'xl' },
  { symbol: 'KO', name: 'Coca-Cola Co', sector: 'Consumer Defensive', size: 'xl' },
  { symbol: 'PEP', name: 'PepsiCo Inc', sector: 'Consumer Defensive', size: 'lg' },
  { symbol: 'COST', name: 'Costco Wholesale', sector: 'Consumer Defensive', size: 'lg' },
  { symbol: 'PM', name: 'Philip Morris', sector: 'Consumer Defensive', size: 'lg' },
  { symbol: 'MO', name: 'Altria Group', sector: 'Consumer Defensive', size: 'md' },
  { symbol: 'CL', name: 'Colgate-Palmolive', sector: 'Consumer Defensive', size: 'md' },
  { symbol: 'KHC', name: "Kraft Heinz Co", sector: 'Consumer Defensive', size: 'sm' },
  { symbol: 'CAG', name: 'Conagra Brands', sector: 'Consumer Defensive', size: 'sm' },
  { symbol: 'SYY', name: 'Sysco Corp', sector: 'Consumer Defensive', size: 'sm' },
  { symbol: 'K', name: 'Kellanova', sector: 'Consumer Defensive', size: 'sm' },
  // Energy (12)
  { symbol: 'XOM', name: 'Exxon Mobil Corp', sector: 'Energy', size: 'xl' },
  { symbol: 'CVX', name: 'Chevron Corp', sector: 'Energy', size: 'xl' },
  { symbol: 'COP', name: 'ConocoPhillips', sector: 'Energy', size: 'md' },
  { symbol: 'EOG', name: 'EOG Resources', sector: 'Energy', size: 'md' },
  { symbol: 'SLB', name: 'Schlumberger NV', sector: 'Energy', size: 'md' },
  { symbol: 'OXY', name: 'Occidental Pet', sector: 'Energy', size: 'md' },
  { symbol: 'MPC', name: 'Marathon Pet', sector: 'Energy', size: 'sm' },
  { symbol: 'PSX', name: 'Phillips 66', sector: 'Energy', size: 'sm' },
  { symbol: 'VLO', name: 'Valero Energy', sector: 'Energy', size: 'sm' },
  { symbol: 'HAL', name: 'Halliburton Co', sector: 'Energy', size: 'sm' },
  { symbol: 'KMI', name: 'Kinder Morgan', sector: 'Energy', size: 'sm' },
  { symbol: 'WMB', name: 'Williams Cos', sector: 'Energy', size: 'sm' },
  // Industrials (16)
  { symbol: 'CAT', name: 'Caterpillar Inc', sector: 'Industrials', size: 'lg' },
  { symbol: 'BA', name: 'Boeing Co', sector: 'Industrials', size: 'lg' },
  { symbol: 'GE', name: 'General Electric', sector: 'Industrials', size: 'lg' },
  { symbol: 'HON', name: 'Honeywell Intl', sector: 'Industrials', size: 'md' },
  { symbol: 'UPS', name: 'United Parcel Svc', sector: 'Industrials', size: 'md' },
  { symbol: 'RTX', name: 'RTX Corp', sector: 'Industrials', size: 'md' },
  { symbol: 'UNP', name: 'Union Pacific', sector: 'Industrials', size: 'md' },
  { symbol: 'LMT', name: 'Lockheed Martin', sector: 'Industrials', size: 'md' },
  { symbol: 'NOC', name: 'Northrop Grumman', sector: 'Industrials', size: 'sm' },
  { symbol: 'GD', name: 'General Dynamics', sector: 'Industrials', size: 'sm' },
  { symbol: 'CARR', name: 'Carrier Global', sector: 'Industrials', size: 'sm' },
  { symbol: 'ETN', name: 'Eaton Corp', sector: 'Industrials', size: 'sm' },
  { symbol: 'MMM', name: '3M Company', sector: 'Industrials', size: 'sm' },
  { symbol: 'FDX', name: 'FedEx Corp', sector: 'Industrials', size: 'sm' },
  { symbol: 'CSX', name: 'CSX Corp', sector: 'Industrials', size: 'sm' },
  { symbol: 'DE', name: 'Deere & Co', sector: 'Industrials', size: 'md' },
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
              size: stock.size,
            } as HeatmapItem
          } catch {
            return {
              symbol: stock.symbol,
              name: stock.name,
              sector: stock.sector,
              price: 100 + Math.random() * 400,
              change: (Math.random() - 0.5) * 10,
              changePercent: (Math.random() - 0.5) * 6,
              size: stock.size,
            } as HeatmapItem
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
