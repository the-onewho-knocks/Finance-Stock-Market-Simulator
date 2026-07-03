import { useEffect, useState } from 'react'
import type { StockPrice } from '../types'
import { wsService } from '../../../services/websocket'

export function usePriceStream(_symbols: string[]) {
  const [prices, setPrices] = useState<StockPrice[]>([])
  const [connected, setConnected] = useState(false)

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

    return () => {
      unsub()
      setPrices([])
      setConnected(false)
    }
  }, [])

  return { prices, connected }
}
