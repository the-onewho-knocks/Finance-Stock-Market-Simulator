import api from '../../../services/axios'
import type { DashboardData } from '../types'

export const dashboardApi = {
  getDashboard: async (userId: string): Promise<DashboardData> => {
    const { data } = await api.get(`/dashboard/${userId}`)
    return data
  },
}
