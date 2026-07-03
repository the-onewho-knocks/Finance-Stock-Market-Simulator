import api from '../../../services/axios'
import type { WatchlistItem } from '../types'

export const watchlistApi = {
  list: async (userId: string): Promise<WatchlistItem[]> => {
    const { data } = await api.get(`/watchlist/${userId}`)
    return data
  },

  add: async (userId: string, symbol: string): Promise<WatchlistItem> => {
    const { data } = await api.post('/watchlist', { user_id: userId, symbol })
    return data
  },

  remove: async (userId: string, symbol: string): Promise<void> => {
    await api.delete(`/watchlist/${userId}/${symbol}`)
  },
}
