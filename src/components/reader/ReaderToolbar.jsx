import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bookmark, BookmarkCheck, ZoomIn, ZoomOut } from 'lucide-react'

const MIN_SCALE = 0.8
const MAX_SCALE = 3.0

export default function ReaderToolbar({
  title,
  currentPage,
  bookmarked,
  onBookmark,
  scaleMultiplier = 1,
  onZoomIn,
  onZoomOut,
}) {
  const navigate = useNavigate()
  const zoomPercent = Math.round(scaleMultiplier * 100)

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 safe-area-top flex-shrink-0"
      style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}
    >
      <button
        onClick={() => navigate(-1)}
        className="p-2.5 rounded-xl transition-all duration-200 active:scale-95 flex-shrink-0"
        style={{ backgroundColor: 'var(--color-bg-elevated)' }}
      >
        <ArrowLeft className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
      </button>

      <div className="flex-1 min-w-0 px-1">
        <h1 className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </h1>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Page {currentPage} · {zoomPercent}%
        </p>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={onZoomOut}
          disabled={scaleMultiplier <= MIN_SCALE}
          className="p-2.5 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-40"
          style={{ backgroundColor: 'var(--color-bg-elevated)' }}
          title="Zoom out"
        >
          <ZoomOut className="w-4 h-4" style={{ color: 'var(--color-text-primary)' }} />
        </button>

        <button
          onClick={onZoomIn}
          disabled={scaleMultiplier >= MAX_SCALE}
          className="p-2.5 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-40"
          style={{ backgroundColor: 'var(--color-bg-elevated)' }}
          title="Zoom in"
        >
          <ZoomIn className="w-4 h-4" style={{ color: 'var(--color-text-primary)' }} />
        </button>

        <button
          onClick={onBookmark}
          className="p-2.5 rounded-xl transition-all duration-200 active:scale-95"
          style={{ backgroundColor: bookmarked ? 'var(--color-accent-muted)' : 'var(--color-bg-elevated)' }}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark this page'}
        >
          {bookmarked
            ? <BookmarkCheck className="w-5 h-5 fill-current" style={{ color: 'var(--color-accent)' }} />
            : <Bookmark className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
          }
        </button>
      </div>
    </div>
  )
}
