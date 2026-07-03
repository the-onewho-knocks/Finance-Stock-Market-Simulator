import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { userApi } from '../../features/user/api/userApi'
import { UserInfoCard } from '../../features/user/components/UserInfoCard'
import { BalanceCard } from '../../features/user/components/BalanceCard'
import { UserProfileView } from '../../features/user/components/UserProfile'
import { EditProfileModal } from '../../features/user/components/EditProfileModal'
import { Button } from '../../components/ui/Button'
import { Loader } from '../../components/ui/Loader'

export default function ProfilePage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)

  const load = async () => {
    if (!user) return
    setLoading(true)
    try {
      const data = await userApi.getProfile(user.id)
      setProfile(data)
    } catch { toast.error('Failed to load profile') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [user])

  const handleSave = async ({ name }: { name: string }) => {
    if (!user) return
    try {
      await userApi.updateProfile(user.id, { name })
      toast.success('Profile updated')
      load()
    } catch { toast.error('Failed to update') }
  }

  if (loading) return <Loader />
  if (!profile) return <p className="text-gray-500">No profile data</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-100">Profile</h1>
        <Button variant="secondary" onClick={() => setEditOpen(true)}>Edit</Button>
      </div>
      <UserInfoCard user={profile} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BalanceCard balance={profile.fake_balance} />
        <UserProfileView user={profile} />
      </div>
      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} onSave={handleSave} currentName={profile.name} />
    </div>
  )
}
