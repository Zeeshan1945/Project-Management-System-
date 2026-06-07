import { LoadingSpinner } from '../ui/LoadingSpinner'

export function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-surface"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  )
}
