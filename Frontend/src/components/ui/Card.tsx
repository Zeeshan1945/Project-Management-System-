import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 md:p-10',
}

export function Card({ children, className = '', padding = 'lg' }: CardProps) {
  return (
    <div
      className={`
        bg-surface-container-lowest rounded-xl stitch-border
        shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
