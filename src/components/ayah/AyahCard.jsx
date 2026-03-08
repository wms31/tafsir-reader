import React, { useState } from 'react'
import { BookOpen } from 'lucide-react'

/**
 * Displays a single ayah with Arabic text, translation, and a tap-to-expand tafsir hint.
 * Design: Manuscript aesthetic — generous vertical rhythm, Arabic text as primary element,
 * subtle gold ayah number medallion, soft separator lines.
 */
export default function AyahCard({ ayah, surahNumber, hasTafsir, onTap }) {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      className="w-full text-left transition-colors duration-150"
      style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: pressed ? 'var(--color-bg-card)' : 'transparent',
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={() => onTap(ayah)}
    >
      <div className="px-5 py-5">
        {/* Ayah number row */}
        <div className="flex items-center justify-between mb-4">
          {/* Number medallion */}
          <div className="relative flex items-center justify-center w-8 h-8 flex-shrink-0">
            {/* Octagram SVG background */}
            <svg viewBox="0 0 32 32" className="absolute inset-0 w-full h-full" aria-hidden>
              <path
                d="M16 2 L19.5 6 L24.5 4.5 L24.5 9.5 L29.5 12 L27 16.5 L29.5 21 L24.5 22.5 L24.5 27.5 L19.5 26 L16 30 L12.5 26 L7.5 27.5 L7.5 22.5 L2.5 21 L5 16.5 L2.5 12 L7.5 9.5 L7.5 4.5 L12.5 6 Z"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
            <span className="relative text-xs font-display font-bold z-10"
              style={{ color: 'var(--color-accent)', fontSize: '10px' }}>
              {ayah.id}
            </span>
          </div>

          {/* Tafsir available indicator */}
          {hasTafsir && (
            <div className="flex items-center gap-1.5 text-xs"
              style={{ color: 'var(--color-text-muted)' }}>
              <BookOpen className="w-3 h-3" />
              <span style={{ fontSize: '10px' }}>Tap for tafsir</span>
            </div>
          )}
        </div>

        {/* Arabic text — primary, large, right-aligned */}
        <p
          className="font-arabic text-right leading-[2.2] mb-5 select-text"
          style={{
            color: 'var(--color-text-primary)',
            fontSize: 'clamp(20px, 5vw, 26px)',
            direction: 'rtl',
          }}
        >
          {ayah.text}
        </p>

        {/* Thin gold rule */}
        <div className="mb-4 h-px mx-8"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-border), transparent)' }} />

        {/* Translation */}
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {ayah.translation}
        </p>
      </div>
    </button>
  )
}
