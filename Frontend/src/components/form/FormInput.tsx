import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { Input, type InputProps } from '../ui/Input'

type FormInputProps<T extends FieldValues> = Omit<
  InputProps,
  'value' | 'onChange' | 'onBlur' | 'name' | 'error' | 'ref'
> & {
  name: FieldPath<T>
  control: Control<T>
}

export function FormInput<T extends FieldValues>({ name, control, ...props }: FormInputProps<T>) {
  const { field, fieldState } = useController({ name, control })

  return (
    <Input
      {...props}
      {...field}
      error={fieldState.error?.message}
    />
  )
}
