import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { Textarea, type TextareaProps } from '../ui/Textarea'

type FormTextareaProps<T extends FieldValues> = Omit<
  TextareaProps,
  'value' | 'onChange' | 'onBlur' | 'name' | 'error' | 'ref'
> & {
  name: FieldPath<T>
  control: Control<T>
}

export function FormTextarea<T extends FieldValues>({ name, control, ...props }: FormTextareaProps<T>) {
  const { field, fieldState } = useController({ name, control })

  return (
    <Textarea
      {...props}
      {...field}
      error={fieldState.error?.message}
    />
  )
}
