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
  if (items.length === 0) return <p className="text-sm text-gray-500">No news articles found.</p>

  const [hero, ...rest] = items

  return (
    <div className="space-y-5">
      <div className="w-full">
        <NewsCard article={hero} />
      </div>
      <div className="columns-1 sm:columns-2 xl:columns-3 gap-5 [column-fill:_balance]">
        {rest.slice(0, 17).map((a) => (
          <div key={a.id} className="break-inside-avoid mb-5">
            <NewsCard article={a} />
          </div>
        ))}
      </div>
    </div>
  )
}
