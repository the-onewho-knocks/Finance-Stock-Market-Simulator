import { useState, useEffect } from 'react'
import { newsApi, type FinnhubNewsItem } from '../api/newsApi'

export function useTrendingNews() {
  const [items, setItems] = useState<FinnhubNewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    newsApi.getMarketNews('general')
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  return { items, loading }
}
