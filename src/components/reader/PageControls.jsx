import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function PageControls({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-3"
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
    >
      <button
        onClick={onPrev}
        disabled={currentPage <= 1}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 disabled:opacity-40"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          color: 'var(--color-text-primary)',
        }}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="text-center">
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          {currentPage}
        </span>
        <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {' '}/ {totalPages || '...'}
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={totalPages ? currentPage >= totalPages : false}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 disabled:opacity-40"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          color: 'var(--color-text-primary)',
        }}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
