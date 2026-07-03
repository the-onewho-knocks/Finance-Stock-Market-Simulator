export interface Expense {
  id: string
  user_id: string
  category: string
  amount: number
  description: string
  date: string
  created_at: string
}

export interface ExpenseSummary {
  total: number
  byCategory: { category: string; total: number; count: number }[]
}
