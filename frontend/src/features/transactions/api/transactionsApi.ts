import api from '../../../services/axios'
import type { Transaction } from '../types'

export const transactionsApi = {
  getTransactions: async (userId: string, params?: { type?: string; symbol?: string; page?: number; limit?: number }): Promise<Transaction[]> => {
    const { data } = await api.get(`/transactions/${userId}`, { params })
    return data
  },
}
