import { newsApi, type FinnhubNewsItem } from '../api/newsApi'
import { NewsCard } from './NewsCard'
import { Loader } from '../../../components/ui/Loader'
import { useQuery } from '../../../hooks/useQuery'

interface NewsFeedProps {
  category: string
}

export function NewsFeed({ category }: NewsFeedProps) {
  const { data: articles, loading, error } = useQuery<FinnhubNewsItem[]>(
    `news-${category}`,
    () => newsApi.getMarketNews(category),
  )

  if (loading) return <Loader />
  if (error) return <p className="text-sm text-gray-500">Failed to load news</p>

  const items = articles || []

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.slice(0, 18).map((a) => (
        <NewsCard key={a.id} article={a} />
      ))}
    </div>
  )
}
