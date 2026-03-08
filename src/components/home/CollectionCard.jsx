import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, BookOpen } from 'lucide-react'
import Badge from '../ui/Badge.jsx'

export default function CollectionCard({ collection }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/collection/${collection.id}`)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-transform duration-300 active:scale-[0.98]"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Decorative accent top bar */}
      <div
        className="h-1 w-full"
        style={{
          background:
            'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))',
        }}
      />

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-accent-muted)' }}
          >
            <BookOpen className="w-7 h-7" style={{ color: 'var(--color-accent)' }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-display font-semibold text-lg leading-tight mb-1"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {collection.name}
            </h3>
            <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
              {collection.scholar}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="accent">{collection.totalVolumes} volumes</Badge>
              <Badge variant="default">{collection.language.toUpperCase()}</Badge>
            </div>
          </div>

          <ChevronRight
            className="flex-shrink-0 w-5 h-5 mt-1 transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: 'var(--color-text-muted)' }}
          />
        </div>

        <p
          className="mt-4 text-sm leading-relaxed line-clamp-3"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {collection.description}
        </p>
      </div>
    </div>
  )
}
