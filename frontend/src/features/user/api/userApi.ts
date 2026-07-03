import api from '../../../services/axios'
import type { UserProfile } from '../types'

const MOCK_PROFILE: UserProfile = {
  id: 'demo',
  email: 'demo@finance-sim.app',
  name: 'Demo User',
  avatar_url: null,
  fake_balance: 1000000,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: new Date().toISOString(),
}

export const userApi = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    try {
      const { data } = await api.get(`/users/${userId}`)
      return data
    } catch { return { ...MOCK_PROFILE, id: userId } }
  },

  updateProfile: async (userId: string, payload: { name?: string; avatar_url?: string }): Promise<UserProfile> => {
    try {
      const { data } = await api.patch(`/users/${userId}`, payload)
      return data
    } catch {
      if (payload.name) MOCK_PROFILE.name = payload.name
      return MOCK_PROFILE
    }
  },
}
