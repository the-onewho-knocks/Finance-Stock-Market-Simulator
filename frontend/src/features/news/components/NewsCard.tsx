import type { FinnhubNewsItem } from '../api/newsApi'
import { timeAgo } from '../../../lib/formatDate'

interface NewsCardProps {
  article: FinnhubNewsItem
}

function hashColor(id: number): string {
  const colors = ['#7F00FF', '#0066FF', '#00AA55', '#CC5500', '#AA00AA', '#0088AA', '#AA4400', '#5555FF']
  return colors[id % colors.length]
}

export function NewsCard({ article }: NewsCardProps) {
  const hasImage = !!article.image
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-border bg-surface overflow-hidden hover:border-accent/50 transition-colors"
    >
      {hasImage ? (
        <img
          src={article.image}
          alt={article.headline}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      ) : (
        <div
          className="flex h-48 w-full items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${hashColor(article.id)}, ${hashColor(article.id + 2)})` }}
        >
          <span className="text-4xl font-bold text-white/20">{article.source[0]}</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{article.source}</span>
          <span>&middot;</span>
          <span>{timeAgo(new Date(article.datetime * 1000).toISOString())}</span>
        </div>
        <h3 className="mt-2 text-sm font-semibold text-gray-100 group-hover:text-accent-light transition-colors line-clamp-2">
          {article.headline}
        </h3>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{article.summary}</p>
        {article.related && (
          <div className="mt-2 flex flex-wrap gap-1">
            {article.related.split(',').slice(0, 3).map((s) => (
              <span key={s} className="rounded bg-border px-2 py-0.5 text-xs text-gray-400">{s.trim()}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
