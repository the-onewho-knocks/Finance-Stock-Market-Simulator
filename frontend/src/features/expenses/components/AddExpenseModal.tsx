import { useState } from 'react'
import { Modal } from '../../../components/ui/Modal'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { EXPENSE_CATEGORIES } from '../../../lib/constants'

interface AddExpenseModalProps {
  open: boolean
  onClose: () => void
  onAdd: (data: { category: string; amount: number; description: string; date: string }) => void
}

export function AddExpenseModal({ open, onClose, onAdd }: AddExpenseModalProps) {
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0])
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount && description) {
      onAdd({ category, amount: +amount, description, date: new Date().toISOString() })
      setAmount('')
      setDescription('')
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Expense">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Category" options={EXPENSE_CATEGORIES.map((c) => ({ value: c, label: c }))} value={category} onChange={(e) => setCategory(e.target.value)} />
        <Input label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min={0} step={0.01} />
        <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What was it for?" />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!amount || !description}>Add</Button>
        </div>
      </form>
    </Modal>
  )
}
