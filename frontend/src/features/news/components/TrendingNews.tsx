import { useState, useEffect } from 'react'
import { Card, CardTitle } from '../../../components/ui/Card'
import { Loader } from '../../../components/ui/Loader'
import { newsApi, type FinnhubNewsItem } from '../api/newsApi'
import { timeAgo } from '../../../lib/formatDate'

export function TrendingNews() {
  const [items, setItems] = useState<FinnhubNewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    newsApi.getMarketNews('general')
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
      <CardTitle>Trending News</CardTitle>
      <div className="mt-3 space-y-3">
        {items.slice(0, 5).map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
            <p className="text-sm text-gray-200 group-hover:text-accent-light transition-colors line-clamp-2">{item.headline}</p>
            <p className="text-xs text-gray-500 mt-1">{item.source} &middot; {timeAgo(new Date(item.datetime * 1000).toISOString())}</p>
          </a>
        ))}
      </div>
    </Card>
  )
}
