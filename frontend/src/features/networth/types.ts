export interface NetWorthEntry {
  date: string
  value: number
}

export interface NetWorthBreakdown {
  assets: number
  liabilities: number
  networth: number
  categories: { label: string; value: number }[]
}
