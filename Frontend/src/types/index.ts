export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface ApiError {
  message: string
}

export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed'

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  createdDate: string
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
  assignedUserId: string
  status: TaskStatus
  projectId: string
}

export interface MetricCard {
  id: string
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string
}

export interface CreateProjectPayload {
  name: string
  description: string
  status: ProjectStatus
}

export interface UpdateProjectPayload extends CreateProjectPayload {
  id: string
}

export interface CreateTaskPayload {
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
  assignedUserId: string
  status: TaskStatus
  projectId: string
}

export interface UpdateTaskPayload extends CreateTaskPayload {
  id: string
}
