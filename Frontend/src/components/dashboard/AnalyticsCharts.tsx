import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { Card } from '../ui/Card'
import type { Project, Task } from '../../types'

interface AnalyticsChartsProps {
  projects: Project[]
  tasks: Task[]
}

export function AnalyticsCharts({ projects, tasks }: AnalyticsChartsProps) {
  const chart = useChartTheme()

  const taskStatusData = [
    { name: 'Pending', value: tasks.filter((t) => t.status === 'pending').length, key: 'pending' },
    {
      name: 'In Progress',
      value: tasks.filter((t) => t.status === 'in-progress').length,
      key: 'in-progress',
    },
    { name: 'Completed', value: tasks.filter((t) => t.status === 'completed').length, key: 'completed' },
  ].filter((d) => d.value > 0)

  const projectStatusData = [
    { name: 'Planning', count: projects.filter((p) => p.status === 'planning').length },
    { name: 'Active', count: projects.filter((p) => p.status === 'active').length },
    { name: 'On Hold', count: projects.filter((p) => p.status === 'on-hold').length },
    { name: 'Completed', count: projects.filter((p) => p.status === 'completed').length },
  ]

  const priorityData = [
    { name: 'High', count: tasks.filter((t) => t.priority === 'high').length },
    { name: 'Medium', count: tasks.filter((t) => t.priority === 'medium').length },
    { name: 'Low', count: tasks.filter((t) => t.priority === 'low').length },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
      <Card padding="md">
        <h3 className="text-title-md font-bold text-primary mb-1">Task Status Distribution</h3>
        <p className="text-body-md text-on-surface-variant mb-6">Breakdown of tasks by current status</p>
        {taskStatusData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
                  if (midAngle === undefined) return null
                  const RADIAN = Math.PI / 180
                  const radius = innerRadius + (outerRadius - innerRadius) * 1.35
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)
                  return (
                    <text
                      x={x}
                      y={y}
                      fill={chart.axis}
                      fontSize={12}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {`${name}: ${value}`}
                    </text>
                  )
                }}
              >
                {taskStatusData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={chart.statusColors[entry.key as keyof typeof chart.statusColors]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={chart.tooltip} />
              <Legend wrapperStyle={chart.legend} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-body-md text-on-surface-variant text-center py-12">No tasks yet</p>
        )}
      </Card>

      <Card padding="md">
        <h3 className="text-title-md font-bold text-primary mb-1">Projects by Status</h3>
        <p className="text-body-md text-on-surface-variant mb-6">Overview of project pipeline</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={projectStatusData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
            <XAxis dataKey="name" tick={chart.tick} />
            <YAxis allowDecimals={false} tick={chart.tick} />
            <Tooltip contentStyle={chart.tooltip} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {projectStatusData.map((_, index) => (
                <Cell key={index} fill={chart.projectColors[index % chart.projectColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card padding="md" className="lg:col-span-2">
        <h3 className="text-title-md font-bold text-primary mb-1">Tasks by Priority</h3>
        <p className="text-body-md text-on-surface-variant mb-6">Workload distribution across priority levels</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={priorityData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
            <XAxis type="number" allowDecimals={false} tick={chart.tick} />
            <YAxis type="category" dataKey="name" tick={chart.tick} width={70} />
            <Tooltip contentStyle={chart.tooltip} />
            <Bar dataKey="count" fill={chart.barFill} radius={[0, 6, 6, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
