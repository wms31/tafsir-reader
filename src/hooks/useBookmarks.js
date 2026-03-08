import { useState, useCallback } from 'react'
import {
  addBookmark,
  removeBookmark,
  isBookmarked,
  getAllBookmarks,
  getBookBookmarks,
} from '../services/bookmarkService'

export function useBookmarks(bookId) {
  const [bookmarks, setBookmarks] = useState(() =>
    bookId ? getBookBookmarks(bookId) : getAllBookmarks()
  )

  const checkIsBookmarked = useCallback(page => isBookmarked(bookId, page), [bookId])

  const toggle = useCallback(
    (page, bookTitle, collectionId, collectionName) => {
      const bmId = `${bookId}_page_${page}`
      if (isBookmarked(bookId, page)) {
        removeBookmark(bmId)
      } else {
        addBookmark(bookId, collectionId, page, bookTitle, collectionName)
      }
      setBookmarks(bookId ? getBookBookmarks(bookId) : getAllBookmarks())
    },
    [bookId]
  )

  const refresh = useCallback(() => {
    setBookmarks(bookId ? getBookBookmarks(bookId) : getAllBookmarks())
  }, [bookId])

  return { bookmarks, toggle, checkIsBookmarked, refresh }
}

export function useAllBookmarks() {
  const [bookmarks, setBookmarks] = useState(getAllBookmarks)

  const remove = useCallback(id => {
    removeBookmark(id)
    setBookmarks(getAllBookmarks())
  }, [])

  return { bookmarks, remove }
}
