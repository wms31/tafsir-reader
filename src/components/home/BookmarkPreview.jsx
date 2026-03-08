import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import { timeAgo } from '../../utils/formatters.js'

export default function BookmarkPreview({ bookmark }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/reader/${bookmark.collectionId}/${bookmark.bookId}`)}
      className="flex items-center gap-3 p-4 rounded-xl cursor-pointer active:scale-[0.98] transition-transform duration-200"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'var(--color-accent-muted)' }}
      >
        <Bookmark className="w-4 h-4 fill-current" style={{ color: 'var(--color-accent)' }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
          {bookmark.bookTitle}
        </p>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Page {bookmark.page} · {timeAgo(bookmark.createdAt)}
        </p>
      </div>
    </div>
  )
}
