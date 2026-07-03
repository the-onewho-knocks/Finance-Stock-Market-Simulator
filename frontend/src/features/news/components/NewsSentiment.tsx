import { Card, CardTitle } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'

interface NewsSentimentProps {
  sentiment: 'positive' | 'negative' | 'neutral'
  score: number
}

export function NewsSentiment({ sentiment, score }: NewsSentimentProps) {
  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <CardTitle>Market Sentiment</CardTitle>
      <div className="mt-2">
        <Badge variant={sentiment === 'positive' ? 'success' : sentiment === 'negative' ? 'danger' : 'default'}>
          {sentiment.toUpperCase()}
        </Badge>
        <p className="mt-1 text-sm text-gray-400">Score: {(score * 100).toFixed(0)}%</p>
      </div>
    </Card>
  )
}
