import type { ProjectStatus, TaskPriority, TaskStatus } from '../types'
import type { BadgeVariant } from '../components/ui/Badge'

export function getProjectStatusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    planning: 'Planning',
    active: 'Active',
    'on-hold': 'On Hold',
    completed: 'Completed',
  }
  return labels[status]
}

export function getProjectStatusVariant(status: ProjectStatus): BadgeVariant {
  const variants: Record<ProjectStatus, BadgeVariant> = {
    planning: 'info',
    active: 'success',
    'on-hold': 'warning',
    completed: 'default',
  }
  return variants[status]
}

export function getTaskStatusLabel(status: TaskStatus): string {
  const labels: Record<TaskStatus, string> = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
  }
  return labels[status]
}

export function getTaskStatusVariant(status: TaskStatus): BadgeVariant {
  const variants: Record<TaskStatus, BadgeVariant> = {
    pending: 'warning',
    'in-progress': 'info',
    completed: 'success',
  }
  return variants[status]
}

export function getPriorityLabel(priority: TaskPriority): string {
  const labels: Record<TaskPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  }
  return labels[priority]
}

export function getPriorityVariant(priority: TaskPriority): BadgeVariant {
  const variants: Record<TaskPriority, BadgeVariant> = {
    low: 'default',
    medium: 'info',
    high: 'error',
  }
  return variants[priority]
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
