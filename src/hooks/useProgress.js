import { useState, useEffect, useCallback } from 'react'
import { saveProgress, getProgress, getAllProgress } from '../services/progressService'

export function useProgress(bookId) {
  const [progress, setProgress] = useState(() => (bookId ? getProgress(bookId) : null))

  const save = useCallback(
    (currentPage, totalPages, bookTitle, collectionId, collectionName) => {
      saveProgress(bookId, collectionId, currentPage, totalPages, bookTitle, collectionName)
      setProgress(getProgress(bookId))
    },
    [bookId]
  )

  return { progress, save }
}

export function useAllProgress() {
  const [allProgress, setAllProgress] = useState([])

  useEffect(() => {
    setAllProgress(getAllProgress())
  }, [])

  return allProgress
}
