import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { getSurah, getSurahTafsir } from '../services/quranDataService.js'
import { getCollection } from '../data/mockData.js'
import Spinner from '../components/ui/Spinner.jsx'
import AyahCard from '../components/ayah/AyahCard.jsx'
import TafsirDrawer from '../components/ayah/TafsirDrawer.jsx'

export default function SurahReaderPage() {
  const { collectionId, surahNumber } = useParams()
  const navigate = useNavigate()
  const num = parseInt(surahNumber, 10)
  const collection = getCollection(collectionId)

  const [surah, setSurah] = useState(null)
  const [tafsirMap, setTafsirMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedAyah, setSelectedAyah] = useState(null) // { ayah, tafsirText }
  const [drawerOpen, setDrawerOpen] = useState(false)
  const topRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setSurah(null)
    setTafsirMap({})
    setSelectedAyah(null)
    setDrawerOpen(false)

    const dataSlug = collection?.dataSlug || 'ibn-kathir'

    Promise.all([getSurah(num), getSurahTafsir(num, dataSlug)])
      .then(([surahData, tafsir]) => {
        setSurah(surahData)
        setTafsirMap(tafsir)
      })
      .catch(() => setError('Failed to load surah. Please try again.'))
      .finally(() => setLoading(false))
  }, [num, collectionId])

  // Scroll to top on surah change
  useEffect(() => {
    topRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [num])

  const handleAyahTap = useCallback((ayah) => {
    const tafsirText = tafsirMap[ayah.id] || tafsirMap[String(ayah.id)] || null
    setSelectedAyah({ ayah, tafsirText })
    setDrawerOpen(true)
  }, [tafsirMap])

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false)
    setTimeout(() => setSelectedAyah(null), 350)
  }, [])

  const goPrev = () => { if (num > 1) navigate(`/quran/${collectionId}/surah/${num - 1}`) }
  const goNext = () => { if (num < 114) navigate(`/quran/${collectionId}/surah/${num + 1}`) }

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>

      {/* Top bar */}
      <div className="flex-shrink-0 safe-area-top"
        style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2 px-3 py-2 pt-12">
          <button onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl active:scale-95 transition-transform flex-shrink-0"
            style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
          </button>

          <div className="flex-1 min-w-0 text-center">
            {surah ? (
              <>
                <p className="font-arabic text-lg leading-none" style={{ color: 'var(--color-accent)' }}>
                  {surah.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {surah.transliteration} · {surah.total_verses} verses
                </p>
              </>
            ) : (
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Surah {num}</p>
            )}
          </div>

          {/* Prev/Next surah */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={goPrev} disabled={num <= 1}
              className="p-2.5 rounded-xl active:scale-95 transition-transform disabled:opacity-30"
              style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
              <ChevronLeft className="w-4 h-4" style={{ color: 'var(--color-text-primary)' }} />
            </button>
            <button onClick={goNext} disabled={num >= 114}
              className="p-2.5 rounded-xl active:scale-95 transition-transform disabled:opacity-30"
              style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-text-primary)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={topRef} className="flex-1 overflow-auto overscroll-contain">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Spinner size="lg" />
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Loading Surah {num}...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-32 px-8 text-center gap-4">
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary text-sm">
              Retry
            </button>
          </div>
        ) : surah ? (
          <div>
            {/* Surah header */}
            <SurahHeader surah={surah} />

            {/* Ayah list */}
            <div className="pb-8">
              {surah.verses.map((ayah) => (
                <AyahCard
                  key={ayah.id}
                  ayah={ayah}
                  surahNumber={num}
                  hasTafsir={!!(tafsirMap[ayah.id] || tafsirMap[String(ayah.id)])}
                  onTap={handleAyahTap}
                />
              ))}
            </div>

            {/* Bottom surah nav */}
            <div className="flex items-center justify-between px-4 py-5 mx-4 mb-6 rounded-2xl"
              style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
              <button onClick={goPrev} disabled={num <= 1}
                className="flex items-center gap-2 text-sm font-medium transition-opacity disabled:opacity-30"
                style={{ color: 'var(--color-accent)' }}>
                <ChevronLeft className="w-4 h-4" />
                {num > 1 ? `Surah ${num - 1}` : 'First'}
              </button>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {num} / 114
              </span>
              <button onClick={goNext} disabled={num >= 114}
                className="flex items-center gap-2 text-sm font-medium transition-opacity disabled:opacity-30"
                style={{ color: 'var(--color-accent)' }}>
                {num < 114 ? `Surah ${num + 1}` : 'Last'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Tafsir Drawer */}
      <TafsirDrawer
        open={drawerOpen}
        ayah={selectedAyah?.ayah}
        tafsirText={selectedAyah?.tafsirText}
        surahName={surah?.transliteration}
        collectionName={collection?.name}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}

function SurahHeader({ surah }) {
  // Don't show Bismillah for At-Tawbah (9) and Al-Fatihah (1 already has it)
  const showBismillah = surah.id !== 9

  return (
    <div className="relative overflow-hidden px-5 py-8 text-center"
      style={{ borderBottom: '1px solid var(--color-border)' }}>

      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,2 58,16 58,44 30,58 2,44 2,16"
                fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <polygon points="30,12 48,21 48,39 30,48 12,39 12,21"
                fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo)"
            style={{ color: 'var(--color-accent)' }}/>
        </svg>
      </div>

      {/* Gold ruling line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)' }} />

      <div className="relative">
        {/* Arabic surah name */}
        <h2 className="font-arabic text-4xl mb-1" style={{ color: 'var(--color-accent)' }}>
          {surah.name}
        </h2>

        <p className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
          {surah.transliteration}
        </p>

        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          {surah.translation}
        </p>

        {/* Meta pills */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="text-xs px-3 py-1 rounded-full capitalize"
            style={{
              backgroundColor: surah.type === 'meccan'
                ? 'rgba(201,168,76,0.12)' : 'rgba(94,170,140,0.12)',
              color: surah.type === 'meccan' ? 'var(--color-accent)' : '#5eaa8c',
            }}>
            {surah.type}
          </span>
          <span className="text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}>
            {surah.total_verses} verses
          </span>
          <span className="text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}>
            Surah {surah.id}
          </span>
        </div>

        {/* Bismillah */}
        {showBismillah && (
          <div className="pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <p className="font-arabic text-2xl leading-loose" style={{ color: 'var(--color-text-primary)' }}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>
        )}
      </div>

      {/* Bottom ruling line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)' }} />
    </div>
  )
}
