import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { userApi } from '../../features/user/api/userApi'
import { BalanceCard } from '../../features/user/components/BalanceCard'
import { UserProfileView } from '../../features/user/components/UserProfile'
import { Card, CardTitle } from '../../components/ui/Card'
import { Loader } from '../../components/ui/Loader'

export default function ProfilePage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const userId = user?.id || 'demo'
  const isGuest = !user?.id

  const load = async () => {
    setLoading(true); setError('')
    try {
      const data = await userApi.getProfile(userId)
      setProfile(data)
    } catch { setError('Failed to load profile') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [userId])

  if (loading) return <Loader />
  if (error) return <Card variant="glass" className="border-red-500/50"><p className="text-sm text-red-400">{error}</p></Card>
  if (!profile) return <p className="text-sm text-gray-500">No profile data available.</p>

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl">
      <div className="flex items-center gap-4 p-6 rounded-xl border border-border bg-surface">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-2xl font-bold text-accent-light">
          {(profile.name || 'U')[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-100">{profile.name || 'User'}</h1>
          <p className="text-sm text-gray-500">{isGuest ? 'Guest Account' : profile.email}</p>
          <p className="text-xs text-gray-600">ID: {profile.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BalanceCard balance={profile.fake_balance} />
        <UserProfileView user={profile} />
      </div>

      <Card>
        <CardTitle>Account Details</CardTitle>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-gray-300">{profile.name || '\u2014'}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-gray-300">{isGuest ? 'guest@finance-sim.app' : profile.email}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">User ID</span><span className="text-gray-300 text-xs">{profile.id}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Balance</span><span className="text-green-400 font-medium">${profile.fake_balance?.toLocaleString() || '0'}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Member Since</span><span className="text-gray-300">{new Date(profile.created_at).toLocaleDateString()}</span></div>
        </div>
      </Card>
    </div>
  )
}
