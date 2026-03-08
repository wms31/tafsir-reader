// ============================================================
// BOOKMARK SERVICE — localStorage MVP
// ============================================================
// TO SWITCH TO FIRESTORE:
// Import and use functions from '../firebase/firestore.js'
// ============================================================

import { storage } from './storage'

const BOOKMARKS_KEY = 'bookmarks'

/**
 * Add or update a bookmark
 * @param {string} bookId
 * @param {string} collectionId
 * @param {number} page
 * @param {string} bookTitle
 * @param {string} collectionName
 * @param {string} [note]
 * @returns {string} bookmark ID
 */
export function addBookmark(bookId, collectionId, page, bookTitle, collectionName, note = '') {
  const all = storage.get(BOOKMARKS_KEY) || {}
  const id = `${bookId}_page_${page}`
  all[id] = {
    id,
    bookId,
    collectionId,
    page,
    bookTitle,
    collectionName,
    note,
    createdAt: Date.now(),
  }
  storage.set(BOOKMARKS_KEY, all)
  return id
}

/**
 * Remove a bookmark by ID
 * @param {string} bookmarkId
 */
export function removeBookmark(bookmarkId) {
  const all = storage.get(BOOKMARKS_KEY) || {}
  delete all[bookmarkId]
  storage.set(BOOKMARKS_KEY, all)
}

/**
 * Check if a page is bookmarked
 * @param {string} bookId
 * @param {number} page
 * @returns {boolean}
 */
export function isBookmarked(bookId, page) {
  const all = storage.get(BOOKMARKS_KEY) || {}
  return !!all[`${bookId}_page_${page}`]
}

/**
 * Get all bookmarks sorted by createdAt (newest first)
 * @returns {import('../types/index.js').Bookmark[]}
 */
export function getAllBookmarks() {
  const all = storage.get(BOOKMARKS_KEY) || {}
  return Object.values(all).sort((a, b) => b.createdAt - a.createdAt)
}

/**
 * Get bookmarks for a specific book
 * @param {string} bookId
 * @returns {import('../types/index.js').Bookmark[]}
 */
export function getBookBookmarks(bookId) {
  const all = storage.get(BOOKMARKS_KEY) || {}
  return Object.values(all)
    .filter(b => b.bookId === bookId)
    .sort((a, b) => a.page - b.page)
}
