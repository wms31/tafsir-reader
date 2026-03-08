import React, { useEffect, useRef, useState, useCallback } from 'react'
import { loadPDF, renderPage } from '../../utils/pdfUtils.js'
import Spinner from '../ui/Spinner.jsx'

export default function PDFViewer({
  url,
  currentPage,
  onPageCount,
  onError,
  scaleMultiplier = 1,
  pageFlipAnimation = true,
  direction = 'next',
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const pdfRef = useRef(null)
  const activeRenderTask = useRef(null)
  const renderingRef = useRef(false)
  const pendingRef = useRef(null)

  // Use refs for animation props so they don't trigger re-renders
  const flipRef = useRef(pageFlipAnimation)
  const directionRef = useRef(direction)
  flipRef.current = pageFlipAnimation
  directionRef.current = direction

  const [pdfLoaded, setPdfLoaded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [renderError, setRenderError] = useState(null)
  const [animClass, setAnimClass] = useState('')

  // ── Load PDF ─────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    pdfRef.current = null
    setPdfLoaded(false)
    setLoading(true)
    setRenderError(null)

    loadPDF(url)
      .then(pdf => {
        if (cancelled) return
        pdfRef.current = pdf
        onPageCount?.(pdf.numPages)
        setPdfLoaded(true)
      })
      .catch(err => {
        if (cancelled) return
        console.error('PDF load error:', err)
        setRenderError('Failed to load PDF.')
        setLoading(false)
        onError?.(err)
      })

    return () => { cancelled = true }
  }, [url])

  // ── Core render function ─────────────────────────────────────
  const scheduleRender = useCallback((pageNum, scale) => {
    if (!pdfRef.current) return

    // If already rendering, queue the latest request and return
    if (renderingRef.current) {
      pendingRef.current = { pageNum, scale }
      return
    }

    renderingRef.current = true
    setLoading(true)
    setAnimClass('')

    const containerWidth = containerRef.current?.clientWidth || window.innerWidth

    const run = async () => {
      try {
        // Cancel any previous render task on the canvas
        if (activeRenderTask.current) {
          try { activeRenderTask.current.cancel() } catch {}
          activeRenderTask.current = null
          // Small wait to let PDF.js release the canvas
          await new Promise(r => setTimeout(r, 20))
        }

        const page = await pdfRef.current.getPage(pageNum)
        const task = renderPage(page, canvasRef.current, scale, containerWidth)
        activeRenderTask.current = task
        await task.promise
        activeRenderTask.current = null

        setLoading(false)

        if (flipRef.current) {
          const cls = directionRef.current === 'next' ? 'page-flip-in-right' : 'page-flip-in-left'
          setAnimClass(cls)
          setTimeout(() => setAnimClass(''), 400)
        }
      } catch (err) {
        activeRenderTask.current = null
        if (err?.name === 'RenderingCancelledException') {
          // A newer render cancelled this — do nothing, pending will handle it
        } else {
          console.error('Render error:', err)
          setRenderError('Failed to render page.')
          setLoading(false)
        }
      } finally {
        renderingRef.current = false
        // If a newer request came in while we were rendering, run it now
        if (pendingRef.current) {
          const next = pendingRef.current
          pendingRef.current = null
          scheduleRender(next.pageNum, next.scale)
        }
      }
    }

    run()
  }, [])

  // ── Trigger render on load / page / scale change ─────────────
  useEffect(() => {
    if (!pdfLoaded) return
    scheduleRender(currentPage, scaleMultiplier)
  }, [pdfLoaded, currentPage, scaleMultiplier, scheduleRender])

  // ── UI ───────────────────────────────────────────────────────
  if (renderError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 px-8 text-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}>
          <span className="text-red-400 text-xl">!</span>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {renderError}
        </p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full" style={{ backgroundColor: 'var(--color-bg-primary)' }}>

      {/* Spinner — shown while loading, takes no space when hidden */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Spinner size="lg" />
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Loading page {currentPage}...
          </p>
        </div>
      )}

      {/* Canvas wrapper — always in DOM so canvasRef stays attached */}
      <div
        className={animClass}
        style={{ display: loading ? 'none' : 'block' }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: 'block', boxShadow: '0 2px 16px rgba(0,0,0,0.3)' }}
        />
      </div>
    </div>
  )
}
