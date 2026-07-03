import { useState, useEffect } from 'react'
import type { FinnhubNewsItem } from '../api/newsApi'
import { newsApi } from '../api/newsApi'
import { NewsCard } from './NewsCard'
import { Loader } from '../../../components/ui/Loader'

interface NewsFeedProps {
  category: string
}

export function NewsFeed({ category }: NewsFeedProps) {
  const [articles, setArticles] = useState<FinnhubNewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    newsApi.getMarketNews(category)
      .then(setArticles)
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [category])

  if (loading) return <Loader />

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.slice(0, 18).map((a) => (
        <NewsCard key={a.id} article={a} />
      ))}
    </div>
  )
}
