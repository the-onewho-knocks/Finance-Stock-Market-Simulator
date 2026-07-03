import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'

interface ResearchFormProps {
  onSubmit: (symbol: string, deep: boolean) => void
  loading: boolean
}

export function ResearchForm({ onSubmit, loading }: ResearchFormProps) {
  const [symbol, setSymbol] = useState('')
  const [deep, setDeep] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (symbol.trim()) onSubmit(symbol.trim().toUpperCase(), deep)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1">
        <Input
          label="Stock Symbol"
          placeholder="e.g. AAPL, TSLA, MSFT"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>
      <label className="flex items-center gap-2 pb-1 text-sm text-gray-400">
        <input type="checkbox" checked={deep} onChange={(e) => setDeep(e.target.checked)} className="accent-blue-600" />
        Deep Analysis
      </label>
      <Button type="submit" disabled={loading || !symbol.trim()}>
        {loading ? 'Researching...' : 'Research'}
      </Button>
    </form>
  )
}
