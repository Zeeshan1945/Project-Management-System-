import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { SkipLink } from '../common/SkipLink'
import { useAuth } from '../../hooks/useAuth'
import { confirmLogout } from '../../lib/swal'
import { showInfoToast } from '../../lib/toast'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const confirmed = await confirmLogout()
    if (!confirmed) return
    logout()
    showInfoToast('You have been signed out.')
    navigate('/login')
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <SkipLink />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />
      <div className="lg:ml-64 min-h-screen">
        <TopBar
          userName={user?.name || 'User'}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main id="main-content" className="page-enter" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  )
}
