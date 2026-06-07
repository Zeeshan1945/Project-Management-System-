import { forwardRef, type SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || props.name

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider px-1"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-4 py-3 bg-surface-container-lowest
            border rounded-lg text-body-md text-on-surface
            input-focus-ring transition-all appearance-none cursor-pointer
            ${error ? 'border-error' : 'border-outline-variant'}
            ${className}
          `}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-metadata text-error">{error}</p>}
      </div>
    )
  },
)

Select.displayName = 'Select'
