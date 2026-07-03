import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { watchlistApi } from '../../features/watchlist/api/watchlistApi'
import { WatchlistCard } from '../../features/watchlist/components/WatchlistCard'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Loader } from '../../components/ui/Loader'

export default function WatchlistPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newSymbol, setNewSymbol] = useState('')
  const userId = user?.id || 'demo'

  const load = async () => {
    setLoading(true)
    try {
      const data = await watchlistApi.list(userId)
      setItems(data)
    } catch { toast.error('Failed to load watchlist') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [userId])

  const handleAdd = async () => {
    if (!newSymbol.trim()) return
    try {
      await watchlistApi.add(userId, newSymbol.trim().toUpperCase())
      toast.success('Added to watchlist')
      setNewSymbol('')
      load()
    } catch { toast.error('Failed to add') }
  }

  const handleRemove = async (symbol: string) => {
    try {
      await watchlistApi.remove(userId, symbol)
      load()
    } catch { toast.error('Failed to remove') }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-lg font-semibold text-gray-100">Watchlist</h1>
      <div className="flex gap-3">
        <Input
          placeholder="Add symbol..."
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="max-w-xs"
        />
        <Button onClick={handleAdd} disabled={!newSymbol.trim()}>Add</Button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <WatchlistCard key={item.symbol} item={item} onRemove={handleRemove} />
        ))}
        {!items.length && <p className="text-sm text-gray-500">Your watchlist is empty</p>}
      </div>
    </div>
  )
}
