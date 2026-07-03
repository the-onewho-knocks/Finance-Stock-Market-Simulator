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

  register: async (name: string, email: string, password: string): Promise<{ token: string; user: User }> => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password })
      return data
    } catch {
      if (email && password) {
        const token = btoa(`${email}:${password}`)
        return { token, user: { ...DEMO_USER, email, name } }
      }
      throw new Error('Registration failed')
    }
  },

  googleLogin: async (credential: string): Promise<{ token: string; user: User }> => {
    try {
      const { data } = await api.post('/auth/google', { credential })
      return data
    } catch {
      const decoded = JSON.parse(atob(credential.split('.')[1]) || '{}')
      const token = `google-${credential.slice(0, 20)}`
      return {
        token,
        user: {
          ...DEMO_USER,
          email: decoded.email || 'google-user@example.com',
          name: decoded.name || 'Google User',
          avatar_url: decoded.picture,
        },
      }
    }
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
