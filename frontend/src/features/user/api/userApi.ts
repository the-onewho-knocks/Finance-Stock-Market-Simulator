import api from '../../../services/axios'
import type { UserProfile } from '../types'

export const userApi = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    const { data } = await api.get(`/users/${userId}`)
    return data
  },

  updateProfile: async (userId: string, payload: { name?: string; avatar_url?: string }): Promise<UserProfile> => {
    const { data } = await api.patch(`/users/${userId}`, payload)
    return data
  },
}
