import type { ResearchResponse } from '../types'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardTitle } from '../../../components/ui/Card'
import { formatDate } from '../../../lib/formatDate'

interface ResearchReportProps {
  result: ResearchResponse
}

const recBadge = {
  BUY: 'success' as const,
  SELL: 'danger' as const,
  HOLD: 'warning' as const,
}

export function ResearchReport({ result }: ResearchReportProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-100">{result.company_name}</h2>
          <p className="text-sm text-gray-500">{result.symbol} &middot; {formatDate(result.created_at)}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-100">{(result.confidence_score * 100).toFixed(0)}%</div>
          <Badge variant={recBadge[result.recommendation]}>{result.recommendation}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <CardTitle>Executive Summary</CardTitle>
          <p className="mt-2 text-sm text-gray-400">{result.executive_summary}</p>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <CardTitle>Investment Thesis</CardTitle>
          <p className="mt-2 text-sm text-gray-400">{result.investment_thesis}</p>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <CardTitle className="text-sm">Strengths</CardTitle>
          <ul className="mt-2 space-y-1">
            {result.strengths.map((s, i) => <li key={i} className="text-xs text-green-400">+ {s}</li>)}
          </ul>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <CardTitle className="text-sm">Risks</CardTitle>
          <ul className="mt-2 space-y-1">
            {result.risks.map((r, i) => <li key={i} className="text-xs text-red-400">- {r}</li>)}
          </ul>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <CardTitle className="text-sm">Opportunities</CardTitle>
          <ul className="mt-2 space-y-1">
            {result.opportunities.map((o, i) => <li key={i} className="text-xs text-accent-light">+ {o}</li>)}
          </ul>
        </Card>
        <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
          <CardTitle className="text-sm">Red Flags</CardTitle>
          <ul className="mt-2 space-y-1">
            {result.red_flags.map((f, i) => <li key={i} className="text-xs text-yellow-400">! {f}</li>)}
          </ul>
        </Card>
      </div>
    </div>
  )
}
