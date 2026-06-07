import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import type { Task } from '../../types'
import {
  formatDate,
  getPriorityLabel,
  getPriorityVariant,
} from '../../utils/statusHelpers'

interface TaskCardProps {
  task: Task
  assigneeName: string
  projectName: string
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  isDeleting?: boolean
  dragOverlay?: boolean
}

export const TaskCard = memo(function TaskCard({
  task,
  assigneeName,
  projectName,
  onEdit,
  onDelete,
  isDeleting,
  dragOverlay,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task', status: task.status },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`
        bg-surface-container-lowest rounded-xl stitch-border p-4
        transition-shadow duration-200
        ${isDragging ? 'opacity-40 shadow-none' : 'hover:shadow-md'}
        ${dragOverlay ? 'shadow-lg ring-2 ring-secondary rotate-1' : ''}
      `}
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-start gap-2 mb-2">
        <button
          type="button"
          className="mt-0.5 p-1 rounded text-on-surface-variant hover:text-primary cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary shrink-0"
          aria-label={`Drag task: ${task.title}`}
          {...attributes}
          {...listeners}
        >
          <Icon name="drag_indicator" className="text-lg" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-title-md font-bold text-primary truncate">{task.title}</h3>
            <Badge variant={getPriorityVariant(task.priority)}>
              {getPriorityLabel(task.priority)}
            </Badge>
          </div>
          <p className="text-body-md text-on-surface-variant mb-3 line-clamp-2">
            {task.description}
          </p>
          <div className="flex flex-wrap gap-3 text-metadata text-on-surface-variant">
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
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-outline-variant">
        <Button variant="outline" className="flex-1 py-2" onClick={() => onEdit(task)}>
          <Icon name="edit" className="text-sm" aria-hidden="true" />
          Edit
        </Button>
        <Button
          variant="ghost"
          className="text-error hover:bg-error-container py-2"
          loading={isDeleting}
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.title}`}
        >
          <Icon name="delete" className="text-sm" aria-hidden="true" />
        </Button>
      </div>
    </article>
  )
})
