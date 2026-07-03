import { useSelector } from 'react-redux'
import type { RootState } from '../../../app/store'

export function useAuth() {
  return useSelector((state: RootState) => state.auth)
}
