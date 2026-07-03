import { useEffect, useRef, useState, useCallback } from 'react'
import type { StockPrice } from '../types'
import { wsService } from '../../../services/websocket'

export function usePriceStream(symbols: string[]) {
  const [prices, setPrices] = useState<StockPrice[]>([])
  const [connected, setConnected] = useState(false)
  const cleanupRef = useRef<(() => void) | null>(null)

  const startMock = useCallback(() => {
    wsService.startMock(2000)
    setConnected(true)
  }, [])

  useEffect(() => {
    const unsub = wsService.on('price', (data: StockPrice) => {
      setPrices((prev) => {
        const idx = prev.findIndex((p) => p.symbol === data.symbol)
        if (idx >= 0) {
          const next = [...prev]
          next[idx] = data
          return next
        }
        return [...prev, data]
      })
    })
    cleanupRef.current = () => {
      unsub()
      setPrices([])
      setConnected(false)
    }

    const url = `${import.meta.env.VITE_WS_URL || 'ws://localhost:8081'}/market/stream?symbols=${symbols.join(',')}`
    try {
      wsService.connect(url)
      wsService.on('*', () => setConnected(true))
    } catch {
      startMock()
    }

    return () => {
      cleanupRef.current?.()
    }
  }, [symbols.join(',')])

  return { prices, connected }
}
