export const taskRoutes = {
  BASE: '/tasks',
  STATUS: (id: string) => `/tasks/${id}/status`,
} as const
