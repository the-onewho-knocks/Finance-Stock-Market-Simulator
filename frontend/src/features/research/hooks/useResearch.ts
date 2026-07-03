import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { researchApi } from '../api/researchApi'
import { setResearchResult, setResearchError } from '../store/researchSlice'
import type { ResearchRequest } from '../types'
import type { RootState, AppDispatch } from '../../../app/store'

export function useResearch() {
  const dispatch = useDispatch<AppDispatch>()
  const result = useSelector((s: RootState) => s.research.result)
  const error = useSelector((s: RootState) => s.research.error)
  const [loading, setLoading] = useState(false)

  const run = useCallback(async (symbol: string) => {
    setLoading(true)
    try {
      const req: ResearchRequest = { symbol }
      const res = await researchApi.runResearch(req)
      dispatch(setResearchResult(res))
    } catch (e: unknown) {
      dispatch(setResearchError(e instanceof Error ? e.message : 'Research failed'))
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  return { run, loading, result, error }
}
