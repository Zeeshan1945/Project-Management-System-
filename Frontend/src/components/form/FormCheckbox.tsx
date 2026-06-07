import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { Checkbox } from '../ui/Checkbox'
import type { ReactNode } from 'react'

type FormCheckboxProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  label: ReactNode
  className?: string
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  className,
}: FormCheckboxProps<T>) {
  const { field, fieldState } = useController({ name, control })

  return (
    <Checkbox
      name={field.name}
      label={label}
      checked={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      ref={field.ref}
      error={fieldState.error?.message}
      className={className}
    />
  )
}
