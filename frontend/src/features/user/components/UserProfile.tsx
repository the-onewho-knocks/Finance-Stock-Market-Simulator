import { Card, CardTitle } from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/formatCurrency'
import type { UserProfile as Profile } from '../types'

interface UserProfileViewProps {
  user: Profile
}

export function UserProfileView({ user }: UserProfileViewProps) {
  return (
    <Card>
      <CardTitle>Account Details</CardTitle>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-gray-200">{user.email}</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Balance</span><span className="text-green-400">{formatCurrency(user.fake_balance)}</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Joined</span><span className="text-gray-200">{user.created_at}</span></div>
      </div>
    </Card>
  )
}
