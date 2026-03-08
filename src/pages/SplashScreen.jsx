import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home', { replace: true })
    }, 2200)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div
      className="min-h-screen min-h-dvh flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Geometric decorative rings */}
      <div className="relative flex items-center justify-center mb-10">
        <div
          className="absolute w-32 h-32 rounded-full opacity-10 animate-pulse-slow"
          style={{ border: '1px solid var(--color-accent)' }}
        />
        <div
          className="absolute w-24 h-24 rounded-full opacity-20"
          style={{ border: '1px solid var(--color-accent)' }}
        />
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: 'var(--color-accent-muted)',
            border: '1px solid var(--color-accent)',
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4h14a4 4 0 014 4v16a4 4 0 01-4 4H6a2 2 0 01-2-2V6a2 2 0 012-2z"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              fill="none"
            />
            <path d="M24 4v16" stroke="var(--color-accent)" strokeWidth="1.5" />
            <path
              d="M10 12h8M10 16h6"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <h1
          className="font-display text-4xl font-bold mb-2 tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Tafsir
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Islamic Commentary Reader
        </p>
        <p className="font-arabic text-base mt-2" style={{ color: 'var(--color-accent)' }}>
          تفسير القرآن الكريم
        </p>
      </div>

      {/* Loading dots */}
      <div className="flex gap-1.5 mt-16">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: 'var(--color-accent)',
              animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  )
}
