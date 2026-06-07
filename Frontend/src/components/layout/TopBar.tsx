import { Icon } from '../ui/Icon'
import { GitHubLink } from './GitHubLink'
import { ThemeToggle } from './ThemeToggle'

interface TopBarProps {
  userName: string
  onMenuClick: () => void
}

export function TopBar({ userName, onMenuClick }: TopBarProps) {
  return (
    <header className="flex justify-between items-center w-full px-4 md:px-margin-desktop h-16 bg-surface border-b border-outline-variant sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 text-on-surface-variant hover:text-primary rounded-lg transition-colors"
          aria-label="Open navigation menu"
          aria-expanded={false}
        >
          <Icon name="menu" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <GitHubLink />
        <ThemeToggle />
        <div className="hidden sm:block h-8 w-px bg-outline-variant" aria-hidden="true" />
        <div
          className="flex items-center gap-3"
          role="group"
          aria-label={`Signed in as ${userName}`}
        >
          <div
            className="w-8 h-8 rounded-full border border-outline-variant bg-primary-fixed flex items-center justify-center"
            aria-hidden="true"
          >
            <Icon name="person" className="text-on-primary-fixed text-sm" />
          </div>
          <span className="text-label-md text-primary font-bold hidden md:inline">{userName}</span>
        </div>
      </div>
    </header>
  )
}
