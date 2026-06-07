import { forwardRef, type InputHTMLAttributes } from 'react'
import { Icon } from './Icon'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: string
  showPasswordToggle?: boolean
  onTogglePassword?: () => void
  isPasswordVisible?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      showPasswordToggle,
      onTogglePassword,
      isPasswordVisible,
      className = '',
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || props.name

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider px-1"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <Icon
              name={icon}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-[20px]"
            />
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-3 bg-surface-container-lowest
              border rounded-lg text-body-md text-on-surface
              input-focus-ring transition-all placeholder:text-outline
              ${icon ? 'pl-10' : ''}
              ${showPasswordToggle ? 'pr-12' : ''}
              ${error ? 'border-error' : 'border-outline-variant'}
              ${className}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              <Icon name={isPasswordVisible ? 'visibility_off' : 'visibility'} className="text-xl" />
            </button>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-metadata text-error flex items-center gap-1">
            <Icon name="error" className="text-sm" />
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
