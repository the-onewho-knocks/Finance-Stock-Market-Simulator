import { useNavigate } from 'react-router-dom'
import { TrendingUp, Wallet, Search, BarChart3, BrainCircuit, Newspaper, ArrowRight, LineChart, Star, Shield, Zap, Globe } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import Footer from '../../components/layout/Footer'

const features = [
  { icon: TrendingUp, title: 'Real-Time Market Data', desc: 'Live prices and candlestick charts powered by TradingView libraries.' },
  { icon: Wallet, title: 'Portfolio Tracking', desc: 'Track holdings, allocations, and P&L across your investments.' },
  { icon: BrainCircuit, title: 'AI-Powered Research', desc: 'Fundamental and technical analysis via AI microservice.' },
  { icon: BarChart3, title: 'Technical Analysis', desc: 'Advanced indicators like moving averages, RSI, and more.' },
  { icon: Newspaper, title: 'News & Sentiment', desc: 'Curated financial news with sentiment analysis.' },
  { icon: Search, title: 'Deep Research', desc: 'Company reports, financials, and market insights.' },
]

const stats = [
  { label: 'Markets Tracked', value: '20+' },
  { label: 'Indicators', value: '15+' },
  { label: 'AI Reports', value: 'Daily' },
  { label: 'Zero Cost', value: '100%' },
]

const tickers = [
  { sym: 'AAPL', price: '178.42', chg: '+1.23%', up: true },
  { sym: 'TSLA', price: '245.18', chg: '-0.87%', up: false },
  { sym: 'NVDA', price: '682.30', chg: '+3.45%', up: true },
  { sym: 'AMZN', price: '178.75', chg: '+0.56%', up: true },
  { sym: 'GOOGL', price: '141.22', chg: '-0.12%', up: false },
  { sym: 'MSFT', price: '378.91', chg: '+1.05%', up: true },
  { sym: 'META', price: '474.11', chg: '+2.34%', up: true },
  { sym: 'JPM', price: '183.47', chg: '+0.78%', up: true },
  { sym: 'V', price: '275.33', chg: '-0.45%', up: false },
  { sym: 'AMD', price: '162.89', chg: '+1.67%', up: true },
]

function MarketTicker() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/80 py-2 backdrop-blur-xl">
      <div className="flex animate-marquee gap-8 whitespace-nowrap">
        {[...tickers, ...tickers].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs">
            <span className="font-semibold text-gray-200">{t.sym}</span>
            <span className="text-gray-400">${t.price}</span>
            <span className={t.up ? 'text-green-500' : 'text-red-500'}>{t.chg}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function CandlestickSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 320" className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7F00FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7F00FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="320" fill="transparent" />
      {/* Grid */}
      {[40, 80, 120, 160, 200, 240, 280].map(y => (
        <line key={y} x1={0} y1={y} x2={800} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
      ))}
      {/* Candlesticks */}
      {Array.from({ length: 40 }, (_, i) => {
        const x = 30 + i * 19
        const open = 160 + Math.sin(i * 0.5) * 60 + Math.sin(i * 0.13) * 20
        const close = 160 + Math.sin(i * 0.5 + 0.3) * 60 + Math.sin(i * 0.13 + 0.1) * 20
        const high = Math.min(open, close) - 5 - Math.random() * 15
        const low = Math.max(open, close) + 5 + Math.random() * 15
        const isUp = close < open
        const color = isUp ? '#22c55e' : '#ef4444'
        const bodyTop = Math.min(open, close)
        const bodyH = Math.abs(close - open)
        return (
          <g key={i}>
            <line x1={x + 3} y1={high} x2={x + 3} y2={low} stroke={color} strokeWidth={1.2} opacity={0.8} />
            <rect x={x} y={bodyTop} width={6} height={Math.max(bodyH, 2)} fill={color} rx={0.5} opacity={0.9} />
          </g>
        )
      })}
      {/* SMA Line */}
      <path d={Array.from({ length: 40 }, (_, i) => {
        const x = 30 + i * 19
        const y = 160 + Math.sin(i * 0.5 + 0.15) * 50
        return `${i === 0 ? 'M' : 'L'}${x + 3},${y}`
      }).join(' ')} fill="none" stroke="#7F00FF" strokeWidth={2.5} opacity={0.8} />
      {/* Glow under SMA */}
      <path d={Array.from({ length: 40 }, (_, i) => {
        const x = 30 + i * 19
        const y = 160 + Math.sin(i * 0.5 + 0.15) * 50
        return `${i === 0 ? 'M' : 'L'}${x + 3},${y}`
      }).join(' ') + ' L797,320 L33,320 Z'} fill="url(#lineGlow)" opacity={0.15} />
      {/* Volume bars */}
      <g opacity={0.15}>
        {Array.from({ length: 40 }, (_, i) => {
          const x = 30 + i * 19
          const v = 20 + Math.random() * 60
          return <rect key={i} x={x + 0.5} y={320 - v} width={5} height={v} fill={i % 2 === 0 ? '#22c55e' : '#ef4444'} rx={0.5} />
        })}
      </g>
    </svg>
  )
}

function DashboardSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 380" className={className} preserveAspectRatio="xMidYMid meet">
      <rect width="600" height="380" fill="transparent" rx={12} />
      {/* Title bar */}
      <rect x={0} y={0} width={600} height={44} fill="rgba(255,255,255,0.03)" rx={12} />
      <rect x={0} y={20} width={600} height={24} fill="rgba(255,255,255,0.03)" />
      {/* Window dots */}
      <circle cx={20} cy={22} r={5} fill="#ef4444" opacity={0.8} />
      <circle cx={40} cy={22} r={5} fill="#eab308" opacity={0.8} />
      <circle cx={60} cy={22} r={5} fill="#22c55e" opacity={0.8} />
      {/* Portfolio card */}
      <rect x={16} y={60} width={568} height={100} fill="rgba(255,255,255,0.04)" rx={10} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      <text x={32} y={84} fill="rgba(255,255,255,0.4)" fontSize={11}>Portfolio Value</text>
      <text x={32} y={112} fill="#e5e7eb" fontSize={24} fontWeight={700}>$124,532.80</text>
      <text x={32} y={136} fill="#22c55e" fontSize={13}>+$3,241.12 (2.67%) today</text>
      {/* Mini chart */}
      <polyline points="200,130 220,120 240,125 260,115 280,108 300,112 320,100 340,95 360,98 380,88 400,92 420,82 440,78 460,85 480,75" fill="none" stroke="#7F00FF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
      {/* Allocation cards */}
      <rect x={16} y={176} width={180} height={60} fill="rgba(255,255,255,0.03)" rx={8} />
      <text x={32} y={200} fill="rgba(255,255,255,0.4)" fontSize={10}>Stocks</text>
      <text x={32} y={222} fill="#22c55e" fontSize={18} fontWeight={700}>65%</text>
      <rect x={16} y={176} width={120} height={3} fill="rgba(34,197,94,0.3)" rx={1.5} />
      <rect x={16} y={176} width={78} height={3} fill="#22c55e" rx={1.5} />
      <rect x={210} y={176} width={180} height={60} fill="rgba(255,255,255,0.03)" rx={8} />
      <text x={226} y={200} fill="rgba(255,255,255,0.4)" fontSize={10}>ETF</text>
      <text x={226} y={222} fill="#3b82f6" fontSize={18} fontWeight={700}>20%</text>
      <rect x={210} y={176} width={120} height={3} fill="rgba(59,130,246,0.3)" rx={1.5} />
      <rect x={210} y={176} width={24} height={3} fill="#3b82f6" rx={1.5} />
      <rect x={404} y={176} width={180} height={60} fill="rgba(255,255,255,0.03)" rx={8} />
      <text x={420} y={200} fill="rgba(255,255,255,0.4)" fontSize={10}>Cash</text>
      <text x={420} y={222} fill="#eab308" fontSize={18} fontWeight={700}>15%</text>
      <rect x={404} y={176} width={120} height={3} fill="rgba(234,179,8,0.3)" rx={1.5} />
      <rect x={404} y={176} width={18} height={3} fill="#eab308" rx={1.5} />
      {/* Holdings table */}
      <rect x={16} y={252} width={568} height={28} fill="rgba(255,255,255,0.02)" rx={6} />
      <text x={24} y={270} fill="rgba(255,255,255,0.3)" fontSize={10}>Symbol</text>
      <text x={130} y={270} fill="rgba(255,255,255,0.3)" fontSize={10}>Shares</text>
      <text x={230} y={270} fill="rgba(255,255,255,0.3)" fontSize={10}>Price</text>
      <text x={330} y={270} fill="rgba(255,255,255,0.3)" fontSize={10}>Value</text>
      <text x={450} y={270} fill="rgba(255,255,255,0.3)" fontSize={10}>P&L</text>
      {[['AAPL', '12', '$178', '$2,136', '+3.2%'], ['NVDA', '8', '$682', '$5,456', '+8.7%'], ['TSLA', '15', '$245', '$3,675', '-1.4%'], ['MSFT', '5', '$378', '$1,890', '+2.1%']].map((row, i) => {
        const y = 296 + i * 22
        return (
          <g key={i}>
            <text x={24} y={y} fill="#e5e7eb" fontSize={11} fontWeight={600}>{row[0]}</text>
            <text x={130} y={y} fill="rgba(255,255,255,0.6)" fontSize={11}>{row[1]}</text>
            <text x={230} y={y} fill="rgba(255,255,255,0.6)" fontSize={11}>{row[2]}</text>
            <text x={330} y={y} fill="rgba(255,255,255,0.6)" fontSize={11}>{row[3]}</text>
            <text x={450} y={y} fill={row[4].startsWith('+') ? '#22c55e' : '#ef4444'} fontSize={11}>{row[4]}</text>
          </g>
        )
      })}
    </svg>
  )
}

function GlobeSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Globe circle */}
      <circle cx={200} cy={150} r={100} fill="none" stroke="rgba(127,0,255,0.2)" strokeWidth={1} />
      <circle cx={200} cy={150} r={100} fill="url(#globeGrad)" opacity={0.1} />
      <defs>
        <radialGradient id="globeGrad">
          <stop offset="0%" stopColor="#7F00FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7F00FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Latitude/longitude lines */}
      <ellipse cx={200} cy={150} rx={100} ry={30} fill="none" stroke="rgba(127,0,255,0.15)" strokeWidth={0.8} />
      <ellipse cx={200} cy={150} rx={60} ry={100} fill="none" stroke="rgba(127,0,255,0.15)" strokeWidth={0.8} />
      <ellipse cx={200} cy={150} rx={30} ry={100} fill="none" stroke="rgba(127,0,255,0.15)" strokeWidth={0.8} />
      {/* Continents (abstract) */}
      <path d="M140 110 Q155 100 170 108 Q180 105 190 115 Q185 130 170 132 Q155 135 145 125 Z" fill="rgba(127,0,255,0.25)" />
      <path d="M220 90 Q240 85 260 95 Q270 110 255 120 Q240 125 225 115 Q215 105 220 90 Z" fill="rgba(127,0,255,0.25)" />
      <path d="M115 160 Q130 155 140 165 Q145 180 135 190 Q120 195 110 185 Q105 175 115 160 Z" fill="rgba(127,0,255,0.2)" />
      <path d="M250 140 Q270 130 290 145 Q295 165 280 175 Q260 180 245 165 Q240 155 250 140 Z" fill="rgba(127,0,255,0.2)" />
      {/* Connection dots */}
      <circle cx={155} cy={115} r={3} fill="#7F00FF" opacity={0.8} />
      <circle cx={245} cy={100} r={3} fill="#7F00FF" opacity={0.8} />
      <circle cx={130} cy={170} r={2.5} fill="#7F00FF" opacity={0.6} />
      <circle cx={270} cy={155} r={2.5} fill="#7F00FF" opacity={0.6} />
      <circle cx={200} cy={80} r={2} fill="#7F00FF" opacity={0.5} />
      <circle cx={200} cy={225} r={2} fill="#7F00FF" opacity={0.5} />
      {/* Connection lines */}
      <line x1={155} y1={115} x2={245} y2={100} stroke="rgba(127,0,255,0.15)" strokeWidth={1} strokeDasharray="4,4" />
      <line x1={155} y1={115} x2={200} y2={80} stroke="rgba(127,0,255,0.15)" strokeWidth={1} strokeDasharray="4,4" />
      <line x1={245} y1={100} x2={270} y2={155} stroke="rgba(127,0,255,0.15)" strokeWidth={1} strokeDasharray="4,4" />
      <line x1={130} y1={170} x2={270} y2={155} stroke="rgba(127,0,255,0.15)" strokeWidth={1} strokeDasharray="4,4" />
      <line x1={155} y1={115} x2={130} y2={170} stroke="rgba(127,0,255,0.15)" strokeWidth={1} strokeDasharray="4,4" />
    </svg>
  )
}

export default function IntroPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-gray-100 animate-fadeIn">
      {/* Market Ticker */}
      <MarketTicker />

      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[150px]" />
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px]" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Hero candlestick background */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <CandlestickSVG className="h-full w-full" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs text-accent-light">
            <Zap className="h-3 w-3" />
            Next-Gen Financial Platform
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Trade Smarter.
            <br />
            <span className="bg-gradient-to-r from-accent-light to-purple-400 bg-clip-text text-transparent">Invest Better.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
            A professional-grade financial platform with real-time market data, portfolio management,
            AI-powered research, and expense tracking — all in one place.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="gap-2 px-8 text-base"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => navigate('/login?guest=1')}
              className="px-8 text-base"
            >
              Continue as Guest
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border border-gray-600 flex items-start justify-center p-1">
            <div className="h-2 w-1 rounded-full bg-gray-400" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-accent-light">{s.value}</div>
              <div className="mt-1 text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Illustration — Professional Charts */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-xs text-accent-light">
                <LineChart className="h-3 w-3" />
                TradingView Powered
              </div>
              <h2 className="text-4xl font-bold">Professional-Grade Charts</h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Powered by TradingView's lightweight-charts library — the same technology used by
                professional traders worldwide. Interactive candlestick charts with full history.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <LineChart className="h-3 w-3 text-accent-light" />
                  </div>
                  Candlestick, area, and line chart types
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <Star className="h-3 w-3 text-accent-light" />
                  </div>
                  Technical indicators (SMA, EMA, RSI, MACD)
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <TrendingUp className="h-3 w-3 text-accent-light" />
                  </div>
                  Real-time WebSocket price streaming
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface to-[#050505] shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-3 text-xs text-gray-600">chart.html — AAPL · 1D</span>
                </div>
                <div className="relative">
                  <CandlestickSVG className="h-[280px] w-full" />
                  {/* Overlay indicators */}
                  <div className="absolute bottom-3 left-3 flex gap-2 text-[10px]">
                    <span className="rounded bg-accent/10 px-2 py-0.5 text-accent-light">SMA 50</span>
                    <span className="rounded bg-blue-500/10 px-2 py-0.5 text-blue-400">RSI 52.4</span>
                    <span className="rounded bg-green-500/10 px-2 py-0.5 text-green-400">MACD</span>
                  </div>
                </div>
              </div>
              {/* Glass reflection */}
              <div className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Illustration — Dashboard */}
      <section className="border-y border-border bg-surface/50 py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div className="order-2 md:order-1 relative">
              <div className="overflow-hidden rounded-xl border border-border bg-[#050505] shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-3 text-xs text-gray-600">dashboard — Portfolio Overview</span>
                </div>
                <DashboardSVG className="w-full" />
              </div>
              <div className="pointer-events-none absolute -left-4 -bottom-4 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-xs text-accent-light">
                <BarChart3 className="h-3 w-3" />
                Complete Overview
              </div>
              <h2 className="text-4xl font-bold">Complete Dashboard</h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                A comprehensive overview of your financial world. Track your net worth,
                monitor market movers, and manage your portfolio from a single screen.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <Wallet className="h-3 w-3 text-accent-light" />
                  </div>
                  Portfolio value with real-time P&L updates
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <BarChart3 className="h-3 w-3 text-accent-light" />
                  </div>
                  Top movers, market heatmap, and sector performance
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <Newspaper className="h-3 w-3 text-accent-light" />
                  </div>
                  Latest financial news with images and sentiment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Global Markets */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-xs text-accent-light">
                <Globe className="h-3 w-3" />
                Worldwide Coverage
              </div>
              <h2 className="text-4xl font-bold">Global Market Coverage</h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Track markets across the globe with real-time data from every major exchange.
                From NYSE to Tokyo, stay connected to what matters.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <Shield className="h-3 w-3 text-accent-light" />
                  </div>
                  Institutional-grade data feeds
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <Globe className="h-3 w-3 text-accent-light" />
                  </div>
                  Multi-exchange, multi-currency support
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                    <Zap className="h-3 w-3 text-accent-light" />
                  </div>
                  Sub-millisecond data processing
                </li>
              </ul>
            </div>
            <div className="relative flex items-center justify-center">
              <GlobeSVG className="h-[300px] w-[400px]" />
              <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-accent/5 blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-y border-border bg-surface/50 py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-xs text-accent-light">
              <Star className="h-3 w-3" />
              Platform Features
            </div>
            <h2 className="text-4xl font-bold">Everything You Need</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              From real-time market data to AI-powered research and expense tracking.
            </p>
          </div>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/30 hover:bg-[#121212] hover:-translate-y-0.5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-all duration-300">
                  <f.icon className="h-5 w-5 text-accent-light" />
                </div>
                <h3 className="font-semibold text-gray-200">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-gray-400">
            No registration required. Try the full platform in guest mode or create an account.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="gap-2 px-8 text-base"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => navigate('/signup')}
              className="px-8 text-base"
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
