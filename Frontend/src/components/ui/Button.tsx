import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
  loading?: boolean
  icon?: ReactNode
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-secondary hover:bg-primary text-on-primary shadow-sm',
  secondary:
    'bg-primary text-on-primary shadow-sm hover:opacity-90',
  outline:
    'bg-surface-container-lowest stitch-border text-on-surface-variant hover:bg-surface-container-low',
  ghost:
    'bg-transparent text-on-surface-variant hover:text-primary',
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium text-label-md rounded-lg
        py-3 px-4 transition-all duration-200
        active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  )
}
