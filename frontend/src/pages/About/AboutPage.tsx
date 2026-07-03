import { Card, CardTitle } from '../../components/ui/Card'
import { TrendingUp, Wallet, Search, Newspaper, BarChart3, Shield, BrainCircuit, Receipt } from 'lucide-react'

const features = [
  { icon: TrendingUp, title: 'Real-time Market Data', description: 'Live prices, candlestick charts, and market overview powered by lightweight-charts (TradingView library).' },
  { icon: Wallet, title: 'Portfolio Management', description: 'Track holdings, allocations, buy/sell stocks, and monitor P&L across your entire portfolio.' },
  { icon: Search, title: 'AI Research', description: 'Leverage the stock-research-ai microservice for fundamental and technical analysis reports.' },
  { icon: Newspaper, title: 'News & Sentiment', description: 'Financial news with images via Finnhub API, sentiment analysis, and trending stories.' },
  { icon: BarChart3, title: 'Technical Indicators', description: 'Advanced charts with candlestick patterns, moving averages, and RSI for in-depth analysis.' },
  { icon: Receipt, title: 'Expense Tracking', description: 'Track, categorize, and plan expenses with visual breakdowns and net worth history.' },
  { icon: BrainCircuit, title: 'AI Insights', description: 'AI-driven market insights and predictions to inform your investment decisions.' },
  { icon: Shield, title: 'Secure Admin Panel', description: 'Full user management and system administration for controlling the platform.' },
]

const techStack = [
  { category: 'Frontend', items: 'React 19, TypeScript 6, Tailwind CSS v4, Redux Toolkit, React Router v7, Recharts, lightweight-charts' },
  { category: 'Backend', items: 'Go 1.22+, Chi router, PostgreSQL, RESTful API on port 8081' },
  { category: 'AI Service', items: 'Python FastAPI, stock-research-ai microservice on port 8000' },
  { category: 'External APIs', items: 'Finnhub for news (with images), stock quotes, and market data' },
  { category: 'Auth', items: 'Google OAuth 2.0, JWT tokens, protected routes' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-100">Finance Simulation</h1>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
          A full-stack financial management platform with real-time market data, portfolio tracking,
          AI-powered research, and expense management — inspired by TradingView and modern fintech dashboards.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} variant="elevated" className="hover:border-blue-500/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-600/10 p-2.5">
                <f.icon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle>{f.title}</CardTitle>
                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card variant="elevated">
        <CardTitle>Architecture</CardTitle>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="rounded-md bg-blue-600/20 px-3 py-1.5 font-medium text-blue-400">React Frontend :5173</span>
          <span className="text-gray-600">&rarr;</span>
          <span className="rounded-md bg-green-600/20 px-3 py-1.5 font-medium text-green-400">Go Backend :8081</span>
          <span className="text-gray-600">&rarr;</span>
          <span className="rounded-md bg-purple-600/20 px-3 py-1.5 font-medium text-purple-400">Python AI :8000</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="rounded-md bg-yellow-600/20 px-3 py-1.5 font-medium text-yellow-400">Finnhub API</span>
          <span className="text-gray-500">(direct from frontend)</span>
          <span className="mx-1 text-gray-600">|</span>
          <span className="rounded-md bg-[#1f1f1f] px-3 py-1.5 font-medium text-gray-400">PostgreSQL</span>
        </div>
      </Card>

      <Card variant="elevated">
        <CardTitle>Tech Stack</CardTitle>
        <div className="mt-3 space-y-3">
          {techStack.map((t) => (
            <div key={t.category} className="flex gap-3 text-sm">
              <span className="w-24 shrink-0 font-medium text-gray-400">{t.category}</span>
              <span className="text-gray-500">{t.items}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
