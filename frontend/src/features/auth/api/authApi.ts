import api from '../../../services/axios'
import type { User } from '../types'

const DEMO_USER: User = {
  id: 'demo-user-id',
  email: 'demo@finance-sim.app',
  name: 'Demo User',
  fake_balance: 10000,
  created_at: new Date().toISOString(),
}

export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      return data
    } catch {
      if (email && password) {
        const token = btoa(`${email}:${password}`)
        return { token, user: { ...DEMO_USER, email, name: email.split('@')[0] } }
      }
      throw new Error('Login failed')
    }
  },

  googleLogin: async (credential: string): Promise<{ token: string; user: User }> => {
    const { data } = await api.post('/auth/google', { credential })
    return data
  },

  getProfile: async (): Promise<User> => {
    try {
      const { data } = await api.get('/users/me')
      return data
    } catch {
      return DEMO_USER
    }
  },
}
