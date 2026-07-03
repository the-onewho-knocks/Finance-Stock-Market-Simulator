import { useState, useMemo } from 'react'
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { heatmapApi, type HeatmapItem } from '../../features/market/api/heatmapApi'
import { Loader } from '../../components/ui/Loader'
import { cn } from '../../lib/helpers'
import { useQuery } from '../../hooks/useQuery'
import { useDebounce } from '../../hooks/useDebounce'

const SECTORS = ['All', 'Technology', 'Consumer Cyclical', 'Financial', 'Healthcare', 'Communication', 'Consumer Defensive', 'Energy', 'Industrials']

function getIntensity(percent: number): number {
  const v = Math.abs(percent)
  if (v > 5) return 0.9
  if (v > 3) return 0.7
  if (v > 1.5) return 0.5
  if (v > 0.5) return 0.3
  return 0.15
}

export default function MarketPage() {
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('All')
  const debouncedSearch = useDebounce(search, 300)

  const { data: items, loading } = useQuery<HeatmapItem[]>(
    'heatmap',
    () => heatmapApi.getHeatmap(),
    { onError: () => {} },
  )

  const filtered = useMemo(() => {
    if (!items) return []
    return items.filter((item) => {
      if (sector !== 'All' && item.sector !== sector) return false
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase()
        if (!item.symbol.toLowerCase().includes(q) && !item.name.toLowerCase().includes(q)) return false
      }
      return true
    }).sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
  }, [items, sector, debouncedSearch])

  const gainers = items?.filter((i) => i.changePercent > 0).length || 0
  const losers = items?.filter((i) => i.changePercent < 0).length || 0

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-100">Market Heatmap</h1>
          {!loading && items && (
            <p className="mt-0.5 text-xs text-gray-500">
              {items.length} stocks &middot;
              <span className="ml-1 text-green-500">{gainers} gaining</span>
              <span className="mx-1.5 text-gray-600">|</span>
              <span className="text-red-500">{losers} declining</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search symbols..."
              className="w-44 rounded-md border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-xs text-gray-200 placeholder-gray-600 focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all duration-200"
            />
          </div>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-gray-300 focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all duration-200"
          >
            {SECTORS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <p className="text-center text-sm text-gray-500">No matching stocks</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5">
          {filtered.map((item) => {
            const isUp = item.changePercent >= 0
            const intensity = getIntensity(item.changePercent)
            return (
              <div
                key={item.symbol}
                className={cn(
                  'group relative rounded-lg border p-3 transition-all duration-200 hover:z-10 hover:scale-105 hover:shadow-lg',
                  isUp ? 'border-green-900/40' : 'border-red-900/40',
                )}
                style={{
                  backgroundColor: isUp
                    ? `rgba(34, 197, 94, ${intensity * 0.25})`
                    : `rgba(239, 68, 68, ${intensity * 0.25})`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-200">{item.symbol}</span>
                  {isUp ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
                </div>
                <div className="mt-1 text-xs text-gray-400 truncate">{item.name}</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-100">${item.price.toFixed(2)}</span>
                  <span className={cn('text-xs font-medium', isUp ? 'text-green-500' : 'text-red-500')}>
                    {isUp ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </span>
                </div>
                <div className="pointer-events-none absolute -top-1 left-1/2 z-20 -translate-x-1/2 -translate-y-full rounded-md bg-border px-2.5 py-1.5 text-xs text-gray-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap">
                  {item.name} &middot; ${item.price.toFixed(2)} &middot; {isUp ? '+' : ''}{item.changePercent.toFixed(2)}%
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!loading && items && (
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Intensity:</span>
          <div className="flex items-center gap-1">
            <span className="text-green-600">Low</span>
            <div className="flex gap-0.5">
              {[0.15, 0.3, 0.5, 0.7, 0.9].map((v) => (
                <div key={v} className="h-3 w-4 rounded" style={{ backgroundColor: `rgba(34, 197, 94, ${v * 0.25})` }} />
              ))}
            </div>
            <span className="text-green-400">High</span>
          </div>
          <span className="mx-1 text-gray-700">|</span>
          <span className="text-green-500">&uarr; {gainers}</span>
          <span className="text-red-500">&darr; {losers}</span>
        </div>
      )}
    </div>
  )
}
