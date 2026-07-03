import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuthGuard() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      navigate('/login', { replace: true })
    }
  }, [navigate])
}
