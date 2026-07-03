import api from '../../../services/axios'
import type { PlannedExpense } from '../types'

export const plannedExpenseApi = {
  list: async (userId: string): Promise<PlannedExpense[]> => {
    const { data } = await api.get(`/users/${userId}/planned-expenses/`)
    return data
  },

  create: async (userId: string, payload: { category: string; amount: number; description: string; target_date: string; is_recurring: boolean }): Promise<PlannedExpense> => {
    const { data } = await api.post(`/users/${userId}/planned-expenses/`, payload)
    return data
  },

  remove: async (userId: string, planId: string): Promise<void> => {
    await api.delete(`/users/${userId}/planned-expenses/${planId}`)
  },
}
