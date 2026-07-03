import { Dialog } from '../../../components/ui/Dialog'

interface DeleteExpenseDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteExpenseDialog({ open, onClose, onConfirm }: DeleteExpenseDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Expense"
      message="Are you sure you want to delete this expense?"
      confirmLabel="Delete"
    />
  )
}
