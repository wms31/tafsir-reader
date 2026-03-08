import React from 'react'
import { Search, X } from 'lucide-react'

export default function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-colors"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-primary)',
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
        >
          <X className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
        </button>
      )}
    </div>
  )
}
