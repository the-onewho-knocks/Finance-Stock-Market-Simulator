import { useState } from 'react'
import { Input } from '../../../components/ui/Input'
import { useDebounce } from '../../../hooks/useDebounce'

interface SearchStockProps {
  onSelect: (symbol: string) => void
  placeholder?: string
}

export function SearchStock({ onSelect, placeholder = 'Search symbol...' }: SearchStockProps) {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 300)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && debounced) {
      onSelect(debounced.toUpperCase())
    }
  }

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className="max-w-xs"
    />
  )
}
