import React from 'react'
import clsx from 'clsx'

export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className={clsx('relative', sizes[size], className)}>
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          borderTopColor: 'var(--color-accent)',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
