import { Dialog } from '../../../components/ui/Dialog'

interface DeletePlanDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeletePlanDialog({ open, onClose, onConfirm }: DeletePlanDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Planned Expense"
      message="Are you sure you want to delete this planned expense?"
      confirmLabel="Delete"
    />
  )
}
