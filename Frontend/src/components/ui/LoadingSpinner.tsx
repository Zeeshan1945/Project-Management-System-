import { Icon } from './Icon'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const sizeStyles = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
}

export function LoadingSpinner({ size = 'md', label }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
      <Icon name="progress_activity" className={`text-secondary ${sizeStyles[size]}`} />
      {label && <span className="text-body-md text-on-surface-variant">{label}</span>}
      <span className="sr-only">{label || 'Loading'}</span>
    </div>
  )
}
