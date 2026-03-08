import React, { useEffect, useRef, useState } from 'react'
import { X, BookOpen, ChevronDown } from 'lucide-react'

/**
 * Slide-up drawer showing full Ibn Kathir tafsir for a tapped ayah.
 *
 * Design: Sacred manuscript feel — warm parchment-like inner surface,
 * gold header accent, generous readable typography, smooth spring animation.
 * The drawer can be dismissed by tapping the backdrop, the X button, or
 * dragging down (touch gesture via pointer events).
 */
export default function TafsirDrawer({ open, ayah, tafsirText, surahName, collectionName, onClose }) {
  const drawerRef = useRef(null)
  const contentRef = useRef(null)
  const dragStartY = useRef(null)
  const dragCurrentY = useRef(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [visible, setVisible] = useState(false)

  // Handle open/close animation timing
  useEffect(() => {
    if (open) {
      setVisible(true)
      setDragOffset(0)
    } else {
      const t = setTimeout(() => setVisible(false), 380)
      return () => clearTimeout(t)
    }
  }, [open])

  // Drag-to-dismiss
  const onPointerDown = (e) => {
    dragStartY.current = e.clientY
    drawerRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (dragStartY.current === null) return
    const delta = Math.max(0, e.clientY - dragStartY.current)
    dragCurrentY.current = delta
    setDragOffset(delta)
  }

  const onPointerUp = () => {
    if (dragCurrentY.current > 100) {
      onClose()
    } else {
      setDragOffset(0)
    }
    dragStartY.current = null
    dragCurrentY.current = 0
  }

  if (!visible && !open) return null

  const translateY = open ? dragOffset : '100%'

  // Format tafsir text — split on newlines for paragraphs
  const paragraphs = tafsirText
    ? tafsirText
        .split(/\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0)
    : []

  return (
    <div className="fixed inset-0 z-50" aria-modal role="dialog">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.65)',
          opacity: open ? 1 : 0,
        }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className="absolute bottom-0 left-0 right-0 flex flex-col rounded-t-3xl overflow-hidden"
        style={{
          maxHeight: '88vh',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderBottom: 'none',
          transform: `translateY(${typeof translateY === 'number' ? translateY + 'px' : translateY})`,
          transition: dragOffset > 0 ? 'none' : (open ? 'transform 0.35s cubic-bezier(0.32,0.72,0,1)' : 'transform 0.3s cubic-bezier(0.4,0,1,1)'),
          willChange: 'transform',
        }}
      >
        {/* Drag handle area */}
        <div
          className="flex-shrink-0 flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div className="w-10 h-1 rounded-full mb-3"
            style={{ backgroundColor: 'var(--color-border-light)' }} />

          {/* Header */}
          <div className="w-full flex items-center justify-between px-5 pb-2">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                <span className="font-display text-base font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}>
                  Tafsir
                </span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                {collectionName} · {surahName} {ayah?.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl active:scale-95 transition-transform"
              style={{ backgroundColor: 'var(--color-bg-elevated)' }}
            >
              <X className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
          </div>
        </div>

        {/* Gold divider */}
        <div className="flex-shrink-0 h-px mx-5"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)' }} />

        {/* Scrollable content */}
        <div ref={contentRef} className="flex-1 overflow-auto overscroll-contain px-5 py-5">

          {/* Ayah Arabic text recap */}
          {ayah && (
            <div className="mb-5 pb-5" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <p className="font-arabic text-right leading-[2] text-xl"
                style={{ color: 'var(--color-accent)', direction: 'rtl' }}>
                {ayah.text}
              </p>
              <p className="text-sm mt-3 leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}>
                {ayah.translation}
              </p>
            </div>
          )}

          {/* Tafsir text */}
          {paragraphs.length > 0 ? (
            <div className="space-y-4 pb-8 safe-area-bottom">
              {paragraphs.map((para, i) => (
                <TafsirParagraph key={i} text={para} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                No tafsir available for this ayah.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * A single tafsir paragraph with staggered fade-in and special
 * styling for hadith markers (lines starting with Arabic text or quotes).
 */
function TafsirParagraph({ text, index }) {
  // Detect hadith/Arabic content lines
  const isArabic = /[\u0600-\u06FF]/.test(text) && text.trim().startsWith('\u{0}') === false
    && /^[\u0600-\u06FF\s\u0621-\u064A]+/.test(text.trim())

  return (
    <p
      className="text-sm leading-[1.9] select-text"
      style={{
        color: isArabic ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        fontFamily: isArabic ? "'Amiri', serif" : "'Source Serif 4', Georgia, serif",
        direction: isArabic ? 'rtl' : 'ltr',
        textAlign: isArabic ? 'right' : 'left',
        paddingLeft: isArabic ? '0' : '0',
        animationDelay: `${Math.min(index * 20, 200)}ms`,
        animationFillMode: 'both',
      }}
    >
      {text}
    </p>
  )
}
