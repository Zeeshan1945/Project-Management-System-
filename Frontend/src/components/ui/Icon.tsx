import { iconMap, resolveIconSize, type IconName } from './iconMap'

interface IconProps {
  name: string
  className?: string
  filled?: boolean
  'aria-hidden'?: boolean | 'true' | 'false'
}

export function Icon({ name, className = '', 'aria-hidden': ariaHidden = true }: IconProps) {
  const AnimatedIcon = iconMap[name as IconName]

  if (!AnimatedIcon) {
    return null
  }

  const size = resolveIconSize(className)

  return (
    <AnimatedIcon
      size={size}
      className={`inline-flex shrink-0 ${className}`}
      aria-hidden={ariaHidden}
      isAnimated
    />
  )
}
