import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/Button'
import { FormInput } from '../form/FormInput'
import { FormSelect } from '../form/FormSelect'
import { FormTextarea } from '../form/FormTextarea'
import type { CreateProjectPayload, Project } from '../../types'
import { projectSchema, type ProjectFormValues } from '../../utils/validation'

interface ProjectFormProps {
  initial?: Project
  onSubmit: (data: CreateProjectPayload) => Promise<void>
  onCancel: () => void
}

const statusOptions = [
  { value: 'planning', label: 'Planning' },
  { value: 'active', label: 'Active' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
]

export function ProjectForm({ initial, onSubmit, onCancel }: ProjectFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initial?.name ?? '',
      description: initial?.description ?? '',
      status: initial?.status ?? 'planning',
    },
  })

  const onFormSubmit = async (values: ProjectFormValues) => {
    await onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
      <FormInput
        control={control}
        label="Project Name"
        name="name"
        placeholder="Enter project name"
      />
      <FormTextarea
        control={control}
        label="Description"
        name="description"
        placeholder="Describe the project goals and scope"
      />
      <FormSelect
        control={control}
        label="Status"
        name="status"
        options={statusOptions}
      />
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
          {initial ? 'Save Changes' : 'Create Project'}
        </Button>
      </div>
    </form>
  )
}
