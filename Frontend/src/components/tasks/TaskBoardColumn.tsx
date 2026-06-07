import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { ReactNode } from 'react'
import type { TaskStatus } from '../../types'
import { getTaskStatusLabel } from '../../utils/statusHelpers'

const columnStyles: Record<TaskStatus, string> = {
  pending: 'border-t-amber-400',
  'in-progress': 'border-t-blue-500',
  completed: 'border-t-emerald-500',
}

interface TaskBoardColumnProps {
  status: TaskStatus
  taskIds: string[]
  children: ReactNode
  count: number
}

export function TaskBoardColumn({ status, taskIds, children, count }: TaskBoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { type: 'column', status },
  })

  return (
    <section
      ref={setNodeRef}
      className={`
        flex flex-col min-h-[320px] rounded-xl bg-surface-container-low
        border border-outline-variant border-t-4 ${columnStyles[status]}
        transition-colors duration-200
        ${isOver ? 'bg-surface-container ring-2 ring-secondary/30' : ''}
      `}
      aria-label={`${getTaskStatusLabel(status)} column, ${count} tasks`}
    >
      <header className="px-4 py-3 border-b border-outline-variant">
        <h3 className="text-label-md font-bold text-primary uppercase tracking-wider">
          {getTaskStatusLabel(status)}
        </h3>
        <p className="text-metadata text-on-surface-variant mt-0.5">
          {count} {count === 1 ? 'task' : 'tasks'}
        </p>
      </header>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
          {children}
        </div>
      </SortableContext>
    </section>
  )
}
