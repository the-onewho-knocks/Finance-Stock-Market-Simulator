import { useState } from 'react'
import { Modal } from '../../../components/ui/Modal'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { EXPENSE_CATEGORIES } from '../../../lib/constants'

interface AddPlanModalProps {
  open: boolean
  onClose: () => void
  onCreate: (data: { category: string; amount: number; description: string; target_date: string; is_recurring: boolean }) => void
}

export function AddPlanModal({ open, onClose, onCreate }: AddPlanModalProps) {
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0])
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [recurring, setRecurring] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount && description && targetDate) {
      onCreate({ category, amount: +amount, description, target_date: targetDate, is_recurring: recurring })
      setAmount('')
      setDescription('')
      setTargetDate('')
      setRecurring(false)
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Planned Expense">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Category" options={EXPENSE_CATEGORIES.map((c) => ({ value: c, label: c }))} value={category} onChange={(e) => setCategory(e.target.value)} />
        <Input label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min={0} step={0.01} />
        <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this for?" />
        <Input label="Target Date" type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-gray-400">
          <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="accent-blue-600" />
          Recurring
        </label>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!amount || !description || !targetDate}>Create</Button>
        </div>
      </form>
    </Modal>
  )
}
