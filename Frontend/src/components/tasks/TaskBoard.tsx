import { useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store'
import { changeTaskStatus } from '../../store/slices/tasksSlice'
import type { Task, TaskStatus } from '../../types'
import { TaskBoardColumn } from './TaskBoardColumn'
import { TaskCard } from './TaskCard'

const COLUMNS: TaskStatus[] = ['pending', 'in-progress', 'completed']

interface TaskBoardProps {
  tasks: Task[]
  getUserName: (userId: string) => string
  getProjectName: (projectId: string) => string
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  deletingId: string | null
}

export function TaskBoard({
  tasks,
  getUserName,
  getProjectName,
  onEdit,
  onDelete,
  deletingId,
}: TaskBoardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      pending: [],
      'in-progress': [],
      completed: [],
    }
    for (const task of tasks) {
      grouped[task.status].push(task)
    }
    return grouped
  }, [tasks])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id)
    setActiveTask(task ?? null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event
    if (!over) return

    const taskId = active.id as string
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    let newStatus: TaskStatus | null = null

    if (COLUMNS.includes(over.id as TaskStatus)) {
      newStatus = over.id as TaskStatus
    } else {
      const overTask = tasks.find((t) => t.id === over.id)
      if (overTask) newStatus = overTask.status
    }

    if (newStatus && newStatus !== task.status) {
      dispatch(changeTaskStatus({ id: taskId, status: newStatus }))
    }
  }

  const handleDragCancel = () => setActiveTask(null)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in"
        role="region"
        aria-label="Task board"
      >
        {COLUMNS.map((status) => {
          const columnTasks = tasksByStatus[status]
          return (
            <TaskBoardColumn
              key={status}
              status={status}
              taskIds={columnTasks.map((t) => t.id)}
              count={columnTasks.length}
            >
              {columnTasks.length === 0 ? (
                <p className="text-body-md text-on-surface-variant text-center py-8 px-2">
                  Drop tasks here
                </p>
              ) : (
                columnTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <TaskCard
                      task={task}
                      assigneeName={getUserName(task.assignedUserId)}
                      projectName={getProjectName(task.projectId)}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      isDeleting={deletingId === task.id}
                    />
                  </div>
                ))
              )}
            </TaskBoardColumn>
          )
        })}
      </div>

      <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
        {activeTask ? (
          <TaskCard
            task={activeTask}
            assigneeName={getUserName(activeTask.assignedUserId)}
            projectName={getProjectName(activeTask.projectId)}
            onEdit={onEdit}
            onDelete={onDelete}
            dragOverlay
          />
        ) : null}
      </DragOverlay>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeTask
          ? `Dragging ${activeTask.title}. Use arrow keys to move between columns.`
          : ''}
      </div>
    </DndContext>
  )
}
