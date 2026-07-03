import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardTitle } from '../../components/ui/Card'
import { THead, TBody, Th, Td, Tr } from '../../components/ui/Table'
import { Loader } from '../../components/ui/Loader'
import api from '../../services/axios'

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/users')
      .then(({ data }) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-100">Admin</h1>
      <Card>
        <CardTitle>Users</CardTitle>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm">
            <THead>
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Balance</Th>
              </tr>
            </THead>
            <TBody>
              {users.map((u: any) => (
                <Tr key={u.id}>
                  <Td>{u.id}</Td>
                  <Td>{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td>${u.fake_balance?.toFixed(2) || '0.00'}</Td>
                </Tr>
              ))}
            </TBody>
          </table>
        </div>
      </Card>
    </div>
  )
}
