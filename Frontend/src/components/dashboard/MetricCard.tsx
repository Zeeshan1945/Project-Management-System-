import { memo } from 'react'
import { Icon } from '../ui/Icon'
import type { MetricCard as MetricCardType } from '../../types'

interface MetricCardProps {
  metric: MetricCardType
}

const changeStyles = {
  positive: 'text-secondary bg-secondary-fixed',
  negative: 'text-error bg-error-container',
  neutral: 'text-on-tertiary-container bg-tertiary-fixed',
}

export const MetricCard = memo(function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="bg-surface-container-lowest stitch-border rounded-xl p-6 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary-fixed rounded-lg text-on-primary-fixed">
          <Icon name={metric.icon} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${changeStyles[metric.changeType]}`}>
          {metric.change}
        </span>
      </div>
      <p className="text-label-md text-on-surface-variant mb-1">{metric.label}</p>
      <h3 className="text-display font-bold text-primary">{metric.value}</h3>
    </div>
  )
})
