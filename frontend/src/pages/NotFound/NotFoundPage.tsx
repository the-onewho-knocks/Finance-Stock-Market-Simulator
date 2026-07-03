import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-6xl font-bold text-gray-600">404</h1>
      <p className="mt-2 text-gray-500">Page not found</p>
      <Button className="mt-6" onClick={() => navigate('/')}>Go Home</Button>
    </div>
  )
}
