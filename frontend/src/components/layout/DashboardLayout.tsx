import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#000000]">
      <Sidebar />
      <div className="ml-56 flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
