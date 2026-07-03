import { Button } from '../../../components/ui/Button'

interface RecalculateButtonProps {
  onClick: () => void
  loading?: boolean
}

export function RecalculateButton({ onClick, loading }: RecalculateButtonProps) {
  return (
    <Button variant="secondary" size="sm" onClick={onClick} disabled={loading}>
      {loading ? 'Recalculating...' : 'Recalculate Net Worth'}
    </Button>
  )
}
