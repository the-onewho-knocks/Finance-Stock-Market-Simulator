type Listener = (data: any) => void

class WebSocketService {
  private ws: WebSocket | null = null
  private url = ''
  private listeners = new Map<string, Set<Listener>>()
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private mockTimer: ReturnType<typeof setInterval> | null = null

  connect(url: string) {
    this.url = url
    this.disconnect()
    this.ws = new WebSocket(url)
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type) {
          this.listeners.get(data.type)?.forEach((fn) => fn(data.payload))
        }
        this.listeners.get('*')?.forEach((fn) => fn(data))
      } catch { /* ignore */ }
    }
    this.ws.onclose = () => {
      this.reconnectTimer = setTimeout(() => this.connect(this.url), 3000)
    }
    this.ws.onerror = () => this.ws?.close()
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    if (this.mockTimer) clearInterval(this.mockTimer)
    this.ws?.close()
    this.ws = null
  }

  on(type: string, fn: Listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set())
    this.listeners.get(type)!.add(fn)
    return () => this.listeners.get(type)?.delete(fn)
  }

  send(type: string, payload?: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }))
    }
  }

  startMock(intervalMs = 2000) {
    this.mockTimer = setInterval(() => {
      const mockPrice = () => ({
        symbol: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA'][Math.floor(Math.random() * 7)],
        price: 100 + Math.random() * 800,
        change: (Math.random() - 0.5) * 10,
        change_percent: (Math.random() - 0.5) * 5,
        volume: Math.floor(Math.random() * 100_000_000),
        high: 0,
        low: 0,
        open: 0,
        previous_close: 0,
        timestamp: new Date().toISOString(),
      })
      this.listeners.get('price')?.forEach((fn) => fn(mockPrice()))
    }, intervalMs)
  }
}

export const wsService = new WebSocketService()
