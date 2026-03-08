import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Search, X } from 'lucide-react'
import { getAllSurahs } from '../services/quranDataService.js'
import { getCollection } from '../data/mockData.js'
import Spinner from '../components/ui/Spinner.jsx'

// Juz boundaries for display grouping
const JUZ_START = {
  1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,
  11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,
  21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30
}

const REVELATION_COLORS = {
  meccan:  { bg: 'rgba(201,168,76,0.12)',  text: 'var(--color-accent)' },
  medinan: { bg: 'rgba(94,170,140,0.12)', text: '#5eaa8c' },
}

export default function QuranBrowserPage() {
  const { collectionId } = useParams()
  const navigate = useNavigate()
  const collection = getCollection(collectionId)

  const [surahs, setSurahs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllSurahs()
      .then(setSurahs)
      .catch(() => setError('Failed to load surah list.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return surahs
    const q = search.toLowerCase()
    return surahs.filter(s =>
      s.name.includes(search) ||
      s.transliteration.toLowerCase().includes(q) ||
      s.translation.toLowerCase().includes(q) ||
      String(s.id).includes(q)
    )
  }, [surahs, search])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>

      {/* Header */}
      <div className="sticky top-0 z-20 safe-area-top"
        style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <button onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl active:scale-95 transition-transform flex-shrink-0"
            style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
          </button>
          <div className="min-w-0">
            <h1 className="font-display text-lg font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
              Browse by Ayah
            </h1>
            <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
              {collection?.name} · 114 Surahs
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or number..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Spinner size="lg" />
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading surahs...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-32 px-8 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{error}</p>
        </div>
      ) : (
        <div className="pb-8">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No surahs found</p>
            </div>
          ) : (
            <div>
              {filtered.map((surah, idx) => {
                const revColor = REVELATION_COLORS[surah.type] || REVELATION_COLORS.meccan
                return (
                  <button
                    key={surah.id}
                    onClick={() => navigate(`/quran/${collectionId}/surah/${surah.id}`)}
                    className="w-full flex items-center gap-4 px-4 py-3.5 text-left transition-colors duration-150 active:scale-[0.99]"
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {/* Number badge */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-display font-semibold text-sm"
                      style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-accent)' }}>
                      {surah.id}
                    </div>

                    {/* Names */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>
                          {surah.transliteration}
                        </span>
                        {/* Arabic name */}
                        <span className="font-arabic text-base flex-shrink-0" style={{ color: 'var(--color-accent)' }}>
                          {surah.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {surah.translation}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>·</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {surah.total_verses} verses
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full capitalize"
                          style={{ backgroundColor: revColor.bg, color: revColor.text, fontSize: '10px' }}>
                          {surah.type}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
