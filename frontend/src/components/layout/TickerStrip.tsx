import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/helpers'

const MOCK_TICKER = [
  { symbol: 'AAPL', price: 198.42, change: 1.23, changePercent: 0.62 },
  { symbol: 'MSFT', price: 425.18, change: -2.15, changePercent: -0.50 },
  { symbol: 'GOOGL', price: 175.90, change: 3.45, changePercent: 2.00 },
  { symbol: 'AMZN', price: 198.75, change: 0.87, changePercent: 0.44 },
  { symbol: 'TSLA', price: 248.30, change: -5.60, changePercent: -2.21 },
  { symbol: 'META', price: 512.60, change: 4.20, changePercent: 0.83 },
  { symbol: 'NVDA', price: 880.15, change: 12.40, changePercent: 1.43 },
  { symbol: 'JPM', price: 198.30, change: -0.50, changePercent: -0.25 },
  { symbol: 'V', price: 275.40, change: 1.10, changePercent: 0.40 },
  { symbol: 'WMT', price: 172.80, change: -0.30, changePercent: -0.17 },
]

export function TickerStrip() {
  const [items] = useState(MOCK_TICKER)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let animationId: number
    const scroll = () => {
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      } else {
        el.scrollLeft += 0.5
      }
      animationId = requestAnimationFrame(scroll)
    }
    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="border-b border-[#1f1f1f] bg-[#000000] overflow-hidden">
      <div ref={scrollRef} className="flex gap-8 overflow-x-hidden whitespace-nowrap py-1.5 px-4 text-xs">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 shrink-0">
            <span className="font-semibold text-gray-200">{item.symbol}</span>
            <span className="text-gray-300">${item.price.toFixed(2)}</span>
            <span className={cn(item.change >= 0 ? 'text-green-400' : 'text-red-400')}>
              {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
