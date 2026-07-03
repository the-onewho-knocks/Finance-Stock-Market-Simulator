import { useState } from 'react'
import { researchApi } from '../api/researchApi'
import type { ResearchRequest, ResearchResponse } from '../types'

export function useResearch() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const run = async (req: ResearchRequest) => {
    setLoading(true)
    setError(null)
    try {
      const res = await researchApi.runResearch(req)
      setResult(res)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Research failed')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
  }

  return { run, reset, loading, result, error }
}
