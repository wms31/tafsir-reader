import React from 'react'
import clsx from 'clsx'

export default function Card({ children, className = '', onClick, elevated = false }) {
  return (
    <div
      className={clsx(
        elevated ? 'card-elevated' : 'card',
        'overflow-hidden',
        onClick && 'cursor-pointer transition-transform duration-200 active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
