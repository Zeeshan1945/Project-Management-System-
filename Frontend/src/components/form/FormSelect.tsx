import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { Select, type SelectProps } from '../ui/Select'

type FormSelectProps<T extends FieldValues> = Omit<
  SelectProps,
  'value' | 'onChange' | 'onBlur' | 'name' | 'error' | 'ref'
> & {
  name: FieldPath<T>
  control: Control<T>
}

export function FormSelect<T extends FieldValues>({ name, control, ...props }: FormSelectProps<T>) {
  const { field, fieldState } = useController({ name, control })

  return (
    <Select
      {...props}
      {...field}
      error={fieldState.error?.message}
    />
  )
}
