import React from 'react'
import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 rounded-xl'

  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    danger: 'text-red-400 hover:bg-red-400/10',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2.5',
  }

  return (
    <button
      type={type}
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
