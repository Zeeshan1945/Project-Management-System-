import type { Project, ProjectStatus, Task, TaskPriority, TaskStatus, User } from '../types'

type ApiRecord = Record<string, unknown>

const toId = (value: unknown): string => {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    const record = value as ApiRecord
    if (record._id != null) return String(record._id)
    if (record.id != null) return String(record.id)
  }
  return String(value)
}

export const mapUser = (data: ApiRecord): User => ({
  id: toId(data),
  name: String(data.name ?? ''),
  email: String(data.email ?? ''),
})

export const mapProject = (data: ApiRecord): Project => ({
  id: toId(data),
  name: String(data.name ?? ''),
  description: String(data.description ?? ''),
  status: data.status as ProjectStatus,
  createdDate: String(data.createdDate ?? ''),
})

export const mapTask = (data: ApiRecord): Task => ({
  id: toId(data),
  title: String(data.title ?? ''),
  description: String(data.description ?? ''),
  priority: data.priority as TaskPriority,
  dueDate: String(data.dueDate ?? ''),
  assignedUserId: toId(data.assignedUserId),
  status: data.status as TaskStatus,
  projectId: toId(data.projectId),
})

export const mapList = <T>(items: unknown, mapper: (item: ApiRecord) => T): T[] => {
  if (!Array.isArray(items)) return []
  return items.map((item) => mapper(item as ApiRecord))
}
