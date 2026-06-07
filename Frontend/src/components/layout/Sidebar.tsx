import { NavLink } from 'react-router-dom'
import { Icon } from '../ui/Icon'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/projects', label: 'Projects', icon: 'folder', end: false },
  { to: '/tasks', label: 'Tasks', icon: 'assignment', end: false },
]

interface SidebarProps {
  onLogout: () => void
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ onLogout, isOpen = false, onClose }: SidebarProps) {

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          h-screen w-64 fixed left-0 top-0 bg-surface-container-low
          border-r border-outline-variant flex flex-col py-stack-md z-50
          transition-transform duration-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        aria-label="Main navigation"
      >
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="switch" className="text-on-primary text-sm" />
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2" aria-label="Dashboard navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 transition-all duration-200 cursor-pointer border-l-4 ${
                  isActive
                    ? 'bg-surface-container-lowest text-primary border-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-high border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon name={item.icon} aria-hidden="true" />
                  <span className="text-label-md">{item.label}</span>
                  {isActive && <span className="sr-only">(current page)</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-2 space-y-1">
          <button
            type="button"
            onClick={onLogout}
            className="group flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <Icon name="logout" aria-hidden="true" />
            <span className="text-label-md">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
