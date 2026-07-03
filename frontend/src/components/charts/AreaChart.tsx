import { useEffect, useRef } from 'react'
import { createChart, AreaSeries } from 'lightweight-charts'

interface AreaChartProps {
  data: { time: string; value: number }[]
  color?: string
  height?: number
}

export function AreaChart({ data, color = '#22c55e', height = 300 }: AreaChartProps) {
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

    const series = chart.addSeries(AreaSeries, {
      lineColor: color,
      topColor: `${color}40`,
      bottomColor: `${color}05`,
      lineWidth: 2,
    })
    series.setData(data)
    chart.timeScale().fitContent()

    return () => chart.remove()
  }, [data, height, color])

  return <div ref={containerRef} className="w-full" />
}
