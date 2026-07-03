import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User } from '../types'

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: !!localStorage.getItem('auth_token') || localStorage.getItem('guest_mode') === 'true',
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      localStorage.setItem('auth_token', action.payload)
      localStorage.removeItem('guest_mode')
    },
    setGuest(state) {
      state.user = {
        id: 'guest-user-id',
        email: 'guest@finance-sim.app',
        name: 'Guest',
        fake_balance: 0,
        created_at: new Date().toISOString(),
      }
      state.token = null
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      localStorage.setItem('guest_mode', 'true')
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('auth_token')
      localStorage.removeItem('guest_mode')
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const { setUser, setToken, setGuest, logout, setLoading, setError } = authSlice.actions
export default authSlice.reducer
