import { memo } from 'react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { Select } from '../ui/Select'
import type { Task, TaskStatus } from '../../types'
import {
  formatDate,
  getPriorityLabel,
  getPriorityVariant,
  getTaskStatusLabel,
  getTaskStatusVariant,
} from '../../utils/statusHelpers'

const statusChangeOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

interface TaskListItemProps {
  task: Task
  assigneeName: string
  projectName: string
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: TaskStatus) => void
  isDeleting?: boolean
}

export const TaskListItem = memo(function TaskListItem({
  task,
  assigneeName,
  projectName,
  onEdit,
  onDelete,
  onStatusChange,
  isDeleting,
}: TaskListItemProps) {
  return (
    <Card padding="md" className="hover:shadow-md transition-shadow animate-slide-up">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-title-md font-bold text-primary">{task.title}</h3>
            <Badge variant={getPriorityVariant(task.priority)}>
              {getPriorityLabel(task.priority)}
            </Badge>
            <Badge variant={getTaskStatusVariant(task.status)}>
              {getTaskStatusLabel(task.status)}
            </Badge>
          </div>
          <p className="text-body-md text-on-surface-variant mb-3 line-clamp-2">
            {task.description}
          </p>
          <div className="flex flex-wrap gap-4 text-metadata text-on-surface-variant">
            <span className="flex items-center gap-1">
              <Icon name="person" className="text-sm" aria-hidden="true" />
              {assigneeName}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="folder" className="text-sm" aria-hidden="true" />
              {projectName}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="event" className="text-sm" aria-hidden="true" />
              Due {formatDate(task.dueDate)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:shrink-0">
          <div className="min-w-[140px]">
            <Select
              name={`status-${task.id}`}
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
              options={statusChangeOptions}
              aria-label={`Change status for ${task.title}`}
            />
          </div>
          <Button variant="outline" onClick={() => onEdit(task)}>
            <Icon name="edit" className="text-sm" aria-hidden="true" />
            Edit
          </Button>
          <Button
            variant="ghost"
            className="text-error hover:bg-error-container"
            loading={isDeleting}
            onClick={() => onDelete(task.id)}
            aria-label={`Delete task: ${task.title}`}
          >
            <Icon name="delete" className="text-sm" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Card>
  )
})
