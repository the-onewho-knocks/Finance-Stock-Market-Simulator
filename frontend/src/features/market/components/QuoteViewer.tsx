import type { StockQuote } from '../types'
import { StockCard } from './StockCard'

interface QuoteViewerProps {
  quote: StockQuote | null
}

export function QuoteViewer({ quote }: QuoteViewerProps) {
  if (!quote) return <p className="text-sm text-gray-500">Search for a symbol to view quote</p>
  return <StockCard quote={quote} />
}
