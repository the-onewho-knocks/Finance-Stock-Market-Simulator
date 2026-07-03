export interface ResearchRequest {
  symbol: string
  user_id?: string
  deep_analysis?: boolean
}

export interface Source {
  type: string
  title: string
  url?: string
  published_at?: string
}

export interface ResearchResponse {
  request_id: string
  symbol: string
  company_name: string
  executive_summary: string
  investment_thesis: string
  recommendation: 'BUY' | 'SELL' | 'HOLD'
  confidence_score: number
  news_summary: string
  financial_summary: string
  market_summary: string
  sec_summary: string
  memory_summary: string
  key_metrics: Record<string, unknown>
  strengths: string[]
  risks: string[]
  opportunities: string[]
  red_flags: string[]
  sources: Source[]
  agent_outputs: Record<string, unknown>
  errors: string[]
  created_at: string
}
