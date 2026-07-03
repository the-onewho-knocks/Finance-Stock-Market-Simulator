import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/store/authSlice'
import researchReducer from '../features/research/store/researchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    research: researchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
