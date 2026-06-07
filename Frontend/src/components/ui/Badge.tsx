import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-container text-on-surface-variant',
  success: 'bg-secondary-fixed text-on-secondary-fixed',
  warning: 'bg-tertiary-fixed text-on-tertiary-container',
  error: 'bg-error-container text-error',
  info: 'bg-primary-fixed text-on-primary-fixed',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-md font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
