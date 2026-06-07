import { Icon } from '../ui/Icon'

const GITHUB_URL = 'https://github.com/Zeeshan1945/Project-Management-System-'

export function GitHubLink() {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      aria-label="View project on GitHub"
    >
      <Icon name="github" aria-hidden="true" />
    </a>
  )
}
