import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PDFViewer from '../components/reader/PDFViewer.jsx'
import PageControls from '../components/reader/PageControls.jsx'
import ReaderToolbar from '../components/reader/ReaderToolbar.jsx'
import { getBook, getCollection } from '../data/mockData.js'
import { useProgress } from '../hooks/useProgress.js'
import { useBookmarks } from '../hooks/useBookmarks.js'
import { storage } from '../services/storage.js'

const SCALE_STEP = 0.25
const MIN_SCALE = 0.8
const MAX_SCALE = 3.0

export default function ReaderPage() {
  const { collectionId, bookId } = useParams()
  const navigate = useNavigate()
  const scrollRef = useRef(null)

  const book = getBook(bookId)
  const collection = getCollection(collectionId)

  const { progress, save } = useProgress(bookId)
  const { checkIsBookmarked, toggle: toggleBookmark } = useBookmarks(bookId)

  const [currentPage, setCurrentPage] = useState(() => progress?.currentPage || 1)
  const [totalPages, setTotalPages] = useState(book?.totalPages || 0)
  const [scaleMultiplier, setScaleMultiplier] = useState(1)
  const [loadError, setLoadError] = useState(false)
  const [direction, setDirection] = useState('next')
  const [flipAnimation] = useState(() => {
    const saved = storage.get('pageFlipAnimation')
    return saved !== null ? saved : true
  })

  // Save progress on page change
  useEffect(() => {
    if (book && collection) {
      save(currentPage, totalPages || book.totalPages, book.title, collectionId, collection.name)
    }
  }, [currentPage, totalPages])

  // Scroll to top on page change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [currentPage])

  const handlePageCount = useCallback(count => setTotalPages(count), [])

  const goNext = useCallback(() => {
    setDirection('next')
    setCurrentPage(p => Math.min(p + 1, totalPages || Infinity))
  }, [totalPages])

  const goPrev = useCallback(() => {
    setDirection('prev')
    setCurrentPage(p => Math.max(p - 1, 1))
  }, [])

  const handleZoomIn = useCallback(() => {
    setScaleMultiplier(s => Math.min(+(s + SCALE_STEP).toFixed(2), MAX_SCALE))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScaleMultiplier(s => Math.max(+(s - SCALE_STEP).toFixed(2), MIN_SCALE))
  }, [])

  const handleBookmark = useCallback(() => {
    if (book && collection) {
      toggleBookmark(currentPage, book.title, collectionId, collection.name)
    }
  }, [currentPage, book, collection, collectionId, toggleBookmark])

  if (!book || !collection) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="text-center">
          <p className="font-display text-lg" style={{ color: 'var(--color-text-primary)' }}>Book not found</p>
          <button onClick={() => navigate('/home')} className="mt-4 btn-primary">Go Home</button>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <ReaderToolbar
          title={book.title}
          currentPage={currentPage}
          bookmarked={false}
          onBookmark={() => {}}
          scaleMultiplier={scaleMultiplier}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}>
              <span className="text-2xl text-red-400">✗</span>
            </div>
            <h2 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              PDF Unavailable
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              This PDF could not be loaded.
            </p>
            <button onClick={() => navigate(-1)} className="btn-primary">Go Back</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <ReaderToolbar
        title={book.title}
        currentPage={currentPage}
        bookmarked={checkIsBookmarked(currentPage)}
        onBookmark={handleBookmark}
        scaleMultiplier={scaleMultiplier}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      {/* Scrollable PDF area — no min-height, shrinks to fit content */}
      <div ref={scrollRef} className="flex-1 overflow-auto overscroll-contain">
        <PDFViewer
          url={book.pdfUrl}
          currentPage={currentPage}
          scaleMultiplier={scaleMultiplier}
          onPageCount={handlePageCount}
          onError={() => setLoadError(true)}
          pageFlipAnimation={flipAnimation}
          direction={direction}
        />
      </div>

      <PageControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  )
}
