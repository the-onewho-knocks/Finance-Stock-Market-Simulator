import api from '../../../services/axios'
import type { NetWorthEntry, NetWorthBreakdown } from '../types'

const MOCK_HISTORY: NetWorthEntry[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10),
  value: 115000 + Math.random() * 15000 + i * 150,
}))

const MOCK_BREAKDOWN: NetWorthBreakdown = {
  assets: 124532.80,
  liabilities: 18500.00,
  networth: 106032.80,
  categories: [
    { label: 'Investments', value: 85872.45 },
    { label: 'Cash', value: 18660.35 },
    { label: 'Property', value: 20000.00 },
    { label: 'Debt', value: -18500.00 },
  ],
}

export const networthApi = {
  getLatest: async (userId: string): Promise<{ networth: number }> => {
    try {
      const { data } = await api.get(`/users/${userId}/networth/latest`)
      return data
    } catch { return { networth: MOCK_HISTORY[MOCK_HISTORY.length - 1]?.value || 120000 } }
  },

  getHistory: async (userId: string): Promise<NetWorthEntry[]> => {
    try {
      const { data } = await api.get(`/users/${userId}/networth/history`)
      return data
    } catch { return MOCK_HISTORY }
  },

  getBreakdown: async (userId: string): Promise<NetWorthBreakdown> => {
    try {
      const { data } = await api.get(`/users/${userId}/networth/breakdown`)
      return data
    } catch { return MOCK_BREAKDOWN }
  },

  recalculate: async (userId: string): Promise<void> => {
    try {
      await api.post(`/users/${userId}/networth/recalculate`)
    } catch { /* mock — no-op */ }
  },
}
