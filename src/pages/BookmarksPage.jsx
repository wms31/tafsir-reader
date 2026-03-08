import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, Trash2, BookOpen } from 'lucide-react'
import { useAllBookmarks } from '../hooks/useBookmarks.js'
import { timeAgo } from '../utils/formatters.js'

export default function BookmarksPage() {
  const navigate = useNavigate()
  const { bookmarks, remove } = useAllBookmarks()

  // Group bookmarks by book
  const grouped = bookmarks.reduce((acc, bm) => {
    if (!acc[bm.bookId]) {
      acc[bm.bookId] = { title: bm.bookTitle, collectionId: bm.collectionId, items: [] }
    }
    acc[bm.bookId].items.push(bm)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-primary">
      <header className="px-5 pt-14 pb-6 safe-area-top">
        <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Bookmarks
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {bookmarks.length} saved {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
        </p>
      </header>

      <div className="px-5 pb-8">
        {bookmarks.length === 0 ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--color-accent-muted)' }}
            >
              <Bookmark className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
            </div>
            <h3
              className="font-display text-base font-semibold mb-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              No Bookmarks Yet
            </h3>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              While reading, tap the bookmark icon to save important pages for quick access.
            </p>
            <button onClick={() => navigate('/home')} className="btn-primary">
              <BookOpen className="w-4 h-4" />
              Browse Collections
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(grouped).map(([bookId, group]) => (
              <div
                key={bookId}
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Book header */}
                <div
                  className="px-4 py-3"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <p className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>
                    {group.title}
                  </p>
                </div>

                {/* Bookmark items */}
                {group.items.map((bm, idx) => (
                  <div
                    key={bm.id}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      borderBottom:
                        idx < group.items.length - 1
                          ? '1px solid var(--color-border)'
                          : 'none',
                    }}
                  >
                    <button
                      onClick={() =>
                        navigate(`/reader/${bm.collectionId}/${bm.bookId}`)
                      }
                      className="flex items-center gap-3 flex-1 min-w-0 text-left"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-accent-muted)' }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{ color: 'var(--color-accent)' }}
                        >
                          {bm.page}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-sm font-medium"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          Page {bm.page}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {timeAgo(bm.createdAt)}
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => remove(bm.id)}
                      className="p-2 rounded-lg flex-shrink-0 active:scale-95 transition-transform"
                      style={{ color: '#ef4444' }}
                      aria-label="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
