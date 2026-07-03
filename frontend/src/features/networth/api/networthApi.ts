import api from '../../../services/axios'
import type { NetWorthEntry, NetWorthBreakdown } from '../types'

export const networthApi = {
  getLatest: async (userId: string): Promise<{ networth: number }> => {
    const { data } = await api.get(`/users/${userId}/networth/latest`)
    return data
  },

  getHistory: async (userId: string): Promise<NetWorthEntry[]> => {
    const { data } = await api.get(`/users/${userId}/networth/history`)
    return data
  },

  getBreakdown: async (userId: string): Promise<NetWorthBreakdown> => {
    const { data } = await api.get(`/users/${userId}/networth/breakdown`)
    return data
  },

  recalculate: async (userId: string): Promise<void> => {
    await api.post(`/users/${userId}/networth/recalculate`)
  },
}
