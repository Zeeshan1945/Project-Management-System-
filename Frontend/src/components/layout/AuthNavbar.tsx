import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { GitHubLink } from './GitHubLink'
import { ThemeToggle } from './ThemeToggle'

export function AuthNavbar() {
  return (
    <header className="flex justify-between items-center w-full px-4 md:px-margin-desktop h-16 bg-surface border-b border-outline-variant sticky top-0 z-40">
      <Link
        to="/login"
        className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-lg"
        aria-label="StitchSaaS home"
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="switch" className="text-on-primary text-sm" aria-hidden="true" />
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <GitHubLink />
        <ThemeToggle />
      </div>
    </header>
  )
}
