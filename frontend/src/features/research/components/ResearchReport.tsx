import { useState, useEffect } from 'react'
import axios from 'axios'
import type { ResearchResponse } from '../types'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardTitle } from '../../../components/ui/Card'
import { Skeleton } from '../../../components/ui/Skeleton'
import { stockProfileApi } from '../api/stockProfileApi'
import { formatDate } from '../../../lib/formatDate'

const FINNHUB_BASE = 'https://finnhub.io/api/v1'
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'd8lbm01r01qtamgttvjgd8lbm01r01qtamgttvk0'

interface NewsImage {
  image: string
  headline: string
  url: string
}

interface ResearchReportProps {
  result: ResearchResponse
}

const recBadge = {
  BUY: 'success' as const,
  SELL: 'danger' as const,
  HOLD: 'warning' as const,
}

export function StockImages({ symbol }: { symbol: string }) {
  const [images, setImages] = useState<NewsImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const to = new Date().toISOString().slice(0, 10)
    const from = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)
    axios
      .get(`${FINNHUB_BASE}/company-news`, {
        params: { symbol, from, to, token: FINNHUB_KEY },
      })
      .then(({ data }) => {
        const withImg = (data as any[])
          .filter((a: any) => a.image)
          .slice(0, 4)
          .map((a: any) => ({ image: a.image, headline: a.headline, url: a.url }))
        setImages(withImg)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [symbol])

  if (loading || images.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {images.map((img, i) => (
        <a
          key={i}
          href={img.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-lg border border-border bg-[#050505] aspect-[16/9]"
        >
          <img
            src={img.image}
            alt={img.headline}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-[10px] text-gray-200 line-clamp-2 leading-tight">{img.headline}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

export function ResearchReport({ result }: ResearchReportProps) {
  const [profile, setProfile] = useState<{ logo: string; name: string } | null>(null)

  useEffect(() => {
    stockProfileApi.getProfile(result.symbol).then(setProfile)
  }, [result.symbol])

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header with logo and images */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {profile?.logo ? (
            <img
              src={profile.logo}
              alt={result.company_name}
              className="h-12 w-12 rounded-xl bg-border object-contain p-1.5"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-border text-sm font-bold text-gray-500">
              {result.symbol.slice(0, 2)}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-100">{result.company_name}</h2>
            <p className="text-sm text-gray-500">
              {result.symbol} &middot; {formatDate(result.created_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-gray-500">Confidence</div>
            <div className="text-2xl font-bold text-gray-100">{(result.confidence_score * 100).toFixed(0)}%</div>
          </div>
          <Badge variant={recBadge[result.recommendation]} className="text-sm px-3 py-1">
            {result.recommendation}
          </Badge>
        </div>
      </div>

      {/* Recent stock images */}
      <StockImages symbol={result.symbol} />

      {/* Executive Summary - full width, prominent */}
      <Card>
        <CardTitle className="text-base">Executive Summary</CardTitle>
        <p className="mt-3 text-sm text-gray-300 leading-relaxed">{result.executive_summary}</p>
      </Card>

      {/* Strengths, Risks, Opportunities, Red Flags */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-900/30">
          <CardTitle className="text-sm text-green-400">Strengths</CardTitle>
          <ul className="mt-3 space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="text-sm text-gray-300 leading-relaxed flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-red-900/30">
          <CardTitle className="text-sm text-red-400">Risks</CardTitle>
          <ul className="mt-3 space-y-2">
            {result.risks.map((r, i) => (
              <li key={i} className="text-sm text-gray-300 leading-relaxed flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {r}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-accent/20">
          <CardTitle className="text-sm text-accent-light">Opportunities</CardTitle>
          <ul className="mt-3 space-y-2">
            {result.opportunities.map((o, i) => (
              <li key={i} className="text-sm text-gray-300 leading-relaxed flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {o}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-yellow-900/30">
          <CardTitle className="text-sm text-yellow-400">Red Flags</CardTitle>
          <ul className="mt-3 space-y-2">
            {result.red_flags.map((f, i) => (
              <li key={i} className="text-sm text-gray-300 leading-relaxed flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500" />
                {f}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Detailed summaries - full width cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {result.news_summary && (
          <Card>
            <CardTitle>News Summary</CardTitle>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">{result.news_summary}</p>
          </Card>
        )}
        {result.financial_summary && (
          <Card>
            <CardTitle>Financial Summary</CardTitle>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">{result.financial_summary}</p>
          </Card>
        )}
        {result.market_summary && (
          <Card>
            <CardTitle>Market Summary</CardTitle>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">{result.market_summary}</p>
          </Card>
        )}
        {result.sec_summary && (
          <Card>
            <CardTitle>SEC Summary</CardTitle>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">{result.sec_summary}</p>
          </Card>
        )}
      </div>

      {/* Sources */}
      {result.sources && result.sources.length > 0 && (
        <Card>
          <CardTitle>Sources</CardTitle>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.sources.map((s, i) => (
              <span key={i} className="rounded-md bg-border px-2.5 py-1 text-xs text-gray-400">
                {s.type}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export function ResearchReportSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Skeleton className="aspect-[16/9] rounded-lg" />
        <Skeleton className="aspect-[16/9] rounded-lg" />
        <Skeleton className="aspect-[16/9] rounded-lg" />
        <Skeleton className="aspect-[16/9] rounded-lg" />
      </div>
      <Skeleton className="h-32 rounded-lg" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
    </div>
  )
}
