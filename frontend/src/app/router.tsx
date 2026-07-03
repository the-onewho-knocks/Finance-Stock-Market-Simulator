import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import ProtectedRoute from './protected-route'
import IntroPage from '../pages/Intro/IntroPage'
import LoginPage from '../pages/Login/LoginPage'
import AboutPage from '../pages/About/AboutPage'
import DashboardPage from '../pages/Dashboard/DashboardPage'
import PortfolioPage from '../pages/Portfolio/PortfolioPage'
import TransactionsPage from '../pages/Transactions/TransactionsPage'
import MarketPage from '../pages/Market/MarketPage'
import NewsPage from '../pages/News/NewsPage'
import WatchlistPage from '../pages/Watchlist/WatchlistPage'
import ResearchPage from '../pages/Research/ResearchPage'
import ExpensesPage from '../pages/Expenses/ExpensesPage'
import PlannedExpensesPage from '../pages/PlannedExpenses/PlannedExpensesPage'
import NetWorthPage from '../pages/NetWorth/NetWorthPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import IndicatorsPage from '../pages/Indicators/IndicatorsPage'
import HistoryPage from '../pages/History/HistoryPage'
import AlertsPage from '../pages/Alerts/AlertsPage'
import NotFoundPage from '../pages/NotFound/NotFoundPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/planned-expenses" element={<PlannedExpensesPage />} />
          <Route path="/networth" element={<NetWorthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/indicators" element={<IndicatorsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
