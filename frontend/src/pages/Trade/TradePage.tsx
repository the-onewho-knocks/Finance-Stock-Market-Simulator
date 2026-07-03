import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { TrendingUp, TrendingDown, DollarSign, Building2, Globe, Briefcase, Info } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import type { RootState } from '../../app/store'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Loader } from '../../components/ui/Loader'
import { portfolioApi } from '../../features/portfolio/api/portfolioApi'

const FINNHUB_BASE = 'https://finnhub.io/api/v1'
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'd8lbm01r01qtamgttvjgd8lbm01r01qtamgttvk0'

const MOCK_QUOTE = { c: 178.5, d: 2.3, dp: 1.31, h: 181.2, l: 176.8, o: 177.1, pc: 176.2 }
const MOCK_PROFILE = { name: 'Apple Inc', exchange: 'NASDAQ', sector: 'Technology', industry: 'Consumer Electronics', marketCapitalization: 2800000000000, ipo: '1980-12-12', shareOutstanding: 16000000000, weburl: 'https://www.apple.com', logo: 'https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png', finnhubIndustry: 'Technology' }

type OrderType = 'market' | 'limit' | 'stop'
type TradeSide = 'buy' | 'sell'

export default function TradePage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const userId = user?.id || 'demo'

  const [query, setQuery] = useState('')
  const [symbol, setSymbol] = useState('')
  const [quote, setQuote] = useState<typeof MOCK_QUOTE | null>(null)
  const [profile, setProfile] = useState<typeof MOCK_PROFILE | null>(null)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const [orderType, setOrderType] = useState<OrderType>('market')
  const [tradeSide, setTradeSide] = useState<TradeSide>('buy')
  const [qty, setQty] = useState('')
  const [limitPrice, setLimitPrice] = useState('')
  const [stopPrice, setStopPrice] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [recent, setRecent] = useState<{ symbol: string; qty: number; type: 'buy' | 'sell'; price: number; time: string }[]>([])

  useEffect(() => {
    portfolioApi.getPortfolio(userId).then((p) => setBalance(p.cash_balance)).catch(() => {})
  }, [userId])

  const fetchData = useCallback(async (sym: string) => {
    if (!sym) return
    setLoading(true)
    const [qRes, pRes] = await Promise.allSettled([
      axios.get(`${FINNHUB_BASE}/quote`, { params: { symbol: sym, token: FINNHUB_KEY } }),
      axios.get(`${FINNHUB_BASE}/stock/profile2`, { params: { symbol: sym, token: FINNHUB_KEY } }),
    ])
    if (qRes.status === 'fulfilled' && qRes.value.data.c) setQuote(qRes.value.data)
    else setQuote(MOCK_QUOTE)
    if (pRes.status === 'fulfilled' && pRes.value.data.name) setProfile(pRes.value.data)
    else setProfile(MOCK_PROFILE)
    setLoading(false)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const sym = query.trim().toUpperCase()
      setSymbol(sym)
      setQty(''); setLimitPrice(''); setStopPrice('')
      fetchData(sym)
    }
  }

  const handleSubmitOrder = async () => {
    if (!symbol || !qty || +qty <= 0) return
    if (orderType === 'limit' && (!limitPrice || +limitPrice <= 0)) return toast.error('Enter a limit price')
    if (orderType === 'stop' && (!stopPrice || +stopPrice <= 0)) return toast.error('Enter a stop price')

    const price = quote?.c || 0
    const estimatedCost = price * +qty
    if (tradeSide === 'buy' && estimatedCost > balance) return toast.error('Insufficient balance')

    setSubmitting(true)
    try {
      if (tradeSide === 'buy') {
        const res = await portfolioApi.buy({ user_id: userId, symbol, quantity: +qty })
        if (res.success) {
          setBalance(res.cash_balance)
          setRecent((r) => [{ symbol, qty: +qty, type: 'buy' as const, price, time: new Date().toLocaleTimeString() }, ...r].slice(0, 10))
          toast.success(`${orderType === 'market' ? 'Market' : orderType === 'limit' ? 'Limit' : 'Stop'} buy ${qty} ${symbol} at $${price.toFixed(2)}`)
        }
      } else {
        const res = await portfolioApi.sell({ user_id: userId, symbol, quantity: +qty })
        if (res.success) {
          setBalance(res.cash_balance)
          setRecent((r) => [{ symbol, qty: +qty, type: 'sell' as const, price, time: new Date().toLocaleTimeString() }, ...r].slice(0, 10))
          toast.success(`${orderType === 'market' ? 'Market' : orderType === 'limit' ? 'Limit' : 'Stop'} sell ${qty} ${symbol} at $${price.toFixed(2)}`)
        }
      }
    } catch { toast.error(`${tradeSide === 'buy' ? 'Buy' : 'Sell'} failed`) }
    setSubmitting(false)
  }

  const price = quote?.c ?? 0
  const change = quote?.d ?? 0
  const changePercent = quote?.dp ?? 0

  const orderTypes: { key: OrderType; label: string }[] = [
    { key: 'market', label: 'Market' },
    { key: 'limit', label: 'Limit' },
    { key: 'stop', label: 'Stop' },
  ]

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top Bar: Search + Balance */}
      <div className="flex items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-xl">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search symbol (e.g. AAPL, MSFT, NVDA)" className="flex-1" />
          <Button type="submit" disabled={!query.trim()}>Search</Button>
        </form>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 shrink-0">
          <DollarSign className="h-4 w-4 text-green-400" />
          <span className="text-xs text-gray-500">Balance</span>
          <span className="text-sm font-semibold text-gray-100">${balance.toLocaleString()}</span>
        </div>
      </div>

      {loading && <Loader />}

      {symbol && !loading && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Stock Info Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Quote + Company Profile */}
            <Card>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {profile?.logo && (
                    <img src={profile.logo} alt="" className="h-12 w-12 rounded-lg object-contain bg-white/5 p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-100">{symbol}</h2>
                      {profile?.name && <span className="text-sm text-gray-500">{profile.name}</span>}
                    </div>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-3xl font-bold text-gray-100">${price.toFixed(2)}</span>
                      <span className={`flex items-center gap-1 text-sm font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 space-y-0.5">
                  <div>Open: <span className="text-gray-300">${(quote?.o ?? 0).toFixed(2)}</span></div>
                  <div>High: <span className="text-gray-300">${(quote?.h ?? 0).toFixed(2)}</span></div>
                  <div>Low: <span className="text-gray-300">${(quote?.l ?? 0).toFixed(2)}</span></div>
                  <div>Prev Close: <span className="text-gray-300">${(quote?.pc ?? 0).toFixed(2)}</span></div>
                </div>
              </div>

              {profile && (
                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-3 text-xs text-gray-500">
                  {profile.exchange && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{profile.exchange}</span>}
                  {(profile.sector || profile.finnhubIndustry) && <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{profile.finnhubIndustry || profile.sector}</span>}
                  {profile.marketCapitalization && <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />Mkt Cap: ${(profile.marketCapitalization / 1e9).toFixed(1)}B</span>}
                  {profile.ipo && <span className="flex items-center gap-1"><Info className="h-3 w-3" />IPO: {profile.ipo}</span>}
                </div>
              )}
            </Card>

            {/* Order Form */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-200 mb-4">Place Order</h3>

              {/* Buy/Sell Toggle */}
              <div className="flex rounded-lg border border-border overflow-hidden mb-4">
                <button onClick={() => setTradeSide('buy')} className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer ${tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-transparent text-gray-400 hover:text-gray-200'}`}>Buy</button>
                <button onClick={() => setTradeSide('sell')} className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer ${tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-transparent text-gray-400 hover:text-gray-200'}`}>Sell</button>
              </div>

              {/* Order Type */}
              <div className="flex gap-1 mb-4">
                {orderTypes.map((ot) => (
                  <button key={ot.key} onClick={() => setOrderType(ot.key)} className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors cursor-pointer ${orderType === ot.key ? 'bg-accent/20 text-accent-light' : 'bg-transparent text-gray-500 hover:text-gray-300'}`}>{ot.label}</button>
                ))}
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Quantity" type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="10" min={1} />
                  {orderType === 'limit' && <Input label="Limit Price" type="number" value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} placeholder="0.00" min={0.01} step={0.01} />}
                  {orderType === 'stop' && <Input label="Stop Price" type="number" value={stopPrice} onChange={(e) => setStopPrice(e.target.value)} placeholder="0.00" min={0.01} step={0.01} />}
                </div>

                {price > 0 && qty && +qty > 0 && (
                  <div className="rounded-md bg-white/[0.03] px-3 py-2 text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between"><span>Est. {tradeSide === 'buy' ? 'Cost' : 'Value'}</span><span className="text-gray-300">${(price * +qty).toLocaleString()}</span></div>
                    {tradeSide === 'buy' && <div className="flex justify-between"><span>Available Balance</span><span className="text-gray-300">${balance.toLocaleString()}</span></div>}
                  </div>
                )}

                <Button
                  onClick={handleSubmitOrder}
                  disabled={!symbol || !qty || +qty <= 0 || submitting}
                  className={`w-full ${tradeSide === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {submitting ? 'Processing...' : `${orderType === 'market' ? 'Market' : orderType === 'limit' ? 'Limit' : 'Stop'} ${tradeSide === 'buy' ? 'Buy' : 'Sell'} ${symbol || ''}`}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Panel: Recent Trades */}
          <div className="space-y-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-200">Order History</h3>
              {recent.length === 0 ? (
                <p className="text-sm text-gray-500 mt-3">No orders yet.</p>
              ) : (
                <div className="mt-3 space-y-2 max-h-80 overflow-y-auto">
                  {recent.map((t, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-sm text-gray-200">{t.symbol}</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${t.type === 'buy' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>{t.type.toUpperCase()}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{t.qty} @ ${t.price.toFixed(2)}</div>
                      </div>
                      <span className="text-[10px] text-gray-600">{t.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-200 mb-3">Quick Symbols</h3>
              <div className="flex flex-wrap gap-1.5">
                {['AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN', 'GOOGL', 'META', 'JPM', 'V', 'WMT'].map((s) => (
                  <button key={s} onClick={() => { setQuery(s); setSymbol(s); setQty(''); setLimitPrice(''); setStopPrice(''); fetchData(s) }} className="rounded-md bg-white/5 px-2.5 py-1.5 text-xs font-medium text-gray-400 hover:bg-accent/15 hover:text-accent-light transition-colors cursor-pointer">{s}</button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {!symbol && !loading && (
        <Card variant="glass" className="text-center py-12">
          <p className="text-sm text-gray-500">Search for a stock symbol above to view price, company info, and place trades.</p>
        </Card>
      )}
    </div>
  )
}
