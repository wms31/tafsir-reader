import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Moon, Sun } from 'lucide-react'
import CollectionCard from '../components/home/CollectionCard.jsx'
import ContinueReadingCard from '../components/home/ContinueReadingCard.jsx'
import BookmarkPreview from '../components/home/BookmarkPreview.jsx'
import { getActiveCollections } from '../data/mockData.js'
import { useAllProgress } from '../hooks/useProgress.js'
import { useAllBookmarks } from '../hooks/useBookmarks.js'
import { useDarkMode } from '../hooks/useDarkMode.js'

export default function HomePage() {
  const navigate = useNavigate()
  const collections = getActiveCollections()
  const allProgress = useAllProgress()
  const { bookmarks } = useAllBookmarks()
  const { isDark, toggle } = useDarkMode()

  const recentProgress = allProgress.slice(0, 5)
  const recentBookmarks = bookmarks.slice(0, 3)

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="px-5 pt-14 pb-6 safe-area-top">
        <p className="text-sm font-arabic text-center mb-4" style={{ color: 'var(--color-accent)' }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="font-display text-3xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Tafsir
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Islamic Commentary Library
            </p>
          </div>
          <button
            onClick={toggle}
            className="mt-1 p-2.5 rounded-xl transition-colors duration-200 active:scale-95"
            style={{ backgroundColor: 'var(--color-bg-elevated)' }}
          >
            {isDark ? (
              <Sun className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            )}
          </button>
        </div>
      </header>

      <div className="px-5 pb-8 space-y-8">
        {/* Continue Reading */}
        {recentProgress.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2
                className="font-display text-lg font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Continue Reading
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory">
              {recentProgress.map(p => (
                <div key={p.bookId} className="snap-start">
                  <ContinueReadingCard progress={p} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Collections */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="font-display text-lg font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Collections
            </h2>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {collections.length} available
            </span>
          </div>
          <div className="space-y-3">
            {collections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>

        {/* Recent Bookmarks */}
        {recentBookmarks.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2
                className="font-display text-lg font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Recent Bookmarks
              </h2>
              <button
                onClick={() => navigate('/bookmarks')}
                className="text-xs font-medium transition-colors"
                style={{ color: 'var(--color-accent)' }}
              >
                View all
              </button>
            </div>
            <div className="space-y-2">
              {recentBookmarks.map(bm => (
                <BookmarkPreview key={bm.id} bookmark={bm} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state — first time */}
        {recentProgress.length === 0 && recentBookmarks.length === 0 && (
          <section>
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--color-accent-muted)' }}
              >
                <BookOpen className="w-7 h-7" style={{ color: 'var(--color-accent)' }} />
              </div>
              <h3
                className="font-display text-base font-semibold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Begin Your Journey
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Select a tafsir collection below to start reading. Your progress and bookmarks
                will be saved automatically.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
