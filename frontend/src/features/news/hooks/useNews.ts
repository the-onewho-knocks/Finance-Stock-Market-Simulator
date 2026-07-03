import { useState, useEffect } from 'react'
import { newsApi, type FinnhubNewsItem } from '../api/newsApi'

export function useNews(category = 'general') {
  const [articles, setArticles] = useState<FinnhubNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    newsApi.getMarketNews(category)
      .then(setArticles)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [category])

  return { articles, loading, error }
}
