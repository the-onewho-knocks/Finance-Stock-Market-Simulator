import api from '../../../services/axios'
import type { Expense } from '../types'

export const expenseApi = {
  list: async (userId: string): Promise<Expense[]> => {
    const { data } = await api.get(`/users/${userId}/expenses/`)
    return data
  },

  add: async (userId: string, payload: { category: string; amount: number; description: string; date: string }): Promise<Expense> => {
    const { data } = await api.post(`/users/${userId}/expenses/`, payload)
    return data
  },

  remove: async (userId: string, expenseId: string): Promise<void> => {
    await api.delete(`/users/${userId}/expenses/${expenseId}`)
  },

  getTotal: async (userId: string): Promise<number> => {
    const { data } = await api.get(`/users/${userId}/expenses/total`)
    return data
  },
}
