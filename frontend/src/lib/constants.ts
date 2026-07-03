export const APP_NAME = 'Finance Simulation'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081'

export const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM', 'V', 'WMT']

export const EXPENSE_CATEGORIES = [
  'Housing', 'Food', 'Transport', 'Utilities', 'Entertainment',
  'Healthcare', 'Shopping', 'Education', 'Other',
]

export const SENTIMENT_COLORS = {
  positive: 'text-green-600 bg-green-100',
  negative: 'text-red-600 bg-red-100',
  neutral: 'text-gray-600 bg-gray-100',
} as const
