import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskForm } from '../components/tasks/TaskForm'
import { TaskBoard } from '../components/tasks/TaskBoard'
import { TaskListItem } from '../components/tasks/TaskListItem'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Icon } from '../components/ui/Icon'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Modal } from '../components/ui/Modal'
import { Select } from '../components/ui/Select'
import { useErrorToast } from '../hooks/useErrorToast'
import type { AppDispatch, RootState } from '../store'
import { confirmDelete } from '../lib/swal'
import { showSuccessToast } from '../lib/toast'
import { fetchProjects } from '../store/slices/projectsSlice'
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from '../store/slices/tasksSlice'
import { fetchUsers } from '../store/slices/usersSlice'
import type { CreateTaskPayload, Task, TaskStatus } from '../types'

type ViewMode = 'board' | 'list'

export function TasksPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: tasks, loading: tasksLoading, error: tasksError } = useSelector(
    (state: RootState) => state.tasks,
  )
  const {
    items: projects,
    loading: projectsLoading,
    error: projectsError,
  } = useSelector((state: RootState) => state.projects)
  const { items: users, loading: usersLoading, error: usersError } = useSelector(
    (state: RootState) => state.users,
  )

  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchProjects())
    dispatch(fetchUsers())
  }, [dispatch])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('board')

  const apiError = tasksError || projectsError || usersError
  useErrorToast(apiError)

  const loading = tasksLoading || projectsLoading || usersLoading

  const userMap = useMemo(() => new Map(users.map((u) => [u.id, u.name])), [users])
  const projectMap = useMemo(() => new Map(projects.map((p) => [p.id, p.name])), [projects])

  const filteredTasks = useMemo(
    () => (filterStatus === 'all' ? tasks : tasks.filter((t) => t.status === filterStatus)),
    [tasks, filterStatus],
  )

  const getUserName = useCallback(
    (userId: string) => userMap.get(userId) ?? 'Unassigned',
    [userMap],
  )
  const getProjectName = useCallback(
    (projectId: string) => projectMap.get(projectId) ?? 'Unknown',
    [projectMap],
  )

  const openCreate = useCallback(() => {
    setEditingTask(null)
    setModalOpen(true)
  }, [])

  const openEdit = useCallback((task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setEditingTask(null)
  }, [])

  const handleSubmit = async (data: CreateTaskPayload) => {
    try {
      if (editingTask) {
        await dispatch(updateTask({ id: editingTask.id, ...data })).unwrap()
        showSuccessToast('Task updated successfully.')
      } else {
        await dispatch(createTask(data)).unwrap()
        showSuccessToast('Task created successfully.')
      }
      closeModal()
    } catch {
      // Error toast handled via useErrorToast
    }
  }

  const handleDelete = useCallback(
    async (id: string) => {
      const task = tasks.find((t) => t.id === id)
      const confirmed = await confirmDelete(task?.title ?? 'this task')
      if (!confirmed) return

      setDeletingId(id)
      try {
        await dispatch(deleteTask(id)).unwrap()
        showSuccessToast('Task deleted successfully.')
      } catch {
        // Error toast handled via useErrorToast
      } finally {
        setDeletingId(null)
      }
    },
    [dispatch, tasks],
  )

  const handleStatusChange = useCallback(
    async (id: string, status: TaskStatus) => {
      try {
        await dispatch(changeTaskStatus({ id, status })).unwrap()
        showSuccessToast('Task status updated.')
      } catch {
        // Error toast handled via useErrorToast
      }
    },
    [dispatch],
  )

  const statusFilterOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 md:p-stack-lg max-w-[var(--spacing-container-max)] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h2 className="text-headline-lg text-primary tracking-tight font-extrabold">Tasks</h2>
            <p className="text-body-md text-on-surface-variant">
              Manage tasks, assign users, and track progress.
            </p>
          </div>
          <Button icon={<Icon name="add" className="text-sm" aria-hidden="true" />} onClick={openCreate}>
            Add Task
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
          <div className="max-w-xs flex-1">
            <Select
              label="Filter by Status"
              name="filterStatus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={statusFilterOptions}
            />
          </div>

          <div
            className="inline-flex rounded-lg border border-outline-variant overflow-hidden"
            role="group"
            aria-label="View mode"
          >
            <button
              type="button"
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-2 px-4 py-2.5 text-label-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary ${
                viewMode === 'board'
                  ? 'bg-secondary text-on-primary'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
              }`}
              aria-pressed={viewMode === 'board'}
            >
              <Icon name="view_kanban" className="text-sm" aria-hidden="true" />
              Board
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2.5 text-label-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary ${
                viewMode === 'list'
                  ? 'bg-secondary text-on-primary'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
              }`}
              aria-pressed={viewMode === 'list'}
            >
              <Icon name="view_list" className="text-sm" aria-hidden="true" />
              List
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <LoadingSpinner size="lg" label="Loading tasks..." />
          </div>
        ) : filteredTasks.length === 0 ? (
          <Card className="text-center py-16 animate-fade-in">
            <Icon name="assignment" className="text-5xl text-outline-variant mb-4" aria-hidden="true" />
            <h3 className="text-title-md font-bold text-primary mb-2">No tasks found</h3>
            <p className="text-body-md text-on-surface-variant mb-6">
              {filterStatus !== 'all'
                ? 'No tasks match the selected filter.'
                : 'Get started by adding your first task.'}
            </p>
            {filterStatus === 'all' && <Button onClick={openCreate}>Add Task</Button>}
          </Card>
        ) : viewMode === 'board' ? (
          <TaskBoard
            tasks={filteredTasks}
            getUserName={getUserName}
            getProjectName={getProjectName}
            onEdit={openEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        ) : (
          <div className="space-y-4" role="list" aria-label="Task list">
            {filteredTasks.map((task) => (
              <div key={task.id} role="listitem">
                <TaskListItem
                  task={task}
                  assigneeName={getUserName(task.assignedUserId)}
                  projectName={getProjectName(task.projectId)}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  isDeleting={deletingId === task.id}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingTask ? 'Edit Task' : 'Add Task'}
        size="md"
        compact
      >
        <TaskForm
          initial={editingTask ?? undefined}
          projects={projects}
          users={users}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </DashboardLayout>
  )
}
