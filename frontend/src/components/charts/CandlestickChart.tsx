import { useEffect, useRef } from 'react'
import { createChart, CandlestickSeries } from 'lightweight-charts'

interface CandlestickChartProps {
  data: { time: string; open: number; high: number; low: number; close: number }[]
  height?: number
}

export function CandlestickChart({ data, height = 400 }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const chart = createChart(containerRef.current, {
      height,
      layout: { background: { color: '#0d0d0d' }, textColor: '#9ca3af' },
      grid: { vertLines: { color: '#1f1f1f' }, horzLines: { color: '#1f1f1f' } },
      timeScale: { borderColor: '#1f1f1f' },
      rightPriceScale: { borderColor: '#1f1f1f' },
      crosshair: { mode: 0 },
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderDownColor: '#ef4444',
      borderUpColor: '#22c55e',
      wickDownColor: '#ef4444',
      wickUpColor: '#22c55e',
    })
    series.setData(data)
    chart.timeScale().fitContent()

    return () => chart.remove()
  }, [data, height])

  return <div ref={containerRef} className="w-full" />
}
