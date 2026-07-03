import api from '../../../services/axios'
import type { WatchlistItem } from '../types'

const MOCK: WatchlistItem[] = [
  { id: 'w1', user_id: 'demo', symbol: 'AAPL', added_at: new Date(Date.now() - 86400000 * 7).toISOString() },
  { id: 'w2', user_id: 'demo', symbol: 'MSFT', added_at: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: 'w3', user_id: 'demo', symbol: 'NVDA', added_at: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 'w4', user_id: 'demo', symbol: 'TSLA', added_at: new Date(Date.now() - 86400000 * 1).toISOString() },
]

export const watchlistApi = {
  list: async (userId: string): Promise<WatchlistItem[]> => {
    try {
      const { data } = await api.get(`/watchlist/${userId}`)
      return data
    } catch { return MOCK }
  },

  add: async (userId: string, symbol: string): Promise<WatchlistItem> => {
    try {
      const { data } = await api.post('/watchlist', { user_id: userId, symbol })
      return data
    } catch {
      const item: WatchlistItem = { id: `w_${Date.now()}`, user_id: userId, symbol, added_at: new Date().toISOString() }
      MOCK.push(item)
      return item
    }
  },

  remove: async (userId: string, symbol: string): Promise<void> => {
    try {
      await api.delete(`/watchlist/${userId}/${symbol}`)
    } catch {
      const idx = MOCK.findIndex((m) => m.symbol === symbol)
      if (idx >= 0) MOCK.splice(idx, 1)
    }
  },
}
