import { useState } from 'react'
import { Tabs } from '../../components/ui/Tabs'
import { NewsFeed } from '../../features/news/components/NewsFeed'
import { TrendingNews } from '../../features/news/components/TrendingNews'
import { NewsSentiment } from '../../features/news/components/NewsSentiment'

const categories = [
  { key: 'general', label: 'General' },
  { key: 'forex', label: 'Forex' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'merger', label: 'Merger' },
]

export default function NewsPage() {
  const [active, setActive] = useState('general')

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-100">News</h1>
      <Tabs tabs={categories} active={active} onChange={setActive} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NewsFeed />
        </div>
        <div className="space-y-4">
          <TrendingNews />
          <NewsSentiment sentiment="neutral" score={0.5} />
        </div>
      </div>
    </div>
  )
}
