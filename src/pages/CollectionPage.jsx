import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookMarked, Layers } from 'lucide-react'
import { getCollection, getBooksByCollection } from '../data/mockData.js'
import { getProgress } from '../services/progressService.js'
import SearchInput from '../components/ui/SearchInput.jsx'
import Badge from '../components/ui/Badge.jsx'
import { progressPercent } from '../utils/formatters.js'

export default function CollectionPage() {
  const { collectionId } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const collection = getCollection(collectionId)
  const books = getBooksByCollection(collectionId)

  const filtered = useMemo(() => {
    if (!search.trim()) return books
    const q = search.toLowerCase()
    return books.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.surahRange?.toLowerCase().includes(q) ||
        b.tags?.some(t => t.includes(q))
    )
  }, [books, search])

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-lg font-display" style={{ color: 'var(--color-text-primary)' }}>
            Collection not found
          </p>
          <button onClick={() => navigate('/home')} className="mt-4 btn-primary">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="safe-area-top" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="flex items-center gap-3 px-4 pt-14 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl flex-shrink-0 active:scale-95 transition-transform"
            style={{ backgroundColor: 'var(--color-bg-elevated)' }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
          </button>
          <div className="min-w-0">
            <h1
              className="font-display text-xl font-bold truncate"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {collection.name}
            </h1>
            <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
              {collection.scholar}
            </p>
          </div>
        </div>

        {/* Collection info */}
        <div className="px-4 pb-4">
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {collection.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="accent">{collection.totalVolumes} volumes</Badge>
            <Badge variant="default">{collection.language.toUpperCase()}</Badge>
            {collection.tags?.slice(0, 2).map(t => (
              <Badge key={t} variant="default">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Reading mode switcher */}
        {collection.dataSlug && (
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-2">
              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-default"
                style={{ backgroundColor: 'var(--color-accent-muted)', border: '1px solid var(--color-accent)' }}
              >
                <Layers className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>PDF Volumes</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '10px' }}>Read full volumes</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/quran/${collectionId}`)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl active:scale-[0.98] transition-transform"
                style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
              >
                <BookMarked className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-text-secondary)' }} />
                <div className="text-left">
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>By Ayah</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: '10px' }}>Interactive view</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="px-4 pb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search volumes..." />
        </div>
      </div>

      {/* Book list */}
      <div className="px-4 py-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              No volumes found
            </p>
          </div>
        ) : (
          filtered.map(book => {
            const progress = getProgress(book.id)
            const percent = progress
              ? progressPercent(progress.currentPage, book.totalPages)
              : 0

            return (
              <div
                key={book.id}
                onClick={() => navigate(`/reader/${collectionId}/${book.id}`)}
                className="rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform duration-200"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Volume number badge */}
                  <div
                    className="w-12 h-14 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-lg"
                    style={{
                      backgroundColor: 'var(--color-accent-muted)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {book.volumeNumber}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-medium text-base leading-snug mb-1"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {book.title}
                    </h3>
                    {book.surahRange && (
                      <p className="text-xs mb-2" style={{ color: 'var(--color-accent)' }}>
                        {book.surahRange}
                      </p>
                    )}
                    <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
                      {book.totalPages} pages
                    </p>

                    {/* Progress bar if started */}
                    {progress && (
                      <div>
                        <div
                          className="h-1 rounded-full overflow-hidden mb-1"
                          style={{ backgroundColor: 'var(--color-bg-elevated)' }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: 'var(--color-accent)',
                            }}
                          />
                        </div>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {percent}% · Page {progress.currentPage}
                        </p>
                      </div>
                    )}

                    {!progress && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'var(--color-bg-elevated)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        Not started
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
