import React, { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../services/storage'

const DarkModeContext = createContext(null)

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = storage.get('darkMode')
    if (saved !== null) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    storage.set('darkMode', isDark)
    if (isDark) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }, [isDark])

  const toggle = () => setIsDark(prev => !prev)

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext)
  if (!ctx) throw new Error('useDarkMode must be used within DarkModeProvider')
  return ctx
}
