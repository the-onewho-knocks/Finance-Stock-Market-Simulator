import { useNavigate } from 'react-router-dom'
import { TrendingUp, Wallet, Search, BarChart3, BrainCircuit, Newspaper, ArrowRight, LineChart, Star } from 'lucide-react'
import { Button } from '../../components/ui/Button'

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

export default function IntroPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent shadow-2xl shadow-accent/40">
            <TrendingUp className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Finance{' '}
            <span className="bg-gradient-to-r from-accent-light to-purple-400 bg-clip-text text-transparent">
              Simulation
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
            A full-stack financial platform with real-time market data, portfolio management,
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
      <section className="border-y border-[#1f1f1f] bg-[#0d0d0d]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-accent-light">{s.value}</div>
              <div className="mt-1 text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Illustration — Chart Image */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Professional-Grade Charts</h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Powered by TradingView's lightweight-charts library — the same technology used by
                professional traders worldwide. Interactive candlestick charts with full history.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-accent-light" />
                  Candlestick, area, and line chart types
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-accent-light" />
                  Technical indicators (SMA, EMA, RSI, MACD)
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent-light" />
                  Real-time WebSocket price streaming
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-[#1f1f1f] bg-gradient-to-br from-[#0d0d0d] to-[#050505]">
                <div className="flex items-center gap-1.5 border-b border-[#1f1f1f] px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="ml-3 text-xs text-gray-600">chart.html — Candlestick View</span>
                </div>
                <svg viewBox="0 0 500 240" className="w-full" preserveAspectRatio="none">
                  <rect width="500" height="240" fill="#050505" />
                  {/* Candlesticks */}
                  {[60,90,120,150,180,210,240,270,300,330,360,390,420,450].map((x,i)=>(
                    <g key={i}>
                      <rect x={x} y={80+Math.sin(i*0.8)*40} width={8} height={60+Math.cos(i*1.2)*30} fill={i%3===0?"#22c55e":"#ef4444"} rx={1} />
                      <line x1={x+4} y1={70+Math.sin(i*0.8)*40} x2={x+4} y2={80+Math.sin(i*0.8)*40} stroke={i%3===0?"#22c55e":"#ef4444"} strokeWidth={1.5} />
                      <line x1={x+4} y1={140+Math.cos(i*1.2)*30} x2={x+4} y2={150+Math.cos(i*1.2)*30} stroke={i%3===0?"#22c55e":"#ef4444"} strokeWidth={1.5} />
                    </g>
                  ))}
                  {/* SMA line */}
                  <polyline points="60,120 90,115 120,110 150,105 180,100 210,95 240,90 270,85 300,80 330,75 360,70 390,65 420,60 450,55" fill="none" stroke="#7F00FF" strokeWidth={2} />
                  {/* Grid lines */}
                  {[50,80,110,140,170,200].map(y=><line key={`g${y}`} x1={40} y1={y} x2={470} y2={y} stroke="#1f1f1f" strokeWidth={0.5} />)}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Illustration — Dashboard Image */}
      <section className="border-y border-[#1f1f1f] bg-[#0d0d0d] py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="overflow-hidden rounded-xl border border-[#1f1f1f] bg-[#050505]">
                <div className="flex items-center gap-1.5 border-b border-[#1f1f1f] px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="ml-3 text-xs text-gray-600">dashboard — Portfolio Overview</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs text-gray-600">Total Value</div>
                      <div className="text-xl font-bold text-gray-100">$124,532.80</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-600">Today's P&L</div>
                      <div className="text-sm font-semibold text-green-500">+$3,241.12 (+2.67%)</div>
                    </div>
                  </div>
                  <div className="h-2 rounded bg-[#1f1f1f] overflow-hidden">
                    <div className="h-full w-3/5 rounded bg-gradient-to-r from-accent to-purple-500" />
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="rounded bg-green-500/20 px-2 py-0.5 text-green-400">Stocks 65%</span>
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-400">ETF 20%</span>
                    <span className="rounded bg-yellow-500/20 px-2 py-0.5 text-yellow-400">Cash 15%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold">Complete Dashboard</h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                A comprehensive overview of your financial world. Track your net worth,
                monitor market movers, and manage your portfolio from a single screen.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-accent-light" />
                  Portfolio value with real-time P&L updates
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-accent-light" />
                  Top movers, market heatmap, and sector performance
                </li>
                <li className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-accent-light" />
                  Latest financial news with images and sentiment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">Everything You Need</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            From real-time market data to AI-powered research and expense tracking.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] p-6 transition-all hover:border-accent/30 hover:bg-[#121212]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
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
      <section className="border-t border-[#1f1f1f] bg-[#0d0d0d] py-16 px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-gray-400">
            No registration required. Try the full platform in guest mode or sign in with Google.
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
              onClick={() => navigate('/login?guest=1')}
              className="px-8 text-base"
            >
              Guest Mode
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1f1f1f] py-8 px-4 text-center text-xs text-gray-600">
        Finance Simulation &copy; {new Date().getFullYear()} &mdash; Built with React, Go, and Python
      </footer>
    </div>
  )
}
