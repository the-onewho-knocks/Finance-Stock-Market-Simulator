import api from '../../../services/axios'
import type { ResearchRequest, ResearchResponse } from '../types'

export const researchApi = {
  runResearch: async (payload: ResearchRequest): Promise<ResearchResponse> => {
    const { data } = await api.post('/research', payload)
    return data
  },
}
