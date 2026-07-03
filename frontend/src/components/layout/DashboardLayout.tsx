import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-black">
      <Sidebar open={sidebarOpen} />
        <div
          className={`flex flex-1 flex-col overflow-y-auto transition-[margin] duration-300 ${sidebarOpen ? 'ml-56' : 'ml-0'}`}
        >
          <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          <Footer />
        </div>
    </div>
  )
}
