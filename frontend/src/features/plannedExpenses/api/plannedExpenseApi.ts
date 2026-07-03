import api from '../../../services/axios'
import type { PlannedExpense } from '../types'

const MOCK: PlannedExpense[] = [
  { id: 'p1', user_id: 'demo', category: 'Travel', amount: 2000, description: 'Summer vacation fund', target_date: '2026-08-01', is_recurring: false, created_at: new Date().toISOString() },
  { id: 'p2', user_id: 'demo', category: 'Technology', amount: 1299, description: 'New laptop', target_date: '2026-12-01', is_recurring: false, created_at: new Date().toISOString() },
  { id: 'p3', user_id: 'demo', category: 'Bills', amount: 150, description: 'Monthly savings', target_date: '2026-07-01', is_recurring: true, created_at: new Date().toISOString() },
]

export const plannedExpenseApi = {
  list: async (userId: string): Promise<PlannedExpense[]> => {
    try {
      const { data } = await api.get(`/users/${userId}/planned-expenses/`)
      return data
    } catch { return MOCK }
  },

  create: async (userId: string, payload: { category: string; amount: number; description: string; target_date: string; is_recurring: boolean }): Promise<PlannedExpense> => {
    try {
      const { data } = await api.post(`/users/${userId}/planned-expenses/`, payload)
      return data
    } catch {
      const item: PlannedExpense = { id: `p_${Date.now()}`, user_id: userId, ...payload, created_at: new Date().toISOString() }
      MOCK.unshift(item)
      return item
    }
  },

  remove: async (userId: string, planId: string): Promise<void> => {
    try {
      await api.delete(`/users/${userId}/planned-expenses/${planId}`)
    } catch {
      const idx = MOCK.findIndex((m) => m.id === planId)
      if (idx >= 0) MOCK.splice(idx, 1)
    }
  },
}
