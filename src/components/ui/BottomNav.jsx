import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Bookmark, Settings } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-stretch max-w-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-xs font-medium transition-colors duration-200',
                isActive ? 'accent-text' : 'text-muted'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={clsx('w-5 h-5', isActive && 'drop-shadow-sm')} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
