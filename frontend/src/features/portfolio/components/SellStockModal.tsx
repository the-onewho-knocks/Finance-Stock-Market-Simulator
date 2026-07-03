import { useState } from 'react'
import { Modal } from '../../../components/ui/Modal'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'

interface SellStockModalProps {
  open: boolean
  onClose: () => void
  onSell: (symbol: string, quantity: number) => void
}

export function SellStockModal({ open, onClose, onSell }: SellStockModalProps) {
  const [symbol, setSymbol] = useState('')
  const [qty, setQty] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (symbol && +qty > 0) {
      onSell(symbol.toUpperCase(), +qty)
      setSymbol('')
      setQty('')
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Sell Stock">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="e.g. AAPL" />
        <Input label="Quantity" type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="5" min={1} />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!symbol || +qty <= 0}>Sell</Button>
        </div>
      </form>
    </Modal>
  )
}
