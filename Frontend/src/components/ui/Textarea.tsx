import { forwardRef, type TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id || props.name

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-label-md font-medium text-on-surface-variant uppercase tracking-wider px-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-3 bg-surface-container-lowest
            border rounded-lg text-body-md text-on-surface
            input-focus-ring transition-all placeholder:text-outline resize-y min-h-[100px]
            ${error ? 'border-error' : 'border-outline-variant'}
            ${className}
          `}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="text-metadata text-error">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
