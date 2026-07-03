import { Card } from '../../../components/ui/Card'
import { formatDate } from '../../../lib/formatDate'
import type { UserProfile } from '../types'

interface UserInfoCardProps {
  user: UserProfile
}

export function UserInfoCard({ user }: UserInfoCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        {user.avatar_url && (
          <img src={user.avatar_url} alt="" className="h-14 w-14 rounded-full" />
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-xs text-gray-600 mt-1">Joined {formatDate(user.created_at)}</p>
        </div>
      </div>
    </Card>
  )
}
