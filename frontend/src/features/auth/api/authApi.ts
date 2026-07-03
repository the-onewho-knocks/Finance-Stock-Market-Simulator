import api from '../../../services/axios'
import type { User } from '../types'

export const authApi = {
  googleLogin: async (credential: string): Promise<{ token: string; user: User }> => {
    const { data } = await api.post('/auth/google', { credential })
    return data
  },

  getProfile: async (): Promise<User> => {
    const { data } = await api.get('/users/me')
    return data
  },
}
