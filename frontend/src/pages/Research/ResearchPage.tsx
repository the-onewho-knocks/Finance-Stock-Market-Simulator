import { Card } from '../../components/ui/Card'
import { ResearchForm } from '../../features/research/components/ResearchForm'
import { ResearchReport } from '../../features/research/components/ResearchReport'
import { useResearch } from '../../features/research/hooks/useResearch'

export default function ResearchPage() {
  const { run, loading, result, error } = useResearch()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-100">AI Stock Research</h1>
        <p className="text-sm text-gray-500">Deep-dive research powered by multi-agent AI</p>
      </div>

      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <ResearchForm onSubmit={(s, d) => run({ symbol: s, deep_analysis: d })} loading={loading} />
      </Card>

      {error && (
        <Card className="border-red-500/50 bg-[#0d0d0d]">
          <p className="text-sm text-red-400">{error}</p>
        </Card>
      )}

      {result && <ResearchReport result={result} />}
    </div>
  )
}
