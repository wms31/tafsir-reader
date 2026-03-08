import React from 'react'
import clsx from 'clsx'

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        className
      )}
      style={
        variant === 'accent'
          ? {
              backgroundColor: 'var(--color-accent-muted)',
              color: 'var(--color-accent)',
            }
          : {
              backgroundColor: 'var(--color-bg-elevated)',
              color: 'var(--color-text-secondary)',
            }
      }
    >
      {children}
    </span>
  )
}
