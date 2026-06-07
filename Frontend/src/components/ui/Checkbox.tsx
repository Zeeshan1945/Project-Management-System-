import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, id, className = '', ...props },
  ref,
) {
  const checkboxId = id || props.name

  return (
    <div>
      <div className="flex items-start gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={`mt-0.5 w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary ${className}`}
          aria-invalid={!!error}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className="text-body-md text-on-surface-variant cursor-pointer"
        >
          {label}
        </label>
      </div>
      {error && <p className="text-metadata text-error mt-1 ml-6">{error}</p>}
    </div>
  )
})
