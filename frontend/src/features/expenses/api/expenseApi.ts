import api from '../../../services/axios'
import type { Expense } from '../types'

const MOCK: Expense[] = [
  { id: 'e1', user_id: 'demo', category: 'Food', amount: 45.50, description: 'Groceries', date: new Date(Date.now() - 86400000).toISOString().slice(0, 10), created_at: new Date().toISOString() },
  { id: 'e2', user_id: 'demo', category: 'Transport', amount: 32.00, description: 'Uber ride', date: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10), created_at: new Date().toISOString() },
  { id: 'e3', user_id: 'demo', category: 'Entertainment', amount: 15.99, description: 'Netflix subscription', date: new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10), created_at: new Date().toISOString() },
  { id: 'e4', user_id: 'demo', category: 'Shopping', amount: 89.99, description: 'New headphones', date: new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10), created_at: new Date().toISOString() },
  { id: 'e5', user_id: 'demo', category: 'Bills', amount: 120.00, description: 'Electricity bill', date: new Date(Date.now() - 86400000 * 7).toISOString().slice(0, 10), created_at: new Date().toISOString() },
  { id: 'e6', user_id: 'demo', category: 'Food', amount: 28.50, description: 'Lunch out', date: new Date(Date.now() - 86400000 * 1).toISOString().slice(0, 10), created_at: new Date().toISOString() },
]

export const expenseApi = {
  list: async (userId: string): Promise<Expense[]> => {
    try {
      const { data } = await api.get(`/users/${userId}/expenses/`)
      return data
    } catch { return MOCK }
  },

  add: async (userId: string, payload: { category: string; amount: number; description: string; date: string }): Promise<Expense> => {
    try {
      const { data } = await api.post(`/users/${userId}/expenses/`, payload)
      return data
    } catch {
      const item: Expense = { id: `e_${Date.now()}`, user_id: userId, ...payload, created_at: new Date().toISOString() }
      MOCK.unshift(item)
      return item
    }
  },

  remove: async (userId: string, expenseId: string): Promise<void> => {
    try {
      await api.delete(`/users/${userId}/expenses/${expenseId}`)
    } catch {
      const idx = MOCK.findIndex((m) => m.id === expenseId)
      if (idx >= 0) MOCK.splice(idx, 1)
    }
  },

  getTotal: async (userId: string): Promise<number> => {
    try {
      const { data } = await api.get(`/users/${userId}/expenses/total`)
      return data
    } catch { return MOCK.reduce((s, e) => s + e.amount, 0) }
  },
}
