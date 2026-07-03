import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ResearchResponse } from '../types'

interface ResearchState {
  result: ResearchResponse | null
  error: string | null
}

const initialState: ResearchState = {
  result: null,
  error: null,
}

const researchSlice = createSlice({
  name: 'research',
  initialState,
  reducers: {
    setResearchResult(state, action: PayloadAction<ResearchResponse>) {
      state.result = action.payload
      state.error = null
    },
    setResearchError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    clearResearch(state) {
      state.result = null
      state.error = null
    },
  },
})

export const { setResearchResult, setResearchError, clearResearch } = researchSlice.actions
export default researchSlice.reducer
