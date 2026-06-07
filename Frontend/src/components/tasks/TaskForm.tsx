import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/Button'
import { FormInput } from '../form/FormInput'
import { FormSelect } from '../form/FormSelect'
import { FormTextarea } from '../form/FormTextarea'
import type { CreateTaskPayload, Project, Task, User } from '../../types'
import { taskSchema, type TaskFormValues } from '../../utils/validation'

interface TaskFormProps {
  initial?: Task
  projects: Project[]
  users: User[]
  onSubmit: (data: CreateTaskPayload) => Promise<void>
  onCancel: () => void
}

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

export function TaskForm({ initial, projects, users, onSubmit, onCancel }: TaskFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      priority: initial?.priority ?? 'medium',
      dueDate: initial?.dueDate ?? '',
      assignedUserId: initial?.assignedUserId ?? '',
      status: initial?.status ?? 'pending',
      projectId: initial?.projectId ?? '',
    },
  })

  const onFormSubmit = async (values: TaskFormValues) => {
    await onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3" noValidate>
      <FormInput
        control={control}
        label="Task Title"
        name="title"
        placeholder="Enter task title"
        className="py-2"
      />
      <FormTextarea
        control={control}
        label="Description"
        name="description"
        placeholder="Describe what needs to be done"
        rows={2}
        className="min-h-[60px] py-2 resize-none"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormSelect
          control={control}
          label="Priority"
          name="priority"
          options={priorityOptions}
        />
        <FormSelect
          control={control}
          label="Status"
          name="status"
          options={statusOptions}
        />
        <FormInput
          control={control}
          label="Due Date"
          name="dueDate"
          type="date"
          className="py-2"
        />
        <FormSelect
          control={control}
          label="Assigned User"
          name="assignedUserId"
          options={users.map((u) => ({ value: u.id, label: u.name }))}
          placeholder="Select a user"
        />
        <FormSelect
          control={control}
          label="Project"
          name="projectId"
          options={projects.map((p) => ({ value: p.id, label: p.name }))}
          placeholder="Select a project"
        />
      </div>
      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
          {initial ? 'Save Changes' : 'Add Task'}
        </Button>
      </div>
    </form>
  )
}
