import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnalyticsCharts } from '../components/dashboard/AnalyticsCharts'
import { MetricCard } from '../components/dashboard/MetricCard'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useErrorToast } from '../hooks/useErrorToast'
import type { AppDispatch, RootState } from '../store'
import { fetchProjects } from '../store/slices/projectsSlice'
import { fetchTasks } from '../store/slices/tasksSlice'
import type { MetricCard as MetricCardType } from '../types'

export function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProjects())
    dispatch(fetchTasks())
  }, [dispatch])

  const { items: projects, loading: projectsLoading, error: projectsError } = useSelector(
    (state: RootState) => state.projects,
  )
  const { items: tasks, loading: tasksLoading, error: tasksError } = useSelector(
    (state: RootState) => state.tasks,
  )

  const loading = projectsLoading || tasksLoading
  const apiError = projectsError || tasksError
  useErrorToast(apiError)

  const metrics = useMemo<MetricCardType[]>(() => {
    const completed = tasks.filter((t) => t.status === 'completed').length
    const pending = tasks.filter((t) => t.status === 'pending').length

    return [
      {
        id: '1',
        label: 'Total Projects',
        value: String(projects.length),
        change: `${projects.filter((p) => p.status === 'active').length} active`,
        changeType: 'positive',
        icon: 'folder_shared',
      },
      {
        id: '2',
        label: 'Total Tasks',
        value: String(tasks.length),
        change: `${tasks.filter((t) => t.status === 'in-progress').length} in progress`,
        changeType: 'neutral',
        icon: 'list_alt',
      },
      {
        id: '3',
        label: 'Completed Tasks',
        value: String(completed),
        change: tasks.length ? `${Math.round((completed / tasks.length) * 100)}%` : '0%',
        changeType: 'positive',
        icon: 'task_alt',
      },
      {
        id: '4',
        label: 'Pending Tasks',
        value: String(pending),
        change: `${tasks.filter((t) => t.priority === 'high' && t.status !== 'completed').length} high priority`,
        changeType: pending > 0 ? 'negative' : 'neutral',
        icon: 'pending_actions',
      },
    ]
  }, [projects, tasks])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" label="Loading dashboard..." />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-stack-lg max-w-[var(--spacing-container-max)] mx-auto">
        <div className="flex flex-col mb-8">
          <h2 className="text-headline-lg text-primary tracking-tight font-extrabold">Dashboard</h2>
          <p className="text-body-md text-on-surface-variant">
            Welcome back, here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        <AnalyticsCharts projects={projects} tasks={tasks} />
      </div>
    </DashboardLayout>
  )
}
