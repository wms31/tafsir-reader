import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { progressPercent, timeAgo } from '../../utils/formatters.js'

export default function ContinueReadingCard({ progress }) {
  const navigate = useNavigate()
  const percent = progressPercent(progress.currentPage, progress.totalPages)

  return (
    <div
      onClick={() => navigate(`/reader/${progress.collectionId}/${progress.bookId}`)}
      className="flex-shrink-0 w-64 rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform duration-200"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-accent-muted)' }}
        >
          <Play className="w-4 h-4 fill-current" style={{ color: 'var(--color-accent)' }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
            {progress.collectionName}
          </p>
        </div>
      </div>

      <p
        className="text-sm font-medium leading-snug mb-3 line-clamp-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {progress.bookTitle}
      </p>

      {/* Progress bar */}
      <div
        className="h-1 rounded-full mb-2 overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-elevated)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Page {progress.currentPage}
        </span>
        <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
          {percent}%
        </span>
      </div>

      <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
        {timeAgo(progress.lastRead)}
      </p>
    </div>
  )
}
