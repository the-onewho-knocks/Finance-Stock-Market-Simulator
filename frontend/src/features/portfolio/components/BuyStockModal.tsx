import { useState } from 'react'
import { Modal } from '../../../components/ui/Modal'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'

interface BuyStockModalProps {
  open: boolean
  onClose: () => void
  onBuy: (symbol: string, quantity: number) => void
}

export function BuyStockModal({ open, onClose, onBuy }: BuyStockModalProps) {
  const [symbol, setSymbol] = useState('')
  const [qty, setQty] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (symbol && +qty > 0) {
      onBuy(symbol.toUpperCase(), +qty)
      setSymbol('')
      setQty('')
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Buy Stock">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="e.g. AAPL" />
        <Input label="Quantity" type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="10" min={1} />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!symbol || +qty <= 0}>Buy</Button>
        </div>
      </form>
    </Modal>
  )
}
