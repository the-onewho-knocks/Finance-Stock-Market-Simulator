import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import type { TransactionFilters as Filters } from '../types'

interface TransactionFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

export function TransactionFiltersView({ filters, onChange }: TransactionFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select
        options={[
          { value: '', label: 'All Types' },
          { value: 'buy', label: 'Buy' },
          { value: 'sell', label: 'Sell' },
        ]}
        value={filters.type || ''}
        onChange={(e) => onChange({ ...filters, type: e.target.value as 'buy' | 'sell' | undefined })}
      />
      <Input
        placeholder="Filter by symbol..."
        value={filters.symbol || ''}
        onChange={(e) => onChange({ ...filters, symbol: e.target.value })}
        className="max-w-[160px]"
      />
    </div>
  )
}
