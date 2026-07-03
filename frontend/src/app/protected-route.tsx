import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const authed = localStorage.getItem('auth_token') || localStorage.getItem('guest_mode') === 'true'
  if (!authed) return <Navigate to="/" replace />
  return <Outlet />
}
